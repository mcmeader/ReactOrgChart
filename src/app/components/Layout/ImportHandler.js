import { employeeTableHeaders } from '../../constants/EmployeeTableHeaders';
import { jobTitleTableHeaders } from '../../constants/JobTitleTableHeaders';
import { departmentTableHeaders } from '../../constants/DepartmentTableHeaders';
import { getEmployees, createEmployee, deleteEmployee, updateEmployee, getEmployeeById, getEmployeesByManagerId, getArchivedEmployees } from '../../services/EmployeeService';
import { getActiveDepartments, createDepartment, deleteDepartment, updateDepartment, getDepartmentById } from '../../services/DepartmentService';
import { getJobTitles, createJobTitle, deleteJobTitle, updateJobTitle, getJobTitle } from '../../services/JobTitleService';
import EmployeeReducer, { initialEmployee } from '../../reducers/EmployeeReducer';
import JobTitleReducer, { initialJobTitle } from '../../reducers/JobTitleReducer';
import DepartmentReducer, { initialDepartment } from '../../reducers/DepartmentReducer';

export const getData = (type) => {
    switch (type) {
        case 'employee':
            return {
                headerValues: employeeTableHeaders,
                getService: getEmployees,
                getArchivedService: getArchivedEmployees,
                getByIdService: getEmployeeById,
                getByManagerIdService: getEmployeesByManagerId,
                createService: createEmployee,
                editService: updateEmployee,
                deleteService: deleteEmployee,
                reducer: EmployeeReducer,
                initialValue: initialEmployee
            }
        case 'department':
            return {
                headerValues: departmentTableHeaders,
                getService: getActiveDepartments,
                getByIdService: getDepartmentById,
                createService: createDepartment,
                editService: updateDepartment,
                deleteService: deleteDepartment,
                reducer: DepartmentReducer,
                initialValue: initialDepartment
            }
        case 'job-title':
            return {
                headerValues: jobTitleTableHeaders,
                getService: getJobTitles,
                getByIdService: getJobTitle,
                createService: createJobTitle,
                editService: updateJobTitle,
                deleteService: deleteJobTitle,
                reducer: JobTitleReducer,
                initialValue: initialJobTitle
            }
    }
}