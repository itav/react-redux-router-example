import {
  DEPARTMENTS_FETCHED,
  DEPARTMENTS_REQUESTED, DEPARTMENTS_RESET,
  EMPLOYEES_FETCHED,
  EMPLOYEES_REQUESTED, EMPLOYEES_RESET
} from "../actions/actionTypes";
import {initialState} from "../store/store";

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case EMPLOYEES_REQUESTED:
      return {
        ...state,
        fetching: true,
        employees: []
      };
    case EMPLOYEES_FETCHED:
      return {
        ...state,
        fetching: false,
        employees: action.employees || []
      };
    case EMPLOYEES_RESET:
      return {
        ...state,
        fetching: false,
        employees: []
      };
    case DEPARTMENTS_REQUESTED:
      return {
        ...state,
        fetching: true,
        departments: []
      };
    case DEPARTMENTS_FETCHED:
      return {
        ...state,
        fetching: false,
        departments: action.departments || []
      };
    case DEPARTMENTS_RESET:
      return {
        ...state,
        fetching: false,
        departments: []
      };
  }

  return state;
}
