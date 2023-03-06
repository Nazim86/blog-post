// var user = {
//     name: "Dimych",
//     age:32
// }
//
// // function increaseAge(user){
// //     user.age++
// // }
//
// export type UserType={
//     name:string
//     hair:number
//     address: {
//         city:string
//         house:number
//     }
//     laptop: {title:string}
// }
//
// export type LaptopType = {
//     title:string
// }
//
// export type UserWithLaptopType = UserType &{
//     laptop:LaptopType
// }
//
// export type UserWithBooksType = {
//     books: Array<string>
// }
//
// type CompanyType = { id: number, title: string };
// export type WithCompaniesType = {
//     companies: Array<CompanyType >
// }
//
// export  type CompaniesType = {
//
// }
// export function makeHairstyle(u:UserType,power:number){
//     const copy   = {
//         ...u,
//         hair: u.hair/power,
//
//     }
//
//     // copy.hair = u.hair/power
//
//     return copy
//
// }
// export function moveUser(u:UserWithLaptopType,city:string){
//
//     return {
//         ...u,
//         address: {
//             ...u.address,
//             city: city
//         }
//     }
//
// }
//
// export function upgradeUserLaptop(u:UserWithLaptopType,laptop:string){
//     return {
//         ...u,
//         laptop: {
//             ...u.laptop,
//             title: laptop
//         }
//     }
// }
//
// export function moveUserToOtherHouse(u:UserWithLaptopType&UserWithBooksType,house:number){
//
//     return {
//         ...u,
//         address: {
//             ...u.address,
//             house: house
//         }
//     }
//
// }
//
// export function addNewBooksToUser(u:UserWithLaptopType&UserWithBooksType,books:Array<string>){
//
//     const copy =  {
//         ...u,
//         books: [
//             ...u.books
//     ]
//     }
// return copy
// }
//
// export function updateBook(u:UserWithLaptopType&UserWithBooksType,js:string,ts:string){
//
//     const copy =  {
//         ...u,
//         books: [
//             ...u.books.filter(b=>b!==js)
//         ]
//     }
//
//     // copy.books.splice(copy.books.indexOf('js'),0,ts)
//     // copy.books.splice(copy.books.indexOf('js'),1)
//     return copy
// }
//
// export function updateCompany(companies:{[key:string]:Array<CompaniesType>},username:string,companyId:number,title:string ){
//
//     let companyCopy = {...companies}
//     companyCopy[username] = companyCopy[username].map(b=>b.id===companyId ? {...b,title:title} : b)
//     return companyCopy
// }



//-----------------------------------------------------------------------------------

// 09-01.test.ts

// import {
//     addNewBooksToUser,
//     makeHairstyle,
//     moveUser,
//     moveUserToOtherHouse, updateBook, updateCompany,
//     upgradeUserLaptop,
//     UserType,
//     UserWithBooksType,
//     UserWithLaptopType, WithCompaniesType
// } from "./09_01";
// import exp = require("constants");
//
//
//
//
// test("change address",()=>{
//     var user: UserWithLaptopType = {
//         name: "Dimych",
//         hair:32,
//         address:{
//             city:"Minsk",
//             house:12
//         },
//         laptop:{
//             title:"zenbook"
//         }
//     }
//
//     // user.address.title = "Baku"
//
//     const movedUser = moveUser(user,"Kiev")
//
//     expect(user).not.toBe(movedUser)
//
//     expect(user.address).not.toBe(movedUser.address)
//     expect(user.laptop).toBe(movedUser.laptop)
//     expect(movedUser.address.city).toBe("Kiev")
//
//
//
// })
//
//
// test("update js to ts",()=>{
//     var user: UserWithLaptopType & WithCompaniesType= {
//         name: "Dimych",
//         hair:32,
//         address:{
//             city:"Minsk",
//             house:12
//         },
//         laptop:{
//             title:"zenbook"
//         },
//         companies: [{id:1, title:"Heyo"},{id:2, title:"IT-Incubator"}]
//     }
//
//     // user.address.title = "Baku"
//
//     const userCopy = updateCompany(user,1,'EPAM')
//
//     expect(user).not.toBe(userCopy)
//
//     // expect(user.laptop).toBe(movedUser.laptop)
//     expect(userCopy.address).toBe(user.address)
//     expect(userCopy.companies).not.toBe(user.companies)
//     expect(userCopy.companies[0].title).toBe("EPAM")
//     // expect(userCopy.books[5]).toBe("rest api")
//     console.log(userCopy)
//
//
// })
//
// test("update company",()=>{
//
// let companies = {
//         'Dimych': [{id:1, title:"Heyo"},{id:2, title:"IT-Incubator"}],
// 'Artem': [{id:2, title:"IT-Incubator"}]
// }
//     // user.address.title = "Baku"
//
//     const userCopy = updateCompany(companies,'Dymich',1,'EPAM')
//
//
//     // expect(user.laptop).toBe(movedUser.laptop)
//     expect(userCopy['Dimych']).not.toBe(companies["Dimych"])
//     expect(userCopy.companies).not.toBe(user.companies)
//     expect(userCopy.companies[0].title).toBe("EPAM")
//     // expect(userCopy.books[5]).toBe("rest api")
//     console.log(userCopy)
//
//
// })
//
