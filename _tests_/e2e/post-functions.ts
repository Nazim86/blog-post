import request from "supertest";
import {app} from "../../src";

export const postFunctions = {

    async getPosts (expectedResult:object,paginationData:object){
        await request(app)
            .get(`/posts`)
            .send(paginationData)
            .expect(200,expectedResult)
    },

    async createPost(newPostData:object){
        return request(app)
            .post('/posts')
            .send(newPostData)
    }
}