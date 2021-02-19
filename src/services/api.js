import { Http } from "./http";

class Api extends Http {
    domain = "worker";
    tokenName ="Authorization";

    getInitUserInfo() {
        return this.POST('user/getUser', {});
    }
}

export default new Api();