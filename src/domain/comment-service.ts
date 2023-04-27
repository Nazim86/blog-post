import {PostsViewType} from "../repositories/types/posts-view-type";
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {ObjectId} from "mongodb";
import {CommentDbRepository} from "../repositories/comment-db-repository";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {LikeEnum} from "../repositories/enums/like-enum";
import {CommentsQueryRepo} from "../query-repositories/comments-query-repo";
import {PostsQueryRepo} from "../query-repositories/posts-query-repo";

export class CommentService {


    constructor(protected commentsQueryRepo: CommentsQueryRepo,
                protected postQueryRepo: PostsQueryRepo,
                protected commentDbRepository: CommentDbRepository) {
    }


    async createPostComment(postId: string, content: string, userId: string, userLogin: string): Promise<CommentsViewType | null> {

        const postById: PostsViewType | boolean = await this.postQueryRepo.getPostById(postId)

        if (!postById || typeof postById === "boolean") return null

        const postComment = new CommentsDbType(new ObjectId(), postById.id, content, {
            userId: userId,
            userLogin: userLogin
        }, new Date().toISOString(), {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: "None"
        })

        return await this.commentDbRepository.createPostComment(postComment, userId, userLogin)
    }

    async updateComment(commentId: string, content: string): Promise<boolean> {
        return await this.commentDbRepository.updateComment(commentId, content)

    }

    async updateCommentLikeStatus(commentId: string, userId: string, likeStatus: LikeEnum): Promise<boolean> {

        const getComment: CommentsViewType | null = await this.commentsQueryRepo.getComment(commentId, userId)

        if (!getComment) return false

        return await this.commentDbRepository.updateCommentLikeStatus(commentId, userId, likeStatus)
    }

    async deleteComment(commentId: string): Promise<boolean> {
        return await this.commentDbRepository.deleteComment(commentId)
    }
}

