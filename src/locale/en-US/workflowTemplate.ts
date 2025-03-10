// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageTitle: '审批流程模版',
  pageDesc:
    '你可以在这里管理您的审批流程模版，您可以为不同的数据源绑定不同的审批流程。',

  list: {
    title: {
      listTable: '审批流程模版列表',
    },

    table: {
      workflowTemplateName: '审批流程模版名称',
      desc: '审批流程模版描述',
    },

    operator: {
      create: '创建审批流程模版',
    },
  },

  create: {
    title: {
      wrapper: '创建审批流程模版',
    },
    result: {
      title: '创建审批流程模版成功',
      createNew: '再创建一个新的审批流程模版',
      backToList: '返回列表查看刚刚创建的审批流程模版',
    },
  },

  update: {
    title: {
      wrapper: '更新审批流程模版',
    },
    result: {
      title: '更新审批流程模版成功',
      showNow: '查看刚刚更新的审批流程模版',
    },
  },

  delete: {
    confirm: '确认移除审批流程模版 {{name}} ？',
    deleting: '正在移除审批流程模版 {{name}}...',
    successTips: '移除审批流程模版 {{name}} 成功',
  },

  detail: {
    title: {
      wrapper: '审批流程模版详情',
      base: '审批流程模版基本信息',
      step: '审批流程模版步骤',
    },
    updateTemplate: '修改当前审批流程模版',
  },

  step: {
    baseFormTitle: '基本信息',
    baseFormDesc: '设定模版的名称、描述等基本信息',

    progressTitle: '流程',
    progressDesc: '编辑审核流程',

    resultTitle: '结果',
    resultDesc: '变更结果',
  },

  form: {
    label: {
      name: '审批流程模版名称',
      desc: '审批流程模版描述',
      allowSubmitWhenLessAuditLevel: '允许创建工单的最高审核等级',
      instanceNameList: '应用的数据源',
      reviewUser: '审核人',
      reviewDesc: '步骤描述',
      execUser: '执行人',
    },
  },

  progressConfig: {
    createStep: {
      title: '工单发起/工单更新SQL语句',
      desc: '工单被创建，或者工单被驳回后等待修改SQL语句',
    },
    review: {
      title: '工单审核',
      subTitle: '审核人在该步骤可以执行 审核通过或驳回 操作',
    },
    exec: {
      title: '执行上线',
      subTitle: '执行人在该步骤可以执行 执行上线或驳回 操作',
    },
    operator: {
      remove: '移除该步骤',
      moveUp: '上移该步骤',
      moveDown: '下移该步骤',
      addReview: '添加审核步骤',
    },
    ruler: {
      title: '创建/更新 审批流程时请注意以下几点',
      rule1:
        '审批流程模版与数据源绑定，如果您添加数据源的时候没有选择审批流程模版，那么该数据源将无法创建工单',
      rule2: '审批流程结束步骤一定为执行上线且不可移除、不可变更顺序',
      rule3: '单个流程模版最多只能添加四个审核步骤',
      rule4:
        '单个流程模版也可以移除所有审核步骤，即工单创建之后即可点击执行上线',
      rule5: '单个步骤至少需要添加一个指定人，最多只能添加三个指定人',
    },
  },

  auditLevel: {
    normal: '普通',
    error: '错误',
    warn: '告警',
    notice: '提示',
  },
};
