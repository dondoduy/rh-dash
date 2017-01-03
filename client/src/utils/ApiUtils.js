var ApiUtils = {
    checkStatus: function (response) {
        if (response.ok) {
            return Promise.resolve(response);
        }

        return response.json().then(json => {
            return Promise.reject(json);
        });
    },
    fetchResponse: function(url, settings){
        return fetch(url, settings)
        .then(this.checkStatus)
        .then(response => response.json());
    }
}

export default ApiUtils;