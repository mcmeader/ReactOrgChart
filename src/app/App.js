import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import Layout from "./components/Layout";
import CreateComponent from './components/Layout/CenterComponents/CreateComponents/CreateComponent';
import TabledComponent from './components/Layout/CenterComponents/TabledComponents/TabledComponent';
import { employeeTableHeaders } from './constants/EmployeeTableHeaders';
import { getEmployees } from './services/EmployeeService';
import { jobTitleTableHeaders } from './constants/JobTitleTableHeaders';
import { departmentTableHeaders } from './constants/DepartmentTableHeaders';
import { getActiveDepartments } from './services/DepartmentService';
import { getJobTitles } from './services/JobTitleService';
import EmployeeReducer, { initialEmployee } from './reducers/EmployeeReducer';
import JobTitleReducer, { initialJobTitle } from './reducers/JobTitleReducer';
import DepartmentReducer, { initialDepartment } from './reducers/DepartmentReducer';

const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider
                autoDismiss={true}>
                <Layout>
                    <Switch>
                        <Route exact path="/" >
                        </Route>
                        {/* <Route exact path="/orgchart" />
                        <OrgChart /> */}
                        <Route path="/employees" >
                            <TabledComponent
                                headerValues={employeeTableHeaders}
                                fetchData={getEmployees} />
                        </Route>
                        <Route path="/departments" >
                            <TabledComponent
                                headerValues={departmentTableHeaders}
                                fetchData={getActiveDepartments} />
                        </Route>
                        <Route path="/jobTitles" >
                            <TabledComponent
                                headerValues={jobTitleTableHeaders}
                                fetchData={getJobTitles} />
                        </Route>
                        <Route exact path="/createemployee" >
                            <CreateComponent
                                headerValues={employeeTableHeaders}
                                reducer={EmployeeReducer}
                                initialValue={initialEmployee}
                            />
                        </Route>
                        <Route exact path="/createdepartment" >
                            <CreateComponent
                                headerValues={departmentTableHeaders}
                                reducer={DepartmentReducer}
                                initialValue={initialDepartment}
                            />
                        </Route>
                        <Route path="/createjobtitle" >
                            <CreateComponent
                                headerValues={jobTitleTableHeaders}
                                reducer={JobTitleReducer}
                                initialValue={initialJobTitle}
                            />
                        </Route>
                    </Switch>
                </Layout>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
