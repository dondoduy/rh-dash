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

        if (!settings.headers) { 
            Object.assign(settings, { headers: new Headers() }); 
        }
        settings.headers.append('Content-Type', 'application/json');
        settings.headers.append('authorization', 'Token ' + token);

        var newUrl = `${apiBase}/${url}`;

        return fetch(newUrl, settings)
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