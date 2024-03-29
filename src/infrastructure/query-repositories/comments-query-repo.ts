import {CommentModel, LikeModel} from "../../db/db";
import {ObjectId} from "mongodb";
import {commentMapping} from "../../mapping/comment-mapping";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";
import {LikeEnum} from "../repositories/enums/like-enum";
import {PostsQueryRepo} from "./posts-query-repo";
import {injectable} from "inversify";

@injectable()
export class CommentsQueryRepo{

    private postQueryRepo: PostsQueryRepo
    constructor() {
        this.postQueryRepo = new PostsQueryRepo()
    }

    async getCommentsForPost(postId: string, pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Promise<QueryPaginationType<CommentsViewType[]> | null> {

        const postById: PostsViewType | boolean = await this.postQueryRepo.getPostById(postId)
        if (!postById) return null
        const skipSize = (pageNumber - 1) * pageSize
        const totalCount = await CommentModel.countDocuments({postId: postId})
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getCommentsForPost: CommentsDbType[] = await CommentModel.find({postId: postId})
            .sort({[sortBy]: sortDirection === "asc" ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .lean()


        const mappedComment: Promise<CommentsViewType>[] = commentMapping(getCommentsForPost)

        const resolvedComments: CommentsViewType[] = await Promise.all(mappedComment);

        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: resolvedComments
        }
    }

    async  getComment(commentId: string, userId?: string): Promise<CommentsViewType | null> {

        try {
            const getComment: CommentsDbType | null = await CommentModel.findOne({_id: new ObjectId(commentId)})

            if (!getComment) return null

            let myStatus = 'None'
            if (userId) {
                const likeInDb = await LikeModel.findOne({commentId, userId})
                if (likeInDb) {
                    myStatus = likeInDb.status
                }
            }

            const likesCount = await LikeModel.countDocuments({commentId, status: LikeEnum.Like})
            const dislikesCount = await LikeModel.countDocuments({commentId, status: LikeEnum.Dislike})

            return {
                id: getComment._id.toString(),
                content: getComment.content,
                commentatorInfo: {
                    userId: getComment.commentatorInfo.userId,
                    userLogin: getComment.commentatorInfo.userLogin
                },
                createdAt: getComment.createdAt,
                likesInfo: {
                    likesCount,
                    dislikesCount,
                    myStatus: myStatus
                }
            }

        }catch (e) {
            return null
        }
    }
}

