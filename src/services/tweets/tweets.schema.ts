// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TweetsService } from './tweets.class'

// Main data model schema
export const tweetsSchema = Type.Object(
  {
    id: Type.Number(),
    content: Type.String(),
    likes: Type.Number(), 
    user_id: Type.Number(), 
    created_at: Type.String(), 
    updated_at: Type.String(), 
  },
  { $id: 'Tweets', additionalProperties: false }
);
export type Tweets = Static<typeof tweetsSchema>
export const tweetsValidator = getValidator(tweetsSchema, dataValidator)
export const tweetsResolver = resolve<Tweets, HookContext<TweetsService>>({})

export const tweetsExternalResolver = resolve<Tweets, HookContext<TweetsService>>({})

// Schema for creating new entries
export const tweetsDataSchema = Type.Pick(tweetsSchema, ['content','user_id'], {
  $id: 'TweetsData'
})
export type TweetsData = Static<typeof tweetsDataSchema>
export const tweetsDataValidator = getValidator(tweetsDataSchema, dataValidator)
export const tweetsDataResolver = resolve<Tweets, HookContext<TweetsService>>({})

// Schema for updating existing entries
export const tweetsPatchSchema = Type.Partial(tweetsSchema, {
  $id: 'TweetsPatch'
})
export type TweetsPatch = Static<typeof tweetsPatchSchema>
export const tweetsPatchValidator = getValidator(tweetsPatchSchema, dataValidator)
export const tweetsPatchResolver = resolve<Tweets, HookContext<TweetsService>>({})

// Schema for allowed query properties
export const tweetsQueryProperties = Type.Pick(tweetsSchema, ['id', 'content', 'likes', 'user_id','created_at','updated_at'])
export const tweetsQuerySchema = Type.Intersect(
  [
    querySyntax(tweetsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TweetsQuery = Static<typeof tweetsQuerySchema>
export const tweetsQueryValidator = getValidator(tweetsQuerySchema, queryValidator)
export const tweetsQueryResolver = resolve<TweetsQuery, HookContext<TweetsService>>({})
