import { Button, Col, Form, Row, Select, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  filterFormButtonLayoutFactory,
  FilterFormColLayout,
  FilterFormRowLayout,
} from '../../../../data/common';
import EmitterKey from '../../../../data/EmitterKey';
import useRole from '../../../../hooks/useRole';
import useUsername from '../../../../hooks/useUsername';
import EventEmitter from '../../../../utils/EventEmitter';
import { UserListFilter } from '../index.type';

const UserListFilterForm: React.FC<{
  updateUserListFilter: (filter: UserListFilter) => void;
}> = (props) => {
  const [form] = useForm();
  const { t } = useTranslation();
  const { usernameList, updateUsernameList } = useUsername();
  const { roleList, updateRoleList } = useRole();

  const resetFilter = React.useCallback(() => {
    form.resetFields();
    props.updateUserListFilter({});
  }, [form, props]);

  React.useEffect(() => {
    const refresh = () => {
      updateRoleList();
    };
    EventEmitter.subscribe(EmitterKey.Refresh_Role_list, refresh);
    return () => {
      EventEmitter.unsubscribe(EmitterKey.Refresh_Role_list, refresh);
    };
  }, [updateRoleList]);

  React.useEffect(() => {
    const refresh = () => {
      updateUsernameList();
    };
    EventEmitter.subscribe(EmitterKey.Refresh_User_list, refresh);
    return () => {
      EventEmitter.unsubscribe(EmitterKey.Refresh_User_list, refresh);
    };
  }, [updateUsernameList]);

  React.useEffect(() => {
    updateRoleList();
    updateUsernameList();
  }, [updateRoleList, updateUsernameList]);

  return (
    <Form<UserListFilter>
      form={form}
      className="table-filter-form"
      onFinish={props.updateUserListFilter}
    >
      <Row {...FilterFormRowLayout}>
        <Col {...FilterFormColLayout}>
          <Form.Item
            name="filter_user_name"
            label={t('user.userForm.username')}
          >
            <Select
              showSearch
              placeholder={t('user.roleListFilter.usernamePlaceholder')}
            >
              {usernameList.map((user) => (
                <Select.Option
                  key={user.user_name}
                  value={user.user_name ?? ''}
                >
                  {user.user_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col {...FilterFormColLayout}>
          <Form.Item name="filter_role_name" label={t('user.userForm.role')}>
            <Select
              showSearch
              placeholder={t('user.roleListFilter.rolePlaceholder')}
            >
              {roleList.map((role) => (
                <Select.Option
                  key={role.role_name}
                  value={role.role_name ?? ''}
                >
                  {role.role_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col
          {...filterFormButtonLayoutFactory(12, 0, 6)}
          className="text-align-right"
        >
          <Form.Item className="clear-margin-right">
            <Space>
              <Button onClick={resetFilter}>{t('common.reset')}</Button>
              <Button type="primary" htmlType="submit">
                {t('common.search')}
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default UserListFilterForm;
