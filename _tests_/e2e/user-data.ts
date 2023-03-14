
export const userPaginationValues = {
    pageNumber: 1,
    pageSize: 10,
    sortBy: "createdAt",
    sortDirection: 'desc',
    searchLoginTerm: null,
    searchEmailTerm:null
}


export const getEmptyUsersData ={
    pagesCount: expect.any(Number) | 0,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 0,
    items: []
}

export const createdUserWithPagination = {
    pagesCount: expect.any(Number) | 1,
    page: expect.any(Number) | 1,
    pageSize: expect.any(Number) | 10,
    totalCount: expect.any(Number) | 1,
    items:[ {
        id:expect.any(String),
        login: "nazim",
        email: "nazim@gmail.com",
        createdAt:expect.any(String)
    }
    ]
}


export const userCreateData = {
    login: "nazim",
    password:"123456",
    email: "nazim@gmail.com"
}

export const userCreatedData = {
    id:expect.any(String),
    login: "nazim",
    email: "nazim@gmail.com",
    createdAt:expect.any(String)
}