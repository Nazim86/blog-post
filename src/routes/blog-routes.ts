import {Request, Response, Router} from "express";
import {blogRepository, blogs} from "../repositories/blog-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {description, nameValidation, websiteUrl} from "../validations/blog-validations";

export const blogRoutes = Router({})

const createPostValidations= [nameValidation,description,websiteUrl, inputValidationMiddleware]

blogRoutes.get('/', (req:Request, res:Response) => {

    res.status(200).send(blogs)
})

blogRoutes.post('/',baseAuthorizationMiddleware,createPostValidations,
    (req:Request, res:Response) => {

    // const username = req.headers.username
        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog = blogRepository.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    })

blogRoutes.get('/:id', (req:Request, res:Response) => {

   const getBlog = blogRepository.getBlogById(req.params.id)

    if(getBlog){
        res.status(200).send(getBlog)
    }else{
        res.send(404)
    }

})

blogRoutes.put('/:id',baseAuthorizationMiddleware,createPostValidations,
    (req:Request, res:Response) => {


        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const updateBlog = blogRepository.updateBlog(req.params.id,name, description, websiteUrl)

        if (updateBlog) {
            res.send(204)
        }else{
            res.send(404)
        }
    })

blogRoutes.delete('/:id',baseAuthorizationMiddleware, (req:Request, res:Response) => {

    const deleteBlog = blogRepository.deleteBlogById(req.params.id)

    if (deleteBlog){
        res.send(204)
    }else{
        res.send(404)
    }

})
