import {CommentsDbType} from "../repositories/types/comments-db-type";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {LikeModel} from "../db/db";
import {LikeEnum} from "../repositories/enums/like-enum";

export const commentMapping = (array: CommentsDbType[]):Promise<CommentsViewType>[] => {
    return array.map(async (postComment: CommentsDbType): Promise<CommentsViewType> => {
        const commentId = postComment._id.toString()
        let myStatus = 'None'
        if (postComment.commentatorInfo.userId) {
            const likeInDb = await LikeModel.findOne({
                commentId,
                userId: postComment.commentatorInfo.userId
            })
            if (likeInDb) {
                myStatus = likeInDb.status
            }
        }
        const likesCount = await LikeModel.countDocuments({commentId, status: LikeEnum.Like})
        const dislikesCount = await LikeModel.countDocuments({commentId, status: LikeEnum.Dislike})

        return {
            id: postComment._id.toString(),
            content: postComment.content,
            commentatorInfo: {
                userId: postComment.commentatorInfo.userId,
                userLogin: postComment.commentatorInfo.userLogin
            },
            createdAt: postComment.createdAt,
            likesInfo: {
                likesCount,
                dislikesCount,
                myStatus: myStatus
            }
        }

    })
}