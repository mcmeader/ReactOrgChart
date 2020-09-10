import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import Layout from "./components/Layout";
import CreateComponent from './components/Layout/CenterComponents/CreateComponent/CreateComponent';
import TabledComponent from './components/Layout/CenterComponents/TabledComponent/TabledComponent';
import OrgChart from './components/Layout/CenterComponents/OrgChart/OrgChart';
import { employeeTableHeaders } from './constants/EmployeeTableHeaders';
import { getEmployees, createEmployee, deleteEmployee, updateEmployee } from './services/EmployeeService';
import { jobTitleTableHeaders } from './constants/JobTitleTableHeaders';
import { departmentTableHeaders } from './constants/DepartmentTableHeaders';
import { getActiveDepartments, createDepartment, deleteDepartment, updateDepartment } from './services/DepartmentService';
import { getJobTitles, createJobTitle, deleteJobTitle, updateJobTitle } from './services/JobTitleService';
import EmployeeReducer, { initialEmployee } from './reducers/EmployeeReducer';
import JobTitleReducer, { initialJobTitle } from './reducers/JobTitleReducer';
import DepartmentReducer, { initialDepartment } from './reducers/DepartmentReducer';
import CreateEmployee from './components/Layout/CenterComponents/CreateEmployee/CreateEmployee';
import EditComponent from './components/Layout/CenterComponents/Edit Components/EditComponent';


const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider
                autoDismiss={true}>
                <Layout>
                    <Switch>
                        <Route exact path="/" />
                        <Route exact path="/orgchart" >
                            <OrgChart />
                        </Route>
                        <Route path="/employees" >
                            <TabledComponent
                                headerValues={employeeTableHeaders}
                                fetchData={getEmployees}
                                editService={updateEmployee}
                                deleteHandler={deleteEmployee}
                                componentName="employee" />
                        </Route>
                        <Route path="/departments" >
                            <TabledComponent
                                headerValues={departmentTableHeaders}
                                fetchData={getActiveDepartments}
                                editService={updateDepartment}
                                deleteHandler={deleteDepartment}
                                componentName="department" />
                        </Route>
                        <Route path="/job-titles" >
                            <TabledComponent
                                headerValues={jobTitleTableHeaders}
                                fetchData={getJobTitles}
                                editService={updateJobTitle}
                                deleteHandler={deleteJobTitle}
                                componentName="job-title" />
                        </Route>
                        <Route exact path="/createemployee" >
                            <CreateEmployee
                                headerValues={employeeTableHeaders}
                                reducer={EmployeeReducer}
                                initialValue={initialEmployee}
                                createService={createEmployee}
                                editService={updateEmployee}
                                componentName="employee" />
                        </Route>
                        <Route exact path="/createdepartment" >
                            <CreateComponent
                                headerValues={departmentTableHeaders}
                                reducer={DepartmentReducer}
                                initialValue={initialDepartment}
                                createService={createDepartment}
                                editService={updateDepartment}
                                componentName="department" />
                        </Route>
                        <Route path="/createjobtitle" >
                            <CreateComponent
                                headerValues={jobTitleTableHeaders}
                                reducer={JobTitleReducer}
                                initialValue={initialJobTitle}
                                createService={createJobTitle}
                                editService={updateJobTitle}
                                componentName="job-title" />
                        </Route>
                        <Route path="/editfield">
                            <EditComponent />
                        </Route>
                    </Switch>
                </Layout>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
