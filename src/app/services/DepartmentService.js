import { doDelete, doGet, doPost, doPut } from "./ApiService";

const serviceUrl = "/depts"
const archivedDeptsUrl = serviceUrl + "/archives"

export const getActiveDepartments = () => {
    return doGet(serviceUrl)
}

export const getArchivedDepartments = () => {
    doGet(archivedDeptsUrl)
}

export const getDepartmentById = (departmentId) => {
    doGet(serviceUrl + "/" + departmentId)
}

export const createDepartment = (department) => {
    doPost(serviceUrl, department)
}

export const updateDepartment = (department) => {
    doPut(serviceUrl, department)
}

export const deleteDepartment = (departmentId) => {
    doDelete(serviceUrl + "/" + departmentId)
}
