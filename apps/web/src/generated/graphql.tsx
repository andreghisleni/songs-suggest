import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date; }
};

export type AuthType = {
  __typename?: 'AuthType';
  refreshToken: Scalars['String']['output'];
  session: Session;
  token: Scalars['String']['output'];
};

export type CreateAuthInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type CreateEventInput = {
  /** The banner of the event. */
  banner?: InputMaybe<Scalars['String']['input']>;
  /** The description of the event. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Whether the event is people sequence suggest limitable. */
  isPeopleSequenceSuggestLimitable?: InputMaybe<Scalars['Boolean']['input']>;
  /** The logo of the event. */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** The name of the event. */
  name: Scalars['String']['input'];
  /** The number of people sequence suggest limit. */
  numberOfPeopleSequenceSuggestLimit?: InputMaybe<Scalars['Float']['input']>;
  /** The slug of the event. */
  slug: Scalars['String']['input'];
};

export type CreateSongInput = {
  /** The artist of the song. */
  artist: Scalars['String']['input'];
  /** The duration of the song in seconds. */
  duration: Scalars['Float']['input'];
  /** The ID of the event associated with the song. */
  eventId: Scalars['String']['input'];
  /** The image URL of the song. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** The name of the song. */
  name: Scalars['String']['input'];
  /** The Spotify ID of the song. */
  spotifyId: Scalars['String']['input'];
  /** The ID of the user who suggested the song. */
  suggestedById: Scalars['String']['input'];
  /** The name of the user who suggested the song. */
  suggestedByName: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The name of the user */
  name: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  banner: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isOpenedToReceiveSuggestions: Scalars['Boolean']['output'];
  isPeopleSequenceSuggestLimitable: Scalars['Boolean']['output'];
  logo: Scalars['String']['output'];
  name: Scalars['String']['output'];
  numberOfPeopleSequenceSuggestLimit: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  songs: Array<Song>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FilterInput = {
  /** Filter */
  filter?: Scalars['String']['input'];
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterUserInput = {
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Filter */
  name?: Scalars['String']['input'];
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: User;
  blockUser: User;
  createEvent: Event;
  createSession: AuthType;
  createSong: Song;
  createUser: User;
  refreshSession: AuthType;
  resetPassword: Scalars['Boolean']['output'];
  searchSpotify: Array<SpotifySong>;
  sendForgotPasswordEmail: Scalars['Boolean']['output'];
  setPlayedSong: Song;
  setRejectedSong: Song;
  toggleEventIsOpenedToReceiveSuggestions: Event;
  updateAvatar: User;
  updateEvent: Event;
  updateProfile: User;
  updateRole: User;
};


export type MutationActivateUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationBlockUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateSessionArgs = {
  data: CreateAuthInput;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRefreshSessionArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSearchSpotifyArgs = {
  query: Scalars['String']['input'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetPlayedSongArgs = {
  id: Scalars['String']['input'];
};


export type MutationSetRejectedSongArgs = {
  id: Scalars['String']['input'];
};


export type MutationToggleEventIsOpenedToReceiveSuggestionsArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAvatarArgs = {
  avatar: Scalars['String']['input'];
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};

export type Query = {
  __typename?: 'Query';
  event: Event;
  eventBySlug: Event;
  events: Array<Event>;
  getTotalEvents: Scalars['Float']['output'];
  getTotalSongs: Scalars['Float']['output'];
  getTotalUsers: Scalars['Float']['output'];
  profile: User;
  session: Session;
  song: Song;
  songs: Array<Song>;
  user: User;
  users: Array<User>;
};


export type QueryEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalEventsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalSongsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QuerySongArgs = {
  id: Scalars['String']['input'];
};


export type QuerySongsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Song = {
  __typename?: 'Song';
  artist: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  event: Event;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  isPlayed: Scalars['Boolean']['output'];
  isRejected: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  suggestedById: Scalars['String']['output'];
  suggestedByName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SpotifySong = {
  __typename?: 'SpotifySong';
  artist: Scalars['String']['output'];
  duration_ms: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  eventUpdated: Event;
  songAdded: Song;
  songUpdated: Song;
};


export type SubscriptionEventUpdatedArgs = {
  slug: Scalars['String']['input'];
};


export type SubscriptionSongAddedArgs = {
  eventId: Scalars['String']['input'];
};


export type SubscriptionSongUpdatedArgs = {
  eventId: Scalars['String']['input'];
};

export type UpdateEventInput = {
  /** The banner of the event. */
  banner?: InputMaybe<Scalars['String']['input']>;
  /** The description of the event. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Id of the event to update. */
  id: Scalars['String']['input'];
  /** Whether the event is people sequence suggest limitable. */
  isPeopleSequenceSuggestLimitable?: InputMaybe<Scalars['Boolean']['input']>;
  /** The logo of the event. */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** The name of the event. */
  name: Scalars['String']['input'];
  /** The number of people sequence suggest limit. */
  numberOfPeopleSequenceSuggestLimit?: InputMaybe<Scalars['Float']['input']>;
  /** The slug of the event. */
  slug: Scalars['String']['input'];
};

export type UpdateRoleInput = {
  role: UpdateRoleInput_RoleEnum_0;
  userId: Scalars['String']['input'];
};

/** Enum values for UpdateRoleInput.role */
export enum UpdateRoleInput_RoleEnum_0 {
  Admin = 'ADMIN',
  Default = 'DEFAULT'
}

export type UpdateUserInput = {
  /** The name of the user */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  activatedAt?: Maybe<Scalars['DateTime']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  blockedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ips: Scalars['String']['output'];
  name: Scalars['String']['output'];
  passwordUpdatedAt: Scalars['DateTime']['output'];
  role: Scalars['String']['output'];
  sessions: Array<Session>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string } };

export type SendForgotPasswordEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendForgotPasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type GetEventByIdWithSongsQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEventByIdWithSongsQuery = { __typename?: 'Query', event: { __typename?: 'Event', id: string, slug: string, name: string, description: string, banner: string, logo: string, isOpenedToReceiveSuggestions: boolean, createdAt: Date, updatedAt: Date, songs: Array<{ __typename?: 'Song', artist: string, createdAt: Date, duration: number, id: string, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date }> } };

export type OnSongAddedSubscriptionVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type OnSongAddedSubscription = { __typename?: 'Subscription', songAdded: { __typename?: 'Song', id: string, artist: string, createdAt: Date, duration: number, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date } };

export type SetPlayedSongMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SetPlayedSongMutation = { __typename?: 'Mutation', setPlayedSong: { __typename?: 'Song', id: string, artist: string, createdAt: Date, duration: number, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date } };

export type SetRejectedSongMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SetRejectedSongMutation = { __typename?: 'Mutation', setRejectedSong: { __typename?: 'Song', id: string, artist: string, createdAt: Date, duration: number, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date } };

export type GetAllEventsQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
}>;


export type GetAllEventsQuery = { __typename?: 'Query', getTotalEvents: number, events: Array<{ __typename?: 'Event', id: string, name: string, description: string, slug: string, logo: string, banner: string, isOpenedToReceiveSuggestions: boolean, isPeopleSequenceSuggestLimitable: boolean, numberOfPeopleSequenceSuggestLimit: number, createdAt: Date, updatedAt: Date }> };

export type EventUpdatedSubscriptionVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type EventUpdatedSubscription = { __typename?: 'Subscription', eventUpdated: { __typename?: 'Event', id: string, createdAt: Date, updatedAt: Date } };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, createdAt: Date, updatedAt: Date } };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: string, createdAt: Date, updatedAt: Date } };

