import {
  IUserLoginReqV1,
  IGetUserLoginResV1,
  IGetUserDetailResV1,
  IGetUserTipsResV1,
  IGetUsersResV1,
  ICreateUserReqV1,
  IBaseRes,
  IUpdateUserReqV1
} from '../common.d';

export interface ILoginV1Params extends IUserLoginReqV1 {}

export interface ILoginV1Return extends IGetUserLoginResV1 {}

export interface IGetCurrentUserV1Return extends IGetUserDetailResV1 {}

export interface IGetUserTipListV1Return extends IGetUserTipsResV1 {}

export interface IGetUserListV1Params {
  filter_user_name?: string;

  filter_role_name?: string;

  page_index?: number;

  page_size?: number;
}

export interface IGetUserListV1Return extends IGetUsersResV1 {}

export interface ICreateUserV1Params extends ICreateUserReqV1 {}

export interface ICreateUserV1Return extends IBaseRes {}

export interface IGetUserV1Params {
  user_name: string;
}

export interface IGetUserV1Return extends IGetUserDetailResV1 {}

export interface IDeleteUserV1Params {
  user_name: string;
}

export interface IDeleteUserV1Return extends IBaseRes {}

export interface IUpdateUserV1Params extends IUpdateUserReqV1 {
  user_name: string;
}

export interface IUpdateUserV1Return extends IBaseRes {}
