import {PostLikesDbType} from "../repositories/types/post-likes-db-type";
import {NewestLikesType} from "../repositories/types/posts-db-type";

export const newestLikesMapping = (postLikes:PostLikesDbType[],login:string,userId:string):NewestLikesType[]=>{
    return postLikes.map((likes:PostLikesDbType):NewestLikesType=>{
        return {
            addedAt: likes.addedAt,
            userId: userId,
            login: login
        }
    })
}