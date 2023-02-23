import {client} from "./db";


export type blogsType={

    id:string
    name: string
    description: string
    websiteUrl: string
}

export const blogs: Array<blogsType> = []

export const blogRepository = {

    async createBlog( name: string, description:string, websiteUrl:string): Promise<blogsType> {

        const newId = new Date().getTime();
        const createdAt = new Date();

        const newBlog = {
            id: newId.toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: createdAt.toString(),
            isMembership: true

        }
        await client.db('blogPost').collection('blogs').insertOne(newBlog)
        return newBlog

    },

    async getBlog(): Promise<blogsType[]>{

        return await client.db('blogPost').collection<blogsType>('blogs').find({}).toArray()

    },

    async getBlogById(id:string): Promise<blogsType[]>{
        return client.db('blogPost').collection<blogsType>("blogs").find({id:id}).toArray()
        //blogs.find(p => p.id === id)
    },
   async updateBlog(id:string,name: string, description:string, websiteUrl:string): Promise<boolean>{
      await client.db('blogPost').collection<blogsType>("blogs").updateOne({id:id},
            {$set:{name:name, description: description, websiteUrl: websiteUrl }}
        )
       return true

    },

   async deleteBlogById(id:string):Promise<boolean>{
        const deleteById = await client.db("blogPost").collection("blogs").deleteOne({id:id},)

        console.log(deleteById)
        return true
    }


}