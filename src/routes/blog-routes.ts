import {Request, Response, Router} from "express";
import {body, param, validationResult} from "express-validator";
import {blogRepository, blogs} from "../repositories/blog-repository";
import {blogInputMiddleware} from "../middlewares/blog-input-middleware";

export const blogRoutes = Router({})

const customErrorMessage = {"errorMessages":[
        {
            "message": "heyo",
            "field": "pis"
        }
    ]

}

const nameValidation = body("name").isString().trim().isLength({max:15}).withMessage("customErrorMessage")
const description = body("description").isString().trim().isLength({max:500})
const websiteUrl = body("websiteUrl").isString().trim().isLength({max:100}).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
const idValidation = param("id").exists()

//blogRoutes.use(nameValidation,description,websiteUrl, blogInputMiddleware)


blogRoutes.get('/', (req:Request, res:Response) => {

    res.status(200).send(blogs)
})

blogRoutes.post('/',nameValidation,description,websiteUrl, blogInputMiddleware,
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

    res.status(200).send(getBlog)
})

blogRoutes.put('/:id',idValidation,nameValidation,description,websiteUrl, blogInputMiddleware,
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

blogRoutes.delete('/:id', (req:Request, res:Response) => {

    const deleteBlog = blogRepository.deleteBlogById(+req.params.id)

    if (deleteBlog){
        res.send(204)
    }else{
        res.send(404)
    }

})