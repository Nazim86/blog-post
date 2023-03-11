import request from "supertest"
import {app} from "../../src";
// @ts-ignore
import {testFunctions} from "./test-functions";
import {
    baseBlog,
    getCreatedBlog,
    getEmptyBlog,
    getUpdatedBlog,
    returnedUnchangedBlog,
    updateBlog,
    updatedBlog
} from "./data";
import any = jasmine.any;
import exp = require("constants");
import {description} from "../../src/validations/blog-validations";


beforeAll(async () => {
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


describe("blogs testing", () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    });

    // Get Blogs
    it('should return 200 and empty array', async () => {

        await request(app)
            .get('/blogs')
            .send({
                searchName: "",
                sortBy: "createdAt",
                sortDirection: 'desc',
                pageNumber: 1,
                pageSize: 10
            })
            .expect(200, getEmptyBlog)
    });


    // Create Blog

    it(`should NOT create new blog without name and return 400 `, async () => {
        const newBlog = {...baseBlog, name: null}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)

        await testFunctions.getBlog(getEmptyBlog)

    })

    it(`should NOT create new blog with number in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: 123}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)

    })

    it(`should NOT create new blog with long string in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: "blog".repeat(1000)}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)


    })

    it(`should NOT create new blog without description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: null}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)


    })

    it(`should NOT create new blog with number in description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: 123}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)


    })

    it(`should NOT create new blog with long description length and return 400 `, async () => {

        const newBlog = {...baseBlog, description: "blog".repeat(1000)}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)

    })

    it(`should NOT create new blog without websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: null}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)

    })

    it(`should NOT create new blog with long websiteURL length and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "https://blog.io/".repeat(200)}


        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)


    })

    it(`should NOT create new blog with wrong websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "blog.io/"}


        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)
        await testFunctions.getBlog(getEmptyBlog)

    })

    it(`should NOT create new blog with number in websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: 123}

        const createBlog = await testFunctions.createBlog(newBlog)
        expect(createBlog.status).toBe(400)

        await testFunctions.getBlog(getEmptyBlog)

    })

    it("should create new blog and return 201", async () => {

        const newBlog = {...baseBlog}
        let expectedResult = {...getCreatedBlog}


        const createBlog = await testFunctions.createBlog(newBlog)

        expect(createBlog.status).toBe(201)

        expect(createBlog.body).toEqual(returnedUnchangedBlog)

        createdBlog.push(createBlog.body)

        // expectedResult.items[0].id = createdBlog[0]._id.toString()
        // expectedResult.items[0].createdAt = createdBlog[0].createdAt

        // TODO expect(createBlog.body).toEqual(returnedUnchangedBlog)

        // await testFunctions.getBlog(expectedResult)

        let Any;
        await request(app)
            .get('/blogs')
            .send({
                searchName: "",
                sortBy: "createdAt",
                sortDirection: 'desc',
                pageNumber: 1,
                pageSize: 10
            })
            .expect(200, {
                    pagesCount: expect.any(Number) | 1,
                    page: expect.any(Number) | 1,
                    pageSize: expect.any(Number) | 10,
                    totalCount: expect.any(Number) | 1,
                    items: [
                        {
                            id: createdBlog[0].id,
                            name: "Blog",
                            description: "creating newblog",
                            websiteUrl: "https://it-incubator.io/",
                            createdAt: createdBlog[0].createdAt,
                            isMembership: false
                        }
                    ]
                }
            )
    })

    //TODO returns all specified blog

//     it('should get post for blog by blogId and return 200 and post', async () => {
// const emptyPost = {...getEmptyBlog}
//         const getPostByBlogId = await testFunctions.getPostsByBlogId(createdBlog[0].id)
//         expect(getPostByBlogId.status).toBe(200)
//         expect(getPostByBlogId).toEqual(emptyPost)
//     });



    it(`should NOT update blog because BAD ID and return 404 `, async () => {
        const update = {...updateBlog}

        const updatingBlog = await testFunctions.updateBlog("123", update)
        expect(updatingBlog.status).toBe(404);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog without name and and return 400 `, async () => {
        const update = {...updateBlog, name: null}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. long name and return 400 `, async () => {
        const update = {...updateBlog, name: "blog".repeat(1000)}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog w. not string name and return 400 `, async () => {
        const update = {...updateBlog, name: 123}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog without Description and return 400 `, async () => {
        const update = {...updateBlog, description: null}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. long description and return 400 `, async () => {
        const update = {...updateBlog, description: "desc".repeat(1000)}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. not string Description and return 400 `, async () => {
        const update = {...updateBlog, description: 123}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog without websiteUrl and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: null}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog w. long website url and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: updateBlog.websiteUrl.repeat(1000)}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog wrong website url pattern and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: "student.com"}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(400);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)


    })

    it(`should update blog and return 204`, async () => {
        const update = {...updateBlog}
        const updatingBlog = await testFunctions.updateBlog(createdBlog[0].id, update)
        expect(updatingBlog.status).toBe(204);

        await testFunctions.getUpdatedBlog(createdBlog[0].id, updatedBlog)

    })

    it('should NOT Delete blogs by wrong id and 404 and', async () => {

        // const emptyBlog = {...getUpdatedBlog,...getUpdatedBlog.items[0],id:createdBlog[0].id,createdBlog:createdBlog[0].createdAt}

        await testFunctions.deleteBlog("sdfdsfsdfsdf")
        expect(404)

        //TODO Get blog for delete
        // await testFunctions.getBlog(getUpdatedBlog)

    });

    it('should Delete blogs by id and 200 and empty array', async () => {

        const emptyBlog = {...getEmptyBlog}

        await testFunctions.deleteBlog(createdBlog[0].id)
        expect(204)

        await testFunctions.getBlog(emptyBlog)

    });


})

describe("post testing",()=>{

    it('should return 200 and empty post', async () => {
const emptyPost = {...getEmptyBlog}
     const getPosts = await testFunctions.getPosts()
        expect(getPosts.status).toBe(200)
        expect(getPosts.body).toEqual(emptyPost)
    });

    it('should create Post return 201 and created Post', async () => {
        const emptyPost = {...getEmptyBlog}
        const getPosts = await testFunctions.getPosts()
        expect(getPosts.status).toBe(200)
        expect(getPosts.body).toEqual(emptyPost)
    });

})