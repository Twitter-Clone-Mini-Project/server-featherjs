// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { HookContext } from '@feathersjs/feathers';
import { BadRequest, Forbidden } from '@feathersjs/errors';
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tweetsDataValidator,
  tweetsPatchValidator,
  tweetsQueryValidator,
  tweetsResolver,
  tweetsExternalResolver,
  tweetsDataResolver,
  tweetsPatchResolver,
  tweetsQueryResolver
} from './tweets.schema'

import type { Application, NextFunction } from '../../declarations'
import { TweetsService, getOptions } from './tweets.class'
import { tweetsPath, tweetsMethods } from './tweets.shared'

export * from './tweets.class'
export * from './tweets.schema'


// A configure function that registers the service and its hooks via `app.configure`
export const tweets = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tweetsPath, new TweetsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tweetsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

 
  // Initialize hooks
  app.service(tweetsPath).hooks({
    around: {
      all: [
        async (context: HookContext,next:NextFunction) => {
          try {
            await authenticate('jwt')(context)
            await next()
          } catch (error:any) {
            console.log("masuk");
            
            context.statusCode = 401;
            context.result = {
              status: 'NotAuthenticated',
              message: 'Not authenticated',
            };
          }
        },
        schemaHooks.resolveExternal(tweetsExternalResolver),
        schemaHooks.resolveResult(tweetsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(tweetsQueryValidator), schemaHooks.resolveQuery(tweetsQueryResolver)],
      find: [
        async (context: HookContext) => {
          // Menghilangkan kunci 'limit' dari respons jika tidak ingin disertakan dalam respons
           if (context.result) {
              // Hapus properti "limit" dari parameter permintaan
            delete context.params.query.limit;

            return context;
          }
         }
      ],
      get: [],
      create: [ // Menambahkan validasi di hook create
      (context: HookContext) => {
        const { data,params } = context;
        const { headers,user } = params;

        // Misalnya, menambahkan validasi bahwa content harus diisi
        if (data.content === "") {
          throw new BadRequest('Content is required.');
        }

        data.userId = user.id

        return context;
      },
        schemaHooks.validateData(tweetsDataValidator), schemaHooks.resolveData(tweetsDataResolver)],
      patch: [
        schemaHooks.validateData(tweetsPatchValidator),
        schemaHooks.resolveData(tweetsPatchResolver),
        async (context: HookContext) => {
          // Menambahkan logika untuk mengupdate nilai 'likes'
          const { id,data,params } = context;
          const { headers,user } = params;

          const tweetBeforeUpdate = await context.service.get(id);

          
          if (tweetBeforeUpdate?.status) {
             // Hentikan eksekusi hook
             context.result = null;

             // Kirim respons langsung ke klien dengan status 403
             context.statusCode = 404;
             context.dispatch = { code: 404, message: 'NotFound' };
            
            return tweetBeforeUpdate
          }
          
          if (user.id !== tweetBeforeUpdate.userId) {
            // Hentikan eksekusi hook
            context.result = null;

            // Kirim respons langsung ke klien dengan status 403
            context.statusCode = 403;
            context.dispatch = { code: 403, message: 'Forbidden' };
          }
          
          
          // Memastikan bahwa operasi patch hanya dilakukan jika field 'likes' diubah
          if ('likes' in context.data) {
            // Mengambil data tweet sebelum di-update
  
            // Menghitung jumlah likes yang baru
            const newLikes = tweetBeforeUpdate.likes + 1;
  
            // Menetapkan nilai likes yang baru ke dalam data yang akan di-update
            context.data.likes = newLikes;
          }

           // Misalnya, menambahkan validasi bahwa content harus diisi
              if (data.content === "") {
                throw new BadRequest('Content is required.');
              }

              return context;
        }
      ],
      remove: [
        async (context: HookContext) => {
          // Menambahkan logika untuk mengupdate nilai 'likes'
          const { id } = context;
          const { params } = context;
          const { user } = params;

    

          const tweetBeforeUpdate = await context.service.get(id);


        if (tweetBeforeUpdate?.status) {
             // Hentikan eksekusi hook
             context.result = null;

             // Kirim respons langsung ke klien dengan status 403
             context.statusCode = 404;
             context.dispatch = { code: 404, message: 'NotFound' };
            
            return tweetBeforeUpdate
          }
          
          if (user.id !== tweetBeforeUpdate.userId) {
            // Hentikan eksekusi hook
            context.result = null;

            // Kirim respons langsung ke klien dengan status 403
            context.statusCode = 403;
            context.dispatch = { code: 403, message: 'Forbidden' };
          }
          

              return context;
        }
      ]
    },
    after: {
      all: [],
      find: [
        async (context: HookContext) => {
             // Menghilangkan kunci 'limit' dari respons jika tidak ingin disertakan dalam respons
              if (context.result) {
                // Tambahkan properti "status" dan "message"
                let data = context.result.data
                for (let i = 0; i < data.length; i++) {
                  let dataUser = await context.app.service('users').get(data[i].userId);
                  data[i].username = dataUser.username
                }

                context.result = {
                  status: 'Success',
                  message: 'Success',
                  meta:{
                    limit:context.result.limit,
                    skip:context.result.skip
                  },
                  ...context.result  // Menyalin properti lainnya dari hasil permintaan
                };
              } 
        
              return context;
        }
      ],
      create: [ // Menambahkan validasi di hook create
      (context: HookContext) => {
       // Menghilangkan kunci 'limit' dari respons jika tidak ingin disertakan dalam respons
            if (context.result) {
              // Tambahkan properti "status" dan "message"
              context.result = {
                status: 'Success',
                message: 'Success',
                data: context.result,
              };
            } 

              return context;
          }
      ],
      patch: [
        async (context: HookContext) => {
          // Tambahkan properti "status" dan "message"

          if (context.dispatch?.code === 403) {
            context.result = {
              status: 'Forbidden',
              message: 'Forbidden',
            };
          }else if(context.dispatch?.code === 404) {
            context.result = {
              status: 'NotFound',
              message: context.message,
            };
          }else{
            context.result = {
              status: 'Success',
              message: 'Success',
              data: context.result,
            };
          }
          
          return context;
        }
      ],
      remove: [
        async (context: HookContext) => {
          // Tambahkan properti "status" dan "message"
          if (context.dispatch?.code === 403) {
            context.result = {
              status: 'Forbidden',
              message: 'Forbidden',
            };
          }else if(context.dispatch?.code === 404) {
            context.result = {
              status: 'NotFound',
              message: context.message,
            };
          }else{
            context.result = {
              status: 'Success',
              message: 'Success',
              data: context.result,
            };
          }
          
          return context;
        }
      ],
    },
    error: {
      all: [
        async (context: HookContext) => {
          context.statusCode = 400;
            context.result = {
              status: 'Bad Request',
              message: context.error.message,
            };
  
          return context;
        },
      ],
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [tweetsPath]: TweetsService
  }
}
