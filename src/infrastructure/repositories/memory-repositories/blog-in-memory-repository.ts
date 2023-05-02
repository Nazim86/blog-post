type blogsType={

    id:string
    name: string
    description: string
    websiteUrl: string
}

export const blogs: Array<blogsType> = []

export const blogRepository = {
   async createBlog(name: string, description:string, websiteUrl:string) {
        const newId = new Date();
        const creatingBlog: blogsType ={
            id: newId.toISOString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(creatingBlog)
        return creatingBlog
    },

    async getBlogById(id:string){
        return blogs.find(p => p.id === id)
    },
    async updateBlog(id:string,name: string, description:string, websiteUrl:string){
        const updateById = blogs.find(p=>p.id === id )
        if (updateById){
            updateById.name = name
            updateById.description = description
            updateById.websiteUrl = websiteUrl
            return true
        }

    },

    async deleteBlogById(id:string){
        const deleteById = blogs.find(p=>p.id === id )

        if(deleteById){
            blogs.splice(blogs.indexOf(deleteById),1)
            return true
        }

    }


}