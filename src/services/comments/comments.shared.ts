// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Comments, CommentsData, CommentsPatch, CommentsQuery, CommentsService } from './comments.class'

export type { Comments, CommentsData, CommentsPatch, CommentsQuery }

export type CommentsClientService = Pick<
  CommentsService<Params<CommentsQuery>>,
  (typeof commentsMethods)[number]
>

export const commentsPath = 'comments'

export const commentsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const commentsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(commentsPath, connection.service(commentsPath), {
    methods: commentsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [commentsPath]: CommentsClientService
  }
}
