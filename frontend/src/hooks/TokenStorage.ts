export class TokenStorage {
  #nekotsseacce = "";

  constructor() {
    this.#nekotsseacce = localStorage.getItem("accessToken") || "";
  }

  setToken(token: string) {
    this.#nekotsseacce = token;
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    let protectedToken = this.#nekotsseacce;
    return protectedToken ? JSON.parse(protectedToken) : null;
  }

  removeToken() {
    this.#nekotsseacce = "";
    localStorage.removeItem("accessToken");
  }
}
