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

export type Closing = {
  __typename?: 'Closing';
  createdAt: Scalars['DateTime']['output'];
  error: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  sales: Array<Sale>;
  status: Scalars['String']['output'];
  totalDebits?: Maybe<Scalars['Float']['output']>;
  totalSales: Scalars['Float']['output'];
  totalSent?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


export type ClosingSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type ClosingTotalSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};

export type CreateAuthInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type CreatePaymentInput = {
  /** The payment integration id */
  paymentIntegrationId: Scalars['String']['input'];
  /** The sale id */
  saleId: Scalars['String']['input'];
  /** The value of the payment */
  value: Scalars['Float']['input'];
};

export type CreatePaymentIntegrationInput = {
  /** The name of the payment integration */
  name: Scalars['String']['input'];
  /** The payment methods of the payment integration */
  paymentMethods: Array<Scalars['String']['input']>;
  /** The token of the payment integration */
  token: Scalars['String']['input'];
  /** The type of the payment integration */
  type: UpdatePaymentIntegrationInput_TypeEnum_0;
};

export type CreateUserInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The name of the user */
  name: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type CreateWhatsappDebtorMessageInput = {
  /** The message of the whatsapp debtor message */
  message: Scalars['String']['input'];
  /** The message type of the whatsapp debtor message */
  messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0;
  /** The type of the whatsapp debtor message */
  type: UpdateWhatsappDebtorMessageInput_TypeEnum_0;
};

export type CreateWhatsappEndMessageInput = {
  /** The message of the whatsapp end message */
  message: Scalars['String']['input'];
};

export type Debtor = {
  __typename?: 'Debtor';
  createdAt: Scalars['DateTime']['output'];
  daysToCheck: Scalars['Float']['output'];
  error: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  sales: Array<DebtorSale>;
  status: Scalars['String']['output'];
  totalDebits?: Maybe<Scalars['Float']['output']>;
  totalDebtorValue: Scalars['Float']['output'];
  totalSales: Scalars['Float']['output'];
  totalSent?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


export type DebtorSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type DebtorTotalSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};

