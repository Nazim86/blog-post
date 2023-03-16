import request from "supertest";
import {app} from "../../src";

export const commentFunctions = {

    async getComments (postId:string){
            const result = await request(app)
                .get(`/posts/${postId}/comments`)
                .send()

            return {status:result.status,body:result.body}

        },

    async createComment (postId:string,commentData:object,token:string) {

        return request(app)
            .post(`/posts/${postId}/comments`)
            .send(commentData)
            .set("Authorization", `Bearer ${token}`)


    }
}