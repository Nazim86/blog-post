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
