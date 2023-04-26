import { PostLikeModel, PostModel} from "../db/db";
import {postMapping} from "../mapping/post-mapping";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {NewestLikesType, PostsDbType} from "../repositories/types/posts-db-type";
import {ObjectId} from "mongodb";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";
import {LikeEnum} from "../repositories/enums/like-enum";
import {PostLikesDbType} from "../repositories/types/post-likes-db-type";
import {newestLikesMapping} from "../mapping/post-likes-mapping";

export class PostsQueryRepo {

    async getPostById(postId: string, userId?: string|undefined): Promise<PostsViewType | boolean> {

        try {
            const postById: PostsDbType | null = await PostModel.findOne({_id: new ObjectId(postId)})

            if (!postById) {
                return false
            }

            let myStatus = "None"

            if (userId) {
                const likeInDb = await PostLikeModel.findOne({postId, userId})
                if (likeInDb) {
                    myStatus = likeInDb.status
                }
            }

            const likesCount = await PostLikeModel.countDocuments({postId, status: LikeEnum.Like})
            const dislikesCount = await PostLikeModel.countDocuments({postId, status: LikeEnum.Dislike})

            // const getLikeInfoForPost = await PostLikeModel.findOne({postId})


            const getLast3Likes:PostLikesDbType[] = await PostLikeModel.find({postId,status:LikeEnum.Like})
                .sort({ addedAt: -1 }) // sort by addedAt in descending order
                .limit(3) // limit to 3 results
                .lean();

            const newestLikes:NewestLikesType[] = newestLikesMapping(getLast3Likes)

            return {
                id: postById._id.toString(),
                title: postById.title,
                shortDescription: postById.shortDescription,
                content: postById.content,
                blogId: postById.blogId,
                blogName: postById.blogName,
                createdAt: postById.createdAt,
                extendedLikesInfo: {
                    likesCount,
                    dislikesCount,
                    myStatus: myStatus,
                    newestLikes: newestLikes
                }
            }
        } catch (e) {
            return false
        }
    }

    async getPost(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string,userId?:string): Promise<QueryPaginationType<PostsViewType[]>> {

        const skipSize = (pageNumber - 1) * pageSize
        const totalCount = await PostModel.countDocuments({})
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getposts: PostsDbType[] = await PostModel.find({})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .lean();


        const mappedPost: Promise<PostsViewType>[] = postMapping(getposts,userId);

        const resolvedMappedPosts: PostsViewType[] = await Promise.all(mappedPost);

        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: resolvedMappedPosts
        }
    }

    async getPostsByBlogId(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string,userId?:string):
        Promise<QueryPaginationType<PostsViewType[]> | boolean> {

        const skipSize = (pageNumber - 1) * pageSize
        const totalCount = await PostModel.countDocuments({blogId: blogId})
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getPostsByBlogId: PostsDbType[] = await PostModel.find({blogId: blogId})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(skipSize)
            .limit(pageSize)
            .lean()

        if (getPostsByBlogId.length === 0) return false


        const mappedPost: Promise<PostsViewType>[] = postMapping(getPostsByBlogId, userId)

        const resolvedMappedPosts: PostsViewType[] = await Promise.all(mappedPost);


        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: resolvedMappedPosts

        }
    }
}
