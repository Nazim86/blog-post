type postsType={
    id:string
    title: string
    shortDescription : string
    content : string
    blogId: string
    blogName: string
}

export const posts: Array<postsType> = []

export const postRepository = {
    createPost(title: string, shortDescription:string, content: string, blogId:string) {
        const newId = new Date();
        const creatingPost: postsType ={
            id: newId.toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: newId.toString()
        }
        posts.push(creatingPost)
        return creatingPost
    },

    getPostById(id:string){
        return posts.find(p => p.id === id)
    },
    updatePost(id:string,title: string, shortDescription:string, content: string, blogId:string){
        const updateById = posts.find(p=>p.id === id )
        if (updateById){
            updateById.title = title
            updateById.shortDescription = shortDescription
            updateById.content = content
            updateById.blogId = blogId
            return true
        }

    },

    deletePostById(id:string){
        const deleteById = posts.find(p=>p.id === id )

        if(deleteById){
            posts.splice(posts.indexOf(deleteById),1)
            return true
        }

    }


}