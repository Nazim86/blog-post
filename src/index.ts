import express, {NextFunction, Request, Response} from 'express';
const app = express()
const port = 5000

type blogsType={
    id: number
    name: string
    description: string
    websiteUrl: string
}

// const blogs: blogsType = []

// let blablaMiddleware = (req: Request, res: Response, next: NextFunction)=>{
//     // @ts-ignore
//     req.blabla = "Nazimito";
//     next();
// }
//
// let authGuard = (req: Request, res: Response, next: NextFunction)=>{
//     if (req.query.token === "123"){
//         next();
//     }
//     else {
//         res.send(401)
//     }
// }
//
// let counter = 0;
//
// let countRequest = (req: Request, res: Response, next: NextFunction)=>{
//     counter++;
//     next()
// }
//
// app.use(authGuard)
// app.use(blablaMiddleware)
// app.use(countRequest)
//
//
// app.get('/products', (req, res) => {
//
//     // @ts-ignore
//     const  blabla = req.blabla;
//     res.send({value: blabla +" "+ counter})
// })
//
// app.get('/users', (req, res) => {
//
//     // @ts-ignore
//     const  blabla = req.blabla;
//     res.send({value: blabla +" "+ counter})
// })

app.get('/', (req, res) => {
    const id = new Date()
    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl

    res.send('Hello World!')
})

app.post('/blogs', (req, res) => {

    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})