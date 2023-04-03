import request from "supertest";
import {app} from "../../../src";
import {TestResultType} from "./post-functions";
import {PostsViewType} from "../../../src/repositories/types/posts-view-type";

export const authFunctions = {

    async loginUser(loginUserData:object, deviceName:string){
        return request(app)
            .post("/auth/login")
            .send(loginUserData)
            .set("User-Agent", "deviceName1")
    },

    async getCurrentUser(refreshToken:string){
        return request(app)
            .get("/auth/me")
            .send()
            .set('Cookie', `${refreshToken}`)

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

    },

    async refreshToken(refreshToken:object){
        return  request(app)
            .post('/auth/refresh-token')
            .set('Cookie', `${refreshToken}`)
            .send()


    },

    async getCurrentDevices(refreshToken:object){
        return  request(app)
            .get('/security/devices')
            .set('Cookie', `${refreshToken}`)
            .send()


    },



    async logout(refreshToken:object){
        return  request(app)
            .post('/auth/logout')
            .set('Cookie', `${refreshToken}`)
            .send()

    }
}