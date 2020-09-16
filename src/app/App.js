import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'

import Layout from "./components/Layout";
import CreateEditComponent from './components/Layout/CreateEditComponent/CreateEditComponent';
import TabledComponent from './components/Layout/TabledComponent/TabledComponent';
import OrgChart from './components/Layout/OrgChart/OrgChart'

const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider
                autoDismiss={true}>
                <Layout>
                    <Switch>
                        <Route exact path="/">
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
                            <CreateEditComponent componentType="employee" />
                        </Route>
                        <Route exact path="/createdepartment" >
                            <CreateEditComponent componentType="department" />
                        </Route>
                        <Route path="/createjobtitle" >
                            <CreateEditComponent componentType="job-title" />
                        </Route>
                        <Route path="/editfield">
                            <CreateEditComponent />
                        </Route>
                    </Switch>
                </Layout>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
