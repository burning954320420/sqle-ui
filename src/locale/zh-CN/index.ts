import account from './account';
import audit from './audit';
import common from './common';
import dashboard from './dashboard';
import dataSource from './dataSource';
import login from './login';
import menu from './menu';
import order from './order';
import rule from './rule';
import ruleTemplate from './ruleTemplate';
import system from './system';
import user from './user';
import whitelist from './whitelist';
import workflowTemplate from './workflowTemplate';
import auditPlan from './auditPlan';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  translation: {
    login,
    common,
    menu,
    user,
    dataSource,
    ruleTemplate,
    account,
    rule,
    audit,
    order,
    dashboard,
    whitelist,
    system,
    workflowTemplate,
    auditPlan,
  },
};
