import { doDelete, doGet, doPost, doPut } from "./ApiService";

const serviceUrl = "/titles"
const archivedTitlesUrl = serviceUrl + "/archives"

export const getJobTitles = () => {
    return (doGet(serviceUrl))
}

export const getArchivedJobTitles = () => {
    return (doGet(archivedTitlesUrl))
}

export const getJobTitle = (jobTitleId) => {
    return (doGet(serviceUrl + "/" + jobTitleId))
}

export const createJobTitle = (jobTitle) => {
    doPost(serviceUrl, jobTitle)
}

export const updateJobTitle = (jobTitle) => {
    doPut(serviceUrl, jobTitle)
}

export const deleteJobTitle = (jobTitleId) => {
    doDelete(serviceUrl + "/" + jobTitleId)
}
