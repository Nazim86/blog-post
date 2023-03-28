
export const createdComment = {

    id: expect.any(String),
    content: "Learning to code in IT incubator",
    commentatorInfo: {
        userId: expect.any(String),
        userLogin: expect.any(String)
    },
    createdAt: expect.any(String)
}

export const commentWithPagination = {

    pagesCount: expect.any(Number) | 1,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 1,
    items: [{
        id: expect.any(String),
        content: "Learning to code in IT incubator",
        commentatorInfo: {
            userId: expect.any(String),
            userLogin: expect.any(String)
        },
        createdAt: expect.any(String)
    }
    ]
}

export const commentUpdated = {


        id: expect.any(String),
        content: "Already done homework 7 and going on",
        commentatorInfo: {
            userId: expect.any(String),
            userLogin: expect.any(String)
        },
        createdAt: expect.any(String)


}

export const commentCreatingData = {content:"Learning to code in IT incubator"}

export const commentUpdatingData = {content:"Already done homework 7 and going on"}