import {doDelete, doGet, doPost, doPut} from "./ApiService";

const serviceUrl = "/titles";

export const getJobTitles = () => {
    return doGet(serviceUrl);
}

export const getArchivedJobTitles = () => {
    return doGet(`${serviceUrl}/archives`);
}

export const getJobTitle = (jobTitleId) => {
    return doGet(`${serviceUrl}/${jobTitleId}`);
}

export const createJobTitle = (jobTitle) => {
    return doPost(serviceUrl, jobTitle);
}

export const updateJobTitle = (jobTitle) => {
    return doPut(serviceUrl, jobTitle);
}

export const deleteJobTitle = (jobTitleId) => {
    return doDelete(`${serviceUrl}/${jobTitleId}`);
}
