import { logout } from '../redux/actions/login';

const apiBase =
    (process.env.NODE_ENV === 'production') ?
        'http://localhost:8080/api' :
        'http://localhost:8080/api';

var ApiUtils = {
    checkStatus: function (response, dispatch, url) {
        if (response.ok) { return Promise.resolve(response); }

        return response.json()
            .then(json => {
                let error = this.parseErrorStrings(json);

                if (JSON.stringify(json).toLowerCase().includes('invalid token')
                && !url.includes('logout')) {
                    dispatch(logout());
                }

                return Promise.reject(error);
            });
    },
    fetchResponse: function (url, settings, dispatch) {
        var token = localStorage.getItem("sessionToken");
        if (!token && url !== 'login') {
            return Promise.reject('Invalid Token');
        }

        var newUrl = `${apiBase}/${url}`;
        var init = Object.assign({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Token ' + token,
            })
        }, settings);

        return fetch(newUrl, init)
            .then(response => this.checkStatus(response, dispatch, url))
            .then(response => response.json());
    },
    parseErrorStrings: function (err) {
        let errorString = '';
        for (var key in err) {
            if (err.hasOwnProperty(key)) {
                errorString = errorString + key + ' = ' + err[key];
            }
        }
        return errorString;
    }
}

export default ApiUtils;