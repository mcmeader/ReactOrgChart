import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import Layout from "./components/Layout";
import OrgChart from "./components/OrgChart";
import {CreateEmployee} from "./components/Employee";
import Departments from "./components/Department/Departments";
import JobTitles from "./components/JobTitle/JobTitles";
import Employees from "./components/Employee/Employees";
import CreateDepartment from "./components/Department/CreateDepartment";
import CreateJobTitle from "./components/JobTitle/CreateJobTitle";
import EditDepartment from "./components/Department/EditDepartment";
import EditEmployee from "./components/Employee/EditEmployee";
import EditJobTitle from "./components/JobTitle/EditJobTitle";

const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider
                autoDismiss={true}
            >
                <Layout>
                    <Switch>
                        <Route exact path="/employees/create" component={CreateEmployee} />
                        <Route exact path="/employees/edit/:id" component={EditEmployee} />
                        <Route exact path="/employees" component={Employees} />
                        <Route exact path="/departments/create" component={CreateDepartment} />
                        <Route exact path="/departments/edit/:id" component={EditDepartment} />
                        <Route exact path="/departments" component={Departments} />
                        <Route exact path="/job-titles/create" component={CreateJobTitle} />
                        <Route exact path="/job-titles/edit/:id" component={EditJobTitle} />
                        <Route exact path="/job-titles" component={JobTitles} />
                        <Route exact path="/" component={OrgChart} />
                    </Switch>
                </Layout>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
