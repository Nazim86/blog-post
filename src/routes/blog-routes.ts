import {Request, Response, Router} from "express";
import {body, param} from "express-validator";
import {blogRepository, blogs} from "../repositories/blog-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {posts} from "../repositories/post-repository";

export const blogRoutes = Router({})


const nameValidation = body("name").isString().trim().isLength({max:15})
const description = body("description").isString().trim().isLength({max:500})
const websiteUrl = body("websiteUrl").isString().trim().isLength({max:100}).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
const idValidation = param("id").exists()

blogRoutes.get('/', (req:Request, res:Response) => {

    res.status(200).send(blogs)
})

blogRoutes.post('/',baseAuthorizationMiddleware,nameValidation,description,websiteUrl, inputValidationMiddleware,
    (req, res) => {

    // const username = req.headers.username
        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog = blogRepository.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    })

blogRoutes.get('/:id',idValidation, (req:Request, res:Response) => {

   const getBlog = blogRepository.getBlogById(+req.params.id)

    if(getBlog){
        res.status(200).send(getBlog)
    }else{
        res.send(404)
    }

})

blogRoutes.put('/:id',baseAuthorizationMiddleware,idValidation,nameValidation,description,websiteUrl, inputValidationMiddleware,
    (req, res) => {


        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const updateBlog = blogRepository.updateBlog(+req.params.id,name, description, websiteUrl)

        if (updateBlog) {
            res.send(204)
        }else{
            res.send(404)
        }
    })

blogRoutes.delete('/:id',baseAuthorizationMiddleware, (req:Request, res:Response) => {

    const deleteBlog = blogRepository.deleteBlogById(+req.params.id)

    if (deleteBlog){
        res.send(204)
    }else{
        res.send(404)
    }

})

blogRoutes.delete('/', (req: Request, res: Response) => {
    posts.length = 0
    return res.sendStatus(204)
})