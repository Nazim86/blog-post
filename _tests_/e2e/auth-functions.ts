import request from "supertest";
import {app} from "../../src";

export const authFunctions = {

    async loginUser(loginUserData:object){
        return request(app)
            .post("/auth/login")
            .send(loginUserData)


    },

    async getCurrentUser(token:string){
        return request(app)
            .get("/auth/me")
            .send()
            .set("Authorization", `Bearer ${token}`)

    }

}