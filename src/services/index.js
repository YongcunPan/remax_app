import api from "./api"; 

export class ServicesModel {
    static getInitUserInfo() {
        return api.getInitUserInfo();
    }
}