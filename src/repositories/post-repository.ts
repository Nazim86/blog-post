type postsType={
    id:number
    title: string
    shortDescription : string
    content : string
    blogId: string
}

export const posts: Array<postsType> = []

export const postRepository = {
    createPost(title: string, shortDescription:string, content: string, blogId:string) {
        const newId = new Date();
        const creatingPost: postsType ={
            id: +newId,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId
        }
        posts.push(creatingPost)
        return creatingPost
    },

    getPostById(id:number){
        return posts.find(p => p.id === id)
    },
    updatePost(id:number,title: string, shortDescription:string, content: string, blogId:string){
        const updateById = posts.find(p=>p.id === id )
        if (updateById){
            updateById.title = title
            updateById.shortDescription = shortDescription
            updateById.content = content
            updateById.blogId = blogId
            return true
        }

    },

    deletePostById(id:number){
        const deleteById = posts.find(p=>p.id === id )

        if(deleteById){
            posts.splice(posts.indexOf(deleteById),1)
            return true
        }

    }


}