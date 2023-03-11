import request from "supertest";
import {app} from "../../src";
// @ts-ignore
import {createdBlog} from "./blog-post-api.test";

// @ts-ignore
import {getEmptyBlog, returnedUnchangedBlog} from "./data";
import {ObjectId} from "mongodb";

export const testFunctions = {

    async getBlog(expectedResult:object) {

        await request(app)
            .get('/blogs')
            .send()
            .expect(200, expectedResult)
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

    async getPosts (){
        return request(app)
            .get(`/posts`)
            .send()
    },

    async createPost(){
        return request(app)
            .post('/posts')
            .send({
                _id: new ObjectId(),
                title: "Post",
                shortDescription: "creating post for blogs",
                content: "Content is related to Post",
                blogId: blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            })

    }
}


