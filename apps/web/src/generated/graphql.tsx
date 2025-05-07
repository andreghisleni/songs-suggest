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
  songs: Array<Scalars['String']['output']>;
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
  createUser: User;
  refreshSession: AuthType;
  resetPassword: Scalars['Boolean']['output'];
  sendForgotPasswordEmail: Scalars['Boolean']['output'];
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


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRefreshSessionArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
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
  events: Array<Event>;
  getTotalEvents: Scalars['Float']['output'];
  getTotalUsers: Scalars['Float']['output'];
  profile: User;
  session: Session;
  user: User;
  users: Array<User>;
};


export type QueryEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalEventsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
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

export type Subscription = {
  __typename?: 'Subscription';
  eventUpdated: Event;
};


export type SubscriptionEventUpdatedArgs = {
  slug: Scalars['String']['input'];
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