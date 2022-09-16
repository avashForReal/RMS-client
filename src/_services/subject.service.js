import { HOST_API } from '../config';
import { fetchWrapper } from '../_helpers';

// const baseUrl = `${config.apiUrl}/users`;
const baseUrl = `${HOST_API}/api/subject`

export const subjectService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(`${baseUrl}/getAll`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/getId/${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/add`, params);
}

function update(id, params) {
    return fetchWrapper.patch(`${baseUrl}/update/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/delete/${id}`);
}
