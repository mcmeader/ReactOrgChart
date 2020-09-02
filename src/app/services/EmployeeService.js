import { doDelete, doGet, doPost, doPut } from "./ApiService";

const serviceUrl = "/emps"
const archivedEmpUrl = serviceUrl + "/archives"

export const getEmployees = () => {
    let response = doGet(serviceUrl)
}

export const getArchivedEmployees = () => {
    doGet(archivedEmpUrl)
}

export const getEmployeesByManagerId = (managerId) => {
    doGet(serviceUrl + "/" + managerId)
}

export const getEmployeeById = (employeeId) => {
    doGet(serviceUrl + "/" + employeeId)
}

export const createEmployee = (employee) => {
    doPost(serviceUrl, employee)
}

export const updateEmployee = (employee) => {
    doPut(serviceUrl, employee)
}

export const deleteEmployee = (employeeId) => {
    doDelete(serviceUrl + "/" + employeeId)
}