export type DebtorSale = {
  __typename?: 'DebtorSale';
  clientName: Scalars['String']['output'];
  clientPhone: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  debtor: Debtor;
  error: Array<Scalars['String']['output']>;
  externalId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalReceived: Scalars['Float']['output'];
  totalValue: Scalars['Float']['output'];
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

export type FiltersPaymentInput = {
  /** Filter */
  filter?: Scalars['String']['input'];
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** Status */
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: User;
  blockUser: User;
  createClosing: Closing;
  createDebtor: Debtor;
  createPayment: Payment;
  createPaymentIntegration: PaymentIntegration;
  createSession: AuthType;
  createUser: User;
  createWhatsappDebtorMessage: WhatsappDebtorMessage;
  createWhatsappEndMessage: WhatsappEndMessage;
  deleteDebtorSale: Scalars['Boolean']['output'];
  downloadSaleData: Closing;
  processDebtor: Debtor;
  reRunClosing: Closing;
  reRunClosingWithError: Closing;
  reRunDebtor: Debtor;
  refreshSession: AuthType;
  reprocess: Sale;
  resetPassword: Scalars['Boolean']['output'];
  sendForgotPasswordEmail: Scalars['Boolean']['output'];
  updateAvatar: User;
  updatePaymentIntegration: PaymentIntegration;
  updatePaymentReleasedDate: Payment;
  updatePaymentStatus: Payment;
  updateProfile: User;
  updateRole: User;
  updateWhatsappDebtorMessage: WhatsappDebtorMessage;
  updateWhatsappEndMessage: WhatsappEndMessage;
};


export type MutationActivateUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationBlockUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateClosingArgs = {
  phone?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationCreateDebtorArgs = {
  daysToCheck?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreatePaymentIntegrationArgs = {
  input: CreatePaymentIntegrationInput;
};


export type MutationCreateSessionArgs = {
  data: CreateAuthInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWhatsappDebtorMessageArgs = {
  input: CreateWhatsappDebtorMessageInput;
};


export type MutationCreateWhatsappEndMessageArgs = {
  input: CreateWhatsappEndMessageInput;
};


export type MutationDeleteDebtorSaleArgs = {
  id: Scalars['String']['input'];
};


export type MutationDownloadSaleDataArgs = {
  externalId: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationProcessDebtorArgs = {
  id: Scalars['String']['input'];
};


export type MutationReRunClosingArgs = {
  id: Scalars['String']['input'];
};


export type MutationReRunClosingWithErrorArgs = {
  id: Scalars['String']['input'];
};


export type MutationReRunDebtorArgs = {
  id: Scalars['String']['input'];
};


export type MutationRefreshSessionArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationReprocessArgs = {
  id: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAvatarArgs = {
  avatar: Scalars['String']['input'];
};


export type MutationUpdatePaymentIntegrationArgs = {
  input: UpdatePaymentIntegrationInput;
};


export type MutationUpdatePaymentReleasedDateArgs = {
  paymentId: Scalars['String']['input'];
};


export type MutationUpdatePaymentStatusArgs = {
  input: UpdatePaymentStatusInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateWhatsappDebtorMessageArgs = {
  input: UpdateWhatsappDebtorMessageInput;
};


export type MutationUpdateWhatsappEndMessageArgs = {
  input: UpdateWhatsappEndMessageInput;
};

export type Payment = {
  __typename?: 'Payment';
  createdAt: Scalars['DateTime']['output'];
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  paymentIntegration: PaymentIntegration;
  releasedAt?: Maybe<Scalars['DateTime']['output']>;
  releasedBy?: Maybe<User>;
  requests: Array<PaymentRequest>;
  sale: Sale;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  webhooks: Array<PaymentWebhook>;
};

export type PaymentIntegration = {
  __typename?: 'PaymentIntegration';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paymentMethods: Array<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PaymentRequest = {
  __typename?: 'PaymentRequest';
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['String']['output'];
  id: Scalars['String']['output'];
  merchantOrderId?: Maybe<Scalars['String']['output']>;
  payment: Payment;
};

export type PaymentWebhook = {
  __typename?: 'PaymentWebhook';
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['String']['output'];
  id: Scalars['String']['output'];
  payment: Payment;
  paymentIntegration: PaymentIntegration;
};

export type Query = {
  __typename?: 'Query';
  closing: Closing;
  closings: Array<Closing>;
  debtor: Debtor;
  debtorSale: DebtorSale;
  debtorSales: Array<DebtorSale>;
  debtors: Array<Debtor>;
  getTotalClosings: Scalars['Float']['output'];
  getTotalDebtorSales: Scalars['Float']['output'];
  getTotalDebtors: Scalars['Float']['output'];
  getTotalPaymentIntegrations: Scalars['Float']['output'];
  getTotalPaymentRequests: Scalars['Float']['output'];
  getTotalPaymentWebhooks: Scalars['Float']['output'];
  getTotalPayments: Scalars['Float']['output'];
  getTotalSales: Scalars['Float']['output'];
  getTotalUsers: Scalars['Float']['output'];
  getTotalWhatsappDebtorMessages: Scalars['Float']['output'];
  getTotalWhatsappEndMessages: Scalars['Float']['output'];
  payment: Payment;
  paymentIntegration: PaymentIntegration;
  paymentIntegrations: Array<PaymentIntegration>;
  paymentRequest: PaymentRequest;
  paymentRequests: Array<PaymentRequest>;
  paymentWebhook: PaymentWebhook;
  paymentWebhooks: Array<PaymentWebhook>;
  payments: Array<Payment>;
  profile: User;
  sale: Sale;
  saleByShortId: Sale;
  sales: Array<Sale>;
  session: Session;
  user: User;
  users: Array<User>;
  whatsappDebtorMessage: WhatsappDebtorMessage;
  whatsappDebtorMessages: Array<WhatsappDebtorMessage>;
  whatsappEndMessage: WhatsappEndMessage;
  whatsappEndMessages: Array<WhatsappEndMessage>;
};


export type QueryClosingArgs = {
  id: Scalars['String']['input'];
};


export type QueryClosingsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryDebtorArgs = {
  id: Scalars['String']['input'];
};


export type QueryDebtorSaleArgs = {
  id: Scalars['String']['input'];
};


export type QueryDebtorSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryDebtorsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalClosingsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalDebtorSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalDebtorsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalPaymentIntegrationsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalPaymentRequestsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalPaymentWebhooksArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalPaymentsArgs = {
  filter?: InputMaybe<FiltersPaymentInput>;
};


export type QueryGetTotalSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QueryPaymentArgs = {
  arg_0: Scalars['String']['input'];
};


export type QueryPaymentIntegrationArgs = {
  arg_0: Scalars['String']['input'];
};


export type QueryPaymentIntegrationsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryPaymentRequestArgs = {
  arg_0: Scalars['String']['input'];
};


export type QueryPaymentRequestsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryPaymentWebhookArgs = {
  arg_0: Scalars['String']['input'];
};


export type QueryPaymentWebhooksArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryPaymentsArgs = {
  filter?: InputMaybe<FiltersPaymentInput>;
};


export type QuerySaleArgs = {
  id: Scalars['String']['input'];
};


export type QuerySaleByShortIdArgs = {
  shortId: Scalars['String']['input'];
};


export type QuerySalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QueryWhatsappDebtorMessageArgs = {
  arg_0: Scalars['String']['input'];
};


export type QueryWhatsappEndMessageArgs = {
  arg_0: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};

export type Sale = {
  __typename?: 'Sale';
  clientName: Scalars['String']['output'];
  clientPhone: Scalars['String']['output'];
  closing: Closing;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  error: Array<Scalars['String']['output']>;
  externalId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  payments: Array<Payment>;
  shortId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalProducts: Scalars['Float']['output'];
  totalReceived: Scalars['Float']['output'];
  totalValue: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  closingUpdated: Closing;
  debtorSaleUpdated: DebtorSale;
  debtorUpdated: Debtor;
  saleUpdated: Sale;
};


export type SubscriptionDebtorSaleUpdatedArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type SubscriptionSaleUpdatedArgs = {
  ids: Array<Scalars['String']['input']>;
};

export type UpdatePaymentIntegrationInput = {
  /** The id of the organization */
  id: Scalars['String']['input'];
  /** The name of the payment integration */
  name: Scalars['String']['input'];
  /** The payment methods of the payment integration */
  paymentMethods: Array<Scalars['String']['input']>;
  /** The token of the payment integration */
  token: Scalars['String']['input'];
  /** The type of the payment integration */
  type: UpdatePaymentIntegrationInput_TypeEnum_0;
};

/** The type of the payment integration */
export enum UpdatePaymentIntegrationInput_TypeEnum_0 {
  MercadoPago = 'MERCADO_PAGO',
  Sicredi = 'SICREDI'
}

export type UpdatePaymentStatusInput = {
  /** The payment external id */
  externalId?: InputMaybe<Scalars['String']['input']>;
  /** The payment method */
  method?: InputMaybe<Scalars['String']['input']>;
  /** The payment id */
  paymentId: Scalars['String']['input'];
  /** The payment response */
  response?: InputMaybe<Scalars['String']['input']>;
  /** The payment status */
  status: UpdatePaymentStatusInput_StatusEnum_0;
};

/** The payment status */
export enum UpdatePaymentStatusInput_StatusEnum_0 {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

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

export type UpdateWhatsappDebtorMessageInput = {
  /** The id of the whatsapp debtor message */
  id: Scalars['String']['input'];
  /** The message of the whatsapp debtor message */
  message: Scalars['String']['input'];
  /** The message type of the whatsapp debtor message */
  messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0;
  /** The type of the whatsapp debtor message */
  type: UpdateWhatsappDebtorMessageInput_TypeEnum_0;
};

/** The message type of the whatsapp debtor message */
export enum UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0 {
  Audio = 'AUDIO',
  Text = 'TEXT'
}

/** The type of the whatsapp debtor message */
export enum UpdateWhatsappDebtorMessageInput_TypeEnum_0 {
  FollowUp_1 = 'FOLLOW_UP_1',
  FollowUp_2 = 'FOLLOW_UP_2',
  FollowUp_3 = 'FOLLOW_UP_3',
  Message = 'MESSAGE'
}

export type UpdateWhatsappEndMessageInput = {
  /** The id of the whatsapp end message */
  id: Scalars['String']['input'];
  /** The message of the whatsapp end message */
  message: Scalars['String']['input'];
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

export type WhatsappDebtorMessage = {
  __typename?: 'WhatsappDebtorMessage';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0;
  type: UpdateWhatsappDebtorMessageInput_TypeEnum_0;
  updatedAt: Scalars['DateTime']['output'];
};

export type WhatsappEndMessage = {
  __typename?: 'WhatsappEndMessage';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
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

export type GetAllSalesFromClosingQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
  closingId: Scalars['String']['input'];
}>;


export type GetAllSalesFromClosingQuery = { __typename?: 'Query', getTotalClosings: number, closing: { __typename?: 'Closing', id: string, totalSales: number, sales: Array<{ __typename?: 'Sale', id: string, externalId: string, code: string, shortId: string, clientName: string, clientPhone: string, status: string, createdAt: Date, updatedAt: Date }> } };

export type SaleUpdatedSubscriptionVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type SaleUpdatedSubscription = { __typename?: 'Subscription', saleUpdated: { __typename?: 'Sale', id: string, externalId: string, shortId: string, clientName: string, clientPhone: string, status: string, createdAt: Date, updatedAt: Date } };

export type ReprocessSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type ReprocessSaleMutation = { __typename?: 'Mutation', reprocess: { __typename?: 'Sale', id: string, externalId: string, clientName: string, clientPhone: string, status: string, createdAt: Date, updatedAt: Date } };

export type GetAllClosingsQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
}>;


export type GetAllClosingsQuery = { __typename?: 'Query', getTotalClosings: number, closings: Array<{ __typename?: 'Closing', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date }> };

export type ClosingUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ClosingUpdatedSubscription = { __typename?: 'Subscription', closingUpdated: { __typename?: 'Closing', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type CreateClosingMutationVariables = Exact<{
  phone?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CreateClosingMutation = { __typename?: 'Mutation', createClosing: { __typename?: 'Closing', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type ReRunClosingMutationVariables = Exact<{
  closingId: Scalars['String']['input'];
}>;


export type ReRunClosingMutation = { __typename?: 'Mutation', reRunClosing: { __typename?: 'Closing', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type ReRunClosingWithErrorMutationVariables = Exact<{
  closingId: Scalars['String']['input'];
}>;


export type ReRunClosingWithErrorMutation = { __typename?: 'Mutation', reRunClosingWithError: { __typename?: 'Closing', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type DownloadSaleDataMutationVariables = Exact<{
  externalId: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
}>;


export type DownloadSaleDataMutation = { __typename?: 'Mutation', downloadSaleData: { __typename?: 'Closing', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type GetAllSalesFromDebtorQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
  debtorId: Scalars['String']['input'];
}>;


export type GetAllSalesFromDebtorQuery = { __typename?: 'Query', getTotalDebtors: number, debtor: { __typename?: 'Debtor', id: string, status: string, totalSales: number, sales: Array<{ __typename?: 'DebtorSale', id: string, externalId: string, clientName: string, clientPhone: string, totalValue: number, totalReceived: number, date: Date, status: string, createdAt: Date, updatedAt: Date }> } };

export type SaleFromDebtorUpdatedSubscriptionVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type SaleFromDebtorUpdatedSubscription = { __typename?: 'Subscription', debtorSaleUpdated: { __typename?: 'DebtorSale', id: string, externalId: string, clientName: string, clientPhone: string, totalValue: number, totalReceived: number, date: Date, status: string, createdAt: Date, updatedAt: Date } };

export type DeleteSaleFromDebtorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSaleFromDebtorMutation = { __typename?: 'Mutation', deleteDebtorSale: boolean };

export type ProcessDebtorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ProcessDebtorMutation = { __typename?: 'Mutation', processDebtor: { __typename?: 'Debtor', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type GetAllDebtorsQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
}>;


export type GetAllDebtorsQuery = { __typename?: 'Query', getTotalDebtors: number, debtors: Array<{ __typename?: 'Debtor', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date }> };

export type DebtorUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DebtorUpdatedSubscription = { __typename?: 'Subscription', debtorUpdated: { __typename?: 'Debtor', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type CreateDebtorMutationVariables = Exact<{
  daysToCheck?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CreateDebtorMutation = { __typename?: 'Mutation', createDebtor: { __typename?: 'Debtor', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type ReRunDebtorMutationVariables = Exact<{
  debtorId: Scalars['String']['input'];
}>;


export type ReRunDebtorMutation = { __typename?: 'Mutation', reRunDebtor: { __typename?: 'Debtor', id: string, status: string, totalDebits?: number | null, totalSent?: number | null, createdAt: Date, updatedAt: Date } };

export type GetAllPaymentIntegrationsQueryVariables = Exact<{
  filter: FilterInput;
}>;


export type GetAllPaymentIntegrationsQuery = { __typename?: 'Query', getTotalPaymentIntegrations: number, paymentIntegrations: Array<{ __typename?: 'PaymentIntegration', id: string, name: string, type: string, token: string, paymentMethods: Array<string>, createdAt: Date, updatedAt: Date }> };

export type CreatePaymentIntegrationMutationVariables = Exact<{
  input: CreatePaymentIntegrationInput;
}>;


export type CreatePaymentIntegrationMutation = { __typename?: 'Mutation', createPaymentIntegration: { __typename?: 'PaymentIntegration', id: string, createdAt: Date } };

export type UpdatePaymentIntegrationMutationVariables = Exact<{
  input: UpdatePaymentIntegrationInput;
}>;


export type UpdatePaymentIntegrationMutation = { __typename?: 'Mutation', updatePaymentIntegration: { __typename?: 'PaymentIntegration', id: string, createdAt: Date } };

export type GetAllPaymentsQueryVariables = Exact<{
  filter: FiltersPaymentInput;
}>;


export type GetAllPaymentsQuery = { __typename?: 'Query', getTotalPayments: number, payments: Array<{ __typename?: 'Payment', id: string, value: number, status: string, method?: string | null, releasedAt?: Date | null, createdAt: Date, updatedAt: Date, externalId?: string | null, sale: { __typename?: 'Sale', externalId: string, clientName: string }, releasedBy?: { __typename?: 'User', id: string, name: string } | null, requests: Array<{ __typename?: 'PaymentRequest', id: string, merchantOrderId?: string | null, data: string, createdAt: Date }>, webhooks: Array<{ __typename?: 'PaymentWebhook', id: string, data: string, createdAt: Date }> }> };

export type UpdatePaymentReleasedDateMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UpdatePaymentReleasedDateMutation = { __typename?: 'Mutation', updatePaymentReleasedDate: { __typename?: 'Payment', id: string, releasedAt?: Date | null } };

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

export type GetWhatsappDebtorMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWhatsappDebtorMessageQuery = { __typename?: 'Query', whatsappDebtorMessages: Array<{ __typename?: 'WhatsappDebtorMessage', id: string, message: string, type: UpdateWhatsappDebtorMessageInput_TypeEnum_0, messageType: UpdateWhatsappDebtorMessageInput_MessageTypeEnum_0 }> };

export type CreateWhatsappDebtorMessageMutationVariables = Exact<{
  input: CreateWhatsappDebtorMessageInput;
}>;


export type CreateWhatsappDebtorMessageMutation = { __typename?: 'Mutation', createWhatsappDebtorMessage: { __typename?: 'WhatsappDebtorMessage', id: string, message: string } };

export type UpdateWhatsappDebtorMessageMutationVariables = Exact<{
  input: UpdateWhatsappDebtorMessageInput;
}>;


export type UpdateWhatsappDebtorMessageMutation = { __typename?: 'Mutation', updateWhatsappDebtorMessage: { __typename?: 'WhatsappDebtorMessage', id: string, message: string } };

export type GetWhatsappEndMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWhatsappEndMessageQuery = { __typename?: 'Query', whatsappEndMessages: Array<{ __typename?: 'WhatsappEndMessage', id: string, message: string }> };

export type CreateWhatsappEndMessageMutationVariables = Exact<{
  input: CreateWhatsappEndMessageInput;
}>;


export type CreateWhatsappEndMessageMutation = { __typename?: 'Mutation', createWhatsappEndMessage: { __typename?: 'WhatsappEndMessage', id: string, message: string } };

export type UpdateWhatsappEndMessageMutationVariables = Exact<{
  input: UpdateWhatsappEndMessageInput;
}>;


export type UpdateWhatsappEndMessageMutation = { __typename?: 'Mutation', updateWhatsappEndMessage: { __typename?: 'WhatsappEndMessage', id: string, message: string } };

export type GetSaleExternalIdWithShortIdQueryVariables = Exact<{
  shortId: Scalars['String']['input'];
}>;


export type GetSaleExternalIdWithShortIdQuery = { __typename?: 'Query', saleByShortId: { __typename?: 'Sale', externalId: string, payments: Array<{ __typename?: 'Payment', id: string, status: string, method?: string | null, link?: string | null, createdAt: Date, value: number }> } };

export type GetSaleWithShortIdQueryVariables = Exact<{
  shortId: Scalars['String']['input'];
}>;


export type GetSaleWithShortIdQuery = { __typename?: 'Query', saleByShortId: { __typename?: 'Sale', id: string, shortId: string, clientName: string, totalReceived: number, totalValue: number, totalProducts: number, externalId: string, createdAt: Date, payments: Array<{ __typename?: 'Payment', id: string, status: string, method?: string | null, link?: string | null, createdAt: Date, value: number }> } };

export type GetAllPaymentIntegrationForSaleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPaymentIntegrationForSaleQuery = { __typename?: 'Query', paymentIntegrations: Array<{ __typename?: 'PaymentIntegration', id: string, type: string, paymentMethods: Array<string> }> };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: string, link?: string | null } };

export type UpdatePaymentStatusMutationVariables = Exact<{
  input: UpdatePaymentStatusInput;
}>;


export type UpdatePaymentStatusMutation = { __typename?: 'Mutation', updatePaymentStatus: { __typename?: 'Payment', id: string, status: string } };

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
export const GetAllSalesFromClosingDocument = gql`
    query getAllSalesFromClosing($filter: FilterInput, $closingId: String!) {
  closing(id: $closingId) {
    id
    sales(filter: $filter) {
      id
      externalId
      code
      shortId
      clientName
      clientPhone
      status
      createdAt
      updatedAt
    }
    totalSales(filter: $filter)
  }
  getTotalClosings(filter: $filter)
}
    `;

/**
 * __useGetAllSalesFromClosingQuery__
 *
 * To run a query within a React component, call `useGetAllSalesFromClosingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSalesFromClosingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSalesFromClosingQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      closingId: // value for 'closingId'
 *   },
 * });
 */
export function useGetAllSalesFromClosingQuery(baseOptions: Apollo.QueryHookOptions<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables> & ({ variables: GetAllSalesFromClosingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables>(GetAllSalesFromClosingDocument, options);
      }
export function useGetAllSalesFromClosingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables>(GetAllSalesFromClosingDocument, options);
        }
export function useGetAllSalesFromClosingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables>(GetAllSalesFromClosingDocument, options);
        }
export type GetAllSalesFromClosingQueryHookResult = ReturnType<typeof useGetAllSalesFromClosingQuery>;
export type GetAllSalesFromClosingLazyQueryHookResult = ReturnType<typeof useGetAllSalesFromClosingLazyQuery>;
export type GetAllSalesFromClosingSuspenseQueryHookResult = ReturnType<typeof useGetAllSalesFromClosingSuspenseQuery>;
export type GetAllSalesFromClosingQueryResult = Apollo.QueryResult<GetAllSalesFromClosingQuery, GetAllSalesFromClosingQueryVariables>;
export const SaleUpdatedDocument = gql`
    subscription saleUpdated($ids: [String!]!) {
  saleUpdated(ids: $ids) {
    id
    externalId
    shortId
    clientName
    clientPhone
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSaleUpdatedSubscription__
 *
 * To run a query within a React component, call `useSaleUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSaleUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaleUpdatedSubscription({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSaleUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SaleUpdatedSubscription, SaleUpdatedSubscriptionVariables> & ({ variables: SaleUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SaleUpdatedSubscription, SaleUpdatedSubscriptionVariables>(SaleUpdatedDocument, options);
      }
export type SaleUpdatedSubscriptionHookResult = ReturnType<typeof useSaleUpdatedSubscription>;
export type SaleUpdatedSubscriptionResult = Apollo.SubscriptionResult<SaleUpdatedSubscription>;
export const ReprocessSaleDocument = gql`
    mutation reprocessSale($saleId: String!) {
  reprocess(id: $saleId) {
    id
    externalId
    clientName
    clientPhone
    status
    createdAt
    updatedAt
  }
}
    `;
export type ReprocessSaleMutationFn = Apollo.MutationFunction<ReprocessSaleMutation, ReprocessSaleMutationVariables>;

/**
 * __useReprocessSaleMutation__
 *
 * To run a mutation, you first call `useReprocessSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReprocessSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reprocessSaleMutation, { data, loading, error }] = useReprocessSaleMutation({
 *   variables: {
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useReprocessSaleMutation(baseOptions?: Apollo.MutationHookOptions<ReprocessSaleMutation, ReprocessSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReprocessSaleMutation, ReprocessSaleMutationVariables>(ReprocessSaleDocument, options);
      }
export type ReprocessSaleMutationHookResult = ReturnType<typeof useReprocessSaleMutation>;
export type ReprocessSaleMutationResult = Apollo.MutationResult<ReprocessSaleMutation>;
export type ReprocessSaleMutationOptions = Apollo.BaseMutationOptions<ReprocessSaleMutation, ReprocessSaleMutationVariables>;
export const GetAllClosingsDocument = gql`
    query getAllClosings($filter: FilterInput) {
  closings(filter: $filter) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
  getTotalClosings(filter: $filter)
}
    `;

/**
 * __useGetAllClosingsQuery__
 *
 * To run a query within a React component, call `useGetAllClosingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClosingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClosingsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllClosingsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClosingsQuery, GetAllClosingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClosingsQuery, GetAllClosingsQueryVariables>(GetAllClosingsDocument, options);
      }
export function useGetAllClosingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClosingsQuery, GetAllClosingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClosingsQuery, GetAllClosingsQueryVariables>(GetAllClosingsDocument, options);
        }
export function useGetAllClosingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllClosingsQuery, GetAllClosingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllClosingsQuery, GetAllClosingsQueryVariables>(GetAllClosingsDocument, options);
        }
export type GetAllClosingsQueryHookResult = ReturnType<typeof useGetAllClosingsQuery>;
export type GetAllClosingsLazyQueryHookResult = ReturnType<typeof useGetAllClosingsLazyQuery>;
export type GetAllClosingsSuspenseQueryHookResult = ReturnType<typeof useGetAllClosingsSuspenseQuery>;
export type GetAllClosingsQueryResult = Apollo.QueryResult<GetAllClosingsQuery, GetAllClosingsQueryVariables>;
export const ClosingUpdatedDocument = gql`
    subscription closingUpdated {
  closingUpdated {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useClosingUpdatedSubscription__
 *
 * To run a query within a React component, call `useClosingUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useClosingUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClosingUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useClosingUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ClosingUpdatedSubscription, ClosingUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ClosingUpdatedSubscription, ClosingUpdatedSubscriptionVariables>(ClosingUpdatedDocument, options);
      }
export type ClosingUpdatedSubscriptionHookResult = ReturnType<typeof useClosingUpdatedSubscription>;
export type ClosingUpdatedSubscriptionResult = Apollo.SubscriptionResult<ClosingUpdatedSubscription>;
export const CreateClosingDocument = gql`
    mutation createClosing($phone: String, $quantity: Float) {
  createClosing(phone: $phone, quantity: $quantity) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type CreateClosingMutationFn = Apollo.MutationFunction<CreateClosingMutation, CreateClosingMutationVariables>;

/**
 * __useCreateClosingMutation__
 *
 * To run a mutation, you first call `useCreateClosingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClosingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClosingMutation, { data, loading, error }] = useCreateClosingMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useCreateClosingMutation(baseOptions?: Apollo.MutationHookOptions<CreateClosingMutation, CreateClosingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClosingMutation, CreateClosingMutationVariables>(CreateClosingDocument, options);
      }
export type CreateClosingMutationHookResult = ReturnType<typeof useCreateClosingMutation>;
export type CreateClosingMutationResult = Apollo.MutationResult<CreateClosingMutation>;
export type CreateClosingMutationOptions = Apollo.BaseMutationOptions<CreateClosingMutation, CreateClosingMutationVariables>;
export const ReRunClosingDocument = gql`
    mutation reRunClosing($closingId: String!) {
  reRunClosing(id: $closingId) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type ReRunClosingMutationFn = Apollo.MutationFunction<ReRunClosingMutation, ReRunClosingMutationVariables>;

/**
 * __useReRunClosingMutation__
 *
 * To run a mutation, you first call `useReRunClosingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReRunClosingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reRunClosingMutation, { data, loading, error }] = useReRunClosingMutation({
 *   variables: {
 *      closingId: // value for 'closingId'
 *   },
 * });
 */
export function useReRunClosingMutation(baseOptions?: Apollo.MutationHookOptions<ReRunClosingMutation, ReRunClosingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReRunClosingMutation, ReRunClosingMutationVariables>(ReRunClosingDocument, options);
      }
export type ReRunClosingMutationHookResult = ReturnType<typeof useReRunClosingMutation>;
export type ReRunClosingMutationResult = Apollo.MutationResult<ReRunClosingMutation>;
export type ReRunClosingMutationOptions = Apollo.BaseMutationOptions<ReRunClosingMutation, ReRunClosingMutationVariables>;
export const ReRunClosingWithErrorDocument = gql`
    mutation reRunClosingWithError($closingId: String!) {
  reRunClosingWithError(id: $closingId) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type ReRunClosingWithErrorMutationFn = Apollo.MutationFunction<ReRunClosingWithErrorMutation, ReRunClosingWithErrorMutationVariables>;

/**
 * __useReRunClosingWithErrorMutation__
 *
 * To run a mutation, you first call `useReRunClosingWithErrorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReRunClosingWithErrorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reRunClosingWithErrorMutation, { data, loading, error }] = useReRunClosingWithErrorMutation({
 *   variables: {
 *      closingId: // value for 'closingId'
 *   },
 * });
 */
export function useReRunClosingWithErrorMutation(baseOptions?: Apollo.MutationHookOptions<ReRunClosingWithErrorMutation, ReRunClosingWithErrorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReRunClosingWithErrorMutation, ReRunClosingWithErrorMutationVariables>(ReRunClosingWithErrorDocument, options);
      }
export type ReRunClosingWithErrorMutationHookResult = ReturnType<typeof useReRunClosingWithErrorMutation>;
export type ReRunClosingWithErrorMutationResult = Apollo.MutationResult<ReRunClosingWithErrorMutation>;
export type ReRunClosingWithErrorMutationOptions = Apollo.BaseMutationOptions<ReRunClosingWithErrorMutation, ReRunClosingWithErrorMutationVariables>;
export const DownloadSaleDataDocument = gql`
    mutation downloadSaleData($externalId: String!, $phone: String) {
  downloadSaleData(externalId: $externalId, phone: $phone) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type DownloadSaleDataMutationFn = Apollo.MutationFunction<DownloadSaleDataMutation, DownloadSaleDataMutationVariables>;

/**
 * __useDownloadSaleDataMutation__
 *
 * To run a mutation, you first call `useDownloadSaleDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDownloadSaleDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [downloadSaleDataMutation, { data, loading, error }] = useDownloadSaleDataMutation({
 *   variables: {
 *      externalId: // value for 'externalId'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useDownloadSaleDataMutation(baseOptions?: Apollo.MutationHookOptions<DownloadSaleDataMutation, DownloadSaleDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DownloadSaleDataMutation, DownloadSaleDataMutationVariables>(DownloadSaleDataDocument, options);
      }
export type DownloadSaleDataMutationHookResult = ReturnType<typeof useDownloadSaleDataMutation>;
export type DownloadSaleDataMutationResult = Apollo.MutationResult<DownloadSaleDataMutation>;
export type DownloadSaleDataMutationOptions = Apollo.BaseMutationOptions<DownloadSaleDataMutation, DownloadSaleDataMutationVariables>;
export const GetAllSalesFromDebtorDocument = gql`
    query getAllSalesFromDebtor($filter: FilterInput, $debtorId: String!) {
  debtor(id: $debtorId) {
    id
    status
    sales(filter: $filter) {
      id
      externalId
      clientName
      clientPhone
      totalValue
      totalReceived
      date
      status
      createdAt
      updatedAt
    }
    totalSales(filter: $filter)
  }
  getTotalDebtors(filter: $filter)
}
    `;

/**
 * __useGetAllSalesFromDebtorQuery__
 *
 * To run a query within a React component, call `useGetAllSalesFromDebtorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSalesFromDebtorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSalesFromDebtorQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      debtorId: // value for 'debtorId'
 *   },
 * });
 */
export function useGetAllSalesFromDebtorQuery(baseOptions: Apollo.QueryHookOptions<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables> & ({ variables: GetAllSalesFromDebtorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables>(GetAllSalesFromDebtorDocument, options);
      }
export function useGetAllSalesFromDebtorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables>(GetAllSalesFromDebtorDocument, options);
        }
export function useGetAllSalesFromDebtorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables>(GetAllSalesFromDebtorDocument, options);
        }
export type GetAllSalesFromDebtorQueryHookResult = ReturnType<typeof useGetAllSalesFromDebtorQuery>;
export type GetAllSalesFromDebtorLazyQueryHookResult = ReturnType<typeof useGetAllSalesFromDebtorLazyQuery>;
export type GetAllSalesFromDebtorSuspenseQueryHookResult = ReturnType<typeof useGetAllSalesFromDebtorSuspenseQuery>;
export type GetAllSalesFromDebtorQueryResult = Apollo.QueryResult<GetAllSalesFromDebtorQuery, GetAllSalesFromDebtorQueryVariables>;
export const SaleFromDebtorUpdatedDocument = gql`
    subscription saleFromDebtorUpdated($ids: [String!]!) {
  debtorSaleUpdated(ids: $ids) {
    id
    externalId
    clientName
    clientPhone
    totalValue
    totalReceived
    date
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSaleFromDebtorUpdatedSubscription__
 *
 * To run a query within a React component, call `useSaleFromDebtorUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSaleFromDebtorUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaleFromDebtorUpdatedSubscription({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useSaleFromDebtorUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<SaleFromDebtorUpdatedSubscription, SaleFromDebtorUpdatedSubscriptionVariables> & ({ variables: SaleFromDebtorUpdatedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SaleFromDebtorUpdatedSubscription, SaleFromDebtorUpdatedSubscriptionVariables>(SaleFromDebtorUpdatedDocument, options);
      }
export type SaleFromDebtorUpdatedSubscriptionHookResult = ReturnType<typeof useSaleFromDebtorUpdatedSubscription>;
export type SaleFromDebtorUpdatedSubscriptionResult = Apollo.SubscriptionResult<SaleFromDebtorUpdatedSubscription>;
export const DeleteSaleFromDebtorDocument = gql`
    mutation deleteSaleFromDebtor($id: String!) {
  deleteDebtorSale(id: $id)
}
    `;
export type DeleteSaleFromDebtorMutationFn = Apollo.MutationFunction<DeleteSaleFromDebtorMutation, DeleteSaleFromDebtorMutationVariables>;

/**
 * __useDeleteSaleFromDebtorMutation__
 *
 * To run a mutation, you first call `useDeleteSaleFromDebtorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSaleFromDebtorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSaleFromDebtorMutation, { data, loading, error }] = useDeleteSaleFromDebtorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSaleFromDebtorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSaleFromDebtorMutation, DeleteSaleFromDebtorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSaleFromDebtorMutation, DeleteSaleFromDebtorMutationVariables>(DeleteSaleFromDebtorDocument, options);
      }
export type DeleteSaleFromDebtorMutationHookResult = ReturnType<typeof useDeleteSaleFromDebtorMutation>;
export type DeleteSaleFromDebtorMutationResult = Apollo.MutationResult<DeleteSaleFromDebtorMutation>;
export type DeleteSaleFromDebtorMutationOptions = Apollo.BaseMutationOptions<DeleteSaleFromDebtorMutation, DeleteSaleFromDebtorMutationVariables>;
export const ProcessDebtorDocument = gql`
    mutation processDebtor($id: String!) {
  processDebtor(id: $id) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type ProcessDebtorMutationFn = Apollo.MutationFunction<ProcessDebtorMutation, ProcessDebtorMutationVariables>;

/**
 * __useProcessDebtorMutation__
 *
 * To run a mutation, you first call `useProcessDebtorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProcessDebtorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [processDebtorMutation, { data, loading, error }] = useProcessDebtorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProcessDebtorMutation(baseOptions?: Apollo.MutationHookOptions<ProcessDebtorMutation, ProcessDebtorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProcessDebtorMutation, ProcessDebtorMutationVariables>(ProcessDebtorDocument, options);
      }
export type ProcessDebtorMutationHookResult = ReturnType<typeof useProcessDebtorMutation>;
export type ProcessDebtorMutationResult = Apollo.MutationResult<ProcessDebtorMutation>;
export type ProcessDebtorMutationOptions = Apollo.BaseMutationOptions<ProcessDebtorMutation, ProcessDebtorMutationVariables>;
export const GetAllDebtorsDocument = gql`
    query getAllDebtors($filter: FilterInput) {
  debtors(filter: $filter) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
  getTotalDebtors(filter: $filter)
}
    `;

/**
 * __useGetAllDebtorsQuery__
 *
 * To run a query within a React component, call `useGetAllDebtorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDebtorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDebtorsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllDebtorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>(GetAllDebtorsDocument, options);
      }
export function useGetAllDebtorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>(GetAllDebtorsDocument, options);
        }
export function useGetAllDebtorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>(GetAllDebtorsDocument, options);
        }
export type GetAllDebtorsQueryHookResult = ReturnType<typeof useGetAllDebtorsQuery>;
export type GetAllDebtorsLazyQueryHookResult = ReturnType<typeof useGetAllDebtorsLazyQuery>;
export type GetAllDebtorsSuspenseQueryHookResult = ReturnType<typeof useGetAllDebtorsSuspenseQuery>;
export type GetAllDebtorsQueryResult = Apollo.QueryResult<GetAllDebtorsQuery, GetAllDebtorsQueryVariables>;
export const DebtorUpdatedDocument = gql`
    subscription debtorUpdated {
  debtorUpdated {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useDebtorUpdatedSubscription__
 *
 * To run a query within a React component, call `useDebtorUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDebtorUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDebtorUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDebtorUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DebtorUpdatedSubscription, DebtorUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<DebtorUpdatedSubscription, DebtorUpdatedSubscriptionVariables>(DebtorUpdatedDocument, options);
      }
export type DebtorUpdatedSubscriptionHookResult = ReturnType<typeof useDebtorUpdatedSubscription>;
export type DebtorUpdatedSubscriptionResult = Apollo.SubscriptionResult<DebtorUpdatedSubscription>;
export const CreateDebtorDocument = gql`
    mutation createDebtor($daysToCheck: Float) {
  createDebtor(daysToCheck: $daysToCheck) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type CreateDebtorMutationFn = Apollo.MutationFunction<CreateDebtorMutation, CreateDebtorMutationVariables>;

/**
 * __useCreateDebtorMutation__
 *
 * To run a mutation, you first call `useCreateDebtorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDebtorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDebtorMutation, { data, loading, error }] = useCreateDebtorMutation({
 *   variables: {
 *      daysToCheck: // value for 'daysToCheck'
 *   },
 * });
 */
export function useCreateDebtorMutation(baseOptions?: Apollo.MutationHookOptions<CreateDebtorMutation, CreateDebtorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDebtorMutation, CreateDebtorMutationVariables>(CreateDebtorDocument, options);
      }
export type CreateDebtorMutationHookResult = ReturnType<typeof useCreateDebtorMutation>;
export type CreateDebtorMutationResult = Apollo.MutationResult<CreateDebtorMutation>;
export type CreateDebtorMutationOptions = Apollo.BaseMutationOptions<CreateDebtorMutation, CreateDebtorMutationVariables>;
export const ReRunDebtorDocument = gql`
    mutation reRunDebtor($debtorId: String!) {
  reRunDebtor(id: $debtorId) {
    id
    status
    totalDebits
    totalSent
    createdAt
    updatedAt
  }
}
    `;
export type ReRunDebtorMutationFn = Apollo.MutationFunction<ReRunDebtorMutation, ReRunDebtorMutationVariables>;

/**
 * __useReRunDebtorMutation__
 *
 * To run a mutation, you first call `useReRunDebtorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReRunDebtorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reRunDebtorMutation, { data, loading, error }] = useReRunDebtorMutation({
 *   variables: {
 *      debtorId: // value for 'debtorId'
 *   },
 * });
 */
export function useReRunDebtorMutation(baseOptions?: Apollo.MutationHookOptions<ReRunDebtorMutation, ReRunDebtorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReRunDebtorMutation, ReRunDebtorMutationVariables>(ReRunDebtorDocument, options);
      }
export type ReRunDebtorMutationHookResult = ReturnType<typeof useReRunDebtorMutation>;
export type ReRunDebtorMutationResult = Apollo.MutationResult<ReRunDebtorMutation>;
export type ReRunDebtorMutationOptions = Apollo.BaseMutationOptions<ReRunDebtorMutation, ReRunDebtorMutationVariables>;
export const GetAllPaymentIntegrationsDocument = gql`
    query GetAllPaymentIntegrations($filter: FilterInput!) {
  paymentIntegrations(filter: $filter) {
    id
    name
    type
    token
    paymentMethods
    createdAt
    updatedAt
  }
  getTotalPaymentIntegrations(filter: $filter)
}
    `;

/**
 * __useGetAllPaymentIntegrationsQuery__
 *
 * To run a query within a React component, call `useGetAllPaymentIntegrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPaymentIntegrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPaymentIntegrationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllPaymentIntegrationsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables> & ({ variables: GetAllPaymentIntegrationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables>(GetAllPaymentIntegrationsDocument, options);
      }
export function useGetAllPaymentIntegrationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables>(GetAllPaymentIntegrationsDocument, options);
        }
export function useGetAllPaymentIntegrationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables>(GetAllPaymentIntegrationsDocument, options);
        }
export type GetAllPaymentIntegrationsQueryHookResult = ReturnType<typeof useGetAllPaymentIntegrationsQuery>;
export type GetAllPaymentIntegrationsLazyQueryHookResult = ReturnType<typeof useGetAllPaymentIntegrationsLazyQuery>;
export type GetAllPaymentIntegrationsSuspenseQueryHookResult = ReturnType<typeof useGetAllPaymentIntegrationsSuspenseQuery>;
export type GetAllPaymentIntegrationsQueryResult = Apollo.QueryResult<GetAllPaymentIntegrationsQuery, GetAllPaymentIntegrationsQueryVariables>;
export const CreatePaymentIntegrationDocument = gql`
    mutation CreatePaymentIntegration($input: CreatePaymentIntegrationInput!) {
  createPaymentIntegration(input: $input) {
    id
    createdAt
  }
}
    `;
export type CreatePaymentIntegrationMutationFn = Apollo.MutationFunction<CreatePaymentIntegrationMutation, CreatePaymentIntegrationMutationVariables>;

/**
 * __useCreatePaymentIntegrationMutation__
 *
 * To run a mutation, you first call `useCreatePaymentIntegrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentIntegrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentIntegrationMutation, { data, loading, error }] = useCreatePaymentIntegrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentIntegrationMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentIntegrationMutation, CreatePaymentIntegrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentIntegrationMutation, CreatePaymentIntegrationMutationVariables>(CreatePaymentIntegrationDocument, options);
      }
export type CreatePaymentIntegrationMutationHookResult = ReturnType<typeof useCreatePaymentIntegrationMutation>;
export type CreatePaymentIntegrationMutationResult = Apollo.MutationResult<CreatePaymentIntegrationMutation>;
export type CreatePaymentIntegrationMutationOptions = Apollo.BaseMutationOptions<CreatePaymentIntegrationMutation, CreatePaymentIntegrationMutationVariables>;
export const UpdatePaymentIntegrationDocument = gql`
    mutation UpdatePaymentIntegration($input: UpdatePaymentIntegrationInput!) {
  updatePaymentIntegration(input: $input) {
    id
    createdAt
  }
}
    `;
export type UpdatePaymentIntegrationMutationFn = Apollo.MutationFunction<UpdatePaymentIntegrationMutation, UpdatePaymentIntegrationMutationVariables>;

/**
 * __useUpdatePaymentIntegrationMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentIntegrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentIntegrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentIntegrationMutation, { data, loading, error }] = useUpdatePaymentIntegrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePaymentIntegrationMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentIntegrationMutation, UpdatePaymentIntegrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentIntegrationMutation, UpdatePaymentIntegrationMutationVariables>(UpdatePaymentIntegrationDocument, options);
      }
export type UpdatePaymentIntegrationMutationHookResult = ReturnType<typeof useUpdatePaymentIntegrationMutation>;
export type UpdatePaymentIntegrationMutationResult = Apollo.MutationResult<UpdatePaymentIntegrationMutation>;
export type UpdatePaymentIntegrationMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentIntegrationMutation, UpdatePaymentIntegrationMutationVariables>;
export const GetAllPaymentsDocument = gql`
    query GetAllPayments($filter: FiltersPaymentInput!) {
  payments(filter: $filter) {
    id
    sale {
      externalId
      clientName
    }
    value
    status
    method
    releasedAt
    releasedBy {
      id
      name
    }
    createdAt
    updatedAt
    externalId
    requests {
      id
      merchantOrderId
      data
      createdAt
    }
    webhooks {
      id
      data
      createdAt
    }
  }
  getTotalPayments(filter: $filter)
}
    `;

/**
 * __useGetAllPaymentsQuery__
 *
 * To run a query within a React component, call `useGetAllPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPaymentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables> & ({ variables: GetAllPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(GetAllPaymentsDocument, options);
      }
export function useGetAllPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(GetAllPaymentsDocument, options);
        }
export function useGetAllPaymentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(GetAllPaymentsDocument, options);
        }
export type GetAllPaymentsQueryHookResult = ReturnType<typeof useGetAllPaymentsQuery>;
export type GetAllPaymentsLazyQueryHookResult = ReturnType<typeof useGetAllPaymentsLazyQuery>;
export type GetAllPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetAllPaymentsSuspenseQuery>;
export type GetAllPaymentsQueryResult = Apollo.QueryResult<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>;
export const UpdatePaymentReleasedDateDocument = gql`
    mutation UpdatePaymentReleasedDate($id: String!) {
  updatePaymentReleasedDate(paymentId: $id) {
    id
    releasedAt
  }
}
    `;
export type UpdatePaymentReleasedDateMutationFn = Apollo.MutationFunction<UpdatePaymentReleasedDateMutation, UpdatePaymentReleasedDateMutationVariables>;

/**
 * __useUpdatePaymentReleasedDateMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentReleasedDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentReleasedDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentReleasedDateMutation, { data, loading, error }] = useUpdatePaymentReleasedDateMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePaymentReleasedDateMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentReleasedDateMutation, UpdatePaymentReleasedDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentReleasedDateMutation, UpdatePaymentReleasedDateMutationVariables>(UpdatePaymentReleasedDateDocument, options);
      }
export type UpdatePaymentReleasedDateMutationHookResult = ReturnType<typeof useUpdatePaymentReleasedDateMutation>;
export type UpdatePaymentReleasedDateMutationResult = Apollo.MutationResult<UpdatePaymentReleasedDateMutation>;
export type UpdatePaymentReleasedDateMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentReleasedDateMutation, UpdatePaymentReleasedDateMutationVariables>;
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
export const GetWhatsappDebtorMessageDocument = gql`
    query GetWhatsappDebtorMessage {
  whatsappDebtorMessages {
    id
    message
    type
    messageType
  }
}
    `;

/**
 * __useGetWhatsappDebtorMessageQuery__
 *
 * To run a query within a React component, call `useGetWhatsappDebtorMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWhatsappDebtorMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWhatsappDebtorMessageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWhatsappDebtorMessageQuery(baseOptions?: Apollo.QueryHookOptions<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>(GetWhatsappDebtorMessageDocument, options);
      }
export function useGetWhatsappDebtorMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>(GetWhatsappDebtorMessageDocument, options);
        }
export function useGetWhatsappDebtorMessageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>(GetWhatsappDebtorMessageDocument, options);
        }
export type GetWhatsappDebtorMessageQueryHookResult = ReturnType<typeof useGetWhatsappDebtorMessageQuery>;
export type GetWhatsappDebtorMessageLazyQueryHookResult = ReturnType<typeof useGetWhatsappDebtorMessageLazyQuery>;
export type GetWhatsappDebtorMessageSuspenseQueryHookResult = ReturnType<typeof useGetWhatsappDebtorMessageSuspenseQuery>;
export type GetWhatsappDebtorMessageQueryResult = Apollo.QueryResult<GetWhatsappDebtorMessageQuery, GetWhatsappDebtorMessageQueryVariables>;
export const CreateWhatsappDebtorMessageDocument = gql`
    mutation CreateWhatsappDebtorMessage($input: CreateWhatsappDebtorMessageInput!) {
  createWhatsappDebtorMessage(input: $input) {
    id
    message
  }
}
    `;
export type CreateWhatsappDebtorMessageMutationFn = Apollo.MutationFunction<CreateWhatsappDebtorMessageMutation, CreateWhatsappDebtorMessageMutationVariables>;

/**
 * __useCreateWhatsappDebtorMessageMutation__
 *
 * To run a mutation, you first call `useCreateWhatsappDebtorMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWhatsappDebtorMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWhatsappDebtorMessageMutation, { data, loading, error }] = useCreateWhatsappDebtorMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWhatsappDebtorMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateWhatsappDebtorMessageMutation, CreateWhatsappDebtorMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWhatsappDebtorMessageMutation, CreateWhatsappDebtorMessageMutationVariables>(CreateWhatsappDebtorMessageDocument, options);
      }
export type CreateWhatsappDebtorMessageMutationHookResult = ReturnType<typeof useCreateWhatsappDebtorMessageMutation>;
export type CreateWhatsappDebtorMessageMutationResult = Apollo.MutationResult<CreateWhatsappDebtorMessageMutation>;
export type CreateWhatsappDebtorMessageMutationOptions = Apollo.BaseMutationOptions<CreateWhatsappDebtorMessageMutation, CreateWhatsappDebtorMessageMutationVariables>;
export const UpdateWhatsappDebtorMessageDocument = gql`
    mutation UpdateWhatsappDebtorMessage($input: UpdateWhatsappDebtorMessageInput!) {
  updateWhatsappDebtorMessage(input: $input) {
    id
    message
  }
}
    `;
export type UpdateWhatsappDebtorMessageMutationFn = Apollo.MutationFunction<UpdateWhatsappDebtorMessageMutation, UpdateWhatsappDebtorMessageMutationVariables>;

/**
 * __useUpdateWhatsappDebtorMessageMutation__
 *
 * To run a mutation, you first call `useUpdateWhatsappDebtorMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWhatsappDebtorMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWhatsappDebtorMessageMutation, { data, loading, error }] = useUpdateWhatsappDebtorMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWhatsappDebtorMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWhatsappDebtorMessageMutation, UpdateWhatsappDebtorMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWhatsappDebtorMessageMutation, UpdateWhatsappDebtorMessageMutationVariables>(UpdateWhatsappDebtorMessageDocument, options);
      }
export type UpdateWhatsappDebtorMessageMutationHookResult = ReturnType<typeof useUpdateWhatsappDebtorMessageMutation>;
export type UpdateWhatsappDebtorMessageMutationResult = Apollo.MutationResult<UpdateWhatsappDebtorMessageMutation>;
export type UpdateWhatsappDebtorMessageMutationOptions = Apollo.BaseMutationOptions<UpdateWhatsappDebtorMessageMutation, UpdateWhatsappDebtorMessageMutationVariables>;
export const GetWhatsappEndMessageDocument = gql`
    query GetWhatsappEndMessage {
  whatsappEndMessages {
    id
    message
  }
}
    `;

/**
 * __useGetWhatsappEndMessageQuery__
 *
 * To run a query within a React component, call `useGetWhatsappEndMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWhatsappEndMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWhatsappEndMessageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWhatsappEndMessageQuery(baseOptions?: Apollo.QueryHookOptions<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>(GetWhatsappEndMessageDocument, options);
      }
export function useGetWhatsappEndMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>(GetWhatsappEndMessageDocument, options);
        }
export function useGetWhatsappEndMessageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>(GetWhatsappEndMessageDocument, options);
        }
export type GetWhatsappEndMessageQueryHookResult = ReturnType<typeof useGetWhatsappEndMessageQuery>;
export type GetWhatsappEndMessageLazyQueryHookResult = ReturnType<typeof useGetWhatsappEndMessageLazyQuery>;
export type GetWhatsappEndMessageSuspenseQueryHookResult = ReturnType<typeof useGetWhatsappEndMessageSuspenseQuery>;
export type GetWhatsappEndMessageQueryResult = Apollo.QueryResult<GetWhatsappEndMessageQuery, GetWhatsappEndMessageQueryVariables>;
export const CreateWhatsappEndMessageDocument = gql`
    mutation CreateWhatsappEndMessage($input: CreateWhatsappEndMessageInput!) {
  createWhatsappEndMessage(input: $input) {
    id
    message
  }
}
    `;
export type CreateWhatsappEndMessageMutationFn = Apollo.MutationFunction<CreateWhatsappEndMessageMutation, CreateWhatsappEndMessageMutationVariables>;

/**
 * __useCreateWhatsappEndMessageMutation__
 *
 * To run a mutation, you first call `useCreateWhatsappEndMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWhatsappEndMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWhatsappEndMessageMutation, { data, loading, error }] = useCreateWhatsappEndMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWhatsappEndMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateWhatsappEndMessageMutation, CreateWhatsappEndMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWhatsappEndMessageMutation, CreateWhatsappEndMessageMutationVariables>(CreateWhatsappEndMessageDocument, options);
      }
export type CreateWhatsappEndMessageMutationHookResult = ReturnType<typeof useCreateWhatsappEndMessageMutation>;
export type CreateWhatsappEndMessageMutationResult = Apollo.MutationResult<CreateWhatsappEndMessageMutation>;
export type CreateWhatsappEndMessageMutationOptions = Apollo.BaseMutationOptions<CreateWhatsappEndMessageMutation, CreateWhatsappEndMessageMutationVariables>;
export const UpdateWhatsappEndMessageDocument = gql`
    mutation UpdateWhatsappEndMessage($input: UpdateWhatsappEndMessageInput!) {
  updateWhatsappEndMessage(input: $input) {
    id
    message
  }
}
    `;
export type UpdateWhatsappEndMessageMutationFn = Apollo.MutationFunction<UpdateWhatsappEndMessageMutation, UpdateWhatsappEndMessageMutationVariables>;

/**
 * __useUpdateWhatsappEndMessageMutation__
 *
 * To run a mutation, you first call `useUpdateWhatsappEndMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWhatsappEndMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWhatsappEndMessageMutation, { data, loading, error }] = useUpdateWhatsappEndMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWhatsappEndMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWhatsappEndMessageMutation, UpdateWhatsappEndMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWhatsappEndMessageMutation, UpdateWhatsappEndMessageMutationVariables>(UpdateWhatsappEndMessageDocument, options);
      }
export type UpdateWhatsappEndMessageMutationHookResult = ReturnType<typeof useUpdateWhatsappEndMessageMutation>;
export type UpdateWhatsappEndMessageMutationResult = Apollo.MutationResult<UpdateWhatsappEndMessageMutation>;
export type UpdateWhatsappEndMessageMutationOptions = Apollo.BaseMutationOptions<UpdateWhatsappEndMessageMutation, UpdateWhatsappEndMessageMutationVariables>;
export const GetSaleExternalIdWithShortIdDocument = gql`
    query getSaleExternalIdWithShortId($shortId: String!) {
  saleByShortId(shortId: $shortId) {
    externalId
    payments {
      id
      status
      method
      link
      createdAt
      value
    }
  }
}
    `;

/**
 * __useGetSaleExternalIdWithShortIdQuery__
 *
 * To run a query within a React component, call `useGetSaleExternalIdWithShortIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleExternalIdWithShortIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleExternalIdWithShortIdQuery({
 *   variables: {
 *      shortId: // value for 'shortId'
 *   },
 * });
 */
export function useGetSaleExternalIdWithShortIdQuery(baseOptions: Apollo.QueryHookOptions<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables> & ({ variables: GetSaleExternalIdWithShortIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables>(GetSaleExternalIdWithShortIdDocument, options);
      }
export function useGetSaleExternalIdWithShortIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables>(GetSaleExternalIdWithShortIdDocument, options);
        }
export function useGetSaleExternalIdWithShortIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables>(GetSaleExternalIdWithShortIdDocument, options);
        }
export type GetSaleExternalIdWithShortIdQueryHookResult = ReturnType<typeof useGetSaleExternalIdWithShortIdQuery>;
export type GetSaleExternalIdWithShortIdLazyQueryHookResult = ReturnType<typeof useGetSaleExternalIdWithShortIdLazyQuery>;
export type GetSaleExternalIdWithShortIdSuspenseQueryHookResult = ReturnType<typeof useGetSaleExternalIdWithShortIdSuspenseQuery>;
export type GetSaleExternalIdWithShortIdQueryResult = Apollo.QueryResult<GetSaleExternalIdWithShortIdQuery, GetSaleExternalIdWithShortIdQueryVariables>;
export const GetSaleWithShortIdDocument = gql`
    query getSaleWithShortId($shortId: String!) {
  saleByShortId(shortId: $shortId) {
    id
    shortId
    clientName
    totalReceived
    totalValue
    totalProducts
    externalId
    createdAt
    payments {
      id
      status
      method
      link
      createdAt
      value
    }
  }
}
    `;

/**
 * __useGetSaleWithShortIdQuery__
 *
 * To run a query within a React component, call `useGetSaleWithShortIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleWithShortIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleWithShortIdQuery({
 *   variables: {
 *      shortId: // value for 'shortId'
 *   },
 * });
 */
export function useGetSaleWithShortIdQuery(baseOptions: Apollo.QueryHookOptions<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables> & ({ variables: GetSaleWithShortIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables>(GetSaleWithShortIdDocument, options);
      }
export function useGetSaleWithShortIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables>(GetSaleWithShortIdDocument, options);
        }
export function useGetSaleWithShortIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables>(GetSaleWithShortIdDocument, options);
        }
export type GetSaleWithShortIdQueryHookResult = ReturnType<typeof useGetSaleWithShortIdQuery>;
export type GetSaleWithShortIdLazyQueryHookResult = ReturnType<typeof useGetSaleWithShortIdLazyQuery>;
export type GetSaleWithShortIdSuspenseQueryHookResult = ReturnType<typeof useGetSaleWithShortIdSuspenseQuery>;
export type GetSaleWithShortIdQueryResult = Apollo.QueryResult<GetSaleWithShortIdQuery, GetSaleWithShortIdQueryVariables>;
export const GetAllPaymentIntegrationForSaleDocument = gql`
    query getAllPaymentIntegrationForSale {
  paymentIntegrations {
    id
    type
    paymentMethods
  }
}
    `;

/**
 * __useGetAllPaymentIntegrationForSaleQuery__
 *
 * To run a query within a React component, call `useGetAllPaymentIntegrationForSaleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPaymentIntegrationForSaleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPaymentIntegrationForSaleQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPaymentIntegrationForSaleQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>(GetAllPaymentIntegrationForSaleDocument, options);
      }
export function useGetAllPaymentIntegrationForSaleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>(GetAllPaymentIntegrationForSaleDocument, options);
        }
export function useGetAllPaymentIntegrationForSaleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>(GetAllPaymentIntegrationForSaleDocument, options);
        }
export type GetAllPaymentIntegrationForSaleQueryHookResult = ReturnType<typeof useGetAllPaymentIntegrationForSaleQuery>;
export type GetAllPaymentIntegrationForSaleLazyQueryHookResult = ReturnType<typeof useGetAllPaymentIntegrationForSaleLazyQuery>;
export type GetAllPaymentIntegrationForSaleSuspenseQueryHookResult = ReturnType<typeof useGetAllPaymentIntegrationForSaleSuspenseQuery>;
export type GetAllPaymentIntegrationForSaleQueryResult = Apollo.QueryResult<GetAllPaymentIntegrationForSaleQuery, GetAllPaymentIntegrationForSaleQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($input: CreatePaymentInput!) {
  createPayment(input: $input) {
    id
    link
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const UpdatePaymentStatusDocument = gql`
    mutation UpdatePaymentStatus($input: UpdatePaymentStatusInput!) {
  updatePaymentStatus(input: $input) {
    id
    status
  }
}
    `;
export type UpdatePaymentStatusMutationFn = Apollo.MutationFunction<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>;

/**
 * __useUpdatePaymentStatusMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentStatusMutation, { data, loading, error }] = useUpdatePaymentStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>(UpdatePaymentStatusDocument, options);
      }
export type UpdatePaymentStatusMutationHookResult = ReturnType<typeof useUpdatePaymentStatusMutation>;
export type UpdatePaymentStatusMutationResult = Apollo.MutationResult<UpdatePaymentStatusMutation>;
export type UpdatePaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>;
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