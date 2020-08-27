const baseUrl = "http://localhost:8080/api/orgchart";

const buildConfig = (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        }
    }
};

const parseJson = (response) => {
    return new Promise((resolve) => response.json()
        .then((json) => resolve({
            status: response.status,
            statusText: response.statusText,
            json,
        }))
    )
};

const makeRequest = (uri, config) => {
    return fetch(baseUrl + uri, buildConfig(config))
        .then(parseJson)
        .then((res) => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.json.message);
            } else {
                return res.json;
            }
        })
};

export const doGet = (uri) => {
    return makeRequest(uri, {
        method: "GET"
    })
}

export const doPost = (uri, data) => {
    return makeRequest(uri, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export const doPut = (uri, data) => {
    return makeRequest(uri, {
        method: "PUT",
        body: JSON.stringify(data)
    })
}

export const doDelete = (uri) => {
    return makeRequest(uri, {
        method: "DELETE"
    })
}
