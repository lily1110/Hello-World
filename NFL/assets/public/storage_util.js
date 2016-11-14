var StorageUtil = {
    token_key: 'zunest_authentication_token',
    person:'zunest_authentication_person',
    setToken: function (token) {
        return localStorage.setItem(StorageUtil.token_key, token)
    },
    clearToken: function () {
        return localStorage.removeItem(StorageUtil.token_key)
    },
    getToken: function () {
        return localStorage.getItem(StorageUtil.token_key)
    },
    setPerson: function(person){
        return localStorage.setItem(StorageUtil.person, person)
    },
    getPerson: function () {
        return localStorage.getItem(StorageUtil.person)
    },
    clearPerson: function(){
        return localStorage.removeItem(StorageUtil.person)
    },
    set: function(key, value){
        return localStorage.setItem(key, value);
    },
    get: function(key){
        return localStorage.getItem(key);
    },
    clear: function (key) {
        return localStorage.removeItem(key);
    }
    
}