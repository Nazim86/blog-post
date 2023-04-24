import {PostsViewType} from "../../../src/repositories/types/posts-view-type";
import request from "supertest";
import {app} from "../../../src";
import {TestResultType} from "./post-functions";
import {UserViewType} from "../../../src/repositories/types/user-view-type";

export const userFunctions = {
    async getUsers(paginationData:object,authorizationData:string):Promise<TestResultType<UserViewType>>{
            const result = await request(app)
                .get(`/users`)
                .set("Authorization",authorizationData)
                .send(paginationData)

            return {status:result.status,body:result.body}
    },

    async createUser(newPostData:object,authorizationData:string):Promise<TestResultType<PostsViewType>>{

        return  request(app)
            .post('/users')
            .send(newPostData)
            .set("Authorization", authorizationData)

    },

    async deleteUserById(id:string,authorizationData:string):Promise<TestResultType<PostsViewType>>{
        return request(app)
            .delete(`/users/${id}`)
            .send()
            .set("Authorization", authorizationData)

    },
}