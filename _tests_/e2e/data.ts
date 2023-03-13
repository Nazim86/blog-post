import {createdBlog} from "./blog-post-api.test";
import {ObjectId} from "mongodb";


export const baseBlog = {
    name: "Blog",
    description: "creating newblog",
    websiteUrl: "https://it-incubator.io/",
}

export const updateBlog = {
    name: "Blog updated",
    description: "updating blog with new",
    websiteUrl: "https://blog.io/",
}

export const returnedUnchangedBlog = {
    id: expect.any(String),
    name: "Blog",
    description: "creating newblog",
    websiteUrl: "https://it-incubator.io/",
    createdAt: expect.any(String),
    isMembership: false
}

export const updatedBlog = {
    id: expect.any(String),
    name: "Blog updated",
    description: "updating blog with new",
    websiteUrl: "https://blog.io/",
    createdAt: expect.any(String),
    isMembership: false
}

export const paginationValues = {
    searchName: "",
    sortBy: "createdAt",
    sortDirection: 'desc',
    pageNumber: 1,
    pageSize: 10
}

export const emptyBlogData = {
    pagesCount: expect.any(Number) | 0,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 0,
    items: []
}

export const createdBlogData = {
    pagesCount: expect.any(Number) | 1,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 1,
    items: [
        {
            id: expect.any(String),
            name: "Blog",
            description: "creating newblog",
            websiteUrl: "https://it-incubator.io/",
            createdAt: expect.any(String),
            isMembership: false
        }
    ]
}

export const getUpdatedBlog = {
    pagesCount: expect.any(Number) | 1,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 1,
    items: [
        {
            id: expect.any(String),
            name: "Blog updated",
            description: "updating blog with new",
            websiteUrl: "https://blog.io/",
            createdAt: expect.any(String),
            isMembership: false
        }
    ]
}

export const newPostCreatingData = {
    title: "ChatGPT",
    shortDescription: "AI",
    content: "About Ai technologies",
    blogId: "6409dca9e947f5d966149e41"
}

export const returnedCreatedPost = {
    id: expect.any(String),
    title: "Post",
    shortDescription: "creating post for blogs",
    content: "Content is related to Post",
    blogId: 'createdBlog[0].id,',
    blogName: "createdBlog[0].name",
    createdAt: expect.any(String)
}