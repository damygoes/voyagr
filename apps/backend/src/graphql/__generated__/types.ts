import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { GraphQLContext } from "@/graphql/context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"]["output"];
  user: SafeUser;
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  token: Scalars["String"]["output"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  login: AuthPayload;
  register: AuthPayload;
  upsertOAuthUser: AuthPayload;
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type MutationUpsertOAuthUserArgs = {
  email: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"]["output"];
};

export type SafeUser = {
  __typename?: "SafeUser";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  permissions: Scalars["JSON"]["output"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  permissions: Scalars["JSON"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  JSON: ResolverTypeWrapper<Scalars["JSON"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SafeUser: ResolverTypeWrapper<SafeUser>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  AuthResponse: AuthResponse;
  Boolean: Scalars["Boolean"]["output"];
  ID: Scalars["ID"]["output"];
  JSON: Scalars["JSON"]["output"];
  Mutation: {};
  Query: {};
  SafeUser: SafeUser;
  String: Scalars["String"]["output"];
  User: User;
};

export type AuthPayloadResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"],
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["SafeUser"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["AuthResponse"] = ResolversParentTypes["AuthResponse"],
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  login?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  register?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "email" | "password">
  >;
  upsertOAuthUser?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationUpsertOAuthUserArgs, "email">
  >;
};

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  hello?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type SafeUserResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["SafeUser"] = ResolversParentTypes["SafeUser"],
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  permissions?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  permissions?: Resolver<ResolversTypes["JSON"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SafeUser?: SafeUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
