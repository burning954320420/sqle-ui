// eslint-disable-next-line import/no-anonymous-default-export
export default {
  pageTitle: 'Ticket',
  result: 'Audit conclusion',
  passRage: 'Audit pass rate',
  duplicate: 'Duplicate removal',
  downloadSql: 'Download SQL',
  downloadReport: 'Download audit report',
  table: {
    number: 'S/N',
    auditLevel: 'Execute level',
    auditStatus: 'Execute status',
    auditResult: 'Execute result',
    execSql: 'Execute SQL',
    execStatus: 'Execute status',
    execResult: 'Execute result',
    rollback: 'Rollback',
    describe: 'Describe',
  },

  execStatus: {
    initialized: 'Ready to execute',
    doing: 'Executing',
    succeeded: 'Success',
    failed: 'Failed',
  },

  auditStatus: {
    initialized: 'Ready to audit',
    doing: 'Auditing',
    finished: 'Finished',
  },
};
