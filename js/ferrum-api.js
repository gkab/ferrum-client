const request = require('request');
const Promise = require('promise');

const config = {
    host: 'http://localhost:8000/api'
}

function apiRequest(method, route, data)
{
    return new Promise((resolve, reject) => {
        request({
            method: method,
            uri: config.host + route,
            body: data
        }, function(err, response) {
            if (err)
            {
                reject(err);
            }
            else
            {
                let body;
                try
                {
                    body = JSON.parse(response.body);
                }
                catch (error)
                {
                    reject(error);
                    return;
                }
                resolve(body);
            }
        });
    });
}

const ferrumApi = {
    config: config,
    student: {
        getAll: async function getAll()
        {
            return apiRequest('GET', '/student');
        },
        get: async function get(username)
        {
            return apiRequest('GET', `/student/${username}`);
        },
        create: async function create(username, workingDirectory)
        {
            return apiRequest('POST', `/student/${username}`, {
                workingDirectory: workingDirectory
            });
        },
        remove: async function remove(username)
        {
            return apiRequest('DELETE', `/student/${username}`);
        },
        update: async function update(username, data)
        {
            return apiRequest('PUT', `/student/${username}`, data);
        }
    },
    task: {
        getAll: async function getAll()
        {
            return apiRequest('GET', '/task');
        },
        get: async function get(id)
        {
            return apiRequest('GET', `/task/${id}`);
        },
        create: async function create(id, repo)
        {
            return apiRequest('POST', `/task/${id}`, {
                repo: repo
            });
        },
        remove: async function remove(id)
        {
            return apiRequest('DELETE', `/task/${id}`);
        },
        update: async function update(id, data)
        {
            return apiRequest('PUT', `/task/${id}`, data);
        },
        buildAll: async function buildAll(id)
        {
            return apiRequest('PUT', `/task/${id}/build`);
        },
        build: async function build(id, username)
        {
            return apiRequest('PUT', `/task/${id}/build/${username}`);
        }
    },
    job: {
        getAll: function getAll()
        {
            return apiRequest('GET', `/job`);
        },
        get: function get(id)
        {
            return apiRequest('GET', `/job/${id}`);
        },
        cancel: function cancel(id)
        {
            return apiRequest('PUT', `/job/${id}`);
        }
    }
};

module.exports = ferrumApi;
