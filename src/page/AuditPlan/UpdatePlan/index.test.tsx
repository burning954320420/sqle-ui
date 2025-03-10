import { fireEvent, waitFor, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import UpdateAuditPlan from '.';
import audit_plan from '../../../api/audit_plan';
import EmitterKey from '../../../data/EmitterKey';
import { getBySelector } from '../../../testUtils/customQuery';
import { renderWithRouter } from '../../../testUtils/customRender';
import {
  mockDriver,
  mockUseInstance,
  mockUseInstanceSchema,
  resolveThreeSecond,
} from '../../../testUtils/mockRequest';
import EventEmitter from '../../../utils/EventEmitter';
import { auditTaskMetas } from '../PlanForm/__testData__/auditMeta';
import { AuditPlan } from '../PlanList/__testData__';
jest.mock('react-router', () => {
  return {
    ...jest.requireActual('react-router'),
    useParams: jest.fn(),
  };
});
describe('UpdateAuditPlan', () => {
  let warningSpy!: jest.SpyInstance;
  const useParamsMock: jest.Mock = useParams as jest.Mock;
  beforeAll(() => {
    const warning = global.console.warn;
    warningSpy = jest.spyOn(global.console, 'warn');
    warningSpy.mockImplementation((message: string) => {
      if (message.includes('async-validator')) {
        return;
      }
      warning(message);
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    useParamsMock.mockReturnValue({ auditPlanName: 'auditPlanName1' });
    mockDriver();
    mockUseInstance();
    mockUseInstanceSchema();
    mockGetAuditPlan();
    mockGetAuditMeta();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  afterAll(() => {
    warningSpy.mockRestore();
  });

  const mockGetAuditPlan = () => {
    const spy = jest.spyOn(audit_plan, 'getAuditPlanV1');
    spy.mockImplementation(() => resolveThreeSecond(AuditPlan));
    return spy;
  };

  const mockUpdateAuditPlan = () => {
    const spy = jest.spyOn(audit_plan, 'updateAuditPlanV1');
    spy.mockImplementation(() => resolveThreeSecond({}));
    return spy;
  };

  const mockGetAuditMeta = () => {
    const spy = jest.spyOn(audit_plan, 'getAuditPlanMetasV1');
    spy.mockImplementation(() => resolveThreeSecond(auditTaskMetas));
    return spy;
  };

  test('should set form default value to specify instance', async () => {
    const { container } = renderWithRouter(<UpdateAuditPlan />);
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(container).toMatchSnapshot();
  });

  test('should send update audit plan request when user input all files and click submit', async () => {
    const updateSpy = mockUpdateAuditPlan();
    const getAuditPlanSpy = mockGetAuditPlan();
    const { container } = renderWithRouter(<UpdateAuditPlan />);
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.mouseDown(screen.getByLabelText('auditPlan.planForm.schema'));
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });
    const schemaOptions = screen.getAllByText('schema1');
    expect(schemaOptions[1]).toHaveClass('ant-select-item-option-content');
    fireEvent.click(schemaOptions[1]);

    fireEvent.click(screen.getByText('字段c'));

    fireEvent.click(screen.getByText('common.submit'));
    await waitFor(() => {
      jest.advanceTimersByTime(0);
    });

    expect(updateSpy).toBeCalledTimes(1);
    expect(updateSpy).toBeCalledWith({
      audit_plan_cron: '0 */2 * * *',
      audit_plan_instance_database: 'schema1',
      audit_plan_instance_name: 'db1',
      audit_plan_name: 'auditPlanName1',
      audit_plan_params: [
        {
          desc: '字段a',
          key: 'a',
          type: 'string',
          value: '123',
        },
        {
          desc: '字段b',
          key: 'b',
          type: 'int',
          value: '123',
        },
        {
          desc: '字段c',
          key: 'c',
          type: 'bool',
          value: 'false',
        },
      ],
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(container).toMatchSnapshot();
    expect(getAuditPlanSpy).toBeCalledTimes(1);
    const emitSpy = jest.spyOn(EventEmitter, 'emit');
    fireEvent.click(screen.getByText('common.close'));

    expect(emitSpy).toBeCalledTimes(1);
    expect(emitSpy).toBeCalledWith(EmitterKey.Rest_Audit_Plan_Form);

    expect(getBySelector('.ant-modal-wrap')).toHaveStyle('display: none');
    expect(getAuditPlanSpy).toBeCalledTimes(2);
  });
});
