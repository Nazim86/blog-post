

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



export const getBlog = {
    pagesCount: expect.any(Number) | 0,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 0,
    items: []
}

