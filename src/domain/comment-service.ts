import {PostsViewType} from "../repositories/types/posts-view-type";
import {postRepository} from "../repositories/post-in-db-repository";
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {ObjectId} from "mongodb";
import {commentDbRepository} from "../repositories/comment-db-repository";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {commentsQueryRepo} from "../query-repositories/comments-query-repo";
import {LikeEnum} from "../repositories/enums/like-enum";

export const commentService = {

    async createPostComment(postId:string,content: string,userId:string, userLogin:string):Promise<CommentsViewType|null> {


            const postById: PostsViewType|boolean = await postRepository.getPostById(postId)

            if (!postById || typeof postById === "boolean") return null

            const postComment: CommentsDbType = {
                _id: new ObjectId(),
                postId:postById.id,
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: userLogin
                },
                createdAt: new Date().toISOString(),
                likesInfo:{
                    likesCount:0,
                    dislikesCount: 0,
                    myStatus:"None"
                }
            }
            return await commentDbRepository.createPostComment(postComment, userId, userLogin)
    },

    async updateComment(commentId:string,content:string):Promise<boolean>{
        return await commentDbRepository.updateComment(commentId,content)

    },

    async updateLikeStatus(commentId:string,likeStatus:string):Promise<boolean>{

        const getComment:CommentsViewType|null = await commentsQueryRepo.getComment(commentId)

        if(!getComment) return false

        const myStatus = getComment.likesInfo.myStatus

        if(myStatus===LikeEnum.Dislike && likeStatus===LikeEnum.Like){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":likeStatus},$inc:{"likesInfo.likesCount":1,"likesInfo.dislikesCount":-1}})
        }

        if(myStatus===LikeEnum.Dislike && likeStatus===LikeEnum.None){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":LikeEnum.None},$inc:{"likesInfo.dislikesCount":-1}})
        }

        if(myStatus===LikeEnum.Dislike && likeStatus===LikeEnum.Dislike){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":LikeEnum.None},$inc:{"likesInfo.dislikesCount":-1}})
        }

        if(myStatus===LikeEnum.Like && likeStatus===LikeEnum.Dislike){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":likeStatus},$inc:{"likesInfo.likesCount":-1,"likesInfo.dislikesCount":1}})
        }

        if(myStatus===LikeEnum.Like && likeStatus===LikeEnum.None){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":likeStatus},$inc:{"likesInfo.likesCount":-1}})
        }

        if(myStatus===LikeEnum.Like && likeStatus===LikeEnum.Like){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":LikeEnum.None},$inc:{"likesInfo.likesCount":-1}})
        }

        if(myStatus===LikeEnum.None && likeStatus===LikeEnum.Dislike){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":likeStatus},$inc:{"likesInfo.dislikesCount":1}})
        }

        if(myStatus===LikeEnum.None && likeStatus===LikeEnum.None){
            return true
        }

        if(myStatus===LikeEnum.None && likeStatus===LikeEnum.Like){
            return await commentDbRepository.updateLikeStatus(commentId,LikeEnum.Like,{$set:{"likesInfo.myStatus":likeStatus},$inc:{"likesInfo.likesCount":1}})
        }

        // switch (likeStatus) {
        //     case LikeEnum.Like && :
        //         return response.sendStatus(404)
        //     case ResultCode.Forbidden:
        //         return response.sendStatus(403)
        //     //..
        //     default:
        //         return
        // }

        return false


    },

    async deleteComment(commentId:string):Promise<boolean>{
        return await commentDbRepository.deleteComment(commentId)


    }
}