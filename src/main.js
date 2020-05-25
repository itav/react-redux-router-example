import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from "./reducers/apiReducer";
import {
  departmentsFetched,
  employeesFetched,
  employeesReset,
  employeesRequested,
  departmentsRequested,
  departmentsReset
} from "./actions/actions";
import createSagaMiddleware from 'redux-saga';
import {takeLatest, call, put, all} from 'redux-saga/effects'
import {EMPLOYEES_REQUESTED, DEPARTMENTS_REQUESTED} from "./actions/actionTypes";
import axios from 'axios';
import '@babel/polyfill';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

async function getApiData(resource) {
  try {
    const response = await axios.get(`http://localhost:8080/${resource}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function* fetchEmployees() {
  const employees = yield call(getApiData, 'employees')
  yield put(employeesFetched({employees}))
}

function* fetchDepartments() {
  const departments = yield call(getApiData, 'departments')
  yield put(departmentsFetched({departments}))
}

function* rootSaga() {
  yield all([
    takeLatest(EMPLOYEES_REQUESTED, fetchEmployees),
    takeLatest(DEPARTMENTS_REQUESTED, fetchDepartments),
  ]);
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <div>
      <div>Application</div>
      <Menu/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/employees' component={ListEmployeesContainer}/>
        <Route path='/departments' component={ListDepartmentsContainer}/>
      </Switch>
    </div>
  );
}

function Menu() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/employees'>Employees</Link>
        </li>
        <li>
          <Link to='/departments'>Departments</Link>
        </li>
      </ul>
    </div>
  );
}

function Home() {
  return (
    <div>Home</div>
  );
}

class ListEmployees extends React.Component {
  render() {
    return (
      <div>
        <div>Employees:</div>
        <button onClick={this.props.employeesRequested}>Fetch Data</button>
        <button onClick={this.props.employeesReset}>Reset</button>
        <ul>
          {this.props.employees.map(employee => (
            <li key={employee.id}>
              <div>id: {employee.id}</div>
              <div>firstName: {employee.firstName}</div>
              <div>lastName: {employee.lastName}</div>
              <div>position: {employee.position}</div>
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

class ListDepartments extends React.Component {
  render() {
    return (
      <div>
        <div>Departments:</div>
        <button onClick={this.props.departmentsRequested}>Fetch Data</button>
        <button onClick={this.props.departmentsReset}>Reset</button>
        <ul>
          {this.props.departments.map(department => (
            <li key={department.id}>
              <div>id: {department.id}</div>
              <div>firstName: {department.name}</div>
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

const ListEmployeesContainer = connect(
  (state) => ({employees: state.employees}),
  {employeesRequested, employeesReset}
)(ListEmployees);

const ListDepartmentsContainer = connect(
  (state) => ({departments: state.departments}),
  {departmentsRequested, departmentsReset}
)(ListDepartments);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
