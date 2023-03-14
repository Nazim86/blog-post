import request from "supertest"
import {app} from "../../src";
import {cloneDeep} from 'lodash';
import {blogFunctions} from "./blog-functions";
import {
    authorizationData,
    baseBlog,
    createdBlogData,
    emptyBlogData, getUpdatedBlog, paginationValues,
    returnedUnchangedBlog,
    updateBlog,
    updatedBlog
} from "./blogs-data";
import {
    createdPostWithPagination,
    emptyPostData,
    newPostCreatingData,
    postPaginationValues,
    returnedCreatedPost, updatedPostData, updatedPostWithPagination
} from "./posts-data";
import {postFunctions} from "./post-functions";
import {PostsViewType} from "../../src/repositories/types/posts-view-type";


// beforeAll(async () => {
//
//     await request(app)
//         .delete('/testing/all-data')
// });

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

    it(`should NOT create new blog because of wrong Authorization and return 401 `, async () => {
        const newBlog = {...baseBlog}
        let wrongAuthorizationData = "asvdvsdv"

        const createBlog = await blogFunctions.createBlog(newBlog, wrongAuthorizationData)
        expect(createBlog.status).toBe(401)

        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })


    it(`should NOT create new blog without name and return 400 `, async () => {
        const newBlog = {...baseBlog, name: null}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with number in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: 123}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with long string in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: "blog".repeat(1000)}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog without description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: null}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog with number in description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: 123}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog with long description length and return 400 `, async () => {

        const newBlog = {...baseBlog, description: "blog".repeat(1000)}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog without websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: null}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with long websiteURL length and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "https://blog.io/".repeat(200)}


        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)


    })

    it(`should NOT create new blog with wrong websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "blog.io/"}


        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)
        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it(`should NOT create new blog with number in websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: 123}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        await blogFunctions.getBlog(emptyBlogData, paginationValues)

    })

    it("should create new blog and return 201", async () => {

        const newBlog = {...baseBlog}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)

        expect(createBlog.status).toBe(201)

        expect(createBlog.body).toEqual(returnedUnchangedBlog)

        createdBlog.push(createBlog.body)

        let expectedResult = cloneDeep(createdBlogData)
        expectedResult.items[0].id = createdBlog[0].id
        expectedResult.items[0].createdAt = createdBlog[0].createdAt

        await blogFunctions.getBlog(expectedResult, paginationValues)

    })

    //Get Blog By Id

    it('should NOT get blog by wrong ID should return 404', async () => {
        const paginationData = {...paginationValues}
        const blogId = "asd"

        const blogById = await blogFunctions.getBlogById(paginationData, blogId)

        expect(blogById.status).toBe(404)

        let expectedResult = cloneDeep(createdBlogData)
        expectedResult.items[0].id = createdBlog[0].id
        expectedResult.items[0].createdAt = createdBlog[0].createdAt

        await blogFunctions.getBlog(expectedResult, paginationData)

    });

    it('should get blog by ID should return 200 and found blog', async () => {
        const paginationData = {...paginationValues}
        const blogId = createdBlog[0].id

        const blogById = await blogFunctions.getBlogById(paginationData, blogId)

        let expectedResult = {...createdBlog[0]}


        expect(blogById.status).toBe(200)
        expect(blogById.body).toEqual(expectedResult)

    });


    //Update Blog

    it(`should NOT update blog with wrong Authorization data and and return 401 `, async () => {
        const update = {...updateBlog}
        const wrongAuthorizationData = "asdasdad"
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, wrongAuthorizationData)
        expect(updatingBlog.status).toBe(401);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog because BAD ID and return 404 `, async () => {
        const update = {...updateBlog}

        const updatingBlog = await blogFunctions.updateBlog("123", update, authorizationData)
        expect(updatingBlog.status).toBe(404);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog without name and and return 400 `, async () => {
        const update = {...updateBlog, name: null}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. long name and return 400 `, async () => {
        const update = {...updateBlog, name: "blog".repeat(1000)}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog w. not string name and return 400 `, async () => {
        const update = {...updateBlog, name: 123}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog without Description and return 400 `, async () => {
        const update = {...updateBlog, description: null}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. long description and return 400 `, async () => {
        const update = {...updateBlog, description: "desc".repeat(1000)}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)

    })

    it(`should NOT update blog w. not string Description and return 400 `, async () => {
        const update = {...updateBlog, description: 123}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog without websiteUrl and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: null}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog w. long website url and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: updateBlog.websiteUrl.repeat(1000)}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)
    })

    it(`should NOT update blog wrong website url pattern and return 400 `, async () => {
        const update = {...updateBlog, websiteUrl: "student.com"}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(400);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, returnedUnchangedBlog)


    })

    it(`should update blog and return 204`, async () => {
        const update = {...updateBlog}
        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, update, authorizationData)
        expect(updatingBlog.status).toBe(204);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, updatedBlog)

    })

    it('should not Delete blogs with Authorization and return 401', async () => {
        const wrongAuthorizationData = "asasdad"

        const copyGetUpdatedBlog = cloneDeep(getUpdatedBlog)
        copyGetUpdatedBlog.items[0].id = createdBlog[0].id
        copyGetUpdatedBlog.items[0].createdAt = createdBlog[0].createdAt

        await blogFunctions.deleteBlog(createdBlog[0].id, wrongAuthorizationData)
        expect(401)

        await blogFunctions.getBlog(copyGetUpdatedBlog, paginationValues)

    });

    it('should NOT Delete blogs by wrong id and 404 and', async () => {
        const copyGetUpdatedBlog = cloneDeep(getUpdatedBlog)
        copyGetUpdatedBlog.items[0].id = createdBlog[0].id
        copyGetUpdatedBlog.items[0].createdAt = createdBlog[0].createdAt

        await blogFunctions.deleteBlog("sdf", authorizationData)
        expect(404)

        await blogFunctions.getBlog(copyGetUpdatedBlog, paginationValues)


    });

    it('should Delete blogs by id and 200 and empty array', async () => {

        const emptyBlog = {...emptyBlogData}

        await blogFunctions.deleteBlog(createdBlog[0].id, authorizationData)
        expect(204)

        await blogFunctions.getBlog(emptyBlog, paginationValues)

    });

})


let createdPost:Array<PostsViewType> = [];
describe("post testing", () => {
    //TODO should replace any with type
    let blog:any;
    beforeAll(async () => {

        //clearAllData()

        await request(app)
                .delete('/testing/all-data')


        //blog = create blog()
         blog= await blogFunctions.createBlog({...baseBlog}, authorizationData)
    })

    it('should get post empty post and return 200', async () => {
        const emptyPost = {...emptyPostData}
        const paginationData = {...postPaginationValues}

        const {body,status}=  await postFunctions.getPost(paginationData)
        expect(status).toBe(200)
        expect(body).toEqual(emptyPost)


    });



    it('should create Post return 201 and created Post', async () => {

        //TODO Questions: checking after creating post. Why expect.any(String) does not work

        const newPostData = {...newPostCreatingData, blogId: blog.body.id}
        const paginationData = {...postPaginationValues}
        const expectedNewPost = {
            ...returnedCreatedPost, blogId: blog.body.id,
            blogName: blog.body.name
        }

        const createPost = await postFunctions.createPost(newPostData,authorizationData)
        expect(createPost.status).toBe(201)
        expect(createPost.body).toEqual(expectedNewPost)

        createdPost.push(createPost.body)

        const expectedGetResult = cloneDeep(createdPostWithPagination)
        expectedGetResult.items[0].blogId=blog.body.id
        expectedGetResult.items[0].blogName=blog.body.name

       const {status,body}=  await postFunctions.getPost(paginationData)
        expect(status).toBe(200)
        expect(body).toEqual(expectedGetResult)
    });

    // Get Post By Id
    it('should get post by ID empty post and return 200', async () => {
        const postById = {
            ...returnedCreatedPost, blogId: blog.body.id,
            blogName: blog.body.name
        }
   const id = createdPost[0].id

        const {body,status}=  await postFunctions.getPostById(id)
        expect(status).toBe(200)
        expect(body).toEqual(postById)

    });


    //Update post by id

    it('should Update post by ID empty post and return 204', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id}

        const expectedGetResult = cloneDeep(updatedPostWithPagination)
        expectedGetResult.items[0].blogId=blog.body.id
        expectedGetResult.items[0].blogName=blog.body.name

        const paginationData = {...postPaginationValues}
        const id = createdPost[0].id

        const updatedBlog=  await postFunctions.updatePostById(id,updatePost,authorizationData)
        expect(updatedBlog.status).toBe(204)

        const {status,body}=  await postFunctions.getPost(paginationData)
        expect(status).toBe(200)
        expect(body).toEqual(expectedGetResult)

    });


    // Delete Post By Id

    it('should Delete post by ID empty post and return 204', async () => {

        const id = createdPost[0].id

        const deletePost =  await postFunctions.deletePostById(id,authorizationData)
        expect(deletePost.status).toBe(204)

        const emptyPost = {...emptyPostData}
        const paginationData = {...postPaginationValues}

        const {body,status}=  await postFunctions.getPost(paginationData)
        expect(status).toBe(200)
        expect(body).toEqual(emptyPost)

    });






})