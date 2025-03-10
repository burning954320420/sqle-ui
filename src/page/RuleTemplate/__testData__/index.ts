export const ruleTemplateListData = [
  {
    db_type: 'mysql',
    desc: '默认规则模板',
    instance_name_list: ['db1'],
    rule_template_name: 'default_mysql',
  },
  {
    db_type: 'oracle',
    desc: '默认规则模板2',
    instance_name_list: ['db2'],
    rule_template_name: 'default_oracle',
  },
];

export const ruleTemplateData = {
  rule_template_name: 'default_mysql',
  desc: '默认规则模板',
  db_type: 'mysql',
  instance_name_list: ['db1'],
  rule_list: [
    {
      rule_name: 'all_check_where_is_invalid',
      desc: '禁止使用没有where条件的sql语句或者使用where 1=1等变相没有条件的sql',
      value: '',
      level: 'error',
      type: 'DML规范',
      db_type: 'mysql',
    },
    {
      rule_name: 'ddl_check_alter_table_need_merge',
      desc: '存在多条对同一个表的修改语句，建议合并成一个ALTER语句',
      value: '',
      level: 'notice',
      type: '使用建议',
      db_type: 'mysql',
    },
    {
      rule_name: 'ddl_check_column_blob_default_is_not_null',
      desc: 'BLOB 和 TEXT 类型的字段不可指定非 NULL 的默认值',
      value: '',
      level: 'error',
      type: 'DDL规范',
      db_type: 'mysql',
    },
    {
      rule_name: 'ddl_check_column_blob_with_not_null',
      desc: 'BLOB 和 TEXT 类型的字段不建议设置为 NOT NULL',
      value: '',
      level: 'error',
      type: 'DDL规范',
      db_type: 'mysql',
    },
    {
      rule_name: 'ddl_check_column_char_length',
      desc: 'char长度大于20时，必须使用varchar类型',
      value: '',
      level: 'error',
      type: 'DDL规范',
      db_type: 'mysql',
    },
    {
      rule_name: 'ddl_check_column_timestamp_without_default',
      desc: 'timestamp 类型的列必须添加默认值',
      value: '',
      level: 'error',
      type: 'DDL规范',
      db_type: 'mysql',
    },
  ],
};
