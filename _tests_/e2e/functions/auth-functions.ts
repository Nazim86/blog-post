import request from "supertest";
import {app} from "../../../src";
import {TestResultType} from "./post-functions";
import {PostsViewType} from "../../../src/repositories/types/posts-view-type";

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

    },

    async registerUser(newPostData:object):Promise<TestResultType<PostsViewType>>{

        return  request(app)
            .post('/auth/registration')
            .send(newPostData)


    },

    async registrationConfirmation(code:object){
        return  request(app)
            .post('/auth/registration-confirmation')
            .send(code)

    },

    async resendEmail(email:object){
        return  request(app)
            .post('/auth/registration-email-resending')
            .send(email)

    }
}