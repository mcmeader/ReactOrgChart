import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import Layout from "./components/Layout";

const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider
                autoDismiss={true}>
                <Layout>
                    <Switch>
                    </Switch>
                </Layout>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
