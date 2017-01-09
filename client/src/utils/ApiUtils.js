const apiBase = 
(process.env.NODE_ENV === 'production') ?
 'http://localhost:8080/api' : 
 'http://localhost:8080/api';

var ApiUtils = {
    checkStatus: function (response) {
        if (response.ok) {
            return Promise.resolve(response);
        }

        return response.json().then(json => {
            return Promise.reject(json);
        });
    },
    fetchResponse: function (url, settings) {
        var newUrl = `${apiBase}/${url}`;
        var init = Object.assign({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Token ' + localStorage.getItem("sessionToken")
            })
        }, settings);
        return fetch(newUrl, init)
            .then(this.checkStatus)
            .then(response => response.json());
    },
    parseErrorStrings: function (error) {
        let key;
        let errors = '';
        for (key in error) {
          if (error.hasOwnProperty(key)) {
            errors = errors + key + ' = ' + error[key];
          }
        }
        return errors;
    }
}

export default ApiUtils;