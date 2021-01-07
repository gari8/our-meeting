import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Room = {
  __typename?: 'Room';
  ulid: Scalars['ID'];
  room_name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  own_messages: Array<Message>;
};

export type Query = {
  __typename?: 'Query';
  rooms: Array<Room>;
  messages: Array<Message>;
};


export type QueryMessagesArgs = {
  room_id: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  room_id: Scalars['String'];
  text: Scalars['String'];
};
