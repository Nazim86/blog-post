import request from "supertest"
import {app} from "../../src";
// @ts-ignore
import {getter} from "./test-functions";



beforeAll(async ()=>{
    // await request(app)
    //     .delete("/blogs")
    //     .set("Authorization", "Basic YWRtaW46cXdlcnR5")
    //
    //
    // await request(app)
    //     .delete("/posts")
    //     .set("Authorization", "Basic YWRtaW46cXdlcnR5")

    await request(app)
        .delete('/testing/all-data')
});
export let createdBlog: Array<any> = []


describe("blogs testing",()=>{

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/blogs')
            .send({
                pagesCount: 0,
                page:  1,
                pageSize: 10,
                totalCount: 0
            })
            .expect(200, {
                pagesCount: expect.any(Number) | 0,
                page: expect.any(Number) | 1,
                pageSize: expect.any(Number) | 10,
                totalCount: expect.any(Number) | 0,
                items: []
            })
    });


    // place createBlog array

    it ("should create new blog and return 201", async ()=>{
        const createResponse =  await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
           .expect(201)

         createdBlog.push(createResponse.body)

             expect(createdBlog[0]).toEqual({
                 id: expect.any(String),
                 name: "Blog Name",
                 description: "It incubator blog",
                 websiteUrl: "https://it-incubator.io/",
                 createdAt: expect.any(String),
                 isMembership: false
             })



        await getter()
    })


    it (`should NOT create new blog without name and return 400 `, async ()=>{

        await request(app)
            .post('/blogs')
            .send({
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)

        await getter()

    })

    it (`should NOT create new blog with number in name and return 400 `, async ()=>{

        await request(app)
            .post('/blogs')
            .send({
                name: 3,
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)

        await getter()

    })

    it (`should NOT create new blog with long string in name and return 400 `, async ()=>{

        await request(app)
            .post('/blogs')
            .send({
                name: "Testing Long string",
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)

        await getter()

    })

    it (`should NOT create new blog without description and return 400 `, async ()=>{

        await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)

        await getter()

    })

    it (`should NOT create new blog with number in description and return 400 `, async ()=>{

        await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: 3,
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            .expect(400)

        await getter()

    })

    it (`should NOT create new blog with long description length and return 400 `, async ()=>{

        const posting = await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum suscipit massa, in fringilla dui accumsan id. Ut eleifend ligula in augue accumsan, at euismod orci facilisis. Praesent non mauris vitae velit aliquet finibus id non arcu. Quisque interdum velit nisi, et commodo nisi convallis vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam felis magna, dignissim sed neque non, ultrices porttitor enim. Suspendisse porta tortor biamc.",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
            expect(posting.status).toBe(400);

        await getter()

    })

    it (`should NOT create new blog without websiteURL and return 400 `, async ()=>{

        const posting = await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: "It incubator blog",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
        expect(posting.status).toBe(400);

        await getter()
    })

    it (`should NOT create new blog with long websiteURL length and return 400 `, async ()=>{

        const posting = await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: "It incubator blog",
                websiteUrl: "https://it-incubator.io/sdddddddggggggggggggddddgggddddgggddddgggddddgggggggggggggggggggggggggggggggggggggggggggggggggggg",

            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
        expect(posting.status).toBe(400);

        await getter()

    })

    it (`should NOT create new blog with wrong websiteURL and return 400 `, async ()=>{

        const posting = await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum suscipit massa, in fringilla dui accumsan id. Ut eleifend ligula in augue accumsan, at euismod orci facilisis. Praesent non mauris vitae velit aliquet finibus id non arcu. Quisque interdum velit nisi, et commodo nisi convallis vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam felis magna, dignissim sed neque non, ultrices porttitor enim. Suspendisse porta tortor biamc.",
                websiteUrl: "//it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
        expect(posting.status).toBe(400);

        await getter()

    })

    it (`should NOT create new blog with number in websiteURL and return 400 `, async ()=>{

        const posting = await request(app)
            .post('/blogs')
            .send({
                name: "Blog Name",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum suscipit massa, in fringilla dui accumsan id. Ut eleifend ligula in augue accumsan, at euismod orci facilisis. Praesent non mauris vitae velit aliquet finibus id non arcu. Quisque interdum velit nisi, et commodo nisi convallis vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam felis magna, dignissim sed neque non, ultrices porttitor enim. Suspendisse porta tortor biamc.",
                websiteUrl: 4,
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
        expect(posting.status).toBe(400);

        await getter()

    })

    it (`should update blog and return 204`, async ()=>{
        const updatingBlog = await request(app)
            .put(`/blogs/${createdBlog[0].id}`)
            .send({
                name: "Blog updated",
                description: "Lorem ipsum dolor sit amet",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
        expect(updatingBlog.status).toBe(204);

        const updatedBlog  = await request(app)
            .get(`/blogs/${createdBlog[0].id}`)
            .send()

        expect(updatedBlog.body.name).toEqual("Blog updated")

    })

    it (`should NOT update blog because BAD ID and return 404 `, async ()=>{
        const updatingBlog = await request(app)
            .put(`/blogs/dsfsdf`)
            .send({
                name: "Blog updated",
                description: "Lorem ipsum dolor sit amet",
                websiteUrl: "https://it-incubator.io/",
            })
            .set("Authorization", "Basic YWRtaW46cXdlcnR5")
        expect(updatingBlog.status).toBe(404);

        const updatedBlog  = await request(app)
            .get(`/blogs/${createdBlog[0].id}`)
            .send()

        expect(updatedBlog.body.name).toEqual("Blog updated")

    })


})