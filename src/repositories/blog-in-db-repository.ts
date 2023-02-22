import {client} from "./db";

type blogsType={

    id:string
    name: string
    description: string
    websiteUrl: string
}

export const blogs: Array<blogsType> = []

export const blogRepository = {

    async createBlog( name: string, description:string, websiteUrl:string): Promise<blogsType> {

        const newId = new Date();

        const newBlog = {
            id: newId.toISOString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        const result = await client.db('blogPost').collection('blogs').insertOne(newBlog)
        return newBlog

    },

    async getBlog(): Promise<blogsType[]>{

        return await client.db('blogPost').collection<blogsType>('blogs').find({}).toArray()

    },

    async getBlogById(id:string): Promise<blogsType[]>{
        return client.db('blogPost').collection<blogsType>("blogs").find({id:id}).toArray()
        //blogs.find(p => p.id === id)
    },
   async updateBlog(id:string,name: string, description:string, websiteUrl:string){
        const updateById = await client.db('blogPost').collection<blogsType>("blogs").find({id:id}).toArray()

       console.log(updateById)
        // if (updateById){
        //     updateById.name = name
        //     updateById.description = description
        //     updateById.websiteUrl = websiteUrl
        //     return true
        // }

    },

    deleteBlogById(id:string){
        const deleteById = blogs.find(p=>p.id === id )

        if(deleteById){
            blogs.splice(blogs.indexOf(deleteById),1)
            return true
        }

    }


}