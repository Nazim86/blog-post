import request from "supertest";
import {app} from "../../src";
// @ts-ignore
import {createdBlog} from "./blog-post-api.test";

export const testFunctions = {

    async getter() {

        await request(app)
            .get('/blogs')
            .send()
            .expect(200, {

                pagesCount: 1,
                page: 1,
                pageSize: 10,
                totalCount: 1,
                items: createdBlog
            })
    },

    async withoutName(){

        await request(app)
            .post('/blogs')
            .send({
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)


    },

    async numberName(){
        await request(app)
            .post('/blogs')
            .send({
                name: 3,
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)

    },

    async longStringName (){
        await request(app)
            .post('/blogs')
            .send({
                name: "Testing Long string",
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)
    }


}