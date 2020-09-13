import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'

import Layout from "./components/Layout";
import CreateComponent from './components/Layout/CenterComponents/CreateComponent/CreateComponent';
import TabledComponent from './components/Layout/CenterComponents/TabledComponent/TabledComponent';
import OrgChart from './components/Layout/CenterComponents/OrgChart/OrgChart';
import CreateEmployee from './components/Layout/CenterComponents/CreateEmployee/CreateEmployee';
import EditComponent from './components/Layout/CenterComponents/Edit Component/EditComponent';

const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider
                autoDismiss={true}>
                <Layout>
                    <Switch>
                        <Route exact path="/" />
                        <Route path="/orgchart" component={OrgChart}>
                            <OrgChart />
                        </Route>
                        <Route path="/employees">
                            <TabledComponent componentType="employee" />
                        </Route>
                        <Route path="/departments">
                            <TabledComponent componentType="department" />
                        </Route>
                        <Route path="/job-titles">
                            <TabledComponent componentType="job-title" />
                        </Route>
                        <Route path="/createemployee">
                            <CreateEmployee componentType="employee" />
                        </Route>
                        <Route exact path="/createdepartment" >
                            <CreateComponent componentType="department" />
                        </Route>
                        <Route path="/createjobtitle" >
                            <CreateComponent componentType="job-title" />
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
