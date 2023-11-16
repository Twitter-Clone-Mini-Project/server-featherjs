// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CommentsService } from './comments.class'

// Main data model schema
export const commentsSchema = Type.Object(
  {
    id: Type.Number(),
    content: Type.String(),
    tweet_id: Type.Number(), 
    user_id: Type.Number(), 
    createdAt: Type.String(), 
    updatedAt: Type.String(), 
  },
  { $id: 'Comments', additionalProperties: false }
)
export type Comments = Static<typeof commentsSchema>
export const commentsValidator = getValidator(commentsSchema, dataValidator)
export const commentsResolver = resolve<Comments, HookContext<CommentsService>>({})

export const commentsExternalResolver = resolve<Comments, HookContext<CommentsService>>({})

// Schema for creating new entries
export const commentsDataSchema = Type.Pick(commentsSchema, ['content', 'tweet_id', 'user_id'], {
  $id: 'CommentsData'
})
export type CommentsData = Static<typeof commentsDataSchema>
export const commentsDataValidator = getValidator(commentsDataSchema, dataValidator)
export const commentsDataResolver = resolve<Comments, HookContext<CommentsService>>({})

// Schema for updating existing entries
export const commentsPatchSchema = Type.Partial(commentsSchema, {
  $id: 'CommentsPatch'
})
export type CommentsPatch = Static<typeof commentsPatchSchema>
export const commentsPatchValidator = getValidator(commentsPatchSchema, dataValidator)
export const commentsPatchResolver = resolve<Comments, HookContext<CommentsService>>({})

// Schema for allowed query properties
export const commentsQueryProperties = Type.Pick(commentsSchema, ['id','content', 'tweet_id', 'user_id','createdAt','updatedAt'])
export const commentsQuerySchema = Type.Intersect(
  [
    querySyntax(commentsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CommentsQuery = Static<typeof commentsQuerySchema>
export const commentsQueryValidator = getValidator(commentsQuerySchema, queryValidator)
export const commentsQueryResolver = resolve<CommentsQuery, HookContext<CommentsService>>({})
