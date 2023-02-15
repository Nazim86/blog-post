type blogsType={

    id:number
    name: string
    description: string
    websiteUrl: string
}

export const blogs: Array<blogsType> = []

export const blogRepository = {
    createBlog(name: string, description:string, websiteUrl:string) {
        const newId = new Date();
        const creatingBlog: blogsType ={
            id: +newId,
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(creatingBlog)
        return creatingBlog
    },

    getBlogById(id:number){
        const blogById = blogs.find(p=>p.id === id )
        return blogById
    },
    updateBlog(id:number,name: string, description:string, websiteUrl:string){
        const updateById = blogs.find(p=>p.id === id )
        if (updateById){
            updateById.name = name
            updateById.description = description
            updateById.websiteUrl = websiteUrl
            return true
        }

    },

    deleteBlogById(id:number){
        const deleteById = blogs.find(p=>p.id === id )

        if(deleteById){
            blogs.splice(blogs.indexOf(deleteById),1)
            return true
        }

    }


}