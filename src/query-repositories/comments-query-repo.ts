import {commentsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {CommentQueryType} from "../repositories/types/comment-query-type";
import {commentMapping} from "../mapping/comment-mapping";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {CommentsDbType} from "../repositories/types/comments-db-type";

export const commentsQueryRepo = {
    async getCommentsForPost (postId:string,pageNumber:number,pageSize:number,sortBy:string,sortDirection:string):Promise<CommentQueryType> {

        const skipSize = (pageNumber-1)*pageSize
        const totalCount = await commentsCollection.countDocuments({postId:postId})
        const pagesCount = Math.ceil(totalCount/pageSize)

        const getCommentsForPost:CommentsDbType[] = await commentsCollection.find({postId:postId})
            .sort({[sortBy]:sortDirection==="asc" ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .toArray()

        const mappedComment:CommentsViewType[] = commentMapping(getCommentsForPost)

        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: mappedComment
        }
    },

    async getComment(commentId:string):Promise<CommentsViewType|null>{

        const getComment = await commentsCollection.findOne({_id:new ObjectId(commentId)})

        if (!getComment) return null

        return{
            id: getComment._id.toString(),
            content: getComment.content,
            commentatorInfo: {
                userId: getComment.commentatorInfo.userId,
                userLogin: getComment.commentatorInfo.userLogin
            },
            createdAt: getComment.createdAt

        }
    }
}