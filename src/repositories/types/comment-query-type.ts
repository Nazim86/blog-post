import {CommentsViewType} from "./comments-view-type";


export type CommentQueryType = {

    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<CommentsViewType>
}
