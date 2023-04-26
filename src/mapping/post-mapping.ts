import {NewestLikesType, PostsDbType} from "../repositories/types/posts-db-type";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {PostLikeModel, UserAccountModel} from "../db/db";
import {ObjectId} from "mongodb";
import {LikeEnum} from "../repositories/enums/like-enum";
import {PostLikesDbType} from "../repositories/types/post-likes-db-type";
import {newestLikesMapping} from "./post-likes-mapping";

export const postMapping = (array: PostsDbType[], userId: string | undefined):Promise<PostsViewType>[]=>{
    return array.map(async (post: PostsDbType): Promise<PostsViewType> => {

        let myStatus = "None"

        if (userId) {
            const likeInDb = await PostLikeModel.findOne({postId:post._id, userId})
            if (likeInDb) {
                myStatus = likeInDb.status
            }
        }

        const likesCount = await PostLikeModel.countDocuments({postId:post._id.toString(), status: LikeEnum.Like})
        const dislikesCount = await PostLikeModel.countDocuments({postId:post._id.toString(), status: LikeEnum.Dislike})

        // const getLikeInfoForPost = await PostLikeModel.findOne({postId})


        const getLast3Likes: PostLikesDbType[] = await PostLikeModel.find({postId:post._id})
            .sort({addedAt: -1}) // sort by addedAt in descending order
            .limit(3) // limit to 3 results
            .lean();

        const newestLikes: NewestLikesType[] = newestLikesMapping(getLast3Likes)


        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                likesCount,
                dislikesCount,
                myStatus: myStatus,
                newestLikes: newestLikes
            }
        }
    })
}