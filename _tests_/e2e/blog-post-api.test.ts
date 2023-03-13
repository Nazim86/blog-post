import request from "supertest"
import {app} from "../../src";
import { cloneDeep } from 'lodash';
// @ts-ignore
import {blogFunctions} from "./blog-functions";
import {
    baseBlog,
    createdBlogData,
    emptyBlogData, newPostCreatingData, paginationValues, returnedCreatedPost,
    returnedUnchangedBlog,
    updateBlog,
    updatedBlog
} from "./data";

beforeAll(async () => {

    await request(app)
        .delete('/testing/all-data')
});

export let createdBlog: Array<any> = []


describe("blogs CRUD testing", () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    });

    // Get Blogs
    it('should return 200 and empty array', async () => {
        const paginationData = {...paginationValues}
        const expectedResult = {...emptyBlogData}

        await blogFunctions.getBlog(expectedResult, paginationData)

    });


    // Create Blog

    it(`should NOT create new blog without name and return 400 `, async () => {
        const newBlog = {...baseBlog, name: null}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)

        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with number in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: 123}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with long string in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: "blog".repeat(1000)}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog without description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: null}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog with number in description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: 123}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog with long description length and return 400 `, async () => {

        const newBlog = {...baseBlog, description: "blog".repeat(1000)}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog without websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: null}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with long websiteURL length and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "https://blog.io/".repeat(200)}


        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog with wrong websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "blog.io/"}


        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with number in websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: 123}

        const createBlog = await blogFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)

        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it("should create new blog and return 201", async () => {

        const newBlog = {...baseBlog}

        const createBlog = await blogFunctions.createBlog(newBlog)

        expect(createBlog.status).toBe(201)

        expect(createBlog.body).toEqual(returnedUnchangedBlog)

        createdBlog.push(createBlog.body)

        let expectedResult = cloneDeep(createdBlogData)
        expectedResult.items[0].id= createdBlog[0].id
        expectedResult.items[0].createdAt= createdBlog[0].createdAt

  await blogFunctions.getBlog(expectedResult,paginationValues)

    })

    //Get Blog By Id

    it('should NOT get blog by wrong ID should return 404', async () => {
        const paginationData = {...paginationValues}
        const blogId = "asd"

        const blogById = await blogFunctions.getBlogById(paginationData,blogId)

        expect(blogById.status).toBe(404)

        let expectedResult = cloneDeep(createdBlogData)
        expectedResult.items[0].id= createdBlog[0].id
        expectedResult.items[0].createdAt= createdBlog[0].createdAt

        await blogFunctions.getBlog(expectedResult,paginationData)

    });

    it('should get blog by ID should return 200 and found blog', async () => {
        const paginationData = {...paginationValues}
        const blogId = createdBlog[0].id

        const blogById = await blogFunctions.getBlogById(paginationData,blogId)

        let expectedResult = {...createdBlog[0]}


        expect(blogById.status).toBe(200)
        expect(blogById.body).toEqual(expectedResult)

    });


    //Update Blog
    it(`should NOT update blog because BAD ID and return 404 `, async () => {
        const update = {...updateBlog}

        const updatingBlog = await blogFunctions.updateBlog("123", update)
        expect(updatingBlog.status).toBe(404);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog without name and and return 400 `, async () => {
        const update = {...updateBlog, name: null}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. long name and return 400 `, async () => {
        const update = {...updateBlog, name: "blog".repeat(1000)}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog w. not string name and return 400 `, async () => {
        const update = {...updateBlog, name: 123}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog without Description and return 400 `, async () => {
        const update = {...updateBlog, description: null}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. long description and return 400 `, async () => {
        const update = {...updateBlog, description: "desc".repeat(1000)}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. not string Description and return 400 `, async () => {
        const update = {...updateBlog, description: 123}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog without websiteUrl and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: null}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog w. long website url and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: updateBlog.websiteUrl.repeat(1000)}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog wrong website url pattern and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: "student.com"}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)


    })

    it(`should update blog and return 204`, async () => {
        const update = {...updateBlog}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(204);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, updatedBlog)

    })

    it('should NOT Delete blogs by wrong id and 404 and', async () => {

        await blogFunctions.deleteBlog("sdf")
        expect(404)

        //TODO Get blog for delete
        // await testFunctions.getBlog(getUpdatedBlog)

    });

    it('should Delete blogs by id and 200 and empty array', async () => {

        const emptyBlog = {...emptyBlogData}

        await blogFunctions.deleteBlog(createdBlog[0].id)
        expect(204)

        await blogFunctions.getBlog(emptyBlog,paginationValues)

    });


})

describe("post testing",()=>{
    let blog;
        beforeAll(async () => {

        //clearAllData()
            beforeAll(async () => {
                await request(app)
                    .delete('/testing/all-data')
            });

        //blog = create blog()

    })



    it('should return 200 and empty post', async () => {
const emptyPost = {...emptyBlogData}
        //create post(blog.id)
        // const {status, body: data} =
        await blogFunctions.getBlog(emptyPost,paginationValues)

    });

    it('should create Post return 201 and created Post', async () => {
        const emptyPost = {...emptyBlogData}
        const newPostData = {...newPostCreatingData,blogId:createdBlog[0].id}
        const expectedResult = {...returnedCreatedPost,blogId: createdBlog[0].id,
            blogName:createdBlog[0].name}

        // const createPost = await blogFunctions.createPost(newPostData)
        // expect(createPost.status).toBe(201)
        // expect(createPost.body).toEqual(expectedResult)

        // const getPosts = await testFunctions.getPosts()
        // expect(getPosts.status).toBe(200)
        // expect(getPosts.body).toEqual(emptyPost)

    });

})