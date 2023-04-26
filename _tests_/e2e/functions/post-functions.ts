import request from "supertest";
import {app} from "../../../src";
import {PostsViewType} from "../../../src/repositories/types/posts-view-type";

export type TestResultType<T> = {
    body: T,
    status: number
}


export const postFunctions = {

    async getPost (paginationData:object,accessToken?:string):Promise<TestResultType<PostsViewType>>{
        const result = await request(app)
            .get(`/posts`)
            .send(paginationData)
            .set("Authorization", `${accessToken ? `Bearer ${accessToken}` : undefined}`)


        return {status:result.status,body:result.body}

    },

    async createPost(newPostData:object,authorizationData:string):Promise<TestResultType<PostsViewType>>{

        return  request(app)
            .post('/posts')
            .send(newPostData)
            .set("Authorization", authorizationData)

    },

    async createPostByBlogId(id:string,newPostData:object,authorizationData:string):Promise<TestResultType<PostsViewType>>{

        return  request(app)
            .post(`/blogs/${id}/posts`)
            .send(newPostData)
            .set("Authorization", authorizationData)

    },


    async getPostByBlogId(paginationValues:object,id:string,accessToken?:string):Promise<TestResultType<PostsViewType>>{
        const result = await request(app)
            .get(`/blogs/${id}/posts`)
            .send(paginationValues)
            .set("Authorization", `${accessToken ? `Bearer ${accessToken}` : undefined}`)


        return {status:result.status,body:result.body}

    },


    async getPostById(id:string,accessToken?:string):Promise<TestResultType<PostsViewType>>{
        const result = await request(app)
            .get(`/posts/${id}`)
            .send()
            .set("Authorization", `${accessToken ? `Bearer ${accessToken}` : undefined}`)


        return {status:result.status,body:result.body}

},
    async updatePostById(id:string,updatePost:object,authorizationData:string)
        :Promise<TestResultType<PostsViewType>> {
       return  request(app)
            .put(`/posts/${id}`)
            .send(updatePost)
            .set("Authorization", authorizationData)
    },

    async updatePostLikeStatus(id:string,likeStatus:object,accessToken:string)
        :Promise<TestResultType<PostsViewType>> {
        return  request(app)
            .put(`/posts/${id}/like-status`)
            .send(likeStatus)
            .set("Authorization", `Bearer ${accessToken}`)
    },

    async deletePostById(id:string,authorizationData:string):Promise<TestResultType<PostsViewType>>{
       return request(app)
            .delete(`/posts/${id}`)
            .send()
            .set("Authorization", authorizationData)

    },

}