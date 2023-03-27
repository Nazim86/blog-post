import request from "supertest";
import {app} from "../../../src";

import {BlogsViewType} from "../../../src/repositories/types/blogs-view-type";
export type TestResultType<T> = {
    body: T,
    status: number
}

// Promise<TestResultType<BlogsViewType>>

export const blogFunctions = {

    async getBlog(paginationData: object) {

         const response = await request(app)
            .get('/blogs')
            .send(paginationData)


        return {body: response.body, status: response.status}
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


    async createBlog(newBlog: object, authorizationData:string):Promise<TestResultType<BlogsViewType>>{

        return request(app)
            .post('/blogs')
            .set("Authorization", authorizationData)
            .send(newBlog)





        // expect(createdBlog.body).toEqual(returnedUnchangedBlog)

    },

  async updateBlog(id: string, update: object, authorizationData:string){

        return  request(app)
                .put(`/blogs/${id}`)
                .send(update)
                .set("Authorization", authorizationData)

  },

    async getUpdatedBlog(id: string, update:object){
         const getBlog = await request(app)
            .get(`/blogs/${id}`)
            .send()

        expect(getBlog.body).toEqual(update)
    },

    async deleteBlog(id: string, authorizationData:string){
        await request(app)
            .delete(`/blogs/${id}`)
            .send()
            .set("Authorization", authorizationData)

    },

}




