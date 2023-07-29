export class TokenStorage {
    #nekotsseacce = '';

    constructor() {
        this.#nekotsseacce = localStorage.getItem('accessToken') || '';
    }

    setToken(token:string) {
        this.#nekotsseacce = token;
        localStorage.setItem('accessToken', token)
    }

    getToken() {
        return this.#nekotsseacce
    }

    removeToken() {
        this.#nekotsseacce = '';
        localStorage.removeItem('accessToken');
    }
}