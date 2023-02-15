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
    }
}