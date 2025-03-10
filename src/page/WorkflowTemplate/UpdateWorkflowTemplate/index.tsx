import { Button, Card, Result, Row } from 'antd';
import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  IWorkFlowStepTemplateReqV1,
  IWorkflowTemplateDetailResV1,
} from '../../../api/common';
import { UpdateWorkflowTemplateReqV1AllowSubmitWhenLessAuditLevelEnum } from '../../../api/common.enum';
import workflow from '../../../api/workflow';
import { IUpdateWorkflowTemplateV1Return } from '../../../api/workflow/index.d';
import { ResponseCode } from '../../../data/common';
import WorkflowTemplateForm from '../WorkflowTemplateForm';
import { BaseFormFields } from '../WorkflowTemplateForm/BaseForm/index.type';

const UpdateWorkflowTemplate = () => {
  const { t } = useTranslation();
  const baseFormValue = useRef<BaseFormFields>();
  const [workflowTemplate, setWorkflowTemplate] =
    useState<IWorkflowTemplateDetailResV1>();
  const urlParams = useParams<{ workflowName: string }>();
  const history = useHistory();

  const updateBaseInfo = (info: BaseFormFields) => {
    baseFormValue.current = info;
  };

  const submitProgress = (
    progressConfig: IWorkFlowStepTemplateReqV1[]
  ): Promise<AxiosResponse<IUpdateWorkflowTemplateV1Return>> => {
    return workflow.updateWorkflowTemplateV1({
      workflow_template_name: urlParams.workflowName,
      desc: baseFormValue.current?.desc,
      instance_name_list: baseFormValue.current?.instanceNameList,
      workflow_step_template_list: progressConfig,
      allow_submit_when_less_audit_level: baseFormValue.current
        ?.allowSubmitWhenLessAuditLevel as
        | UpdateWorkflowTemplateReqV1AllowSubmitWhenLessAuditLevelEnum
        | undefined,
    });
  };

  const getWorkflowProgress = () => {
    workflow
      .getWorkflowTemplateV1({ workflow_template_name: urlParams.workflowName })
      .then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          setWorkflowTemplate(res.data.data);
        }
      });
  };

  useEffect(() => {
    if (!!urlParams.workflowName) {
      getWorkflowProgress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, urlParams]);

  return (
    <Card
      title={t('workflowTemplate.update.title.wrapper')}
      extra={[
        <Link to="/progress" key="go-back">
          <Button type="primary">{t('common.back')}</Button>
        </Link>,
      ]}
    >
      <WorkflowTemplateForm
        defaultData={workflowTemplate}
        updateBaseInfo={updateBaseInfo}
        submitProgress={submitProgress}
      >
        <Result
          status="success"
          title={t('workflowTemplate.update.result.title')}
        />
        <Row justify="center">
          <Link
            to={`/progress/detail/${workflowTemplate?.workflow_template_name}`}
          >
            <Button type="primary">
              {t('workflowTemplate.update.result.showNow')}
            </Button>
          </Link>
        </Row>
      </WorkflowTemplateForm>
    </Card>
  );
};

export default UpdateWorkflowTemplate;
