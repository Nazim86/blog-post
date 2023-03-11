import {PostsViewType} from "../repositories/types/posts-view-type";
import {postRepository} from "../repositories/post-in-db-repository";
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {ObjectId} from "mongodb";
import {commentDbRepository} from "../repositories/comment-db-repository";
import {CommentsViewType} from "../repositories/types/comments-view-type";

export const commentService = {

    async createPostComment(postId:string,content: string,userId:string, userLogin:string):Promise<CommentsViewType | null|string> {


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
                createdAt: new Date().toISOString()
            }
            return await commentDbRepository.createPostComment(postComment, userId, userLogin)
    },

    async updateComment(commentId:string,content:string):Promise<boolean>{
        return await commentDbRepository.updateComment(commentId,content)

    },

    async deleteComment(commentId:string):Promise<boolean>{
        return await commentDbRepository.deleteComment(commentId)


    }
}