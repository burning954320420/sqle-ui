import { ClockCircleOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import moment from 'moment';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Timeline,
  Typography,
  DatePicker,
  Popconfirm,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  WorkflowRecordResV1StatusEnum,
  WorkflowStepResV1StateEnum,
  WorkflowStepResV1TypeEnum,
} from '../../../../api/common.enum';
import EmptyBox from '../../../../components/EmptyBox';
import { ModalFormLayout } from '../../../../data/common';
import { IReduxState } from '../../../../store';
import { formatTime } from '../../../../utils/Common';
import { OrderStepsProps, StepStateStatus } from './index.type';
import OrderStatusTag from '../../../../components/OrderStatusTag';

const stepStateStatus: StepStateStatus = {
  [WorkflowStepResV1StateEnum.initialized]: {
    color: 'gray',
  },
  [WorkflowStepResV1StateEnum.approved]: {
    color: 'green',
  },
  [WorkflowStepResV1StateEnum.rejected]: {
    color: 'red',
  },
  unknown: {
    color: 'gray',
  },
};

const OrderSteps: React.FC<OrderStepsProps> = (props) => {
  const { t } = useTranslation();
  const username = useSelector<IReduxState, string>(
    (state) => state.user.username
  );
  const [form] = useForm();
  const [timeForm] = useForm();
  const [rejectStepId, setRejectStepId] = useState(0);

  const [
    rejectModalVisible,
    { setTrue: openRejectModal, setFalse: closeRejectModal },
  ] = useBoolean();

  const [passLoading, { setTrue: passStart, setFalse: passFinish }] =
    useBoolean();
  const [rejectLoading, { setTrue: rejectStart, setFalse: rejectFinish }] =
    useBoolean();

  const [
    scheduleVisible,
    { setTrue: openScheduleModal, setFalse: closeScheduleModal },
  ] = useBoolean();
  const [
    scheduleLoading,
    { setTrue: scheduleStart, setFalse: scheduleFinish },
  ] = useBoolean();
  const [
    executingLoading,
    { setTrue: executingStart, setFalse: executingFinish },
  ] = useBoolean();
  const pass = (stepId: number) => {
    passStart();
    props.pass(stepId).finally(passFinish);
  };

  const handleClickRejectButton = (stepId: number) => {
    openRejectModal();
    setRejectStepId(stepId);
  };

  const reject = (values: { reason: string }) => {
    rejectStart();
    props.reject(values.reason, rejectStepId).finally(() => {
      rejectFinish();
      closeRejectModal();
      setRejectStepId(0);
    });
  };

  const resetAndCloseRejectModal = () => {
    form.resetFields();
    closeRejectModal();
  };
  const resetAndCloseScheduleModal = () => {
    timeForm.resetFields();
    closeScheduleModal();
  };
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDate = (current: moment.Moment) => {
    return current && current <= moment().startOf('day');
  };
  const disabledDateTime = (value: moment.MomentInput) => {
    if (moment(value).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
      return {
        disabledHours: () => range(0, 24).splice(0, moment().hour()),
        disabledMinutes: () => range(0, 60).splice(0, moment().minutes()),
      };
    }
    return {};
  };

  const execSchedule = (values: { schedule_time: moment.Moment }) => {
    scheduleStart();
    props
      .execSchedule(
        values.schedule_time.format('YYYY-MM-DDTHH:mm:ssZ').toString()
      )
      .finally(() => {
        scheduleFinish();
        resetAndCloseScheduleModal();
      });
  };

  const cancelExecScheduled = () => {
    props.execSchedule().finally(() => {
      scheduleFinish();
      resetAndCloseScheduleModal();
    });
  };
  const executing = () => {
    executingStart();
    props.executing().finally(() => {
      executingFinish();
    });
  };

  const getOperatorTimeElement = (
    execStartTime?: string,
    execEndTime?: string,
    status?: WorkflowRecordResV1StatusEnum
  ) => {
    return (
      <div>
        <span>
          {t('order.operator.startTime', {
            startTime: formatTime(execStartTime),
          })}
        </span>
        <br />
        <span>
          {t('order.operator.endTime', {
            endTime: formatTime(execEndTime),
          })}
        </span>
        <br />
        <span>
          {t('order.operator.status')}
          ：
          <OrderStatusTag status={status} />
        </span>
      </div>
    );
  };

  return (
    <>
      <Timeline>
        {props.stepList.map((step) => {
          let operator: JSX.Element | string = (
            <Space>
              <EmptyBox
                if={
                  props.currentOrderStatus ===
                    WorkflowRecordResV1StatusEnum.on_process &&
                  step.type === WorkflowStepResV1TypeEnum.sql_review
                }
              >
                <Button
                  type="primary"
                  onClick={pass.bind(null, step.workflow_step_id ?? 0)}
                  loading={passLoading}
                >
                  {t('order.operator.sqlReview')}
                </Button>
              </EmptyBox>
              <EmptyBox
                if={
                  props.currentOrderStatus ===
                    WorkflowRecordResV1StatusEnum.on_process &&
                  step.type === WorkflowStepResV1TypeEnum.sql_execute
                }
              >
                <Space>
                  <Button type="primary" onClick={openScheduleModal}>
                    {t('order.operator.onlineRegularly')}
                  </Button>
                  <Button
                    type="primary"
                    onClick={executing}
                    loading={executingLoading}
                  >
                    {t('order.operator.sqlExecute')}
                  </Button>
                </Space>
              </EmptyBox>
              <EmptyBox
                if={
                  props.currentOrderStatus ===
                  WorkflowRecordResV1StatusEnum.exec_scheduled
                }
              >
                <div>
                  {t('order.operator.scheduleExec', {
                    username: props.scheduledUser,
                    time: formatTime(props.scheduleTime),
                  })}
                </div>
                <Popconfirm
                  title={t('order.operator.cancelExecScheduledTip')}
                  onConfirm={cancelExecScheduled}
                >
                  <Button type="primary">
                    {t('order.operator.cancelExecScheduled')}
                  </Button>
                </Popconfirm>
              </EmptyBox>
              <EmptyBox
                if={
                  !(
                    props.currentOrderStatus ===
                    WorkflowRecordResV1StatusEnum.exec_scheduled
                  )
                }
              >
                <Button
                  onClick={handleClickRejectButton.bind(
                    null,
                    step.workflow_step_id ?? 0
                  )}
                  danger
                >
                  {t('order.operator.reject')}
                </Button>
              </EmptyBox>
            </Space>
          );
          const modifySqlNode = (
            <EmptyBox
              if={
                props.currentOrderStatus ===
                WorkflowRecordResV1StatusEnum.rejected
              }
            >
              <EmptyBox
                if={username === step.operation_user_name}
                defaultNode={t('order.operator.waitModifySql')}
              >
                <div>
                  <Button type="primary" onClick={props.modifySql}>
                    {t('order.operator.modifySql')}
                  </Button>
                </div>
              </EmptyBox>
            </EmptyBox>
          );
          if (
            props.currentStep === step.number &&
            !step.assignee_user_name_list?.includes(username) //步骤时当前的步骤，但是该用户没有权限
          ) {
            operator = t('order.operator.wait', {
              username: step.assignee_user_name_list?.join(','),
            });
          } else if (step.type === WorkflowStepResV1TypeEnum.create_workflow) {
            //如果不是当前步骤，而是创建工单
            operator = (
              <>
                {t('order.operator.createOrder', {
                  name: step.operation_user_name,
                })}
                {props.readonly ? null : modifySqlNode}
              </>
            );
          } else if (step.type === WorkflowStepResV1TypeEnum.update_workflow) {
            //如果不是当前步骤，而是更新工单
            operator = (
              <>
                {t('order.operator.updateOrder', {
                  name: step.operation_user_name,
                })}
                {props.readonly ? null : modifySqlNode}
              </>
            );
          } else if (
            step.state === WorkflowStepResV1StateEnum.approved && //approved 审批通过状态
            step.type === WorkflowStepResV1TypeEnum.sql_review //sql审核类型
          ) {
            operator = t('order.operator.approved', {
              username: step.operation_user_name,
            });
          } else if (
            step.state === WorkflowStepResV1StateEnum.approved && //approved 审批通过状态
            step.type === WorkflowStepResV1TypeEnum.sql_execute && //sql执行类型
            props.scheduleTime
          ) {
            operator = (
              <div>
                {t('order.operator.scheduleExec', {
                  username: step.operation_user_name,
                  time: formatTime(props.scheduleTime),
                })}
                {getOperatorTimeElement(
                  props.execStartTime,
                  props.execEndTime,
                  props.currentOrderStatus
                )}
              </div>
            );
          } else if (
            step.state === WorkflowStepResV1StateEnum.approved && //approved 审批通过状态
            step.type === WorkflowStepResV1TypeEnum.sql_execute && //sql执行类型
            !props.scheduleTime
          ) {
            operator = (
              <div>
                {t('order.operator.executing', {
                  username: step.operation_user_name,
                })}
                {getOperatorTimeElement(
                  props.execStartTime,
                  props.execEndTime,
                  props.currentOrderStatus
                )}
              </div>
            );
          }

          if (props.currentStep && (step.number ?? 0) > props.currentStep) {
            //当前有步骤且该步骤大于当前步数
            operator = t('order.operator.notArrival');
          }

          if (props.currentStep === undefined) {
            //当前步骤为undefined
            if (
              props.currentOrderStatus ===
                WorkflowRecordResV1StatusEnum.canceled && //当前工单状态为驳回
              step.state === WorkflowStepResV1StateEnum.initialized // 步骤状态是初始化
            ) {
              operator = t('order.operator.alreadyClosed');
            } else if (step.state === WorkflowStepResV1StateEnum.initialized) {
              // 步骤状态是初始化
              operator = t('order.operator.alreadyRejected');
            } else if (step.state === WorkflowStepResV1StateEnum.rejected) {
              // 步骤状态是驳回
              operator = (
                <>
                  <div>
                    <Typography.Text>
                      {t('order.operator.rejectDetail', {
                        name: step.operation_user_name,
                      })}
                    </Typography.Text>
                  </div>
                  <Typography.Text type="danger">
                    {t('order.operator.rejectReason')}:{step.reason}
                  </Typography.Text>
                  <div>
                    <Typography.Text type="danger">
                      ({t('order.operator.rejectTips')})
                    </Typography.Text>
                  </div>
                </>
              );
            }
          }

          const icon =
            props.currentStep === step.number ? (
              <ClockCircleOutlined className="timeline-clock-icon" />
            ) : undefined;
          let color = stepStateStatus[step.state ?? 'unknown'].color;
          if (
            step.type === WorkflowStepResV1TypeEnum.create_workflow ||
            step.type === WorkflowStepResV1TypeEnum.update_workflow
          ) {
            color = stepStateStatus.approved.color;
          }
          return (
            <Timeline.Item
              key={step.workflow_step_id || step.operation_time}
              dot={icon}
              color={color}
            >
              <Row>
                <Col span={5}>
                  <Col span={24}>
                    {t('order.operator.time')}:
                    {formatTime(step.operation_time, '--')}
                  </Col>
                  <Col span={24}>
                    {t('order.operator.user')}:
                    {step.operation_user_name ?? '--'}
                  </Col>
                </Col>
                <Col span={19}>{operator}</Col>
              </Row>
            </Timeline.Item>
          );
        })}
      </Timeline>
      <Modal
        title={t('order.operator.reject')}
        visible={rejectModalVisible}
        closable={false}
        footer={null}
      >
        <Form {...ModalFormLayout} form={form} onFinish={reject}>
          <Form.Item
            label={t('order.operator.rejectReason')}
            name="reason"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea placeholder={t('common.form.placeholder.input')} />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Space>
              <Button type="primary" htmlType="submit" loading={rejectLoading}>
                {t('order.operator.reject')}
              </Button>
              <Button onClick={resetAndCloseRejectModal}>
                {t('common.cancel')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={t('order.operator.onlineRegularly')}
        visible={scheduleVisible}
        closable={false}
        footer={null}
      >
        <Form {...ModalFormLayout} form={timeForm} onFinish={execSchedule}>
          <Form.Item
            label={t('order.operator.scheduleTime')}
            name="schedule_time"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime
              showNow={false}
              data-testid="start-date"
            />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={scheduleLoading}
                data-testid="confirm-button"
              >
                {t('order.operator.onlineRegularly')}
              </Button>
              <Button onClick={resetAndCloseScheduleModal}>
                {t('common.cancel')}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderSteps;
