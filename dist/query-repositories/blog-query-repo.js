"use strict";
// import {blogRepository} from "./repositories/blog-in-db-repository";
// import {blogsCollection} from "./db/db";
//
//
// const blogQueryRepo = {
//
//     getBlog(){
//         const blogs = await blogsCollection.find({}).toArray()
//
//         const result
//
//     }
// }
let users = [
    { id: 'dsdf2-sdfs-23', name: 'dimych', age: 34 },
    { id: 'csdc3-ddfs-11', name: 'ivan', age: 30 },
    { id: 'dsdc1-dwfs-31', name: 'ignat', age: 20 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 20 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 22 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 28 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 25 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 30 },
];
const getUser = (sortBy, thenBy) => {
    return [...users].sort((u1, u2) => {
        if (u1[sortBy.fieldName] < u2[sortBy.fieldName])
            return -1;
        if (u1.name > u2.name)
            return 1;
        if (u1.age < u2.age)
            return 1;
        if (u1.age > u2.age)
            return -1;
        return 0;
    });
};
console.log(getUser());
