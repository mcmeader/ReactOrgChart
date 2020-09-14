import { doDelete, doGet, doPost, doPut } from "./ApiService";

const serviceUrl = "/depts"
const archivedDeptsUrl = serviceUrl + "/archives"

export const getActiveDepartments = () => {
    return doGet(serviceUrl)
}

export const getArchivedDepartments = () => {
    return doGet(archivedDeptsUrl)
}

export const getDepartmentById = (departmentId) => {
    return doGet(serviceUrl + "/" + departmentId)
}

export const createDepartment = (department) => {
    return doPost(serviceUrl, department)
}

export const updateDepartment = (department) => {
    return doPut(serviceUrl, department)
}

export const deleteDepartment = (departmentId) => {
    doDelete(serviceUrl + "/" + departmentId)
}
