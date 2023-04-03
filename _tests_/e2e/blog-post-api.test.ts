import request from "supertest"
import {app} from "../../src";
import {cloneDeep} from 'lodash';
import {blogFunctions} from "./functions/blog-functions";
import {
    authorizationData,
    baseBlog,
    createdBlogData,
    emptyBlogData, getUpdatedBlog, paginationValues,
    returnedUnchangedBlog,
    updateBlog,
    updatedBlog
} from "./data/blogs-data";
import {
    createdPostWithPagination,
    emptyPostData, newPostByBlogIdData, newPostCreatingData,

    postPaginationValues,
    returnedCreatedPost, updatedPostData, updatedPostWithPagination
} from "./data/posts-data";
import {postFunctions} from "./functions/post-functions";
import {PostsViewType} from "../../src/repositories/types/posts-view-type";
import {notUpdate} from "./functions/post-should-not-functions";
import {userFunctions} from "./functions/user-functions";
import {
    createdUserWithPagination,
    getEmptyUsersData,
    userCreateData,
    userCreatedData,
    userPaginationValues
} from "./data/user-data";
import {notCreateUser} from "./functions/user-should-not-functions";
import {client, usersAccountsCollection} from "../../src/db/db";
import {authFunctions} from "./functions/auth-functions";
import {commentFunctions} from "./functions/comment-functions";
import {
    commentCreatingData, commentUpdated,
    commentUpdatingData,
    commentWithPagination,
    createdComment
} from "./data/comments-data";
import {currentUser, newUserData, newUserEmail} from "./data/auth-data";
import {BlogsViewType} from "../../src/repositories/types/blogs-view-type";

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const deviceName = ["blackberry", "nokia", "siemens", "philips"];


afterAll(async () => {
    await client.close();
});

describe("blogs SHOULD NOT CRUD testing", () => {
    let createdBlog: Array<any> = [];

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')

    });

