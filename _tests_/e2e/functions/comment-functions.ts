import request from "supertest";
import {app} from "../../../src";

export const commentFunctions = {

    async getCommentByPostId (postId:string){
            const result = await request(app)
                .get(`/posts/${postId}/comments`)
                .send()

            return {status:result.status,body:result.body}

        },

    async getCommentByCommentId (commentId:string,accessToken?:string){
        const result = await request(app)
            .get(`/comments/${commentId}`)
            .send()
            .set("Authorization", `${accessToken ? `Bearer ${accessToken}` : undefined}`)

        return {status:result.status,body:result.body}

    },

    async deleteCommentByCommentId (commentId:string,token:string){
        return request(app)
            .delete(`/comments/${commentId}`)
            .send()
            .set("Authorization", `Bearer ${token}`)


    },



    async createComment (postId:string,commentData:object,token:string) {

        return request(app)
            .post(`/posts/${postId}/comments`)
            .send(commentData)
            .set("Authorization", `Bearer ${token}`)

    },

    async updateComment (commentId:string,updateData:object,token:string) {

        return request(app)
            .put(`/comments/${commentId}`)
            .send(updateData)
            .set("Authorization", `Bearer ${token}`)
    },

    async updateLikeStatus (commentId:string,likeStatus:object,token:string) {

        return request(app)
            .put(`/comments/${commentId}/like-status`)
            .send(likeStatus)
            .set("Authorization", `Bearer ${token}`)
    },




}