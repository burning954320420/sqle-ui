import { Button, Descriptions, Divider } from 'antd';
import React from 'react';
import { useBoolean } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { IRuleResV1 } from '../../../../api/common';
import RuleList from '../../../../components/RuleList';
import useSyncRuleListTab from '../../../../components/RuleList/useSyncRuleListTab';
import { RuleSelectProps } from './index.type';
import { useForm } from 'antd/lib/form/Form';
import RuleManagerModal from './ruleManagerModal'
import { RuleResV1LevelEnum } from "../../../../api/common.enum";

const RuleSelect: React.FC<RuleSelectProps> = (props) => {
  const { t } = useTranslation();
  const [form] = useForm<IRuleResV1>();
  const [ 
    visible ,
    {setTrue: setVisibleTrue, setFalse: setVisibleFalse} 
  ] = useBoolean();

  const [ruleData, setRuleData] = React.useState<IRuleResV1>({
    level: RuleResV1LevelEnum.normal,
    value: '',
    desc:'',
    type:'',
    rule_name:''
  })
  const { tabKey, allTypes, tabChange } = useSyncRuleListTab(props.allRules);

  const disableRule = React.useMemo(() => {
    return (
      props.allRules?.filter(
        (e) => !props.activeRule?.find((item) => item.rule_name === e.rule_name)
      ) ?? []
    );
  }, [props.activeRule, props.allRules]);

  const updateRule = React.useCallback(
    (ruleItem: IRuleResV1, isDelete = false) => {
      let temp: IRuleResV1[] = [];
      if (isDelete) {
        temp = props.activeRule.filter(
          (e) => e.rule_name !== ruleItem.rule_name
        );
      } else {
        temp = [...props.activeRule];
        temp.push(ruleItem);
      }
      props.updateActiveRule(temp);
    },
    [props]
  );

  const editRule = React.useCallback((ruleItem: IRuleResV1) => {
    setRuleData(ruleItem)
    setVisibleTrue();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props, setVisibleTrue, visible])

  const submit = React.useCallback(async () => {
    const values = await form.validateFields();
    const index: number = props.activeRule.findIndex(e => e.rule_name === values.rule_name)
    let temp: IRuleResV1[] = [];
    temp = props.activeRule;
    temp.splice(index,1,values)
    props.updateActiveRule(temp);
    setVisibleFalse()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[form, props, visible, ruleData, setVisibleFalse,])

  const updateAllRule = React.useCallback(
    (active: boolean) => {
      if (active) {
        props.updateActiveRule([...(props.allRules ?? [])]);
      } else {
        props.updateActiveRule([]);
      }
    },
    [props]
  );

  return (
    <>
      <Descriptions
        title={t('ruleTemplate.ruleTemplateForm.activeRuleTitle')}
        extra={[
          <Button
            key="disable-all"
            danger
            type="primary"
            disabled={props.activeRule.length === 0}
            onClick={updateAllRule.bind(null, false)}
          >
            {t('ruleTemplate.ruleTemplateForm.disableAllRules')}
          </Button>,
        ]}
      />
      <RuleList
        list={props.activeRule ?? []}
        listProps={{ loading: props.listLoading }}
        allRuleTabs={allTypes}
        tabChange={tabChange}
        currentTab={tabKey}
        actions={(item) => {
          return [
            <Button
              onClick={editRule.bind(null, item)}
              key={`${item.rule_name}-edit-item`}
              type="link"
            >
              {t('ruleTemplate.ruleTemplateForm.editRule')}
            </Button>,
            <Button
              onClick={updateRule.bind(null, item, true)}
              key={`${item.rule_name}-disable-item`}
              type="link"
              danger
            >
              {t('ruleTemplate.ruleTemplateForm.disableRule')}
            </Button>
          ];
        }}
      />
      <Divider dashed={true} />
      <Descriptions
        title={t('ruleTemplate.ruleTemplateForm.disableRuleTitle')}
        extra={[
          <Button
            key="active-all"
            type="primary"
            disabled={disableRule.length === 0}
            onClick={updateAllRule.bind(null, true)}
          >
            {t('ruleTemplate.ruleTemplateForm.activeAllRules')}
          </Button>,
        ]}
      />
      <RuleList
        list={disableRule}
        listProps={{ loading: props.listLoading }}
        allRuleTabs={allTypes}
        tabChange={tabChange}
        currentTab={tabKey}
        actions={(item) => {
          return [
            <Button
              onClick={updateRule.bind(null, item, false)}
              key={`${item.rule_name}-active-item`}
              type="link"
            >
              {t('ruleTemplate.ruleTemplateForm.activeRule')}
            </Button>,
          ];
        }}
      />
      <RuleManagerModal
        visible={visible}
        submit={submit}
        setVisibleFalse={setVisibleFalse}
        ruleData={ruleData}
        form={form}
       />
    </>
  );
};

export default RuleSelect;
