// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  commentsDataValidator,
  commentsPatchValidator,
  commentsQueryValidator,
  commentsResolver,
  commentsExternalResolver,
  commentsDataResolver,
  commentsPatchResolver,
  commentsQueryResolver
} from './comments.schema'

import type { Application, NextFunction } from '../../declarations'
import { CommentsService, getOptions } from './comments.class'
import { commentsPath, commentsMethods } from './comments.shared'

export * from './comments.class'
export * from './comments.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const comments = (app: Application) => {
  // Register our service on the Feathers application
  app.use(commentsPath, new CommentsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: commentsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(commentsPath).hooks({
    around: {
      all: [
        async (context: HookContext,next:NextFunction) => {
          try {
            await authenticate('jwt')(context)
            await next()
          } catch (error:any) {
            context.statusCode = 401;
            context.result = {
              status: 'NotAuthenticated',
              message: 'Not authenticated',
            };
          }
        },
        schemaHooks.resolveExternal(commentsExternalResolver),
        schemaHooks.resolveResult(commentsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(commentsQueryValidator),
        schemaHooks.resolveQuery(commentsQueryResolver)
      ],
      find: [
        async (context:HookContext) => {
          // Menangani kondisional untuk mendapatkan tweetId dari URL
          const tweetId = context.params?.route?.tweetId;
          const tweetBeforeUpdate = await context.app.service('tweets').get(tweetId);
         
          // Menambahkan kondisional untuk mendapatkan data komentar berdasarkan tweetId
          context.params.query = { tweetId: tweetId };
        }
      ],
      get: [],
      create: [
        async (context: HookContext) => {
          const { data } = context;
          const tweetId = context.params?.route?.tweetId;
          
          const tweetBeforeUpdate = await context.app.service('tweets').get(tweetId);
   
          // Misalnya, menambahkan validasi bahwa content harus diisi

          if (!data.tweetId) {
            // Jika tidak, set nilai 'tweetId' dengan nilai dari params URL
            data.tweetId = Number(tweetId);
          }
         
          if (data.content === "") {
            throw new BadRequest('Content is required.');
          }
  
          return context;
        },
        schemaHooks.validateData(commentsDataValidator),
        schemaHooks.resolveData(commentsDataResolver),
      ],
      patch: [
        async (context: HookContext) => {
          const { data } = context;
          const tweetId = context.params?.route?.tweetId;
          const commentId = Number(context.id);

          
          const tweetBeforeUpdate = await context.app.service('tweets').get(tweetId);
          const commentBeforeUpdate = await context.service.get(commentId);

          // Misalnya, menambahkan validasi bahwa content harus diisi

          if (data.content === "") {
            throw new BadRequest('Content is required.');
          }
  
          return context;
        },
        schemaHooks.validateData(commentsPatchValidator),
        schemaHooks.resolveData(commentsPatchResolver),
      ],
      remove: [
        async (context: HookContext) => {
          const tweetId = context.params?.route?.tweetId;
          
          const tweetBeforeUpdate = await context.app.service('tweets').get(tweetId);

          return context;
        },
      ]
    },
    after: {
      all: [],
      find: [
        async (context: HookContext) => {
             // Menghilangkan kunci 'limit' dari respons jika tidak ingin disertakan dalam respons
              if (context.result) {
                // Tambahkan properti "status" dan "message"
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
      create:[
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
          context.result = {
            status: 'Success',
            message: 'Success',
            data: context.result,
          };
          return context;
        }
      ],
      remove: [
        async (context: HookContext) => {
          // Tambahkan properti "status" dan "message"
          context.result = {
            status: 'Success',
            message: 'Success',
            data: context.result,
          };
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
    [commentsPath]: CommentsService
  }
}
