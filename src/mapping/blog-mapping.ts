import {BlogsDbType} from "../types/blogs-db-type";
import {BlogsViewType} from "../types/blogs-view-type";

export const blogMapping = (array: BlogsDbType[]) => {
    return array.map((blog: BlogsDbType): BlogsViewType => {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.name,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }

    })

}