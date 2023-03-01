var user = {
    name: "Dimych",
    age:32
}

// function increaseAge(user){
//     user.age++
// }

export type UserType={
    name:string
    hair:number
    address: {
        city:string
        house:number
    }
    laptop: {title:string}
}

export type LaptopType = {
    title:string
}

export type UserWithLaptopType = UserType &{
    laptop:LaptopType
}

export type UserWithBooksType = {
    books: Array<string>
}

type CompanyType = { id: number, title: string };
export type WithCompaniesType = {
    companies: Array<CompanyType >
}

export  type CompaniesType = {

}
export function makeHairstyle(u:UserType,power:number){
    const copy   = {
        ...u,
        hair: u.hair/power,

    }

    // copy.hair = u.hair/power

    return copy

}
export function moveUser(u:UserWithLaptopType,city:string){

    return {
        ...u,
        address: {
            ...u.address,
            city: city
        }
    }

}

export function upgradeUserLaptop(u:UserWithLaptopType,laptop:string){
    return {
        ...u,
        laptop: {
            ...u.laptop,
            title: laptop
        }
    }
}

export function moveUserToOtherHouse(u:UserWithLaptopType&UserWithBooksType,house:number){

    return {
        ...u,
        address: {
            ...u.address,
            house: house
        }
    }

}

export function addNewBooksToUser(u:UserWithLaptopType&UserWithBooksType,books:Array<string>){

    const copy =  {
        ...u,
        books: [
            ...u.books
    ]
    }
return copy
}

export function updateBook(u:UserWithLaptopType&UserWithBooksType,js:string,ts:string){

    const copy =  {
        ...u,
        books: [
            ...u.books.filter(b=>b!==js)
        ]
    }

    // copy.books.splice(copy.books.indexOf('js'),0,ts)
    // copy.books.splice(copy.books.indexOf('js'),1)
    return copy
}

export function updateCompany(companies:{[key:string]:Array<CompaniesType>},username:string,companyId:number,title:string ){

    let companyCopy = {...companies}
    companyCopy[username] = companyCopy[username].map(b=>b.id===companyId ? {...b,title:title} : b)
    return companyCopy
}