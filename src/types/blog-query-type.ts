import {BlogsViewType} from "./blogs-view-type";


export type BlogQueryType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<BlogsViewType>
}

// searchName: string
// sortBy:string
// sortDirection:string
// pageNumber : number
// pageSize : number
