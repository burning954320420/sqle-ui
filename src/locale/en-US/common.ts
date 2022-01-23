// eslint-disable-next-line import/no-anonymous-default-export
export default {
  username: 'username',
  password: 'password',

  unknownError: 'Unknown Error',
  unknownStatus: 'Unknown Status',

  ok: 'Ok',
  cancel: 'Cancel',
  submit: 'Submit',
  close: 'Close',
  edit: 'Edit',
  modify: 'Modify',
  delete: 'Delete',
  reset: 'Reset',
  resetAll: 'Reset all',
  search: 'Search',
  retry: 'Retry',
  back: 'Back',
  more: 'More',
  upload: 'Upload',
  resetAndClose: 'Reset Form And Close',
  operateSuccess: 'Operate successfully',
  operate: 'Operate',
  open: 'Open',

  prevStep: 'Prev',
  nextStep: 'Next',

  expansion: 'Expand',
  collapse: 'Collapse',

  showAll: 'Show All',
  showDetail: 'Show Detail',
  showMore: 'Show More',

  in: 'in',
  on: 'on',
  and: 'and',
  at: 'at',
  preview: 'preview',

  theme: {
    light: 'Light Theme',
    dark: 'Dark Theme',
  },

  logout: 'Logout',
  account: 'Account',

  nav: {
    title: 'SQLe',
  },

  request: {
    noticeFailTitle: 'Request Failed',
  },

  time: {
    hour: 'hour',
    year: 'year',
    month: 'month',
    day: 'day',
    no: 'no',
    week: 'week',
    minute: 'minute',
    per: 'per',
  },

  form: {
    placeholder: {
      input: 'Please input {{name}}',
      select: 'Please select {{name}}',
      searchInput: 'Input the {{name}} to search',
      searchSelect: 'Select the {{name}} to search',
    },
    rule: {
      require: 'Please input {{name}}',
      selectFile: 'Must select a file',
      passwordNotMatch: 'The two passwords that you entered do not match!',
      email: 'The input is not valid E-mail!',
      startWithLetter: '必须要以字母开头',
      onlyLetterAndNumber: '只能包含字母、数字、中划线和下划线',
      onlyNumber: '只能包含数字',
      portRange: '端口号范围为{{min}}-{{max}}',
    },
  },

  cron: {
    mode: {
      select: '可视化选择',
      manual: '手工填写',
    },
    errorMessage: {
      invalid: '无效的cron表达式',
      mustBeString: 'cron表达式必须是一个字符串',
      mustBeArray: '变更的值必须是一个数组',
      lenMustBeFive: 'cron表达式必须只包含（分钟 小时 日期 月份 星期）5个元素',
      onlyHaveValidChar: 'cron表达式只能包含数字中划线(-),斜线(/),和逗号(,)',
      limit:
        '您的表达式中包含不合法的数值范围， minute(0-59), hour(0-23), day(1,31), month(1-12), week(0-6)',
    },
  },
};
