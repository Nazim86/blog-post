import {BlogsDbType} from "../repositories/types/blogs-db-type";
import {BlogsViewType} from "../repositories/types/blogs-view-type";

export const blogMapping = (array: BlogsDbType[]):BlogsViewType[] => {
    return array.map((blog: BlogsDbType): BlogsViewType => {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }

    })

}