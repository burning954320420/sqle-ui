// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageTitle: '用户管理',
  pageDesc:
    '你可以在这里管理平台的用户，用户只能看到或操作其已绑定的所有角色中包含的数据源。',
  
    userListTitle: '用户列表',

  createUser: {
    button: '创建用户',
    modalTitle: '创建用户',
    createSuccessTips: '创建用户 "{{name}}" 成功',
  },

  updateUser: {
    modalTitle: '更新用户',
    updateSuccessTips: '更新用户 "{{name}}" 成功',
  },

  updateUserPassword: {
    button: '修改该用户密码',
    title: '修改{{name}}用户密码',

    successTips: '修改{{name}}用户密码成功',
  },

  userForm: {
    username: '用户名',
    password: '密码',
    passwordConfirm: '确认密码',
    email: '邮箱',
    role: '角色',

    passwordConfirmPlaceholder: '请保持两次密码输入一致',
  },

  userListFilter: {
    usernamePlaceholder: '请输入要搜索的用户名',
    rolePlaceholder: '请输入要搜索的角色',
  },

  deleteUser: {
    confirmTitle: '确认要删除用户: "{{username}}"?',
    deleting: '正在删除用户: "{{username}}...',
    deleteSuccess: '删除用户 "{{username}}" 成功',
  },

  userList: {
    emailPlaceholder: '未填写邮箱',
    rolePlaceHolder: '未拥有任何角色',
    role: '拥有角色',
  },

  roleListTitle: '角色列表',

  createRole: {
    button: '创建角色',
    modalTitle: '创建角色',
    createSuccessTips: '创建角色 "{{name}}" 成功',
  },

  updateRole: {
    modalTitle: '更新角色',
    updateSuccessTips: '更新角色 "{{name}}" 成功',
  },

  deleteRole: {
    deleteTips: '确认要删除角色 "{{name}}"?',
    deleting: '正在删除角色 "{{name}}"...',
    deleteSuccessTips: '删除角色 "{{name}}" 成功',
  },

  roleForm: {
    roleName: '角色名',
    roleDesc: '角色描述',
    databases: '数据源',
    usernames: '绑定用户',
  },

  roleListFilter: {
    usernamePlaceholder: '请输入要搜索的用户名',
    rolePlaceholder: '请输入要搜索的角色',
    databasePlaceholder: '请输入要搜索的数据源',
  },

  roleList: {
    roleDescPlaceholder: '未找到角色描述',
    usernamePlaceholder: '未绑定任何用户',
    databasePlaceholder: '未绑定任何数据源',
    username: '绑定用户',
    database: '绑定数据源',
  },
};
