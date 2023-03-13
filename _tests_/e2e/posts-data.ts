export const emptyPostData = {
    pagesCount: expect.any(Number) | 0,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 0,
    items: []
}

export const createdPostWithPagination = {
    pagesCount: expect.any(Number) | 1,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 1,
    items:[ {
        id: expect.any(String),
        title: "ChatGPT",
        shortDescription: "AI",
        content: "About Ai technologies",
        blogId: "6409dca9e947f5d966149e41",
        blogName: "createdBlog[0].name",
        createdAt: expect.any(String)
    }
    ]
}

export const postPaginationValues = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: "createdAt",
    sortDirection: 'desc',
}

export const newPostCreatingData = {
    title: "ChatGPT",
    shortDescription: "AI",
    content: "About Ai technologies",
    blogId: "6409dca9e947f5d966149e41"
}

export const returnedCreatedPost = {
    id: expect.any(String),
    title: "ChatGPT",
    shortDescription: "AI",
    content: "About Ai technologies",
    blogId: "6409dca9e947f5d966149e41",
    blogName: "createdBlog[0].name",
    createdAt: expect.any(String)
}