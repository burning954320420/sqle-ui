import { SyncOutlined } from '@ant-design/icons';
import { useBoolean, useRequest } from 'ahooks';
import { Button, Card, message, Space, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import audit_plan from '../../../api/audit_plan';
import { ResponseCode } from '../../../data/common';
import useTable from '../../../hooks/useTable';
import { planListTableHeader } from './tableColumn';

const PlanList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [
    removePending,
    { setTrue: startRemoveAuditPlan, setFalse: removeAuditPlanFinish },
  ] = useBoolean();

  const { pagination, tableChange } = useTable();

  const { data, loading, refresh } = useRequest(
    () => {
      return audit_plan.getAuditPlansV1({
        page_index: pagination.pageIndex,
        page_size: pagination.pageSize,
      });
    },
    {
      paginated: true,
      refreshDeps: [pagination],
      formatResult(res) {
        return {
          total: res.data?.total_nums ?? 1,
          list: res.data?.data ?? [],
        };
      },
    }
  );

  const removeAuditPlan = (auditPlanName: string) => {
    if (removePending) {
      return;
    }
    const hide = message.loading(
      t('auditPlan.remove.loading', { name: auditPlanName }),
      0
    );
    startRemoveAuditPlan();
    audit_plan
      .deleteAuditPlanV1({
        audit_plan_name: auditPlanName,
      })
      .then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          message.success(
            t('auditPlan.remove.successTips', { name: auditPlanName })
          );
          refresh();
        }
      })
      .finally(() => {
        hide();
        removeAuditPlanFinish();
      });
  };

  return (
    <Card
      title={
        <Space>
          {t('auditPlan.list.title')}
          <Button onClick={refresh}>
            <SyncOutlined spin={loading} />
          </Button>
        </Space>
      }
      extra={[
        <Link key="create-audit-plan" to="/auditPlan/create">
          <Button type="primary">{t('auditPlan.action.create')}</Button>
        </Link>,
      ]}
    >
      <Table
        columns={planListTableHeader(removeAuditPlan)}
        dataSource={data?.list ?? []}
        rowKey="audit_plan_name"
        pagination={{
          total: data?.total,
          showSizeChanger: true,
        }}
        loading={loading}
        onRow={(record) => ({
          onClick: () => {
            history.push(`/auditPlan/detail/${record.audit_plan_name}`);
          },
        })}
        onChange={tableChange}
      />
    </Card>
  );
};

export default PlanList;
