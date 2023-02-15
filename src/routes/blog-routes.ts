import {Request, Response, Router} from "express";
import {body, param, validationResult} from "express-validator";
import {blogRepository, blogs} from "../repositories/blog-repository";

export const blogRoutes = Router({})

const customErrorMessage = {"errorMessages":[
        {
            "message": "heyo",
            "field": "pis"
        }
    ]

}

const nameValidation = body("name").isString().trim().notEmpty().isLength({max:15}).withMessage("customErrorMessage")
const description = body("description").isString().trim().notEmpty().isLength({max:500})
const websiteUrl = body("websiteUrl").isString().trim().notEmpty().isLength({max:100}).matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
const id = param("id").isString()

blogRoutes.use(nameValidation,description,websiteUrl)


blogRoutes.get('/', (req:Request, res:Response) => {

    res.status(200).send(blogs)
})

blogRoutes.post('/',
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog = blogRepository.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    })

blogRoutes.get('/:id', (req:Request, res:Response) => {

   const getBlog = blogRepository.getBlogById(+req.params.id)

    res.status(200).send(getBlog)
})

blogRoutes.put('/:id',
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
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