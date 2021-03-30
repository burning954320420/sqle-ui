import {
  AuditTaskResV1StatusEnum,
  RuleResV1LevelEnum,
  WorkFlowStepTemplateReqV1TypeEnum,
  WorkflowDetailResV1CurrentStepTypeEnum,
  WorkflowDetailResV1StatusEnum,
  WorkflowDetailResV1TaskStatusEnum,
  WorkflowResV1StatusEnum,
  WorkflowStepResV1StateEnum
} from './common.enum';

export interface IBaseRes {
  code?: number;

  message?: string;
}

export interface IAuditTaskResV1 {
  instance_name?: string;

  instance_schema?: string;

  pass_rate?: number;

  status?: AuditTaskResV1StatusEnum;

  task_id?: number;
}

export interface IAuditTaskSQLResV1 {
  audit_level?: string;

  audit_result?: string;

  audit_status?: string;

  exec_result?: string;

  exec_sql?: string;

  exec_status?: string;

  number?: number;

  rollback_sql?: string;
}

export interface ICreateInstanceReqV1 {
  db_host?: string;

  db_password?: string;

  db_port?: string;

  db_user?: string;

  desc?: string;

  instance_name?: string;

  role_name_list?: string[];

  rule_template_name_list?: string[];

  workflow_template_name?: string;
}

export interface ICreateRoleReqV1 {
  instance_name_list?: string[];

  role_desc?: string;

  role_name?: string;

  user_name_list?: string[];
}

export interface ICreateRuleTemplateReqV1 {
  desc?: string;

  instance_name_list?: string[];

  rule_name_list?: string[];

  rule_template_name?: string;
}

export interface ICreateUserReqV1 {
  email?: string;

  role_name_list?: string[];

  user_name?: string;

  user_password?: string;
}

export interface ICreateWorkflowReqV1 {
  desc?: string;

  task_id?: string;

  workflow_subject?: string;
}

export interface ICreateWorkflowTemplateReqV1 {
  desc?: string;

  instance_name_list?: string[];

  workflow_step_template_list?: IWorkFlowStepTemplateReqV1[];

  workflow_template_name?: string;
}

export interface IGetAuditTaskResV1 {
  code?: number;

  data?: IAuditTaskResV1;

  message?: string;
}

export interface IGetAuditTaskSQLsResV1 {
  code?: number;

  data?: IAuditTaskSQLResV1[];

  message?: string;

  total_nums?: number;
}

export interface IGetInstanceConnectableReqV1 {
  host?: string;

  password?: string;

  port?: string;

  user?: string;
}

export interface IGetInstanceConnectableResV1 {
  code?: number;

  data?: IInstanceConnectableResV1;

  message?: string;
}

export interface IGetInstanceResV1 {
  code?: number;

  data?: IInstanceResV1;

  message?: string;
}

export interface IGetInstanceSchemaResV1 {
  code?: number;

  data?: IInstanceSchemaResV1;

  message?: string;
}

export interface IGetInstanceTipsResV1 {
  code?: number;

  data?: IInstanceTipResV1[];

  message?: string;
}

export interface IGetInstancesResV1 {
  code?: number;

  data?: IInstanceResV1[];

  message?: string;

  total_nums?: number;
}

export interface IGetRoleTipsResV1 {
  code?: number;

  data?: IRoleTipResV1[];

  message?: string;
}

export interface IGetRolesResV1 {
  code?: number;

  data?: IRoleResV1[];

  message?: string;

  total_nums?: number;
}

export interface IGetRuleTemplateResV1 {
  code?: number;

  data?: IRuleTemplateDetailResV1;

  message?: string;
}

export interface IGetRuleTemplateTipsResV1 {
  code?: number;

  data?: IRuleTemplateTipResV1[];

  message?: string;
}

export interface IGetRuleTemplatesResV1 {
  code?: number;

  data?: IRuleTemplateDetailResV1[];

  message?: string;

  total_nums?: number;
}

export interface IGetRulesResV1 {
  code?: number;

  data?: IRuleResV1[];

  message?: string;
}

export interface IGetUserDetailResV1 {
  code?: number;

  data?: IUserDetailResV1;

  message?: string;
}

export interface IGetUserLoginResV1 {
  code?: number;

  data?: IUserLoginResV1;

  message?: string;
}

export interface IGetUserTipsResV1 {
  code?: number;

  data?: IUserTipResV1[];

  message?: string;
}

export interface IGetUsersResV1 {
  code?: number;

  data?: IUserResV1[];

  message?: string;

  total_nums?: number;
}

export interface IGetWorkflowResV1 {
  code?: number;

  data?: IWorkflowResV1;

  message?: string;
}

export interface IGetWorkflowTemplateResV1 {
  code?: number;

  data?: IWorkflowTemplateDetailResV1;

  message?: string;
}

