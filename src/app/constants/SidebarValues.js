import React from 'react'
import CreateDepartment from '../components/Layout/CenterComponents/CreateDepartment/CreateDepartment';
import CreateEmployee from '../components/Layout/CenterComponents/CreateEmployee/CreateEmployee';
import CreateJobTitle from '../components/Layout/CenterComponents/CreateJobTitle/CreateJobTitle';
import Departments from '../components/Layout/CenterComponents/Departments/Departments';
import Employees from '../components/Layout/CenterComponents/Employees/Employees';
import JobTitle from '../components/Layout/CenterComponents/JobTitles/JobTitles';
import OrgChart from '../components/Layout/CenterComponents/OrgChart/OrgChart';

export const sidebarValues = [
    { mainValue: "Org Chart", mainValueClass: <OrgChart />, subValue: null, subValueClass: null },
    { mainValue: "Employees", mainValueClass: <Employees />, subValue: "Create Employee", subValueClass: <CreateEmployee /> },
    { mainValue: "Departments", mainValueClass: <Departments />, subValue: "Create Department", subValueClass: <CreateDepartment /> },
    { mainValue: "JobTitles", mainValueClass: <JobTitle />, subValue: "Create Job Title", subValueClass: <CreateJobTitle /> },
]