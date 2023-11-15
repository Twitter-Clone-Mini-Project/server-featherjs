// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Tweets, TweetsData, TweetsPatch, TweetsQuery } from './tweets.schema'

export type { Tweets, TweetsData, TweetsPatch, TweetsQuery }

export interface TweetsParams extends KnexAdapterParams<TweetsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TweetsService<ServiceParams extends Params = TweetsParams> extends KnexService<
  Tweets,
  TweetsData,
  TweetsParams,
  TweetsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'tweets'
  }
}
