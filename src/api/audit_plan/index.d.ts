import {
  IGetAuditPlansResV1,
  ICreateAuditPlanReqV1,
  IBaseRes,
  IUpdateAuditPlanReqV1,
  IGetAuditPlanReportResV1,
  IGetAuditPlanReportsResV1,
  IGetAuditPlanSQLsResV1,
  IFullSyncAuditPlanSQLsReqV1,
  IPartialSyncAuditPlanSQLsReqV1
} from '../common.d';

export interface IGetAuditPlansV1Params {
  filter_audit_plan_db_type?: string;

  page_index?: number;

  page_size?: number;
}

export interface IGetAuditPlansV1Return extends IGetAuditPlansResV1 {}

export interface ICreateAuditPlanV1Params extends ICreateAuditPlanReqV1 {}

export interface ICreateAuditPlanV1Return extends IBaseRes {}

export interface IDeleteAuditPlanV1Params {
  audit_plan_name: string;
}

export interface IDeleteAuditPlanV1Return extends IBaseRes {}

export interface IUpdateAuditPlanV1Params extends IUpdateAuditPlanReqV1 {
  audit_plan_name: string;
}

export interface IUpdateAuditPlanV1Return extends IBaseRes {}

export interface IGetAuditPlanReportDetailV1Params {
  audit_plan_name: string;

  page_index?: number;

  page_size?: number;
}

export interface IGetAuditPlanReportDetailV1Return
  extends IGetAuditPlanReportResV1 {}

export interface IGetAuditPlanReportsV1Params {
  audit_plan_name: string;

  page_index?: number;

  page_size?: number;
}

export interface IGetAuditPlanReportsV1Return
  extends IGetAuditPlanReportsResV1 {}

export interface IGetAuditPlanSQLsV1Params {
  audit_plan_name: string;

  page_index?: number;

  page_size?: number;
}

export interface IGetAuditPlanSQLsV1Return extends IGetAuditPlanSQLsResV1 {}

export interface IFullSyncAuditPlanSQLsV1Params
  extends IFullSyncAuditPlanSQLsReqV1 {
  audit_plan_name: string;
}

export interface IFullSyncAuditPlanSQLsV1Return extends IBaseRes {}

export interface IPartialSyncAuditPlanSQLsV1Params
  extends IPartialSyncAuditPlanSQLsReqV1 {
  audit_plan_name: string;
}

export interface IPartialSyncAuditPlanSQLsV1Return extends IBaseRes {}

export interface ITriggerAuditPlanV1Params {
  audit_plan_name: string;
}

export interface ITriggerAuditPlanV1Return extends IBaseRes {}
