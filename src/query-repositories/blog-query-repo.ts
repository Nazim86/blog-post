import {blogsCollection} from "../db/db";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {blogMapping} from "../mapping/blog-mapping";
import {Filter, ObjectId} from "mongodb";
import {BlogQueryType} from "../repositories/types/blog-query-type";
import {BlogsDbType} from "../repositories/types/blogs-db-type";

// type SortedBy = {
//     fieldname: keyof TemplateStringsArray
//     direction: 'asc' | 'desc'
// }
export const blogQueryRepo = {

    async getBlogById(id: string): Promise<BlogsViewType | boolean> {

        try {

            const foundBlog = await blogsCollection.findOne({_id: new ObjectId(id)})
            if (foundBlog) {
                return {
                    id: foundBlog._id.toString(),
                    name: foundBlog.name,
                    description: foundBlog.description,
                    websiteUrl: foundBlog.websiteUrl,
                    createdAt: foundBlog.createdAt,
                    isMembership: foundBlog.isMembership
                }
            } else {
                return false
            }
        }
        catch (e){
            return false
        }

    },

    async getBlog(
        searchNameTerm: string, sortBy: string = "createdAt", sortDirection: string = 'desc',
        pageNumber: number = 1, pageSize: number = 10): Promise<BlogQueryType> {


        const filter: Filter<BlogsDbType> = {name: {$regex: searchNameTerm ?? '', $options: 'i'}}
        const skipSize = (pageNumber - 1) * pageSize
        const totalCount = await blogsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / pageSize)

        const getBlog = await blogsCollection.find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1}) // did not understand well
            .skip(skipSize)
            .limit(pageSize)
            .toArray()

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


