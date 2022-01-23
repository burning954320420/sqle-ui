// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageTitle: 'Audit Rule Template',
  pageDescribe: 'The database will apply the rules of all the rule templates bound to it for SQL audit',

  ruleTemplateListTitle: 'Template List',

  backToList: 'Back to Template List',

  ruleTemplateList: {
    descEmpty: 'Empty',

    instance: 'Instances',
    instanceEmpty: 'Empty',
  },

  deleteRuleTemplate: {
    tips: 'Are you sure delete this template "{{name}}"?',
    deleting: 'Deleting template "{{name}}"...',
    deleteSuccessTips: 'Delete template "{{name}}" successfully',
  },

  ruleTemplateForm: {
    baseInfoTitle: 'Base info',
    baseInfoDesc: 'Set Template name, describe and something others',

    ruleTitle: 'Rule',
    ruleDesc: 'Select the rule that need to be enable',

    result: 'Result',
    resultDesc: 'Operate Result',

    templateName: 'Template Name',
    templateDesc: 'Template Describe',
    databaseType: 'Database Type',
    instances: 'Instances',

    activeRuleTitle: 'Enable Rule',
    activeRule: 'Enable',
    activeAllRules: 'Enable All Rule',
    disableRuleTitle: 'Disable Rule',
    disableAllRules: 'Disable All Rule',
    disableRule: 'Disable',
    editRule: 'Edit Rule',

    emptyRule: 'Empty',
    ruleValue: 'Rule value',
  },

  createRuleTemplate: {
    button: 'Create audit rule template',
    title: 'Create Audit Rule Template',
    successTitle: 'Create audit rule template successfully',
    createNew: 'Create new audit rule template again >',
  },

  updateRuleTemplate: {
    title: 'Update Audit Rule Template',
    successTitle: 'Update audit rule template successfully',
  },

  editModal: {
    title: '编辑规则',
    ruleLevelLabel: '规则等级',
    ruleLevelValue: '预设值',
    ruleLevelLabelPlace: '请选择规则对应的等级',

    ruleLevelValuePlace: '请填写规则的默认值',
    ruleDescLabel: '规则描述',
    ruleTypeLabel: '规则分类',
    ruleNameLabel: '规则名称',
    ruleDbType: '数据库类型',
    rule: '规则',
    ruleValueTypeOnlyNumber: '当前规则值类型只能为数字',
  },

  cloneRuleTemplate: {
    button: '克隆规则模版',
    title: '克隆规则模版',
    cloneDesc:
      '克隆的规则模版只会继承源模版所有启用的规则、以及变更过的规则等级和阈值。克隆出的新规则模版的模版名称等基本信息需要手动填写。',
    currentTemplateTips: '正在克隆审核规则模版',
    successTips: '克隆规则模版 "{{name}}" 成功',
  },

  ruleLevel: {
    normal: 'normal',
    error: 'error',
    warn: 'warn',
    notice: 'notice',
  },
};
