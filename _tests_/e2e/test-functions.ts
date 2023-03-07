import request from "supertest";
import {app} from "../../src";
// @ts-ignore
import {createdBlog} from "./blog-post-api.test";

// @ts-ignore
import {getBlog, returnedUnchangedBlog} from "./data";

export const testFunctions = {

    async getBlog(expectedResult:object) {

        await request(app)
            .get('/blogs')
            .send()
            .expect(200, expectedResult)
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
    }


}


