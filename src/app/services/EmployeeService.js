import { doDelete, doGet, doPost, doPut } from "./ApiService";

const serviceUrl = "/emps"
const archivedEmpUrl = serviceUrl + "/archives"

export const getEmployees = () => {
    return doGet(serviceUrl)
}

export const getArchivedEmployees = () => {
    return doGet(archivedEmpUrl)
}

export const getEmployeesByManagerId = (managerId) => {
    return doGet(serviceUrl + "/manager/" + managerId)
}

export const getEmployeeById = (employeeId) => {
    return doGet(serviceUrl + "/" + employeeId)
}

export const createEmployee = (employee) => {
    return doPost(serviceUrl, employee)
}

export const updateEmployee = (employee) => {
    return doPut(serviceUrl, employee)
}

export const deleteEmployee = (employeeId) => {
    return doDelete(serviceUrl + "/" + employeeId)
}
