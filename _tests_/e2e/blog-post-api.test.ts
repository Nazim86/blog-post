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
    emptyPostData, newPostByBlogIdData,
    newPostCreatingData,
    postPaginationValues,
    returnedCreatedPost, updatedPostData, updatedPostWithPagination
} from "./posts-data";
import {postFunctions} from "./post-functions";
import {PostsViewType} from "../../src/repositories/types/posts-view-type";
import {notUpdate} from "./post-should-not-functions";
import {userFunctions} from "./user-functions";
import {
    createdUserWithPagination,
    getEmptyUsersData,
    userCreateData,
    userCreatedData,
    userPaginationValues
} from "./user-data";
import {notCreateUser} from "./user-should-not-functions";


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


let createdPost: Array<PostsViewType> = [];
describe("post testing", () => {
    //TODO should replace any with type
    let blog: any;
    beforeAll(async () => {

        //clearAllData()

        await request(app)
            .delete('/testing/all-data')


        //blog = create blog()
        blog = await blogFunctions.createBlog({...baseBlog}, authorizationData)
    })

    it('should get post empty post and return 200', async () => {
        const emptyPost = {...emptyPostData}
        const paginationData = {...postPaginationValues}

        const {body, status} = await postFunctions.getPost(paginationData)
        expect(status).toBe(200)
        expect(body).toEqual(emptyPost)


    });


    it('should create Post return 201 and created Post', async () => {

        //TODO Questions: checking after creating post. Why expect.any(String) does not work
        //TODO build Should NOT for Create

        const newPostData = {...newPostCreatingData, blogId: blog.body.id}
        const expectedNewPost = {
            ...returnedCreatedPost, blogId: blog.body.id,
            blogName: blog.body.name
        }

        const createPost = await postFunctions.createPost(newPostData, authorizationData)
        expect(createPost.status).toBe(201)
        expect(createPost.body).toEqual(expectedNewPost)

        createdPost.push(createPost.body)

        const expectedGetResult = cloneDeep(createdPostWithPagination)
        expectedGetResult.items[0].blogId = blog.body.id
        expectedGetResult.items[0].blogName = blog.body.name

        const {status, body} = await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(expectedGetResult)
    });


    it('should NOT get post wrong blogId and return 404', async () => {
        const postByBlogId = cloneDeep(createdPostWithPagination)
        postByBlogId.items[0].blogId = blog.body.id
        postByBlogId.items[0].blogName = blog.body.name

        const {status} = await postFunctions.getPostByBlogId('sdf')
        expect(status).toBe(404)
    });


    it('should get post by blogId for specified blog and return 200', async () => {
        const postByBlogId = cloneDeep(createdPostWithPagination)
        postByBlogId.items[0].blogId = blog.body.id
        postByBlogId.items[0].blogName = blog.body.name

        const {body, status} = await postFunctions.getPostByBlogId(blog.body.id)
        expect(status).toBe(200)
        expect(body).toEqual(postByBlogId)
    });

    it('should create Post for specific blog by blogId return 201 and created Post', async () => {
//TODO Error: connect ECONNREFUSED 127.0.0.1:80
        //TODO build Should NOT for Create

        const newPostData = {...newPostByBlogIdData}
        const expectedNewPost = {
            ...returnedCreatedPost, blogId: blog.body.id,
            blogName: blog.body.name
        }

        const createPost = await postFunctions.createPostByBlogId(blog.body.id, newPostData, authorizationData)
        // expect(createPost.status).toBe(201)
        // expect(createPost.body).toEqual(expectedNewPost)
        //
        // createdPost.push(createPost.body)
        //
        // const expectedGetResult = cloneDeep(createdPostWithPagination)
        // expectedGetResult.items[0].blogId = blog.body.id
        // expectedGetResult.items[0].blogName = blog.body.name
        //
        // const {status, body} = await postFunctions.getPost(postPaginationValues)
        // expect(status).toBe(200)
        // expect(body).toEqual(expectedGetResult)
    });


    // Get Post By Id
    it('should NOT get post with wrong ID and return 404', async () => {

        const id = 'sdf'

        const {status} = await postFunctions.getPostById(id)
        expect(status).toBe(404)

    });

    it('should get post by ID and return 200', async () => {
        const postById = {
            ...returnedCreatedPost, blogId: blog.body.id,
            blogName: blog.body.name
        }
        const id = createdPost[0].id

        const {body, status} = await postFunctions.getPostById(id)
        expect(status).toBe(200)
        expect(body).toEqual(postById)
    });


    //Update post by id
    it('should NOT Update post with wrong Authorization data and return 401', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id
        }

        await notUpdate(createdPost[0].id, updatePost, 'asd', 401)
    });

    it('should NOT Update post with wrong ID and return 404', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id
        }

        await notUpdate('sdsf', updatePost, authorizationData, 404)
    });

    it('should NOT Update post by ID with wrong long title and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, title: "x".repeat(500)
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by ID with title is not string and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, title: 233
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by ID without title and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, title: null
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by ID without shortDescription and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, shortDescription: null
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by id long shortDescription and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, shortDescription: "null".repeat(1000)
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by id with number in shortDescription and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, shortDescription: 123
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });


    it('should NOT Update post by id with number in content and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, content: 123
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by id with long content and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, content: "asda".repeat(1000)
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by id without content and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id, content: null
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by id without blogId and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: null
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)

    });

    it('should NOT Update post by id with wrong blogId and return 400', async () => {
        const updatePost = {
            ...updatedPostData, blogId: "sdsdfsdf"
        }

        await notUpdate(createdPost[0].id, updatePost, authorizationData, 400)
    });

    it('should Update post by ID and return 204', async () => {
        const updatePost = {
            ...updatedPostData, blogId: blog.body.id
        }

        const id = createdPost[0].id

        const updatedBlog = await postFunctions.updatePostById(id, updatePost, authorizationData)
        expect(updatedBlog.status).toBe(204)

        const {status, body} = await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(updatedPostWithPagination)

    });


    // Delete Post By Id

    it('should NOT Delete post with wrong Authorization data and return 401', async () => {

        const id = createdPost[0].id

        const deletePost = await postFunctions.deletePostById(id, "ssdfsdf")
        expect(deletePost.status).toBe(401)

        const {body, status} = await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(updatedPostWithPagination)

    });


    it('should NOT Delete post with wrong ID and return 404', async () => {

        const id = "sdfsf"

        const deletePost = await postFunctions.deletePostById(id, authorizationData)
        expect(deletePost.status).toBe(404)

        const {body, status} = await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(updatedPostWithPagination)

    });


    it('should Delete post by ID and return 204', async () => {

        const id = createdPost[0].id

        const deletePost = await postFunctions.deletePostById(id, authorizationData)
        expect(deletePost.status).toBe(204)

        const {body, status} = await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyPostData)

    });

})

