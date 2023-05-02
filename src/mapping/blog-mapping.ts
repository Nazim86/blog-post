import {BlogsDbType} from "../infrastructure/repositories/types/blogs-db-type";
import {BlogsViewType} from "../infrastructure/repositories/types/blogs-view-type";

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