export interface IGetWorkflowTemplateTipResV1 {
  code?: number;

  data?: IWorkflowTemplateTipResV1[];

  message?: string;
}

export interface IGetWorkflowTemplatesResV1 {
  code?: number;

  data?: IWorkflowTemplateResV1[];

  message?: string;

  total_nums?: number;
}

export interface IGetWorkflowsResV1 {
  code?: number;

  data?: IWorkflowDetailResV1[];

  message?: string;

  total_nums?: number;
}

export interface IInstanceConnectableResV1 {
  connect_error_message?: string;

  is_instance_connectable?: boolean;
}

export interface IInstanceResV1 {
  db_host?: string;

  db_port?: string;

  db_user?: string;

  desc?: string;

  instance_name?: string;

  role_name_list?: string[];

  rule_template_name_list?: string[];

  workflow_template_name?: string;
}

export interface IInstanceSchemaResV1 {
  schema_name_list?: string[];
}

export interface IInstanceTipResV1 {
  instance_name?: string;
}

export interface IRejectWorkflowReqV1 {
  reason?: string;
}

export interface IRoleResV1 {
  instance_name_list?: string[];

  role_desc?: string;

  role_name?: string;

  user_name_list?: string[];
}

export interface IRoleTipResV1 {
  role_name?: string;
}

export interface IRuleResV1 {
  desc?: string;

  level?: RuleResV1LevelEnum;

  rule_name?: string;

  value?: string;
}

export interface IRuleTemplateDetailResV1 {
  desc?: string;

  instance_name_list?: string[];

  rule_name_list?: string[];

  rule_template_name?: string;
}

export interface IRuleTemplateTipResV1 {
  rule_template_name?: string;
}

export interface IUpdateInstanceReqV1 {
  db_host?: string;

  db_password?: string;

  db_port?: string;

  db_user?: string;

  desc?: string;

  role_name_list?: string[];

  rule_template_name_list?: string[];

  workflow_template_name?: string;
}

export interface IUpdateRoleReqV1 {
  instance_name_list?: string[];

  role_desc?: string;

  user_name_list?: string[];
}

export interface IUpdateRuleTemplateReqV1 {
  desc?: string;

  instance_name_list?: string[];

  rule_name_list?: string[];
}

export interface IUpdateUserReqV1 {
  email?: string;

  role_name_list?: string[];
}

export interface IUpdateWorkflowTemplateReqV1 {
  desc?: string;

  instance_name_list?: string[];

  workflow_step_template_list?: IWorkFlowStepTemplateReqV1[];
}

export interface IUserDetailResV1 {
  email?: string;

  is_admin?: boolean;

  role_name_list?: string[];

  user_name?: string;
}

export interface IUserLoginReqV1 {
  password?: string;

  username?: string;
}

export interface IUserLoginResV1 {
  token?: string;
}

export interface IUserResV1 {
  email?: string;

  role_name_list?: string[];

  user_name?: string;
}

export interface IUserTipResV1 {
  user_name?: string;
}

export interface IWorkFlowStepTemplateReqV1 {
  assignee_user_name_list?: string[];

  desc?: string;

  type?: WorkFlowStepTemplateReqV1TypeEnum;
}

export interface IWorkFlowStepTemplateResV1 {
  assignee_user_name_list?: string[];

  desc?: string;

  number?: number;

  type?: string;
}

export interface IWorkflowDetailResV1 {
  create_time?: string;

  create_user_name?: string;

  current_step_assignee_user_name_list?: string[];

  current_step_type?: WorkflowDetailResV1CurrentStepTypeEnum;

  desc?: string;

  status?: WorkflowDetailResV1StatusEnum;

  subject?: string;

  task_instance_name?: string;

  task_instance_schema?: string;

  task_pass_rate?: number;

  task_status?: WorkflowDetailResV1TaskStatusEnum;

  workflow_id?: number;
}

export interface IWorkflowResV1 {
  create_time?: string;

  create_user_name?: string;

  current_step_number?: number;

  desc?: string;

  status?: WorkflowResV1StatusEnum;

  subject?: string;

  task_id?: number;

  workflow_id?: number;

  workflow_step_list?: IWorkflowStepResV1[];
}

export interface IWorkflowStepResV1 {
  assignee_user_name_list?: string[];

  desc?: string;

  number?: number;

  operation_time?: string;

  operation_user_name?: string;

  reason?: string;

  state?: WorkflowStepResV1StateEnum;

  type?: string;
}

export interface IWorkflowTemplateDetailResV1 {
  desc?: string;

  instance_name_list?: string[];

  workflow_step_template_list?: IWorkFlowStepTemplateResV1[];

  workflow_template_name?: string;
}

export interface IWorkflowTemplateResV1 {
  desc?: string;

  workflow_template_name?: string;
}

export interface IWorkflowTemplateTipResV1 {
  workflow_template_name?: string;
}
