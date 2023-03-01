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
    { id: 'qsdf2-sdfs-23', name: 'kolya', age: 22 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 20 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 22 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 28 },
    { id: '6sac2-1d1s-21', name: 'artem', age: 25 },
    { id: '7sac2-1d1s-21', name: 'artem', age: 30 },
    { id: '11sac2-1d1s-21', name: 'artem', age: 30 },
    { id: '10sac2-1d1s-21', name: 'artem', age: 30 },
    { id: '9ac2-1d1s-21', name: 'artem', age: 30 },
    { id: '8sac2-1d1s-21', name: 'artem', age: 30 },
];
const getSortedItems = (items, sortBy) => {
    return [...items].sort((u1, u2) => {
        for (let sortConfig of sortBy) {
            if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (u1[sortConfig.fieldName] > u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });
};
console.log(getSortedItems(users, [{ fieldName: 'name', direction: 'asc' }, { fieldName: 'age', direction: 'desc' }, { fieldName: 'id', direction: 'asc' }]));
