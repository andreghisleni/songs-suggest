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

export type BankAccount = {
  __typename?: 'BankAccount';
  accountNumber: Scalars['String']['output'];
  agency: Scalars['String']['output'];
  bankCode: Scalars['String']['output'];
  bankName: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  organization: Organization;
  pix?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']['output']>;
  addressComplement?: Maybe<Scalars['String']['output']>;
  addressNumber?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cpf?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  credits: Array<Credit>;
  emails?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  incomplete: Scalars['Boolean']['output'];
  linkOpenedAt?: Maybe<Scalars['DateTime']['output']>;
  linkSendedAt?: Maybe<Scalars['DateTime']['output']>;
  logs: Array<ClientLog>;
  name?: Maybe<Scalars['String']['output']>;
  neighborhood?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  numberId: Scalars['String']['output'];
  openedSales?: Maybe<Array<Sale>>;
  organization: Organization;
  origem?: Maybe<ContactOrigem>;
  phones?: Maybe<Array<Scalars['String']['output']>>;
  registeredAt?: Maybe<Scalars['DateTime']['output']>;
  sales: Array<Sale>;
  shipping?: Maybe<Scalars['Float']['output']>;
  shippingMethod?: Maybe<ShippingMethod>;
  state?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ClientStatusEnum>;
  tags: Array<ClientTag>;
  updatedAt: Scalars['DateTime']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type ClientLog = {
  __typename?: 'ClientLog';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  newData: Client;
  oldData?: Maybe<Client>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum ClientStatusEnum {
  LinkOpened = 'LINK_OPENED',
  LinkSended = 'LINK_SENDED',
  Pending = 'PENDING',
  Registered = 'REGISTERED'
}

export type ClientTag = {
  __typename?: 'ClientTag';
  clients: Array<Client>;
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  updatedAt: Scalars['DateTime']['output'];
};

export type CollectiveSale = {
  __typename?: 'CollectiveSale';
  createdAt: Scalars['DateTime']['output'];
  emittedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  itens?: Maybe<Array<CollectiveSaleItem>>;
  organizationId: Scalars['String']['output'];
  origin: SaleOrigem;
  seller: Seller;
  status: CollectiveSaleStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export type CollectiveSaleItem = {
  __typename?: 'CollectiveSaleItem';
  client: Client;
  collectiveSale: CollectiveSale;
  conservationState?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleteMessage?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<User>;
  emittedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Float']['output'];
  saleItem?: Maybe<SaleItem>;
  siteCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum CollectiveSaleStatusEnum {
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Error = 'ERROR',
  Logistic = 'LOGISTIC',
  Open = 'OPEN',
  Processing = 'PROCESSING'
}

export type ContactOrigem = {
  __typename?: 'ContactOrigem';
  clients: Array<Client>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAuthInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type CreateBankAccountInput = {
  /** The account number of the bank account */
  accountNumber: Scalars['String']['input'];
  /** The agency of the bank account */
  agency: Scalars['String']['input'];
  /** The code of the bank */
  bankCode: Scalars['String']['input'];
  /** The name of the bank */
  bankName: Scalars['String']['input'];
  /** The pix key of the bank account */
  pix?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClientInput = {
  /** The address of the client. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** The address complement of the client. */
  addressComplement?: InputMaybe<Scalars['String']['input']>;
  /** The address number of the client. */
  addressNumber?: InputMaybe<Scalars['String']['input']>;
  /** The address city of the client. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The cpf of the client. */
  cpf?: InputMaybe<Scalars['String']['input']>;
  /** The emails of the client. */
  emails: Array<Scalars['String']['input']>;
  /** The incomplete of the client. */
  incomplete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the client. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The address neighborhood of the client. */
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  /** The note of the client. */
  note?: InputMaybe<Scalars['String']['input']>;
  /** The number id of the client. */
  numberId?: InputMaybe<Scalars['String']['input']>;
  /** The origem id of the client. */
  origemId?: InputMaybe<Scalars['String']['input']>;
  /** The phones of the client. */
  phones: Array<Scalars['String']['input']>;
  /** The shipping of the client. */
  shipping?: InputMaybe<Scalars['Float']['input']>;
  /** The shipping method id of the client. */
  shippingMethodId?: InputMaybe<Scalars['String']['input']>;
  /** The address state of the client. */
  state?: InputMaybe<Scalars['String']['input']>;
  /** The tag ids of the client. */
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The address zip code of the client. */
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClientTagInput = {
  /** The color of the tag. */
  color: Scalars['String']['input'];
  /** The description of the tag. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the tag. */
  name: Scalars['String']['input'];
};

export type CreateCollectiveSaleInput = {
  /** The emitted at of the collective sale. */
  emittedAt: Scalars['DateTime']['input'];
  /** The origin id of the collective sale. */
  originId: Scalars['String']['input'];
  /** The seller id of the collective sale. */
  sellerId: Scalars['String']['input'];
};

export type CreateCollectiveSaleItemInput = {
  /** The client id */
  clientId: Scalars['String']['input'];
  /** The sale id */
  collectiveSaleId: Scalars['String']['input'];
  /** The conservation state */
  conservationState: Scalars['String']['input'];
  /** The emitted at */
  emittedAt: Scalars['DateTime']['input'];
  /** The price */
  price: Scalars['Float']['input'];
  /** The product id */
  productId: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
  /** The site code */
  siteCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateContactOrigemInput = {
  /** The description of the contact origem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the contact origem */
  name: Scalars['String']['input'];
};

export type CreateCreditInput = {
  /** The client id */
  clientId: Scalars['String']['input'];
  /** The notes */
  notes?: InputMaybe<Scalars['String']['input']>;
  /** The sale id */
  saleId?: InputMaybe<Scalars['String']['input']>;
  /** The value */
  value: Scalars['Float']['input'];
};

export type CreateIndividualSaleInput = {
  /** The client id of the individual sale. */
  clientId: Scalars['String']['input'];
  /** The emitted at of the individual sale. */
  emittedAt: Scalars['DateTime']['input'];
  /** The origin id of the individual sale. */
  originId: Scalars['String']['input'];
};

export type CreateIndividualSaleItemInput = {
  /** The conservation state */
  conservationState: Scalars['String']['input'];
  /** The sale id */
  individualSaleId: Scalars['String']['input'];
  /** The price */
  price: Scalars['Float']['input'];
  /** The product id */
  productId: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
  /** The site code */
  siteCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInventoryItemInput = {
  /** The inventory location id */
  inventoryLocationId: Scalars['String']['input'];
  /** The product id */
  productId: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
};

export type CreateInventoryLocationInput = {
  /** The description of the inventory location. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the inventory location. */
  name: Scalars['String']['input'];
  /** The type of the inventory location. */
  type: CreateInventoryLocationInput_TypeEnum_0;
};

/** The type of the inventory location. */
export enum CreateInventoryLocationInput_TypeEnum_0 {
  Client = 'CLIENT',
  Store = 'STORE'
}

export type CreateInviteInput = {
  /** The email of the invite */
  email: Scalars['String']['input'];
  /** The role of the invite */
  role: UpdateMemberRoleInput_RoleEnum_0;
};

export type CreateOrganizationInput = {
  /** The domain of the organization */
  domain?: InputMaybe<Scalars['String']['input']>;
  /** The name of the organization */
  name: Scalars['String']['input'];
  /** The owner of the organization */
  ownerId: Scalars['String']['input'];
  /** Whether to attach users by domain */
  shouldAttachUsersByDomain: Scalars['Boolean']['input'];
  /** The slug of the organization */
  slug: Scalars['String']['input'];
};

export type CreatePaymentMethodInput = {
  /** The description of the payment method */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the payment method */
  name: Scalars['String']['input'];
};

export type CreateProductInput = {
  /** Code of the product */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Cost price of the product */
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Description of the product */
  description?: InputMaybe<Scalars['String']['input']>;
  inventory: CreateProductInput_Inventory;
  /** Name of the product */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Parent product id */
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** Price of the product */
  price: Array<Scalars['Float']['input']>;
  /** Site id */
  siteId?: InputMaybe<Scalars['String']['input']>;
  variations: Array<CreateProductInput_Variations>;
};

export type CreateProductInput_Inventory = {
  /** Quantity of product on inventory */
  quantity?: Scalars['Float']['input'];
};

export type CreateProductInput_Variations = {
  /** Value of the variation */
  value: Scalars['String']['input'];
  /** Variation type id */
  variationTypeId: Scalars['String']['input'];
  /** Variation value id */
  variationValueId: Scalars['String']['input'];
};

export type CreateSaleDiscountInput = {
  /** The description */
  description: Scalars['String']['input'];
  /** The sale id */
  saleId: Scalars['String']['input'];
  /** The value */
  value: Scalars['Float']['input'];
};

export type CreateSaleInput = {
  /** The client id of the sale. */
  clientId: Scalars['String']['input'];
  /** The discount of the sale. */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** The notes of the sale. */
  notes?: InputMaybe<Scalars['String']['input']>;
  /** The seller id of the sale. */
  sellerId: Scalars['String']['input'];
  /** The shipping of the sale. */
  shipping?: InputMaybe<Scalars['Float']['input']>;
  /** The startedAt of the sale. */
  startedAt: Scalars['DateTime']['input'];
};

export type CreateSaleItemInput = {
  /** The added at */
  addedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** The price */
  price: Scalars['Float']['input'];
  /** The product id */
  productId: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
  /** The sale id */
  saleId: Scalars['String']['input'];
  /** The sale origem id */
  saleOrigemId?: InputMaybe<Scalars['String']['input']>;
  /** The seller id */
  sellerId: Scalars['String']['input'];
};

export type CreateSaleOrigemInput = {
  /** The description of the saleOrigem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the saleOrigem */
  name: Scalars['String']['input'];
};

export type CreateSalePaymentInput = {
  /** The payed at */
  payedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** The payment method id */
  paymentMethodId: Scalars['String']['input'];
  /** The sale id */
  saleId: Scalars['String']['input'];
  /** The value */
  value: Scalars['Float']['input'];
};

export type CreateSellerInput = {
  /** The pix key of the seller. */
  pix: Scalars['String']['input'];
  /** The user id of the seller. */
  userId: Scalars['String']['input'];
};

export type CreateShippingCodeInput = {
  /** The code of the shippingCode */
  code: Scalars['String']['input'];
  /** The saleId of the shipping code */
  saleId: Scalars['String']['input'];
};

export type CreateShippingMethodInput = {
  /** The description of the shippingMethod */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the shippingMethod */
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The invite id of the user */
  inviteId?: InputMaybe<Scalars['String']['input']>;
  /** The name of the user */
  name: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type CreateVariationTypeInput = {
  /** The description of the variation type */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The label of the variation type */
  label: Scalars['String']['input'];
  /** The name of the variation type */
  name: Scalars['String']['input'];
  /** The type of the variation type */
  type: CreateVariationTypeInput_TypeEnum_0;
};

/** The type of the variation type */
export enum CreateVariationTypeInput_TypeEnum_0 {
  Option = 'OPTION',
  String = 'STRING'
}

export type CreateVariationValueInput = {
  /** The description of the variation value */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the variation value */
  name: Scalars['String']['input'];
  /** The id of the variation type */
  variationTypeId: Scalars['String']['input'];
};

export type Credit = {
  __typename?: 'Credit';
  client: Client;
  createdAt: Scalars['DateTime']['output'];
  creditGeneratedFromSale?: Maybe<Sale>;
  creditUsedForSale?: Maybe<Sale>;
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
};

export type FilterClientInput = {
  /** Filter */
  filter?: Scalars['String']['input'];
  /** Incomplete sales. */
  incomplete?: InputMaybe<FilterClientInput_IncompleteEnum_0>;
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** The status of the sale. */
  status?: InputMaybe<FilterClientInput_StatusEnum_0>;
  /** Tags */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Enum values for FilterClientInput.incomplete */
export enum FilterClientInput_IncompleteEnum_0 {
  F = 'F',
  T = 'T'
}

/** Enum values for FilterClientInput.status */
export enum FilterClientInput_StatusEnum_0 {
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Open = 'OPEN',
  Separated = 'SEPARATED'
}

export type FilterInput = {
  /** Filter */
  filter?: Scalars['String']['input'];
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterMemberInput = {
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Filter */
  name?: Scalars['String']['input'];
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterOrganizationInput = {
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Filter */
  name?: Scalars['String']['input'];
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

export type IndividualSale = {
  __typename?: 'IndividualSale';
  client: Client;
  createdAt: Scalars['DateTime']['output'];
  emittedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  itens?: Maybe<Array<IndividualSaleItem>>;
  origin: SaleOrigem;
  sale?: Maybe<Sale>;
  seller: Seller;
  status: IndividualSaleStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export type IndividualSaleItem = {
  __typename?: 'IndividualSaleItem';
  conservationState?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleteMessage?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<User>;
  id: Scalars['String']['output'];
  individualSale: IndividualSale;
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Float']['output'];
  saleItem?: Maybe<SaleItem>;
  siteCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum IndividualSaleStatusEnum {
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Logistic = 'LOGISTIC',
  Open = 'OPEN'
}

export type InventoryFlow = {
  __typename?: 'InventoryFlow';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  inventoryItem: InventoryItem;
  location: InventoryLocation;
  quantity: Scalars['Float']['output'];
  reasons?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  typeTransaction: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  inventoryFlows: Array<InventoryFlow>;
  inventoryLocation: InventoryLocation;
  product: Product;
  quantity: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InventoryLocation = {
  __typename?: 'InventoryLocation';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  inventoryFlows: Array<InventoryFlow>;
  inventoryItems: Array<InventoryItem>;
  name: Scalars['String']['output'];
  organization: Organization;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Invite = {
  __typename?: 'Invite';
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  author?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  organization: Organization;
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  role: Scalars['String']['output'];
};

export type ItemInStock = {
  __typename?: 'ItemInStock';
  productId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  quantityInStock: Scalars['Float']['output'];
};

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  organization: Organization;
  role: Scalars['String']['output'];
  sessions: Array<Session>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: Invite;
  activateUser: User;
  blockUser: User;
  cancelSale: Sale;
  closeCollectiveSale: CollectiveSale;
  closeIndividualSale: IndividualSale;
  closeSale: Sale;
  completeRegister: Client;
  createBankAccount: BankAccount;
  createClient: Client;
  createClientTag: ClientTag;
  createCollectiveSale: CollectiveSale;
  createCollectiveSaleItem: CollectiveSaleItem;
  createContactOrigem: ContactOrigem;
  createCredit: Credit;
  createIndividualSale: IndividualSale;
  createIndividualSaleItem: IndividualSaleItem;
  createInventoryItem: InventoryItem;
  createInventoryLocation: InventoryLocation;
  createInvite: Invite;
  createOrganization: Organization;
  createPaymentMethod: PaymentMethod;
  createProduct: Product;
  createSale: Sale;
  createSaleDiscount: SaleDiscount;
  createSaleItem: SaleItem;
  createSaleOrigem: SaleOrigem;
  createSalePayment: SalePayment;
  createSeller: Seller;
  createSession: AuthType;
  createShippingCode: ShippingCode;
  createShippingMethod: ShippingMethod;
  createUser: User;
  createVariationType: VariationType;
  createVariationValue: VariationValue;
  deleteCollectiveSaleItem: CollectiveSaleItem;
  deleteIndividualSale: IndividualSale;
  deleteIndividualSaleItem: IndividualSaleItem;
  deleteSaleDiscount: SaleDiscount;
  deleteSaleItem: SaleItem;
  deleteSalePayment: SalePayment;
  deleteShippingCode: ShippingCode;
  generateProductImageDeleteUrl: Scalars['String']['output'];
  generateProductImageUploadUrl: Scalars['String']['output'];
  generateShortIds: Scalars['Boolean']['output'];
  importClientsFromMaisMoedas: ReturnImport;
  importCreditsFromMaisMoedas: ReturnImport;
  importProductsFromMaisMoedas: ReturnImport;
  importSalesFromMaisMoedas: ReturnImport;
  linkOpenedClient: Client;
  mergeClients: Client;
  productPicture: Product;
  refreshSession: AuthType;
  registrationCompletedClient: Client;
  rejectInvite: Invite;
  removeCollectiveSaleItem: CollectiveSaleItem;
  removeIndividualSaleItem: IndividualSaleItem;
  resetPassword: Scalars['Boolean']['output'];
  seedVariationTypes: Scalars['Boolean']['output'];
  sendClientWhatsAppCreateLink: Scalars['Boolean']['output'];
  sendCollectiveSaleToLogistic: CollectiveSale;
  sendForgotPasswordEmail: Scalars['Boolean']['output'];
  sendIndividualSaleToLogistic: IndividualSale;
  separateSale: Sale;
  updateAvatar: User;
  updateBankAccount: BankAccount;
  updateClient: Client;
  updateClientTag: ClientTag;
  updateCollectiveSale: CollectiveSale;
  updateCollectiveSaleItem: CollectiveSaleItem;
  updateContactOrigem: ContactOrigem;
  updateIndividualSale: IndividualSale;
  updateIndividualSaleItem: IndividualSaleItem;
  updateInventoryItem: InventoryItem;
  updateInventoryLocation: InventoryLocation;
  updateMemberRole: Member;
  updatePaymentMethod: PaymentMethod;
  updateProduct: Product;
  updateProductPicturesOrder: Product;
  updateProfile: Organization;
  updateRole: User;
  updateSale: Sale;
  updateSaleDiscount: SaleDiscount;
  updateSaleItem: SaleItem;
  updateSaleOrigem: SaleOrigem;
  updateSalePayment: SalePayment;
  updateSeller: Seller;
  updateSession: Session;
  updateShippingCode: ShippingCode;
  updateShippingMethod: ShippingMethod;
  updateVariationType: VariationType;
  updateVariationValue: VariationValue;
};


export type MutationAcceptInviteArgs = {
  id: Scalars['String']['input'];
};


export type MutationActivateUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationBlockUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationCancelSaleArgs = {
  id: Scalars['String']['input'];
};


export type MutationCloseCollectiveSaleArgs = {
  id: Scalars['String']['input'];
};


export type MutationCloseIndividualSaleArgs = {
  id: Scalars['String']['input'];
};


export type MutationCloseSaleArgs = {
  id: Scalars['String']['input'];
};


export type MutationCompleteRegisterArgs = {
  input: UpdateClientFromClientInput;
};


export type MutationCreateBankAccountArgs = {
  input: CreateBankAccountInput;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationCreateClientTagArgs = {
  input: CreateClientTagInput;
};


export type MutationCreateCollectiveSaleArgs = {
  input: CreateCollectiveSaleInput;
};


export type MutationCreateCollectiveSaleItemArgs = {
  input: CreateCollectiveSaleItemInput;
};


export type MutationCreateContactOrigemArgs = {
  input: CreateContactOrigemInput;
};


export type MutationCreateCreditArgs = {
  input: CreateCreditInput;
};


export type MutationCreateIndividualSaleArgs = {
  input: CreateIndividualSaleInput;
};


export type MutationCreateIndividualSaleItemArgs = {
  input: CreateIndividualSaleItemInput;
};


export type MutationCreateInventoryItemArgs = {
  input: CreateInventoryItemInput;
};


export type MutationCreateInventoryLocationArgs = {
  input: CreateInventoryLocationInput;
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateSaleArgs = {
  input: CreateSaleInput;
};


export type MutationCreateSaleDiscountArgs = {
  input: CreateSaleDiscountInput;
};


export type MutationCreateSaleItemArgs = {
  input: CreateSaleItemInput;
};


export type MutationCreateSaleOrigemArgs = {
  input: CreateSaleOrigemInput;
};


export type MutationCreateSalePaymentArgs = {
  input: CreateSalePaymentInput;
};


export type MutationCreateSellerArgs = {
  input: CreateSellerInput;
};


export type MutationCreateSessionArgs = {
  data: CreateAuthInput;
};


export type MutationCreateShippingCodeArgs = {
  input: CreateShippingCodeInput;
};


export type MutationCreateShippingMethodArgs = {
  input: CreateShippingMethodInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateVariationTypeArgs = {
  input: CreateVariationTypeInput;
};


export type MutationCreateVariationValueArgs = {
  input: CreateVariationValueInput;
};


export type MutationDeleteCollectiveSaleItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteIndividualSaleArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteIndividualSaleItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSaleDiscountArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSaleItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSalePaymentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteShippingCodeArgs = {
  id: Scalars['String']['input'];
};


export type MutationGenerateProductImageDeleteUrlArgs = {
  file: Scalars['String']['input'];
};


export type MutationGenerateProductImageUploadUrlArgs = {
  file: Scalars['String']['input'];
};


export type MutationGenerateShortIdsArgs = {
  id: Scalars['String']['input'];
};


export type MutationImportClientsFromMaisMoedasArgs = {
  id: Scalars['String']['input'];
};


export type MutationImportCreditsFromMaisMoedasArgs = {
  id: Scalars['String']['input'];
};


export type MutationImportProductsFromMaisMoedasArgs = {
  id: Scalars['String']['input'];
};


export type MutationImportSalesFromMaisMoedasArgs = {
  id: Scalars['String']['input'];
};


export type MutationLinkOpenedClientArgs = {
  id: Scalars['String']['input'];
};


export type MutationMergeClientsArgs = {
  clientId: Scalars['String']['input'];
  clientToMergeId: Scalars['String']['input'];
};


export type MutationProductPictureArgs = {
  input: ProductPicturesInput;
};


export type MutationRefreshSessionArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegistrationCompletedClientArgs = {
  id: Scalars['String']['input'];
};


export type MutationRejectInviteArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCollectiveSaleItemArgs = {
  id: Scalars['String']['input'];
  message: Scalars['String']['input'];
};


export type MutationRemoveIndividualSaleItemArgs = {
  id: Scalars['String']['input'];
  message: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSeedVariationTypesArgs = {
  input: SeedVariationsInput;
};


export type MutationSendClientWhatsAppCreateLinkArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendCollectiveSaleToLogisticArgs = {
  id: Scalars['String']['input'];
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendIndividualSaleToLogisticArgs = {
  id: Scalars['String']['input'];
};


export type MutationSeparateSaleArgs = {
  input: SeparateSaleInput;
};


export type MutationUpdateAvatarArgs = {
  avatar: Scalars['String']['input'];
};


export type MutationUpdateBankAccountArgs = {
  input: UpdateBankAccountInput;
};


export type MutationUpdateClientArgs = {
  input: UpdateClientInput;
};


export type MutationUpdateClientTagArgs = {
  input: UpdateClientTagInput;
};


export type MutationUpdateCollectiveSaleArgs = {
  input: UpdateCollectiveSaleInput;
};


export type MutationUpdateCollectiveSaleItemArgs = {
  input: UpdateCollectiveSaleItemInput;
};


export type MutationUpdateContactOrigemArgs = {
  input: UpdateContactOrigemInput;
};


export type MutationUpdateIndividualSaleArgs = {
  input: UpdateIndividualSaleInput;
};


export type MutationUpdateIndividualSaleItemArgs = {
  input: UpdateIndividualSaleItemInput;
};


export type MutationUpdateInventoryItemArgs = {
  input: UpdateInventoryItemInput;
};


export type MutationUpdateInventoryLocationArgs = {
  input: UpdateInventoryLocationInput;
};


export type MutationUpdateMemberRoleArgs = {
  input: UpdateMemberRoleInput;
};


export type MutationUpdatePaymentMethodArgs = {
  input: UpdatePaymentMethodInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateProductPicturesOrderArgs = {
  input: UpdateProductPicturesOrderInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateSaleArgs = {
  input: UpdateSaleInput;
};


export type MutationUpdateSaleDiscountArgs = {
  input: UpdateSaleDiscountInput;
};


export type MutationUpdateSaleItemArgs = {
  input: UpdateSaleItemInput;
};


export type MutationUpdateSaleOrigemArgs = {
  input: UpdateSaleOrigemInput;
};


export type MutationUpdateSalePaymentArgs = {
  input: UpdateSalePaymentInput;
};


export type MutationUpdateSellerArgs = {
  input: UpdateSellerInput;
};


export type MutationUpdateSessionArgs = {
  slug: Scalars['String']['input'];
};


export type MutationUpdateShippingCodeArgs = {
  input: UpdateShippingCodeInput;
};


export type MutationUpdateShippingMethodArgs = {
  input: UpdateShippingMethodInput;
};


export type MutationUpdateVariationTypeArgs = {
  input: UpdateVariationTypeInput;
};


export type MutationUpdateVariationValueArgs = {
  input: UpdateVariationValueInput;
};

export type Organization = {
  __typename?: 'Organization';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  domain?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  invites: Array<Invite>;
  members: Array<Member>;
  name: Scalars['String']['output'];
  owner: User;
  shouldAttachUsersByDomain: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  salePayments: Array<SalePayment>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Product = {
  __typename?: 'Product';
  childrens?: Maybe<Array<Product>>;
  code?: Maybe<Scalars['String']['output']>;
  costPrice?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  inventoryItems: Array<InventoryItem>;
  name?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  parent?: Maybe<Product>;
  pictures: Array<Scalars['String']['output']>;
  price: Array<Scalars['Float']['output']>;
  siteId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variations?: Maybe<Array<Variation>>;
};

export type ProductPicturesInput = {
  /** Picture of the product */
  picture: Scalars['String']['input'];
  /** Product Id */
  productId: Scalars['String']['input'];
  type: ProductPicturesInput_TypeEnum_0;
};

/** Enum values for ProductPicturesInput.type */
export enum ProductPicturesInput_TypeEnum_0 {
  Copy = 'copy',
  Delete = 'delete'
}

export type Query = {
  __typename?: 'Query';
  bankAccount: BankAccount;
  bankAccounts: Array<BankAccount>;
  client: Client;
  clientByShortId: Client;
  clientTag: ClientTag;
  clientTags: Array<ClientTag>;
  clients: Array<Client>;
  collectiveSale: CollectiveSale;
  collectiveSaleOrgId: CollectiveSale;
  collectiveSales: Array<CollectiveSale>;
  contactOrigem: ContactOrigem;
  contactsOrigem: Array<ContactOrigem>;
  credits: Array<Credit>;
  getTotalBankAccounts: Scalars['Float']['output'];
  getTotalClientTags: Scalars['Float']['output'];
  getTotalClients: Scalars['Float']['output'];
  getTotalCollectiveSales: Scalars['Float']['output'];
  getTotalContactsOrigem: Scalars['Float']['output'];
  getTotalCredits: Scalars['Float']['output'];
  getTotalIndividualSales: Scalars['Float']['output'];
  getTotalInventoryFlows: Scalars['Float']['output'];
  getTotalInventoryItens: Scalars['Float']['output'];
  getTotalInventoryLocations: Scalars['Float']['output'];
  getTotalInvites: Scalars['Float']['output'];
  getTotalMembers: Scalars['Float']['output'];
  getTotalOrganizations: Scalars['Float']['output'];
  getTotalPaymentMethods: Scalars['Float']['output'];
  getTotalProducts: Scalars['Float']['output'];
  getTotalSaleOrigens: Scalars['Float']['output'];
  getTotalSales: Scalars['Float']['output'];
  getTotalSellers: Scalars['Float']['output'];
  getTotalShippingCodes: Scalars['Float']['output'];
  getTotalShippingMethods: Scalars['Float']['output'];
  getTotalUsers: Scalars['Float']['output'];
  getTotalVariationTypes: Scalars['Float']['output'];
  individualSale: IndividualSale;
  individualSales: Array<IndividualSale>;
  inventoryFlows: Array<InventoryFlow>;
  inventoryItem: InventoryItem;
  inventoryItens: Array<InventoryItem>;
  inventoryLocation: InventoryLocation;
  inventoryLocations: Array<InventoryLocation>;
  invite: Invite;
  invites: Array<Invite>;
  member: Member;
  members: Array<Member>;
  organization: Organization;
  organizationBySlug: Organization;
  organizations: Array<Organization>;
  paymentMethod: PaymentMethod;
  paymentMethods: Array<PaymentMethod>;
  product: Product;
  products: Array<Product>;
  profile: User;
  profileMember?: Maybe<Member>;
  sale: Sale;
  saleByCode: Sale;
  saleItemByShortId: SaleItem;
  saleOrigem: SaleOrigem;
  saleOrigens: Array<SaleOrigem>;
  sales: Array<Sale>;
  seller: Seller;
  sellers: Array<Seller>;
  session: Session;
  shippingCode: ShippingCode;
  shippingCodes: Array<ShippingCode>;
  shippingMethod: ShippingMethod;
  shippingMethods: Array<ShippingMethod>;
  user: User;
  users: Array<User>;
  variationType: VariationType;
  variationTypes: Array<VariationType>;
  verifyCollectiveSaleItensQuantity: Array<ItemInStock>;
};


export type QueryBankAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryBankAccountsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryClientArgs = {
  id: Scalars['String']['input'];
};


export type QueryClientByShortIdArgs = {
  shortId: Scalars['String']['input'];
};


export type QueryClientTagArgs = {
  id: Scalars['String']['input'];
};


export type QueryClientTagsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryClientsArgs = {
  filter?: InputMaybe<FilterClientInput>;
};


export type QueryCollectiveSaleArgs = {
  id: Scalars['String']['input'];
};


export type QueryCollectiveSaleOrgIdArgs = {
  id: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
};


export type QueryCollectiveSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryContactOrigemArgs = {
  id: Scalars['String']['input'];
};


export type QueryContactsOrigemArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryCreditsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalBankAccountsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalClientTagsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalClientsArgs = {
  filter?: InputMaybe<FilterClientInput>;
};


export type QueryGetTotalCollectiveSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalContactsOrigemArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalCreditsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalIndividualSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalInventoryFlowsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalInventoryItensArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalInventoryLocationsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalInvitesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalMembersArgs = {
  filter?: InputMaybe<FilterMemberInput>;
};


export type QueryGetTotalOrganizationsArgs = {
  filter?: InputMaybe<FilterOrganizationInput>;
};


export type QueryGetTotalPaymentMethodsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalProductsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalSaleOrigensArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalSellersArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalShippingCodesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalShippingMethodsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryGetTotalUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QueryGetTotalVariationTypesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryIndividualSaleArgs = {
  id: Scalars['String']['input'];
};


export type QueryIndividualSalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryInventoryFlowsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryInventoryItemArgs = {
  id: Scalars['String']['input'];
};


export type QueryInventoryItensArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryInventoryLocationArgs = {
  id: Scalars['String']['input'];
};


export type QueryInventoryLocationsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryInviteArgs = {
  id: Scalars['String']['input'];
};


export type QueryInvitesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryMemberArgs = {
  id: Scalars['String']['input'];
};


export type QueryMembersArgs = {
  filter?: InputMaybe<FilterMemberInput>;
};


export type QueryOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryOrganizationsArgs = {
  filter?: InputMaybe<FilterOrganizationInput>;
};


export type QueryPaymentMethodArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentMethodsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QuerySaleArgs = {
  id: Scalars['String']['input'];
};


export type QuerySaleByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QuerySaleItemByShortIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySaleOrigemArgs = {
  arg_0: Scalars['String']['input'];
};


export type QuerySaleOrigensArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QuerySalesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QuerySellerArgs = {
  id: Scalars['String']['input'];
};


export type QuerySellersArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryShippingCodeArgs = {
  id: Scalars['String']['input'];
};


export type QueryShippingCodesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryShippingMethodArgs = {
  arg_0: Scalars['String']['input'];
};


export type QueryShippingMethodsArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QueryVariationTypeArgs = {
  id: Scalars['String']['input'];
};


export type QueryVariationTypesArgs = {
  filter?: InputMaybe<FilterInput>;
};


export type QueryVerifyCollectiveSaleItensQuantityArgs = {
  collectiveSaleId: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};

export type ReturnImport = {
  __typename?: 'ReturnImport';
  total: Scalars['Float']['output'];
  totalCreated: Scalars['Float']['output'];
  totalFetched: Scalars['Float']['output'];
};

export type Sale = {
  __typename?: 'Sale';
  client: Client;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  discount?: Maybe<Scalars['Float']['output']>;
  discounts: Array<SaleDiscount>;
  generatedCredits: Array<Credit>;
  id: Scalars['String']['output'];
  logs: Array<SaleLog>;
  notes?: Maybe<Scalars['String']['output']>;
  saleItens?: Maybe<Array<SaleItem>>;
  salePayments?: Maybe<Array<SalePayment>>;
  seller: Seller;
  shipping?: Maybe<Scalars['Float']['output']>;
  shippingCodes?: Maybe<Array<ShippingCode>>;
  startedAt: Scalars['DateTime']['output'];
  status: SaleStatusEnum;
  totalItensCost: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usedCredits: Array<Credit>;
};

export type SaleDiscount = {
  __typename?: 'SaleDiscount';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  sale: Sale;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
};

export type SaleItem = {
  __typename?: 'SaleItem';
  addedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Float']['output'];
  sale: Sale;
  saleOrigem?: Maybe<SaleOrigem>;
  seller: Seller;
  shortId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SaleLog = {
  __typename?: 'SaleLog';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type SaleOrigem = {
  __typename?: 'SaleOrigem';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  saleItens: Array<SaleItem>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SalePayment = {
  __typename?: 'SalePayment';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  payedAt: Scalars['DateTime']['output'];
  paymentMethod: PaymentMethod;
  sale: Sale;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
};

export enum SaleStatusEnum {
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Open = 'OPEN',
  Separated = 'SEPARATED'
}

export type SeedVariationsInput = {
  /** The organization id */
  organizationId: Scalars['String']['input'];
};

export type Seller = {
  __typename?: 'Seller';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organization: Organization;
  pix: Scalars['String']['output'];
  saleItens: Array<SaleItem>;
  sales: Array<Sale>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type SeparateSaleInput = {
  /** The IDs of the items to separate */
  itemIds: Array<Scalars['String']['input']>;
  /** The sale ID to separate */
  saleId: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  member: Member;
  organization: Organization;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ShippingCode = {
  __typename?: 'ShippingCode';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  sale: Sale;
  updatedAt: Scalars['DateTime']['output'];
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  clients: Array<Client>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateBankAccountInput = {
  /** The account number of the bank account */
  accountNumber: Scalars['String']['input'];
  /** The agency of the bank account */
  agency: Scalars['String']['input'];
  /** The code of the bank */
  bankCode: Scalars['String']['input'];
  /** The name of the bank */
  bankName: Scalars['String']['input'];
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The pix key of the bank account */
  pix?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientFromClientInput = {
  /** The address of the client. */
  address: Scalars['String']['input'];
  /** The address complement of the client. */
  addressComplement?: InputMaybe<Scalars['String']['input']>;
  /** The address number of the client. */
  addressNumber: Scalars['String']['input'];
  /** The address city of the client. */
  city: Scalars['String']['input'];
  /** The cpf of the client. */
  cpf: Scalars['String']['input'];
  /** The email of the client. */
  email: Scalars['String']['input'];
  /** Id of the client from client */
  id: Scalars['String']['input'];
  /** The name of the client. */
  name: Scalars['String']['input'];
  /** The address neighborhood of the client. */
  neighborhood: Scalars['String']['input'];
  /** The address state of the client. */
  state: Scalars['String']['input'];
  /** The address zip code of the client. */
  zipCode: Scalars['String']['input'];
};

export type UpdateClientInput = {
  /** The address of the client. */
  address?: InputMaybe<Scalars['String']['input']>;
  /** The address complement of the client. */
  addressComplement?: InputMaybe<Scalars['String']['input']>;
  /** The address number of the client. */
  addressNumber?: InputMaybe<Scalars['String']['input']>;
  /** The address city of the client. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** The cpf of the client. */
  cpf?: InputMaybe<Scalars['String']['input']>;
  /** The emails of the client. */
  emails: Array<Scalars['String']['input']>;
  /** Id of the client */
  id: Scalars['String']['input'];
  /** The incomplete of the client. */
  incomplete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The name of the client. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The address neighborhood of the client. */
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  /** The note of the client. */
  note?: InputMaybe<Scalars['String']['input']>;
  /** The number id of the client. */
  numberId?: InputMaybe<Scalars['String']['input']>;
  /** The origem id of the client. */
  origemId?: InputMaybe<Scalars['String']['input']>;
  /** The phones of the client. */
  phones: Array<Scalars['String']['input']>;
  /** The shipping of the client. */
  shipping?: InputMaybe<Scalars['Float']['input']>;
  /** The shipping method id of the client. */
  shippingMethodId?: InputMaybe<Scalars['String']['input']>;
  /** The address state of the client. */
  state?: InputMaybe<Scalars['String']['input']>;
  /** The tag ids of the client. */
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The address zip code of the client. */
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientTagInput = {
  /** The color of the tag. */
  color: Scalars['String']['input'];
  /** The description of the tag. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Id of the tag */
  id: Scalars['String']['input'];
  /** The name of the tag. */
  name: Scalars['String']['input'];
};

export type UpdateCollectiveSaleInput = {
  /** The emitted at of the collective sale. */
  emittedAt: Scalars['DateTime']['input'];
  /** Id of the collective sale */
  id: Scalars['String']['input'];
  /** The origin id of the collective sale. */
  originId: Scalars['String']['input'];
  /** The seller id of the collective sale. */
  sellerId: Scalars['String']['input'];
};

export type UpdateCollectiveSaleItemInput = {
  /** The client id */
  clientId: Scalars['String']['input'];
  /** The sale id */
  collectiveSaleId: Scalars['String']['input'];
  /** The conservation state */
  conservationState: Scalars['String']['input'];
  /** The emitted at */
  emittedAt: Scalars['DateTime']['input'];
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The price */
  price: Scalars['Float']['input'];
  /** The product id */
  productId: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
  /** The site code */
  siteCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactOrigemInput = {
  /** The description of the contact origem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Id of the contact origem */
  id: Scalars['String']['input'];
  /** The name of the contact origem */
  name: Scalars['String']['input'];
};

export type UpdateIndividualSaleInput = {
  /** The client id of the individual sale. */
  clientId: Scalars['String']['input'];
  /** The emitted at of the individual sale. */
  emittedAt: Scalars['DateTime']['input'];
  /** Id of the individual sale */
  id: Scalars['String']['input'];
  /** The origin id of the individual sale. */
  originId: Scalars['String']['input'];
};

export type UpdateIndividualSaleItemInput = {
  /** The conservation state */
  conservationState: Scalars['String']['input'];
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The sale id */
  individualSaleId: Scalars['String']['input'];
  /** The price */
  price: Scalars['Float']['input'];
  /** The product id */
  productId: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
  /** The site code */
  siteCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInventoryItemInput = {
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The quantity */
  quantity: Scalars['Int']['input'];
  /** The reasons of the inventory flow */
  reasons?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInventoryLocationInput = {
  /** The description of the inventory location. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The name of the inventory location. */
  name: Scalars['String']['input'];
  /** The type of the inventory location. */
  type: UpdateInventoryLocationInput_TypeEnum_0;
};

/** The type of the inventory location. */
export enum UpdateInventoryLocationInput_TypeEnum_0 {
  Client = 'CLIENT',
  Store = 'STORE'
}

export type UpdateMemberRoleInput = {
  memberId: Scalars['String']['input'];
  role: UpdateMemberRoleInput_RoleEnum_0;
};

/** Enum values for UpdateMemberRoleInput.role */
export enum UpdateMemberRoleInput_RoleEnum_0 {
  Admin = 'ADMIN',
  Billing = 'BILLING',
  Logistic = 'LOGISTIC',
  Member = 'MEMBER',
  Seller = 'SELLER'
}

export type UpdateOrganizationInput = {
  /** The id of the organization */
  id: Scalars['String']['input'];
  /** The name of the organization */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaymentMethodInput = {
  /** The description of the payment method */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The name of the payment method */
  name: Scalars['String']['input'];
};

export type UpdateProductInput = {
  /** Code of the product */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Cost price of the product */
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Description of the product */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Id of the product */
  id: Scalars['String']['input'];
  inventory: CreateProductInput_Inventory;
  /** Name of the product */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Parent product id */
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** Price of the product */
  price: Array<Scalars['Float']['input']>;
  /** Site id */
  siteId?: InputMaybe<Scalars['String']['input']>;
  variations: Array<CreateProductInput_Variations>;
};

export type UpdateProductPicturesOrderInput = {
  /** Pictures of the product */
  pictures: Array<Scalars['String']['input']>;
  /** Product Id */
  productId: Scalars['String']['input'];
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

export type UpdateSaleDiscountInput = {
  /** The description */
  description: Scalars['String']['input'];
  /** Id of the discount method */
  id: Scalars['String']['input'];
  /** The sale id */
  saleId: Scalars['String']['input'];
  /** The value */
  value: Scalars['Float']['input'];
};

export type UpdateSaleInput = {
  /** The discount of the sale. */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** Id of the sale */
  id: Scalars['String']['input'];
  /** The notes of the sale. */
  notes?: InputMaybe<Scalars['String']['input']>;
  /** The shipping of the sale. */
  shipping?: InputMaybe<Scalars['Float']['input']>;
  /** The startedAt of the sale. */
  startedAt: Scalars['DateTime']['input'];
};

export type UpdateSaleItemInput = {
  /** The added at */
  addedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The price */
  price: Scalars['Float']['input'];
  /** The sale origem id */
  saleOrigemId?: InputMaybe<Scalars['String']['input']>;
  /** The seller id */
  sellerId: Scalars['String']['input'];
};

export type UpdateSaleOrigemInput = {
  /** The description of the saleOrigem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The saleOrigem id */
  id: Scalars['String']['input'];
  /** The name of the saleOrigem */
  name: Scalars['String']['input'];
};

export type UpdateSalePaymentInput = {
  /** Id of the payment method */
  id: Scalars['String']['input'];
  /** The payed at */
  payedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** The payment method id */
  paymentMethodId: Scalars['String']['input'];
  /** The value */
  value: Scalars['Float']['input'];
};

export type UpdateSellerInput = {
  /** Id of the seller */
  id: Scalars['String']['input'];
  /** The pix key of the seller. */
  pix: Scalars['String']['input'];
  /** The user id of the seller. */
  userId: Scalars['String']['input'];
};

export type UpdateShippingCodeInput = {
  /** The code of the shippingCode */
  code: Scalars['String']['input'];
  /** The shippingCode id */
  id: Scalars['String']['input'];
  /** The saleId of the shipping code */
  saleId: Scalars['String']['input'];
};

export type UpdateShippingMethodInput = {
  /** The description of the shippingMethod */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The shippingMethod id */
  id: Scalars['String']['input'];
  /** The name of the shippingMethod */
  name: Scalars['String']['input'];
};

export type UpdateVariationTypeInput = {
  /** The description of the variation type */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The id of the variation type */
  id: Scalars['String']['input'];
  /** The label of the variation type */
  label: Scalars['String']['input'];
  /** The name of the variation type */
  name: Scalars['String']['input'];
  /** The type of the variation type */
  type: UpdateVariationTypeInput_TypeEnum_0;
};

/** The type of the variation type */
export enum UpdateVariationTypeInput_TypeEnum_0 {
  Option = 'OPTION',
  String = 'STRING'
}

export type UpdateVariationValueInput = {
  /** The description of the variation value */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The id of the variation value */
  id: Scalars['String']['input'];
  /** The name of the variation value */
  name: Scalars['String']['input'];
  /** The id of the variation type */
  variationTypeId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  activatedAt?: Maybe<Scalars['DateTime']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  blockedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  invites: Array<Invite>;
  ips: Scalars['String']['output'];
  memberOn: Array<Member>;
  name: Scalars['String']['output'];
  ownsOrganizations: Array<Organization>;
  passwordUpdatedAt: Scalars['DateTime']['output'];
  role: Scalars['String']['output'];
  sessions: Array<Session>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Variation = {
  __typename?: 'Variation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  product: Product;
  updatedAt: Scalars['DateTime']['output'];
  value?: Maybe<Scalars['String']['output']>;
  variationType: VariationType;
  variationValue?: Maybe<VariationValue>;
};

export type VariationType = {
  __typename?: 'VariationType';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variationValues: Array<VariationValue>;
  variationValuesCount: Scalars['Float']['output'];
};


export type VariationTypeVariationValuesArgs = {
  filter?: InputMaybe<FilterInput>;
};

export type VariationValue = {
  __typename?: 'VariationValue';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variationType: VariationType;
};

export type GetSaleWithExternalIdQueryVariables = Exact<{
  externalId: Scalars['String']['input'];
}>;


export type GetSaleWithExternalIdQuery = { __typename?: 'Query', sale: { __typename?: 'Sale', id: string, code: string, startedAt: Date, shipping?: number | null, status: SaleStatusEnum, client: { __typename?: 'Client', name?: string | null }, saleItens?: Array<{ __typename?: 'SaleItem', id: string, price: number, quantity: number, addedAt: Date, product: { __typename?: 'Product', name?: string | null, code?: string | null, variations?: Array<{ __typename?: 'Variation', id: string, value?: string | null, variationType: { __typename?: 'VariationType', name: string }, variationValue?: { __typename?: 'VariationValue', name: string } | null }> | null } }> | null, salePayments?: Array<{ __typename?: 'SalePayment', id: string, value: number, payedAt: Date, paymentMethod: { __typename?: 'PaymentMethod', name: string } }> | null, discounts: Array<{ __typename?: 'SaleDiscount', id: string, value: number, description: string }>, usedCredits: Array<{ __typename?: 'Credit', value: number }>, generatedCredits: Array<{ __typename?: 'Credit', value: number }> } };


export const GetSaleWithExternalIdDocument = gql`
    query getSaleWithExternalId($externalId: String!) {
  sale(id: $externalId) {
    id
    code
    client {
      name
    }
    startedAt
    saleItens {
      id
      product {
        name
        code
        variations {
          id
          value
          variationType {
            name
          }
          variationValue {
            name
          }
        }
      }
      price
      quantity
      addedAt
    }
    shipping
    salePayments {
      id
      value
      payedAt
      paymentMethod {
        name
      }
    }
    discounts {
      id
      value
      description
    }
    usedCredits {
      value
    }
    generatedCredits {
      value
    }
    status
  }
}
    `;

/**
 * __useGetSaleWithExternalIdQuery__
 *
 * To run a query within a React component, call `useGetSaleWithExternalIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleWithExternalIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleWithExternalIdQuery({
 *   variables: {
 *      externalId: // value for 'externalId'
 *   },
 * });
 */
export function useGetSaleWithExternalIdQuery(baseOptions: Apollo.QueryHookOptions<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables> & ({ variables: GetSaleWithExternalIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables>(GetSaleWithExternalIdDocument, options);
      }
export function useGetSaleWithExternalIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables>(GetSaleWithExternalIdDocument, options);
        }
export function useGetSaleWithExternalIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables>(GetSaleWithExternalIdDocument, options);
        }
export type GetSaleWithExternalIdQueryHookResult = ReturnType<typeof useGetSaleWithExternalIdQuery>;
export type GetSaleWithExternalIdLazyQueryHookResult = ReturnType<typeof useGetSaleWithExternalIdLazyQuery>;
export type GetSaleWithExternalIdSuspenseQueryHookResult = ReturnType<typeof useGetSaleWithExternalIdSuspenseQuery>;
export type GetSaleWithExternalIdQueryResult = Apollo.QueryResult<GetSaleWithExternalIdQuery, GetSaleWithExternalIdQueryVariables>;