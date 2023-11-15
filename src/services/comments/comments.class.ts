// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Comments, CommentsData, CommentsPatch, CommentsQuery } from './comments.schema'

export type { Comments, CommentsData, CommentsPatch, CommentsQuery }

export interface CommentsParams extends KnexAdapterParams<CommentsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CommentsService<ServiceParams extends Params = CommentsParams> extends KnexService<
  Comments,
  CommentsData,
  CommentsParams,
  CommentsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'comments'
  }
}