// Should NOT tests for Creating Blog - begin ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    it(`should NOT create new blog because of wrong Authorization and return 401 `, async () => {
        const newBlog = {...baseBlog}
        let wrongAuthorizationData = "asvdvsdv"

        const createBlog = await blogFunctions.createBlog(newBlog, wrongAuthorizationData)
        expect(createBlog.status).toBe(401)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })

    it(`should NOT create new blog without name and return 400 `, async () => {
        const newBlog = {...baseBlog, name: null}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })

    it(`should NOT create new blog with number in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: 123}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })

    it(`should NOT create new blog with long string in name and return 400 `, async () => {

        const newBlog = {...baseBlog, name: "blog".repeat(1000)}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)

    })

    it(`should NOT create new blog without description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: null}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)

    })

    it(`should NOT create new blog with number in description and return 400 `, async () => {

        const newBlog = {...baseBlog, description: 123}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)

    })

    it(`should NOT create new blog with long description length and return 400 `, async () => {

        const newBlog = {...baseBlog, description: "blog".repeat(1000)}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })

    it(`should NOT create new blog without websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: null}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })

    it(`should NOT create new blog with long websiteURL length and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "https://blog.io/".repeat(200)}


        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)

    })

    it(`should NOT create new blog with wrong websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: "blog.io/"}


        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })

    it(`should NOT create new blog with number in websiteURL and return 400 `, async () => {

        const newBlog = {...baseBlog, websiteUrl: 123}

        const createBlog = await blogFunctions.createBlog(newBlog, authorizationData)
        expect(createBlog.status).toBe(400)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)
    })
    // END ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    it(`should create new blog and return 204 `, async () => {

        const createBlog = await blogFunctions.createBlog(baseBlog, authorizationData)
        createdBlog.push(createBlog.body)
    })

    //Should Not GET Blog
    it('should NOT get blog by wrong ID should return 404', async () => {
        const paginationData = {...paginationValues}
        const blogId = "asd"

        const blogById = await blogFunctions.getBlogById(paginationData, blogId)

        expect(blogById.status).toBe(404)

        let expectedResult = cloneDeep(createdBlogData)
        expectedResult.items[0].id = createdBlog[0].id
        expectedResult.items[0].createdAt = createdBlog[0].createdAt

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(createdBlogData)
    });

    //Should NOT UPDATE Blog
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
    // END ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


    //Should NOT DELETE Blog
    it('should not Delete blogs with Authorization and return 401', async () => {
        const wrongAuthorizationData = "asasdad"

        const copyGetUpdatedBlog = cloneDeep(getUpdatedBlog)
        copyGetUpdatedBlog.items[0].id = createdBlog[0].id
        copyGetUpdatedBlog.items[0].createdAt = createdBlog[0].createdAt

        await blogFunctions.deleteBlog(createdBlog[0].id, wrongAuthorizationData)
        expect(401)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(createdBlogData)


    });

    it('should NOT Delete blogs by wrong id and 404 and', async () => {
        const copyGetUpdatedBlog = cloneDeep(getUpdatedBlog)
        copyGetUpdatedBlog.items[0].id = createdBlog[0].id
        copyGetUpdatedBlog.items[0].createdAt = createdBlog[0].createdAt

        await blogFunctions.deleteBlog("sdf", authorizationData)
        expect(404)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(createdBlogData)

    });

});


describe("Blogs pagination testing", () => {
    let createdBlog: BlogsViewType[] = []
    const countOfBlogs = 50
    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    });

    it(`should return right pagination values `, async () => {
        console.log('create')
        let newBlogData
        for (let i = 0; i < countOfBlogs; i++) {
            newBlogData = {...baseBlog, name: `Testing pag${i}`}
            const createBlog = await blogFunctions.createBlog(newBlogData, authorizationData)
            createdBlog.push(createBlog.body)
        }
        const paginationData = {...paginationValues, pageSize: 4, pageNumber: 3}

        const result = await blogFunctions.getBlog(paginationData)


        expect(result.body.totalCount).toBe(countOfBlogs)
        expect(result.body.pagesCount).toBe(5)

    })
});


describe("blogs CRUD testing", () => {
    let createdBlog: Array<any> = [];
    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
    });

    // Get Blogs
    it('should return 200 and empty array', async () => {

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)

    });


    // Create Blog
    it("should create new blog and return 201", async () => {

        const createBlog = await blogFunctions.createBlog(baseBlog, authorizationData)

        expect(createBlog.status).toBe(201)

        expect(createBlog.body).toEqual(returnedUnchangedBlog)

        createdBlog.push(createBlog.body)

        let expectedResult = cloneDeep(createdBlogData)
        expectedResult.items[0].id = createdBlog[0].id
        expectedResult.items[0].createdAt = createdBlog[0].createdAt

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(createdBlogData)
    })

    //Get Blog By Id
    it('should get blog by ID should return 200 and found blog', async () => {
        const blogId = createdBlog[0].id

        const blogById = await blogFunctions.getBlogById(paginationValues, blogId)

        let expectedResult = {...createdBlog[0]}

        expect(blogById.status).toBe(200)
        expect(blogById.body).toEqual(expectedResult)


    });


    //Update Blog
    it(`should update blog and return 204`, async () => {

        const updatingBlog = await blogFunctions.updateBlog(createdBlog[0].id, updateBlog, authorizationData)
        expect(updatingBlog.status).toBe(204);

        await blogFunctions.getUpdatedBlog(createdBlog[0].id, updatedBlog)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(getUpdatedBlog)

    })


    //Delete Blog
    it('should Delete blogs by id and 200 and empty array', async () => {

        await blogFunctions.deleteBlog(createdBlog[0].id, authorizationData)
        expect(204)

        const {status, body} = await blogFunctions.getBlog(paginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(emptyBlogData)

    });

});

describe("post testing", () => {
    let createdPost: Array<PostsViewType> = [];
    //TODO should replace any with type
    let blog: any;
    beforeAll(async () => {

        //clearAllData()

        await request(app)
            .delete('/testing/all-data')


        //blog = create blog()
        blog = await blogFunctions.createBlog({...baseBlog}, authorizationData)

    });

    it('should get post empty post and return 200', async () => {
        const emptyPost = {...emptyPostData}
        const paginationData = {...postPaginationValues}

        const {body, status} = await postFunctions.getPost(paginationData)
        expect(status).toBe(200)
        expect(body).toEqual(emptyPost)


    });


    it('should create Post and return 201 and created Post', async () => {

        //TODO build Should NOT for Create

        const newPostData = {...newPostByBlogIdData, blogId: blog.body.id}
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

    it('should create Post for specific blog by blogId return 201 and created Post', async () => {

        //TODO build Should NOT for Create
        //TODO solve problem with get after creating two posts

        const newPostData = {...newPostByBlogIdData}
        const expectedNewPost = {
            ...returnedCreatedPost, blogId: blog.body.id,
            blogName: blog.body.name
        }

        const createPost = await postFunctions.createPostByBlogId(blog.body.id, newPostData, authorizationData)
        expect(createPost.status).toBe(201)
        expect(createPost.body).toEqual(expectedNewPost)

        createdPost.push(createPost.body)

        const {status, body} = await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(createdPostWithPagination)
    });

    it('should NOT get post wrong blogId and return 404', async () => {
        const postByBlogId = cloneDeep(createdPostWithPagination)
        postByBlogId.items[0].blogId = blog.body.id
        postByBlogId.items[0].blogName = blog.body.name

        const {status} = await postFunctions.getPostByBlogId(postPaginationValues, 'sdf')
        expect(status).toBe(404)
    });


    it('should get post by blogId for specified blog and return 200', async () => {

        //TODO solve problem with get after creating two posts

        const postByBlogId = cloneDeep(createdPostWithPagination)
        postByBlogId.items[0].blogId = blog.body.id
        postByBlogId.items[0].blogName = blog.body.name

        const {body, status} = await postFunctions.getPostByBlogId(postPaginationValues, blog.body.id)
        expect(status).toBe(200)
        expect(body).toEqual(createdPostWithPagination)
    });

});

// very strange, required PostsViewType
describe("user testing", () => {
    let users: PostsViewType[] = [];
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
        const userData = {...userCreateData, login: 123}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users long login and 400 ', async () => {
        const userData = {...userCreateData, login: "sd".repeat(500)}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users short login and 400 ', async () => {
        const userData = {...userCreateData, login: "sd"}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users without login and 400 ', async () => {
        const userData = {...userCreateData, login: null}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users without password and 400 ', async () => {
        const userData = {...userCreateData, password: null}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users short password and 400 ', async () => {
        const userData = {...userCreateData, password: '1234'}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users long password and 400 ', async () => {
        const userData = {...userCreateData, password: '1234'.repeat(20)}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users number in password and 400 ', async () => {
        const userData = {...userCreateData, password: 123}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users without email and 400 ', async () => {
        const userData = {...userCreateData, email: null}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users number in email and 400 ', async () => {
        const userData = {...userCreateData, email: 123}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users with wrong email pattern and 400 ', async () => {
        const userData = {...userCreateData, email: "nazim@.com"}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, authorizationData)
    });

    it('should NOT create users with wrong authorization data and 401 ', async () => {
        const userData = {...userCreateData}

        //this function includes trying to create user and checking this with GET
        await notCreateUser(userData, 'sds', 401)
    });


    it('should create users and return newly created user and 201 ', async () => {

        const newUser = await userFunctions.createUser(userCreateData, authorizationData)
        expect(newUser.status).toBe(201)
        expect(newUser.body).toEqual(userCreatedData)

        users.push(newUser.body)

        const expectedResult = {...createdUserWithPagination}

        const {status, body} = await userFunctions.getUsers(userPaginationValues, authorizationData)
        expect(status).toBe(200)
        expect(body).toEqual(expectedResult)

    });

    it('should NOT create existing user and 400 ', async () => {

        const newUser = await userFunctions.createUser(userCreateData, authorizationData)
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

});

describe("auth testing", () => {
    // jest.setTimeout(3 * 60 * 1000)

    //TODO should replace any with type
    let newUser: any
    let token: string;
    let loginUser: any
    let newRefreshToken: any


    // const imapService = new MailBoxImap()


    beforeAll(async () => {

        //clearAllData()
        await request(app)
            .delete('/testing/all-data')

        await request(app)
            .post('/logout')

        // await imapService.connectToMail()
    });


    it('should create new user and send confirmation email and return 204', async () => {
// jest.mock('sendEmail', () => {
//     return true
// })
        newUser = await authFunctions.registerUser(newUserData)

        expect(newUser.status).toBe(204)

    });

    it('should resend registration email and return 204', async () => {


        const result = await authFunctions.resendEmail({email: newUserEmail})
        expect(result.status).toBe(204)

        // async function myAsyncFunction() {
        //     await delay(10000); // Wait for 10 second
        // }
        //
        // await myAsyncFunction();

    });


    it('should confirm registration and return 204', async () => {

        const userWithoutConfirm = await usersAccountsCollection.findOne({"accountData.email": newUserEmail})

        //TODO build Should NOT for auth get user

        // const sentMessage = await imapService.waitNewMessage(1)
        // expect(sentMessage).toBeDefined()
        //
        // const html: string | null = await imapService.getMessageHtml(sentMessage)
        //
        // expect(html).toBeDefined()
        //
        // const code = html!.split("?code=")[1].split("'")[0]
        //
        // expect(code).toBeDefined()

        const result = await authFunctions.registrationConfirmation({code: userWithoutConfirm?.emailConfirmation.confirmationCode})

        expect(result.status).toBe(204)

    });


    it('should login return 200', async () => {

        const loginUserData = {
            loginOrEmail: "nazim86mammadov@yandex.ru",
            password: "123456"
        }

        for (let i = 0; i <= 4; i++) {

            loginUser = await authFunctions.loginUser(loginUserData, deviceName[i])


            // token = loginUser.body.accessToken
            // const refreshToken = loginUser.header['set-cookie'].split(";")[0]

            //      const refreshToken = loginUser.header['set-cookie'][0].split(";")[0]
            // console.log(refreshToken)
            // const refreshToken = loginUser.headers['set-cookie'][0].split(";")[0] // del
            // console.log(refreshToken)
            // console.log(loginUser.body.accessToken)

        }

        expect(loginUser.status).toBe(200)
        expect(loginUser.body).toEqual({accessToken: loginUser.body.accessToken})

    });

    it('should get new access token and refresh token by refresh token and return 200',
        async () => {

            //await delay(1000)

            const refreshToken = loginUser.headers['set-cookie'][0].split(";")[0]
            // console.log(refreshToken) //del
            // console.log(loginUser.body.accessToken) //del

            newRefreshToken = await authFunctions.refreshToken(refreshToken)

            // const resulNewRefreshToken = newToken.headers['set-cookie'][0].split(";")[0] //del
            // console.log(resulNewRefreshToken)//del
            // console.log(newToken.body.accessToken)//del

            expect(newRefreshToken.status).toBe(200)
            expect(newRefreshToken.body).toEqual({accessToken: expect.any(String)})

        });

    it('should get current user return 200', async () => {

        const refreshToken = newRefreshToken.headers['set-cookie'][0].split(";")[0]

        const loginUser = await authFunctions.getCurrentUser(refreshToken)
        expect(loginUser.status).toBe(200)
        expect(loginUser.body).toEqual(currentUser)

    });


    it('should get active devices for current user return 200', async () => {

        const refreshToken = newRefreshToken.headers['set-cookie'][0].split(";")[0]

        const loginUser = await authFunctions.getCurrentDevices(refreshToken)
        expect(loginUser.status).toBe(200)
        // expect(loginUser.body).toEqual(currentUser)

    });



    it('should logout and return 204',
        async () => {

            const refreshToken = newRefreshToken.headers['set-cookie'][0].split(";")[0]
            // console.log(refreshToken)
            // console.log(newToken.body.accessToken)
            const result = await authFunctions.logout(refreshToken)
            expect(result.status).toBe(204)

        });

});

describe("comments testing", () => {
    //TODO should replace any with type
    let blog: any
    let post: any
    let user: any
    let loginUser: any
    let comment: any
    beforeAll(async () => {

        //clearAllData()
        await request(app)
            .delete('/testing/all-data')

        //creating new blog
        blog = await blogFunctions.createBlog(baseBlog, authorizationData)

        //creating new post
        const newPost = {...newPostCreatingData, blogId: blog.body.id}
        post = await postFunctions.createPost(newPost, authorizationData)

        //creating new post
        user = await userFunctions.createUser(userCreateData, authorizationData)

        //login with created user
        const loginUserData = {
            loginOrEmail: user.body.login,
            password: "123456"
        }

        loginUser = await authFunctions.loginUser(loginUserData, deviceName[0]) //will get token from logged user

    });


    it('should create comment by postID and return 201', async () => {

        //Create comment by postId for specific post
        comment = await commentFunctions.createComment(post.body.id,
            commentCreatingData, loginUser.body.accessToken)
        const returnedComment = {
            ...createdComment,
            commentatorInfo: {
                ...createdComment.commentatorInfo,
                userLogin: user.body.login, userId: user.body.id
            }
        }

        expect(comment.status).toBe(201)
        expect(comment.body).toEqual(returnedComment)


        //Check result with GET comments
        const {status, body} = await commentFunctions.getCommentByPostId(post.body.id)
        expect(status).toBe(200)
        expect(body).toEqual(commentWithPagination)

    });


    it('should get comments by post id and return 200', async () => {

        const {status, body} = await commentFunctions.getCommentByPostId(post.body.id)
        expect(status).toBe(200)
        expect(body).toEqual(commentWithPagination)

    });


    it('should update comment by comment id and return 204', async () => {

        const updatedComment = await commentFunctions.updateComment(comment.body.id, commentUpdatingData, loginUser.body.accessToken)
        expect(updatedComment.status).toBe(204)

    });


    it('should get comments by comment id and return 200', async () => {

        const {status, body} = await commentFunctions.getCommentByCommentId(comment.body.id)
        expect(status).toBe(200)
        expect(body).toEqual(commentUpdated)

    });

    it('should delete comment by comment id and return 204', async () => {

        const deleteComment = await commentFunctions.deleteCommentByCommentId(comment.body.id, loginUser.body.accessToken)
        expect(deleteComment.status).toBe(204)

        const {status, body} = await commentFunctions.getCommentByCommentId(comment.body.id)
        expect(status).toBe(404)
        expect(body).toEqual({})


    });


});