let users:PostsViewType[]=[]; // very strange, required PostsViewType
describe("user testing", () => {
    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    })


    it('should NOT get user with wrong Authorization and return 401 ', async () => {

        const {status} = await userFunctions.getUsers(userPaginationValues, 'ssd')
        expect(status).toBe(401)

    });

    it('should get users and return 200 ', async () => {

        const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
        expect(status).toBe(200)
        expect(body).toEqual(getEmptyUsersData)

    });

    it('should NOT create users with number in login and 400 ', async () => {
        const userData = {...userCreateData,login:123}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users long login and 400 ', async () => {
        const userData = {...userCreateData,login:"sd".repeat(500)}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users short login and 400 ', async () => {
        const userData = {...userCreateData,login:"sd"}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users without login and 400 ', async () => {
        const userData = {...userCreateData,login:null}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users without password and 400 ', async () => {
        const userData = {...userCreateData,password:null}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users short password and 400 ', async () => {
        const userData = {...userCreateData,password:'1234'}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users long password and 400 ', async () => {
        const userData = {...userCreateData,password:'1234'.repeat(20)}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users number in password and 400 ', async () => {
        const userData = {...userCreateData,password:123}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users without email and 400 ', async () => {
        const userData = {...userCreateData,email:null}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users number in email and 400 ', async () => {
        const userData = {...userCreateData,email:123}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users with wrong email pattern and 400 ', async () => {
        const userData = {...userCreateData,email:"nazim@.com"}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,authorizationData)
    });

    it('should NOT create users with wrong authorization data and 401 ', async () => {
        const userData = {...userCreateData}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData,'sds',401)
    });



    it('should create users and return newly created user and 201 ', async () => {

        const newUser= await userFunctions.createUser(userCreateData, authorizationData)
        expect(newUser.status).toBe(201)
        expect(newUser.body).toEqual(userCreatedData)

        users.push(newUser.body)

        const expectedResult = {...createdUserWithPagination}

        const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
        expect(status).toBe(200)
        expect(body).toEqual(expectedResult)

    });

    it('should NOT create existing user and 400 ', async () => {

        const newUser= await userFunctions.createUser(userCreateData, authorizationData)
        expect(newUser.status).toBe(400)
        expect(newUser.body).toEqual({})

        users.push(newUser.body)

        const expectedResult = {...createdUserWithPagination}

        const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
        expect(status).toBe(200)
        expect(body).toEqual(expectedResult)
    });


    it('should NOT Delete User with wrong ID and return 404', async () => {

        const id = 'asd'

        const deleteUser = await userFunctions.deleteUserById(id, authorizationData)
        expect(deleteUser.status).toBe(404)

        const expectedResult = {...createdUserWithPagination}

        const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
        expect(status).toBe(200)
        expect(body).toEqual(expectedResult)

    });

    it('should Delete User by ID and return 204', async () => {

        const id = users[0].id

        const deleteUser = await userFunctions.deleteUserById(id, authorizationData)
        expect(deleteUser.status).toBe(204)

        const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
        expect(status).toBe(200)
        expect(body).toEqual(getEmptyUsersData)

    });




})