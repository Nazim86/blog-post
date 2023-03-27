import {postFunctions} from "./post-functions";
import {createdPostWithPagination, postPaginationValues} from "../data/posts-data";




export const notUpdate = async (id:string,updatePost:object,authorizationData:string,statusNumber:number)=>{

        const updatedBlog=  await postFunctions.updatePostById(id,updatePost,authorizationData)
        expect(updatedBlog.status).toBe(statusNumber)

        const {status,body}=  await postFunctions.getPost(postPaginationValues)
        expect(status).toBe(200)
        expect(body).toEqual(createdPostWithPagination)


}