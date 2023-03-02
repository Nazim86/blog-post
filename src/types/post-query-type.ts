import {PostsViewType} from "./posts-view-type";

export type PostQueryType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostsViewType[]
}
