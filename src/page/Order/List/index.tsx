import { SyncOutlined } from '@ant-design/icons';
import { useBoolean, useRequest } from 'ahooks';
import {
  Button,
  Card,
  PageHeader,
  Space,
  Table,
  Popconfirm,
  message,
} from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import workflow from '../../../api/workflow';
import {
  getWorkflowListV1FilterCurrentStepTypeEnum,
  getWorkflowListV1FilterStatusEnum,
} from '../../../api/workflow/index.enum';
import useTable from '../../../hooks/useTable';
import { translateTimeForRequest } from '../../../utils/Common';
import { orderListColumn } from './column';
import { OrderListUrlParamsKey } from './index.data';
import OrderListFilterForm from './OrderListFilterForm';
import { OrderListFilterFormFields } from './OrderListFilterForm/index.type';
import { IWorkflowDetailResV1 } from '../../../api/common.d';
import useRole from '../../../hooks/useCurrentUser';
import { ResponseCode } from '../../../data/common';
import { WorkflowDetailResV1StatusEnum } from '../../../api/common.enum';
import { Theme } from '../../../types/theme.type';
import { useTheme } from '@material-ui/styles';
import { TableRowSelection } from 'antd/lib/table/interface';

const OrderList = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme<Theme>();
  const [resolveUrlParamFlag, { toggle: setResolveUrlParamFlag }] =
    useBoolean();
  const { isAdmin } = useRole();
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);
  const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
  const [visible, { setTrue: setVisibleTrue, setFalse: setVisibleFalse }] =
    useBoolean(false);
  const {
    pagination,
    filterForm,
    filterInfo,
    collapse,
    collapseChange,
    resetFilter,
    setFilterInfo,
    submitFilter,
    tableChange,
  } = useTable<OrderListFilterFormFields>();

  const {
    data: orderList,
    loading,
    refresh,
  } = useRequest(
    () => {
      const { filter_order_createTime, ...otherFilterInfo } = filterInfo;
      return workflow.getWorkflowListV1({
        page_index: pagination.pageIndex,
        page_size: pagination.pageSize,
        filter_create_time_from: translateTimeForRequest(
          filter_order_createTime?.[0]
        ),
        filter_create_time_to: translateTimeForRequest(
          filter_order_createTime?.[1]
        ),
        ...otherFilterInfo,
      });
    },
    {
      ready: resolveUrlParamFlag,
      refreshDeps: [pagination, filterInfo],
      formatResult(res) {
        return {
          list: res.data?.data ?? [],
          total: res.data?.total_nums ?? 0,
        };
      },
    }
  );

  React.useEffect(() => {
    const searchStr = new URLSearchParams(location.search);
    const filter: OrderListFilterFormFields = {};
    if (searchStr.has(OrderListUrlParamsKey.currentStepAssignee)) {
      filter.filter_current_step_assignee_user_name = searchStr.get(
        OrderListUrlParamsKey.currentStepAssignee
      ) as string;
    }
    if (searchStr.has(OrderListUrlParamsKey.currentStepType)) {
      filter.filter_current_step_type = searchStr.get(
        OrderListUrlParamsKey.currentStepType
      ) as getWorkflowListV1FilterCurrentStepTypeEnum;
    }
    if (searchStr.has(OrderListUrlParamsKey.status)) {
      filter.filter_status = searchStr.get(
        OrderListUrlParamsKey.status
      ) as getWorkflowListV1FilterStatusEnum;
    }
    if (Object.keys(filter).length > 0) {
      collapseChange(false);
      filterForm.setFieldsValue(filter);
      setFilterInfo(filter);
    }
    setResolveUrlParamFlag(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: string[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const batchCancel = React.useCallback(() => {
    const canCancel: boolean = selectedRowKeys.every((e) => {
      const status = orderList?.list.filter(
        (data) => `${data.workflow_id}` === e
      )[0]?.status;
      return (
        status === WorkflowDetailResV1StatusEnum.on_process ||
        status === WorkflowDetailResV1StatusEnum.rejected
      );
    });
    if (canCancel) {
      setConfirmLoading(true);
      workflow
        .batchCancelWorkflowsV1({
          workflow_ids: selectedRowKeys,
        })
        .then((res) => {
          if (res.data.code === ResponseCode.SUCCESS) {
            setSelectedRowKeys([]);
            refresh();
          }
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } else {
      message.warning(
        t('order.batchCancel.messageWarn', {
          process: t('order.status.process'),
          reject: t('order.status.reject'),
        })
      );
    }
    setVisibleFalse();
  }, [orderList, selectedRowKeys, t, setVisibleFalse, refresh]);

  return (
    <>
      <PageHeader
        title={t('order.orderList.pageTitle')}
        ghost={false}
        extra={[
          <Link to="/order/create" key="createOrder">
            <Button type="primary">{t('order.createOrder.title')}</Button>
          </Link>,
        ]}
      >
        {t('order.orderList.pageDesc')}
      </PageHeader>
      <section className="padding-content">
        <Card
          title={
            <Space>
              {t('order.orderList.allOrderAboutMe')}
              <Button onClick={refresh}>
                <SyncOutlined spin={loading} />
              </Button>
            </Space>
          }
        >
          <Space
            className="full-width-element"
            direction="vertical"
            size={theme?.common.padding}
          >
            <OrderListFilterForm
              form={filterForm}
              reset={resetFilter}
              submit={submitFilter}
              collapse={collapse}
              collapseChange={collapseChange}
            />
            {isAdmin && (
              <Popconfirm
                title={t('order.batchCancel.cancelPopTitle')}
                okText={t('common.ok')}
                cancelText={t('common.cancel')}
                onConfirm={batchCancel}
                onCancel={() => {
                  setVisibleFalse();
                }}
                okButtonProps={{ loading: confirmLoading }}
                visible={visible}
              >
                <Button
                  danger
                  disabled={selectedRowKeys?.length === 0}
                  onClick={() => {
                    setVisibleTrue();
                  }}
                >
                  {t('order.batchCancel.batchDelete')}
                </Button>
              </Popconfirm>
            )}

            <Table
              className="table-row-cursor"
              rowKey={(record: IWorkflowDetailResV1) => {
                return `${record?.workflow_id}`;
              }}
              loading={loading}
              columns={orderListColumn()}
              dataSource={orderList?.list}
              pagination={{
                total: orderList?.total,
                showSizeChanger: true,
              }}
              onChange={tableChange}
              onRow={(record) => ({
                onClick() {
                  history.push(`/order/${record.workflow_id}`);
                },
              })}
              rowSelection={
                isAdmin
                  ? (rowSelection as TableRowSelection<IWorkflowDetailResV1>)
                  : undefined
              }
            />
          </Space>
        </Card>
      </section>
    </>
  );
};

export default OrderList;
