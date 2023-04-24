import {PostsViewType} from "../repositories/types/posts-view-type";
import {postRepository} from "../repositories/post-in-db-repository";
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {ObjectId} from "mongodb";
import {commentDbRepository} from "../repositories/comment-db-repository";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {commentsQueryRepo} from "../query-repositories/comments-query-repo";
import {LikeEnum} from "../repositories/enums/like-enum";

export class CommentService {

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
    }

    async updateComment(commentId:string,content:string):Promise<boolean>{
        return await commentDbRepository.updateComment(commentId,content)

    }

    async updateLikeStatus(commentId:string, userId: string, likeStatus:LikeEnum):Promise<boolean>{

        const getComment:CommentsViewType|null = await commentsQueryRepo.getComment(commentId,userId)

        if(!getComment) return false

        return await commentDbRepository.updateLikeStatus(commentId, userId, likeStatus)
    }

    async deleteComment(commentId:string):Promise<boolean>{
        return await commentDbRepository.deleteComment(commentId)
    }
}

export const commentService = new CommentService()