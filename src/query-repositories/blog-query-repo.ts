import {BlogModel} from "../db/db";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {blogMapping} from "../mapping/blog-mapping";
import {ObjectId} from "mongodb";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";

export class BlogQueryRepo {

    async getBlogById(id: string): Promise<BlogsViewType | boolean> {

        try {
            const foundBlog = await BlogModel.findOne({_id: new ObjectId(id)})

            if (!foundBlog) {
                return false
            }
            return {
                id: foundBlog._id.toString(),
                name: foundBlog.name,
                description: foundBlog.description,
                websiteUrl: foundBlog.websiteUrl,
                createdAt: foundBlog.createdAt,
                isMembership: foundBlog.isMembership
            }
        } catch (e) {
            return false
        }
    }

    async getBlog(
        searchNameTerm: string, sortBy: string = "createdAt", sortDirection: string = 'desc',
        pageNumber: number = 1, pageSize: number = 10): Promise<QueryPaginationType<BlogsViewType[]>> {


        const filter = {name: {$regex: searchNameTerm ?? '', $options: 'i'}}
        const skipSize = (pageNumber - 1) * pageSize
        const totalCount = await BlogModel.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getBlog = await BlogModel.find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1}) // did not understand well
            .skip(skipSize)
            .limit(pageSize)
            .lean()

        const mappedBlog = blogMapping(getBlog)
        return {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: mappedBlog
        }

    }
}