export type ToggleEventIsOpenedToReceiveSuggestionsMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ToggleEventIsOpenedToReceiveSuggestionsMutation = { __typename?: 'Mutation', toggleEventIsOpenedToReceiveSuggestions: { __typename?: 'Event', id: string, isOpenedToReceiveSuggestions: boolean, createdAt: Date, updatedAt: Date } };

export type GetAllUsersQueryVariables = Exact<{
  filter?: InputMaybe<FilterUserInput>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getTotalUsers: number, users: Array<{ __typename?: 'User', id: string, name: string, email: string, role: string, activatedAt?: Date | null, blockedAt?: Date | null, createdAt: Date, sessions: Array<{ __typename?: 'Session', updatedAt: Date }> }> };

export type BlockUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: { __typename?: 'User', id: string, blockedAt?: Date | null } };

export type ActivateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'User', id: string, activatedAt?: Date | null } };

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'User', id: string, role: string } };

export type GetEventBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetEventBySlugQuery = { __typename?: 'Query', eventBySlug: { __typename?: 'Event', id: string, slug: string, name: string, description: string, banner: string, logo: string, isOpenedToReceiveSuggestions: boolean, createdAt: Date, updatedAt: Date } };

export type GetEventBySlugWithSongsQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetEventBySlugWithSongsQuery = { __typename?: 'Query', eventBySlug: { __typename?: 'Event', id: string, slug: string, name: string, description: string, banner: string, logo: string, isOpenedToReceiveSuggestions: boolean, createdAt: Date, updatedAt: Date, songs: Array<{ __typename?: 'Song', artist: string, createdAt: Date, duration: number, id: string, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date }> } };

export type SearchSpotifySongsMutationVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchSpotifySongsMutation = { __typename?: 'Mutation', searchSpotify: Array<{ __typename?: 'SpotifySong', id: string, name: string, image: string, artist: string, duration_ms: number }> };

export type OnSongUpdatedSubscriptionVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type OnSongUpdatedSubscription = { __typename?: 'Subscription', songUpdated: { __typename?: 'Song', id: string, artist: string, createdAt: Date, duration: number, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date } };

export type CreateSongMutationVariables = Exact<{
  input: CreateSongInput;
}>;


export type CreateSongMutation = { __typename?: 'Mutation', createSong: { __typename?: 'Song', id: string, artist: string, createdAt: Date, duration: number, image?: string | null, isPlayed: boolean, isRejected: boolean, name: string, suggestedById: string, suggestedByName: string, updatedAt: Date } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', activatedAt?: Date | null, avatarUrl?: string | null, blockedAt?: Date | null, createdAt: Date, email: string, id: string, name: string, passwordUpdatedAt: Date, updatedAt: Date, role: string } };


export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SendForgotPasswordEmailDocument = gql`
    mutation sendForgotPasswordEmail($email: String!) {
  sendForgotPasswordEmail(email: $email)
}
    `;
export type SendForgotPasswordEmailMutationFn = Apollo.MutationFunction<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;

/**
 * __useSendForgotPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendForgotPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendForgotPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendForgotPasswordEmailMutation, { data, loading, error }] = useSendForgotPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendForgotPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>(SendForgotPasswordEmailDocument, options);
      }
export type SendForgotPasswordEmailMutationHookResult = ReturnType<typeof useSendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationResult = Apollo.MutationResult<SendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const GetEventByIdWithSongsDocument = gql`
    query GetEventByIdWithSongs($id: String!) {
  event(id: $id) {
    id
    slug
    name
    description
    banner
    logo
    isOpenedToReceiveSuggestions
    createdAt
    updatedAt
    songs {
      artist
      createdAt
      duration
      id
      image
      isPlayed
      isRejected
      name
      suggestedById
      suggestedByName
      updatedAt
    }
  }
}
    `;

/**
 * __useGetEventByIdWithSongsQuery__
 *
 * To run a query within a React component, call `useGetEventByIdWithSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByIdWithSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByIdWithSongsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventByIdWithSongsQuery(baseOptions: Apollo.QueryHookOptions<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables> & ({ variables: GetEventByIdWithSongsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables>(GetEventByIdWithSongsDocument, options);
      }
export function useGetEventByIdWithSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables>(GetEventByIdWithSongsDocument, options);
        }
export function useGetEventByIdWithSongsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables>(GetEventByIdWithSongsDocument, options);
        }
export type GetEventByIdWithSongsQueryHookResult = ReturnType<typeof useGetEventByIdWithSongsQuery>;
export type GetEventByIdWithSongsLazyQueryHookResult = ReturnType<typeof useGetEventByIdWithSongsLazyQuery>;
export type GetEventByIdWithSongsSuspenseQueryHookResult = ReturnType<typeof useGetEventByIdWithSongsSuspenseQuery>;
export type GetEventByIdWithSongsQueryResult = Apollo.QueryResult<GetEventByIdWithSongsQuery, GetEventByIdWithSongsQueryVariables>;
export const OnSongAddedDocument = gql`
    subscription onSongAdded($eventId: String!) {
  songAdded(eventId: $eventId) {
    id
    artist
    createdAt
    duration
    image
    isPlayed
    isRejected
    name
    suggestedById
    suggestedByName
    updatedAt
  }
}
    `;

/**
 * __useOnSongAddedSubscription__
 *
 * To run a query within a React component, call `useOnSongAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnSongAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnSongAddedSubscription({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useOnSongAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnSongAddedSubscription, OnSongAddedSubscriptionVariables> & ({ variables: OnSongAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnSongAddedSubscription, OnSongAddedSubscriptionVariables>(OnSongAddedDocument, options);
      }
export type OnSongAddedSubscriptionHookResult = ReturnType<typeof useOnSongAddedSubscription>;
export type OnSongAddedSubscriptionResult = Apollo.SubscriptionResult<OnSongAddedSubscription>;
export const SetPlayedSongDocument = gql`
    mutation setPlayedSong($id: String!) {
  setPlayedSong(id: $id) {
    id
    artist
    createdAt
    duration
    image
    isPlayed
    isRejected
    name
    suggestedById
    suggestedByName
    updatedAt
  }
}
    `;
export type SetPlayedSongMutationFn = Apollo.MutationFunction<SetPlayedSongMutation, SetPlayedSongMutationVariables>;

/**
 * __useSetPlayedSongMutation__
 *
 * To run a mutation, you first call `useSetPlayedSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPlayedSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPlayedSongMutation, { data, loading, error }] = useSetPlayedSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetPlayedSongMutation(baseOptions?: Apollo.MutationHookOptions<SetPlayedSongMutation, SetPlayedSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPlayedSongMutation, SetPlayedSongMutationVariables>(SetPlayedSongDocument, options);
      }
export type SetPlayedSongMutationHookResult = ReturnType<typeof useSetPlayedSongMutation>;
export type SetPlayedSongMutationResult = Apollo.MutationResult<SetPlayedSongMutation>;
export type SetPlayedSongMutationOptions = Apollo.BaseMutationOptions<SetPlayedSongMutation, SetPlayedSongMutationVariables>;
export const SetRejectedSongDocument = gql`
    mutation setRejectedSong($id: String!) {
  setRejectedSong(id: $id) {
    id
    artist
    createdAt
    duration
    image
    isPlayed
    isRejected
    name
    suggestedById
    suggestedByName
    updatedAt
  }
}
    `;
export type SetRejectedSongMutationFn = Apollo.MutationFunction<SetRejectedSongMutation, SetRejectedSongMutationVariables>;

/**
 * __useSetRejectedSongMutation__
 *
 * To run a mutation, you first call `useSetRejectedSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRejectedSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRejectedSongMutation, { data, loading, error }] = useSetRejectedSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetRejectedSongMutation(baseOptions?: Apollo.MutationHookOptions<SetRejectedSongMutation, SetRejectedSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetRejectedSongMutation, SetRejectedSongMutationVariables>(SetRejectedSongDocument, options);
      }
export type SetRejectedSongMutationHookResult = ReturnType<typeof useSetRejectedSongMutation>;
export type SetRejectedSongMutationResult = Apollo.MutationResult<SetRejectedSongMutation>;
export type SetRejectedSongMutationOptions = Apollo.BaseMutationOptions<SetRejectedSongMutation, SetRejectedSongMutationVariables>;
export const GetAllEventsDocument = gql`
    query getAllEvents($filter: FilterInput) {
  events(filter: $filter) {
    id
    name
    description
    slug
    logo
    banner
    isOpenedToReceiveSuggestions
    isPeopleSequenceSuggestLimitable
    numberOfPeopleSequenceSuggestLimit
    createdAt
    updatedAt
  }
  getTotalEvents(filter: $filter)
}
    `;

/**
 * __useGetAllEventsQuery__
 *
 * To run a query within a React component, call `useGetAllEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
      }
export function useGetAllEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
        }
export function useGetAllEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllEventsQuery, GetAllEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllEventsQuery, GetAllEventsQueryVariables>(GetAllEventsDocument, options);
        }
export type GetAllEventsQueryHookResult = ReturnType<typeof useGetAllEventsQuery>;
export type GetAllEventsLazyQueryHookResult = ReturnType<typeof useGetAllEventsLazyQuery>;
export type GetAllEventsSuspenseQueryHookResult = ReturnType<typeof useGetAllEventsSuspenseQuery>;
export type GetAllEventsQueryResult = Apollo.QueryResult<GetAllEventsQuery, GetAllEventsQueryVariables>;
export const EventUpdatedDocument = gql`
    subscription eventUpdated($slug: String!) {
  eventUpdated(slug: $slug) {
    id
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useEventUpdatedSubscription__
 *
 * To run a query within a React component, call `useEventUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventUpdatedSubscription({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEventUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<EventUpdatedSubscription, EventUpdatedSubscriptionVariables> & ({ variables: EventUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EventUpdatedSubscription, EventUpdatedSubscriptionVariables>(EventUpdatedDocument, options);
      }
export type EventUpdatedSubscriptionHookResult = ReturnType<typeof useEventUpdatedSubscription>;
export type EventUpdatedSubscriptionResult = Apollo.SubscriptionResult<EventUpdatedSubscription>;
export const CreateEventDocument = gql`
    mutation createEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    createdAt
    updatedAt
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation updateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    id
    createdAt
    updatedAt
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const ToggleEventIsOpenedToReceiveSuggestionsDocument = gql`
    mutation toggleEventIsOpenedToReceiveSuggestions($id: String!) {
  toggleEventIsOpenedToReceiveSuggestions(id: $id) {
    id
    isOpenedToReceiveSuggestions
    createdAt
    updatedAt
  }
}
    `;
export type ToggleEventIsOpenedToReceiveSuggestionsMutationFn = Apollo.MutationFunction<ToggleEventIsOpenedToReceiveSuggestionsMutation, ToggleEventIsOpenedToReceiveSuggestionsMutationVariables>;

/**
 * __useToggleEventIsOpenedToReceiveSuggestionsMutation__
 *
 * To run a mutation, you first call `useToggleEventIsOpenedToReceiveSuggestionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleEventIsOpenedToReceiveSuggestionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleEventIsOpenedToReceiveSuggestionsMutation, { data, loading, error }] = useToggleEventIsOpenedToReceiveSuggestionsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleEventIsOpenedToReceiveSuggestionsMutation(baseOptions?: Apollo.MutationHookOptions<ToggleEventIsOpenedToReceiveSuggestionsMutation, ToggleEventIsOpenedToReceiveSuggestionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleEventIsOpenedToReceiveSuggestionsMutation, ToggleEventIsOpenedToReceiveSuggestionsMutationVariables>(ToggleEventIsOpenedToReceiveSuggestionsDocument, options);
      }
export type ToggleEventIsOpenedToReceiveSuggestionsMutationHookResult = ReturnType<typeof useToggleEventIsOpenedToReceiveSuggestionsMutation>;
export type ToggleEventIsOpenedToReceiveSuggestionsMutationResult = Apollo.MutationResult<ToggleEventIsOpenedToReceiveSuggestionsMutation>;
export type ToggleEventIsOpenedToReceiveSuggestionsMutationOptions = Apollo.BaseMutationOptions<ToggleEventIsOpenedToReceiveSuggestionsMutation, ToggleEventIsOpenedToReceiveSuggestionsMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers($filter: FilterUserInput) {
  users(filter: $filter) {
    id
    name
    email
    role
    activatedAt
    blockedAt
    createdAt
    sessions {
      updatedAt
    }
  }
  getTotalUsers(filter: $filter)
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const BlockUserDocument = gql`
    mutation blockUser($id: String!) {
  blockUser(id: $id) {
    id
    blockedAt
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const ActivateUserDocument = gql`
    mutation activateUser($id: String!) {
  activateUser(id: $id) {
    id
    activatedAt
  }
}
    `;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    id
    role
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const GetEventBySlugDocument = gql`
    query GetEventBySlug($slug: String!) {
  eventBySlug(slug: $slug) {
    id
    slug
    name
    description
    banner
    logo
    isOpenedToReceiveSuggestions
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetEventBySlugQuery__
 *
 * To run a query within a React component, call `useGetEventBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetEventBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetEventBySlugQuery, GetEventBySlugQueryVariables> & ({ variables: GetEventBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventBySlugQuery, GetEventBySlugQueryVariables>(GetEventBySlugDocument, options);
      }
export function useGetEventBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventBySlugQuery, GetEventBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventBySlugQuery, GetEventBySlugQueryVariables>(GetEventBySlugDocument, options);
        }
export function useGetEventBySlugSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventBySlugQuery, GetEventBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventBySlugQuery, GetEventBySlugQueryVariables>(GetEventBySlugDocument, options);
        }
export type GetEventBySlugQueryHookResult = ReturnType<typeof useGetEventBySlugQuery>;
export type GetEventBySlugLazyQueryHookResult = ReturnType<typeof useGetEventBySlugLazyQuery>;
export type GetEventBySlugSuspenseQueryHookResult = ReturnType<typeof useGetEventBySlugSuspenseQuery>;
export type GetEventBySlugQueryResult = Apollo.QueryResult<GetEventBySlugQuery, GetEventBySlugQueryVariables>;
export const GetEventBySlugWithSongsDocument = gql`
    query GetEventBySlugWithSongs($slug: String!) {
  eventBySlug(slug: $slug) {
    id
    slug
    name
    description
    banner
    logo
    isOpenedToReceiveSuggestions
    createdAt
    updatedAt
    songs {
      artist
      createdAt
      duration
      id
      image
      isPlayed
      isRejected
      name
      suggestedById
      suggestedByName
      updatedAt
    }
  }
}
    `;

/**
 * __useGetEventBySlugWithSongsQuery__
 *
 * To run a query within a React component, call `useGetEventBySlugWithSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventBySlugWithSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventBySlugWithSongsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetEventBySlugWithSongsQuery(baseOptions: Apollo.QueryHookOptions<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables> & ({ variables: GetEventBySlugWithSongsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables>(GetEventBySlugWithSongsDocument, options);
      }
export function useGetEventBySlugWithSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables>(GetEventBySlugWithSongsDocument, options);
        }
export function useGetEventBySlugWithSongsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables>(GetEventBySlugWithSongsDocument, options);
        }
export type GetEventBySlugWithSongsQueryHookResult = ReturnType<typeof useGetEventBySlugWithSongsQuery>;
export type GetEventBySlugWithSongsLazyQueryHookResult = ReturnType<typeof useGetEventBySlugWithSongsLazyQuery>;
export type GetEventBySlugWithSongsSuspenseQueryHookResult = ReturnType<typeof useGetEventBySlugWithSongsSuspenseQuery>;
export type GetEventBySlugWithSongsQueryResult = Apollo.QueryResult<GetEventBySlugWithSongsQuery, GetEventBySlugWithSongsQueryVariables>;
export const SearchSpotifySongsDocument = gql`
    mutation SearchSpotifySongs($query: String!) {
  searchSpotify(query: $query) {
    id
    name
    image
    artist
    duration_ms
  }
}
    `;
export type SearchSpotifySongsMutationFn = Apollo.MutationFunction<SearchSpotifySongsMutation, SearchSpotifySongsMutationVariables>;

/**
 * __useSearchSpotifySongsMutation__
 *
 * To run a mutation, you first call `useSearchSpotifySongsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchSpotifySongsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchSpotifySongsMutation, { data, loading, error }] = useSearchSpotifySongsMutation({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchSpotifySongsMutation(baseOptions?: Apollo.MutationHookOptions<SearchSpotifySongsMutation, SearchSpotifySongsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SearchSpotifySongsMutation, SearchSpotifySongsMutationVariables>(SearchSpotifySongsDocument, options);
      }
export type SearchSpotifySongsMutationHookResult = ReturnType<typeof useSearchSpotifySongsMutation>;
export type SearchSpotifySongsMutationResult = Apollo.MutationResult<SearchSpotifySongsMutation>;
export type SearchSpotifySongsMutationOptions = Apollo.BaseMutationOptions<SearchSpotifySongsMutation, SearchSpotifySongsMutationVariables>;
export const OnSongUpdatedDocument = gql`
    subscription onSongUpdated($eventId: String!) {
  songUpdated(eventId: $eventId) {
    id
    artist
    createdAt
    duration
    image
    isPlayed
    isRejected
    name
    suggestedById
    suggestedByName
    updatedAt
  }
}
    `;

/**
 * __useOnSongUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnSongUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnSongUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnSongUpdatedSubscription({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useOnSongUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnSongUpdatedSubscription, OnSongUpdatedSubscriptionVariables> & ({ variables: OnSongUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnSongUpdatedSubscription, OnSongUpdatedSubscriptionVariables>(OnSongUpdatedDocument, options);
      }
export type OnSongUpdatedSubscriptionHookResult = ReturnType<typeof useOnSongUpdatedSubscription>;
export type OnSongUpdatedSubscriptionResult = Apollo.SubscriptionResult<OnSongUpdatedSubscription>;
export const CreateSongDocument = gql`
    mutation CreateSong($input: CreateSongInput!) {
  createSong(input: $input) {
    id
    artist
    createdAt
    duration
    image
    isPlayed
    isRejected
    name
    suggestedById
    suggestedByName
    updatedAt
  }
}
    `;
export type CreateSongMutationFn = Apollo.MutationFunction<CreateSongMutation, CreateSongMutationVariables>;

/**
 * __useCreateSongMutation__
 *
 * To run a mutation, you first call `useCreateSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSongMutation, { data, loading, error }] = useCreateSongMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSongMutation(baseOptions?: Apollo.MutationHookOptions<CreateSongMutation, CreateSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSongMutation, CreateSongMutationVariables>(CreateSongDocument, options);
      }
export type CreateSongMutationHookResult = ReturnType<typeof useCreateSongMutation>;
export type CreateSongMutationResult = Apollo.MutationResult<CreateSongMutation>;
export type CreateSongMutationOptions = Apollo.BaseMutationOptions<CreateSongMutation, CreateSongMutationVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  profile {
    activatedAt
    avatarUrl
    blockedAt
    createdAt
    email
    id
    name
    passwordUpdatedAt
    updatedAt
    role
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export function useGetMyProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileSuspenseQueryHookResult = ReturnType<typeof useGetMyProfileSuspenseQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;