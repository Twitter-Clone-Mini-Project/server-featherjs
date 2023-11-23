// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './users.schema'

import type { Application } from '../../declarations'
import { UserService, getOptions } from './users.class'
import { userPath, userMethods } from './users.shared'

export * from './users.class'
export * from './users.schema'


// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })

  app.service('authentication').hooks({
    after: {
      create: [
        (context: HookContext) => {
            // Hapus kunci "authentication" dari respons jika provider
            if (context.params.provider && context.result.authentication) {
              delete context.result.authentication;
            }

            if (context.result && context.result.user) {
              // Hapus properti "password" dari objek pengguna
              delete context.result.user.password;
    
              // Tambahkan properti "status" dan "message"
              context.result = {
                status: 'Success',
                message: 'Success',
                data: context.result,
              };
            }
  
          return context;
        },
      ],
    },
    before: {
      create: [
        (context: HookContext) => {
          const { data } = context;

          // // Misalnya, menambahkan validasi bahwa username harus diisi
          // if (data.username === "") {
          //   throw new BadRequest('Username is required.');
          // }

          //   // Misalnya, menambahkan validasi bahwa username harus diisi
          //   if (data.password === "") {
          //     throw new BadRequest('Password is required.');
          //   }

            if (!context.data.strategy) {
              context.data.strategy = 'local';
            }
  
          return context;
        },
      ],
    },
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: [],
      create: [
        // Menambahkan validasi di hook create
        (context: HookContext) => {
          const { data } = context;
          
          // Misalnya, menambahkan validasi bahwa username harus diisi
              if (data.username === "") {
                throw new BadRequest('Username is required.');
              }

            // Misalnya, menambahkan validasi bahwa username harus diisi
            if (data.password === "") {
              throw new BadRequest('Password is required.');
            }

             // Misalnya, menambahkan validasi bahwa username harus diisi
             if (data.confirm_password === "") {
              throw new BadRequest('Confirm Password is required.');
            }

            if (data.password.length < 3) {
              throw new BadRequest('Password is too short. Please provide a password with at least 3 characters.');
            }

              // Pastikan password dan confirm_password cocok
            if (data.password !== data.confirm_password) {
                throw new BadRequest('Password do not match.');
            }else{
              delete data.confirm_password
            }

          // Anda dapat menambahkan validasi lain sesuai kebutuhan

          return context;
        },
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver)
      ],
      patch: [schemaHooks.validateData(userPatchValidator), schemaHooks.resolveData(userPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: [ // Menambahkan validasi di hook create
      (context: HookContext) => {
       // Menghilangkan kunci 'limit' dari respons jika tidak ingin disertakan dalam respons
            if (context.result) {
              // Tambahkan properti "status" dan "message"
              delete context.result.password;
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
      all: [],
      create: [
        async (context: HookContext) => {
          if (context.error && context.error.name === 'BadRequest' && context.error.className === 'bad-request') {
            // Cek apakah pesan kesalahan berisi informasi tentang duplikasi kunci unik
            if (context.error.message.includes('Duplicate entry')) {
              // Ganti pesan kesalahan dengan pesan yang diinginkan
              context.error.message = 'Username is already taken. Please choose a different username.';
              
              // Set kode status menjadi 400 Bad Request
              context.statusCode = 400;
            }
          }
  
          return context;
        },
      ],
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}
