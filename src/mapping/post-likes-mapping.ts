import {PostLikesDbType} from "../infrastructure/repositories/types/post-likes-db-type";
import {NewestLikesType} from "../infrastructure/repositories/types/posts-db-type";

export const newestLikesMapping = (postLikes: PostLikesDbType[]):NewestLikesType[]=>{
    return postLikes.map((likes:PostLikesDbType):NewestLikesType=>{
        return {
            addedAt: likes.addedAt,
            userId: likes.userId,
            login: likes.login
        }
    })
}