import request from "supertest";
import {app} from "../../src";
// @ts-ignore
import {createdBlog} from "./blog-post-api.test";

 export const getter = async ()=> {
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
}