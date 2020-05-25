import {
  DEPARTMENTS_FETCHED,
  DEPARTMENTS_REQUESTED, DEPARTMENTS_RESET,
  EMPLOYEES_FETCHED,
  EMPLOYEES_REQUESTED,
  EMPLOYEES_RESET
} from "./actionTypes";

export const employeesRequested = () => ({
  type: EMPLOYEES_REQUESTED,
});

export const employeesFetched = (payload) => ({
  type: EMPLOYEES_FETCHED,
  employees: payload.employees
});

export const employeesReset = () => ({
  type: EMPLOYEES_RESET
});

export const departmentsRequested = () => ({
  type: DEPARTMENTS_REQUESTED,
});

export const departmentsFetched = (payload) => ({
  type: DEPARTMENTS_FETCHED,
  departments: payload.departments
});

export const departmentsReset = () => ({
  type: DEPARTMENTS_RESET
});
