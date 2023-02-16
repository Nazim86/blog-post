import {Request, Response, Router} from "express";
import {body, param, validationResult} from "express-validator";
import {blogRepository, blogs} from "../repositories/blog-repository";
import {blogInputMiddleware} from "../middlewares/blog-input-middleware";
import {postInputMiddleware} from "../middlewares/post-input-middlewares";

export const postRoutes = Router({})

const customErrorMessage = {"errorMessages":[
        {
            "message": "heyo",
            "field": "pis"
        }
    ]

}

const nameValidation = body("title").isString().trim().isLength({max:30})
const descriptionValidation = body("shortDescription").isString().trim().isLength({max:100})
const contentValidation = body("content").isString().trim().isLength({max:1000})
const blogIdValidation = body("blogId").isString()
const id = param("id").isString()

//blogRoutes.use(nameValidation,description,websiteUrl, blogInputMiddleware)


postRoutes.get('/', (req:Request, res:Response) => {

    res.status(200).send(posts)
})

postRoutes.post('/',nameValidation,descriptionValidation,contentValidation,blogIdValidation,postInputMiddleware,
    (req, res) => {

        // const username = req.headers.username
        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const newPost = postRepository.createPost(title, shortDescription, content, blogId)

        if (newPost) {
            res.status(201).send(newPost)
        }
    })

postRoutes.get('/:id', (req:Request, res:Response) => {

    const getPost = postRepository.getPostById(+req.params.id)

    res.status(200).send(getPost)
})

postRoutes.put('/:id',nameValidation,descriptionValidation,contentValidation,blogIdValidation,postInputMiddleware,
    (req, res) => {


        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const updatePost = postRepository.updatePost(+req.params.id,title, shortDescription, content, blogId)

        if (updatePost) {
            res.send(204)
        }else{
            res.send(404)
        }
    })

postRoutes.delete('/:id', (req:Request, res:Response) => {

    const deletePost = blogRepository.deletePostById(+req.params.id)

    if (deletePost){
        res.send(204)
    }else{
        res.send(404)
    }

})