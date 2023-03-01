import {BlogQueryType} from "../types/blog-query-type";
import {postsCollection} from "../db/db";
import {postMapping} from "../mapping/post-mapping";


export const postQueryRepo =
    {

        async getPostsByBlogId(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, blogId: string):
            Promise<BlogQueryType | boolean> {

            const skipSize = (pageNumber - 1) * pageSize
            const totalCount = await postsCollection.countDocuments({blogId: blogId})
            const pagesCount = Math.ceil(totalCount / pageSize)


            const getPostsByBlogId = postsCollection.find({blogId: blogId})
                .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
                .skip(skipSize)
                .limit(pageSize)
                .toArray()

            const mappedBlog = await postMapping(getPostsByBlogId)

            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedBlog

            }
        }
    }