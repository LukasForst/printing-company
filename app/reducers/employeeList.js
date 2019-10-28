// @flow

import { DELETE_EMPLOYEE, SAVE_EMPLOYEE } from '../actions/EmployeeListActions';
import type { Action } from './types';
import { Employee } from '../dtos/Employee';

export default function employees(
  state: Map<number, Employee> = new Map(),
  action: Action
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_EMPLOYEE:
      return saveEmployee(copyMap, action.payload);
    case DELETE_EMPLOYEE:
      return deleteEmployee(copyMap, action.payload);
    default:
      return state;
  }
}

function deleteEmployee(copyMap: Map<number, Employee>, employeeId: number) {
  copyMap.delete(employeeId);
  return copyMap;
}

function saveEmployee(copyMap: Map<number, Employee>, toSave: Employee) {
  let employee;

  if (!toSave.id) {
    employee = { ...toSave };
    employee.id = Math.max(...Array.from(copyMap.keys())) + 1;
  } else {
    employee = toSave;
  }

  copyMap.set(employee.id, employee);
  return copyMap;
}