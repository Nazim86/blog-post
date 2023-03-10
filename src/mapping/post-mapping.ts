import {PostsDbType} from "../repositories/types/posts-db-type";
import {PostsViewType} from "../repositories/types/posts-view-type";

export const postMapping = (array:PostsDbType[]):PostsViewType[]=>{
    return array.map((post:PostsDbType): PostsViewType=> {

        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    })
}