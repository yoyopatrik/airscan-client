import auth0 from "auth0-js";
import router from "../router";

export default class Authenticator {
  constructor() {
    console.log(process.env);
    this.auth0 = new auth0.WebAuth({
      domain: process.env.VUE_APP_DOMAIN,
      clientID: process.env.VUE_APP_CLIENTID,
      redirectUri: "http://localhost:8080/auth",
      audience: process.env.VUE_APP_AUDIENCE,
      responseType: "token id_token",
      scope: "openid",
    });
  }
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);

        resolve(authResult);
      });
      router.push("/");
    });
  }
  login() {
    console.log("logging in");
    this.auth0.authorize();
  }
  logout() {
    this.auth0.logout({
      returnTo: process.env.VUE_APP_LOGOUTURL,
    });
  }
}
