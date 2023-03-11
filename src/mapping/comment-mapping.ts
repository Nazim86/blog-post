import {CommentsDbType} from "../repositories/types/comments-db-type";
import {CommentsViewType} from "../repositories/types/comments-view-type";

export const commentMapping = (array: CommentsDbType[]): CommentsViewType[] => {
    return array.map((postComment:CommentsDbType) :CommentsViewType=> {
        return {
            id: postComment._id.toString(),
            content: postComment.content,
            commentatorInfo: {
                userId: postComment.commentatorInfo.userId,
                userLogin: postComment.commentatorInfo.userLogin
            },
            createdAt: postComment.createdAt
        }

    })
}