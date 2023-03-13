import request from "supertest";
import {app} from "../../src";
// @ts-ignore
import {createdBlog} from "./blog-post-api.test";

// @ts-ignore
import {createdBlogData, emptyBlogData, paginationValues, returnedUnchangedBlog} from "./data";
import {ObjectId} from "mongodb";
import {BlogsViewType} from "../../src/repositories/types/blogs-view-type";
type TestResultType<T> = {
    body: T,
    status: number
}

// Promise<TestResultType<BlogsViewType>>

export const blogFunctions = {

    async getBlog(expectedResult: object, paginationData: object) {

        // const response =
            await request(app)
            .get('/blogs')
            .send(paginationData)
            .expect(200, expectedResult)

        // return {body: response.body, status: response.status}
    },
    async getBlogById(paginationData:object,blogId:string){

        return request(app)
            .get(`/blogs/${blogId}`)
            .send(paginationData)
    },



    async getPostsByBlogId(blogId:string){

            return request(app)
                .get(`/blogs/${blogId}/posts`)
                .send()
    },


    async createBlog(newBlog:object){

        return request(app)
            .post('/blogs')
            .send(newBlog)
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")




        // expect(createdBlog.body).toEqual(returnedUnchangedBlog)

    },

  async updateBlog(id:string, update:object){

        return  request(app)
                .put(`/blogs/${id}`)
                .send(update)
                .set("Authorization", "Basic YWRtaW46cXdlcnR5")

  },

    async getUpdatedBlog(id: string, update:object){
         const getBlog = await request(app)
            .get(`/blogs/${id}`)
            .send()

        expect(getBlog.body).toEqual(update)
    },

    async deleteBlog(id:string){
        await request(app)
            .delete(`/blogs/${id}`)
            .send()
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")

    },

}




