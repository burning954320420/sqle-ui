// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageTitle: 'Whitelist',
  pageDesc:
    '您可以在这里添加一些SQL语句，这些SQL语句在进行审核的时候不会触发任何审核规则。',

  allWhitelist: '所有白名单语句',
  table: {
    sql: 'SQL',
    desc: '白名单描述',
    matchType: '匹配模式',
  },

  matchType: {
    exact: '字符串匹配',
    fingerPrint: 'sql指纹匹配',
  },

  operate: {
    addWhitelist: 'Add whitelist',

    deleting: '正在删除白名单语句...',
    deleteSuccess: '删除白名单语句成功',
    confirmDelete: '确认删除这条白名单么？',
  },

  modal: {
    add: {
      title: 'Add whitelist',
    },
    update: {
      title: 'Update whitelist',
    },
  },
};
