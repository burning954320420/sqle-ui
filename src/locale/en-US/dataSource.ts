// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageTitle: 'Data Source',
  pageDesc: 'You can register the database that needs SQL audit here.',

  databaseListTitle: 'Database List',

  databaseList: {
    instanceName: 'Instance Name',
    address: 'Instance Address',
    describe: 'Describe',
    role: 'Role',
    ruleTemplate: 'Rule Template',
    workflow: 'Workflow',
  },

  addDatabase: 'Add Database',
  addDatabaseSuccess: 'Add Database successfully',
  addDatabaseSuccessGuide: 'Go to the data source list to view the database just added',

  updateDatabase: {
    getDatabaseInfoError: 'Get database info failed',
    updateDatabaseTitle: 'Update Database',
    updateDatabaseSuccess: 'Update Database "{{name}}" successfully',
  },

  dataSourceForm: {
    name: 'Instance Name',
    describe: 'Describe',
    type: 'Type',
    ip: 'Ip',
    ipTips: 'IP or Domain',
    port: 'Port',
    user: 'User',
    password: 'Password',
    role: 'Role',
    ruleTemplate: 'Rule Template',
    workflow: 'Workflow',

    passwordTips: '这里不会显示您已经配置的当前数据库密码，提交时如果您没有填写密码，那么将不会对数据库密码进行变更。',
    testDatabaseConnection: 'Test database connectivity',
    testing: 'Trying to connect...',
    testSuccess: 'Database connectivity test succeeded',
    testFailed: 'Failed to link to the database',
  },

  testConnectModal: {
    errorTitle: '数据库{{instanceName}}连通性测试失败',
  },

  deleteDatabase: {
    confirmMessage: 'Are you sure delete this instance "{{name}}"?',
    deletingDatabase: 'Deleting Database "{{name}}"...',
    deleteSuccessTips: 'Delete Database "{{name}}" successfully',
  },
};
