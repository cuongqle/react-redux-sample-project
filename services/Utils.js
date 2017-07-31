const version = 'v1'
const baseUrls = {
    auth: '/auth.' + version,
    accounts: '/accounts.' + version,
    actions: '/actions.' + version,
    calls: '/calls.' + version,
    content: '/content.' + version,
    admins: '/admins.' + version,
    search: '/search.' + version
};

const levels = {
    "junior": {
        "now": "Junior",
        "next": "Advanced",
        "need": 5000,
    },
    "advanced": {
        "now": "Advanced",
        "next": "Pro",
        "need": 100000
    },
    "pro": {
        "now": "Pro",
        "next": "Master",
        "need": 250000
    },
    "master": {
        "now": "Master",
        "next": "Godlike",
        "need": 2000000000
    }
};

const parseObject = (obj, callback) => {
    for (let i in obj) {
        Object.prototype.hasOwnProperty.call(obj, i) && callback.call(void 0, obj[i], i, obj)
    }
};

export {baseUrls, levels};

export function checkStatus(response, onSuccess, onError) {
    var resp = response.json();
    switch (response.status) {
        case 200:
            return resp.then(onSuccess);
        case 400:
            return resp.then(onError);
        case 401:
            return resp.then(onError);
        case 404:
            return onError('Not found');
    }
}

/*
 200 - OK	Everything worked as expected.
 400 - Bad Request	The request was unacceptable, often due to missing a required parameter.
 401 - Unauthorized	No valid API key provided.
 402 - Request Failed	The parameters were valid but the request failed.
 404 - Not Found	The requested resource doesn't exist.
 409 - Conflict	The request conflicts with another request (perhaps due to using the same idempotent key).
 429 - Too Many Requests	Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
 500, 502, 503, 504 - Server Errors	Something went wrong on Stripe's end. (These are rare.)
 */
export function checkPaymentCharge(response, onSuccess, onError) {
    switch (response.statusCode) {
        case 200:
            return onSuccess(response);
        default:
            return onError(response.err);
    }
}

export function checkPaymentStatusCode(response, onSuccess, onError) {
    switch (response.statusCode) {
        case 200:
            return onSuccess(response.data);
        case 400:
            return onError(response.message);
        case 404:
            return onError('Not found');
    }
}

export function postOptions(body, token, method = 'POST') {
    return {
        method: method,
        headers: {
            'Authorization': "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

export function putOptions(body, token, method = 'PUT') {
    return {
        method: method,
        headers: {
            'Authorization': "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
}

export function getOptions(token, method = 'GET') {
    return {
        method: method,
        headers: {
            "Authorization": "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

export function deleteOptions(token, method = 'DELETE') {
    return {
        method: method,
        headers: {
            "Authorization": "Bearer " + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}

export function stringQuery(params) {
    if (!params) return "";
    let result = [];
    parseObject(params, (value, key) => {
        if (!value) {
            result.push(`${key}=`);
            return;
        }

        switch (typeof value) {
            case "object":
                if (JSON && JSON.stringify) {
                    result.push(`${key}=${JSON.stringify(value)}`);
                }
                break;
            default:
                result.push(`${key}=${value}`);
                break;
        }
    });

    return result.length > 0 ? `?${result.join("&")}` : ""
}

export function getDefaultLocale() {
    return (window.navigator.userLanguage || window.navigator.language).replace('-', '_');
}