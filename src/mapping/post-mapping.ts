import {PostsDbType} from "../types/posts-db-type";
import {PostsViewType} from "../types/posts-view-type";

export const postMapping = (array:PostsDbType[])=>{
    return array.map((post:PostsDbType): PostsViewType=> {

        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName
        }
    })
}