import { PageHeader, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import GlobalSetting from './GlobalSetting';
import LDAPSetting from './LDAPSetting';
import SMTPSetting from './SMTPSetting';

const System = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('system.pageTitle')} ghost={false}>
        {t('system.pageDesc')}
      </PageHeader>
      <section className="padding-content">
        <Space direction="vertical" className="full-width-element">
          <SMTPSetting />
          <GlobalSetting />
          <LDAPSetting />
        </Space>
      </section>
    </>
  );
};

export default System;
