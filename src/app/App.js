import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import Layout from "./components/Layout";
import JobTitles from './components/Layout/CenterComponents/JobTitles/JobTitles';
import Departments from './components/Layout/CenterComponents/Departments/Departments';
import Employees from './components/Layout/CenterComponents/Employees/Employees';
import { getEmployees } from './services/EmployeeService';
import { getActiveDepartments } from './services/DepartmentService';
import { getJobTitles } from './services/JobTitleService';
import EmployeeReducer from './reducers/EmployeeReducer';
import DepartmentReducer from './reducers/DepartmentReducer';
import JobTitleReducer from './reducers/JobTitleReducer';

const App = () => {
    const [employeeState, employeeDispatch] = useReducer(EmployeeReducer, null)
    const [departmentState, departmentDispatch] = useReducer(DepartmentReducer, null)
    const [jobTitleState, jobTitleDispatch] = useReducer(JobTitleReducer, null)

    return (
        <BrowserRouter>
            <ToastProvider>
                {/* // autoDismiss={true}> */}
                <Layout>
                    <Switch>
                        <Route exact path="/" >
                        </Route>
                        {/* <Route exact path="/orgchart" />
                        <OrgChart /> */}
                        <Route path="/employees" >
                            {console.log(employeeState)}
                            <Employees state={employeeState} />
                        </Route>
                        {/* <Route exact path="/createemployee" />
                        <createEmployee /> */}
                        <Route path="/departments" >
                            <Departments state={departmentState} />
                        </Route>
                        {/* <Route exact path="/createdepartment" />
                        <createDepartment /> */}
                        <Route path="/jobTitles" >
                            <JobTitles state={jobTitleState} />
                        </Route>
                        {/* <Route exact path="/createjobtitle" />
                        <createJobTitle /> */}
                    </Switch>
                </Layout>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
