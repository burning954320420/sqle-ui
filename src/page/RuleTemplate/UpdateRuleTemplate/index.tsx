import { useBoolean, useRequest } from 'ahooks';
import { Button, Card, Result, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { IRuleResV1 } from '../../../api/common';
import ruleTemplate from '../../../api/rule_template';
import { ResponseCode } from '../../../data/common';
import RuleTemplateForm from '../RuleTemplateForm';
import { RuleTemplateBaseInfoFields } from '../RuleTemplateForm/BaseInfoForm/index.type';

const UpdateRuleTemplate = () => {
  const { t } = useTranslation();
  const [step, setStep] = React.useState(0);
  const [form] = useForm<RuleTemplateBaseInfoFields>();
  const [updateTemplateLoading, { toggle: updateLoading }] = useBoolean();
  const [activeRule, setActiveRule] = React.useState<IRuleResV1[]>([]);
  const urlParams = useParams<{ templateName: string }>();

  const baseInfoFormSubmit = React.useCallback(async () => {
    await form.validateFields();
    setStep(step + 1);
  }, [form, step]);

  const prevStep = React.useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const { data: allRules, loading: getAllRulesLoading } = useRequest(
    ruleTemplate.getRuleListV1.bind(ruleTemplate),
    {
      formatResult(res) {
        return res.data.data ?? [];
      },
    }
  );

  const submit = React.useCallback(() => {
    updateLoading(true);
    const baseInfo = form.getFieldsValue();
    const activeRuleWithNewField = activeRule.map(rule => {
      return {
        name: rule.rule_name,
        level: rule.level,
        desc: rule.desc,
        type: rule.type,
        value: rule.value,
        db_type: rule.db_type
      }
    })
    ruleTemplate
      .updateRuleTemplateV1({
        rule_template_name: baseInfo.templateName,
        desc: baseInfo.templateDesc,
        instance_name_list: baseInfo.instances ?? [],
        rule_list: activeRuleWithNewField,
      })
      .then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          setStep(step + 1);
        }
      })
      .finally(() => {
        updateLoading(false);
      });
  }, [activeRule, form, step, updateLoading]);

  React.useEffect(() => {
    ruleTemplate
      .getRuleTemplateV1({
        rule_template_name: urlParams.templateName,
      })
      .then((res) => {
        if (res.data.code === ResponseCode.SUCCESS) {
          const template = res.data.data;
          form.setFieldsValue({
            templateName: template?.rule_template_name,
            templateDesc: template?.desc || undefined,
            instances: template?.instance_name_list ?? [],
          });
          setActiveRule(template?.rule_list as  Array<IRuleResV1>)
        }
      });
  }, [form, urlParams.templateName]);

  return (
    <>
      <Card
        title={t('ruleTemplate.updateRuleTemplate.title')}
        extra={[
          <Link to="/rule/template" key="back">
            <Button type="primary">{t('common.back')}</Button>
          </Link>,
        ]}
      >
        <RuleTemplateForm
          form={form}
          activeRule={activeRule}
          allRules={allRules ?? []}
          ruleListLoading={getAllRulesLoading}
          submitLoading={updateTemplateLoading}
          step={step}
          updateActiveRule={setActiveRule}
          baseInfoSubmit={baseInfoFormSubmit}
          prevStep={prevStep}
          submit={submit}
          isUpdate={true}
        >
          <Result
            status="success"
            title={t('ruleTemplate.updateRuleTemplate.successTitle')}
          />
          <Row justify="center">
            <Link to="/rule/template">
              <Button type="primary">{t('ruleTemplate.backToList')}</Button>
            </Link>
          </Row>
        </RuleTemplateForm>
      </Card>
    </>
  );
};

export default UpdateRuleTemplate;
