import {ObjectId} from "mongodb";


export class EmailConfirmationType {
    constructor(
   public confirmationCode: string,
   public emailExpiration: Date,
   public isConfirmed: boolean){}
}


export class UserType {
    constructor(
   public login: string,
   public passwordHash: string,
   public email: string,
   public createdAt: string,
   public recoveryCode: string,
   public recoveryCodeExpiration: Date){}
}

export class UserAccountDbType {
    constructor(
        public _id: ObjectId,
        public accountData: UserType,
        public emailConfirmation: EmailConfirmationType) {}
}

// export type UserAccountDbType = {
//     _id:ObjectId
//     accountData: UserType
//     emailConfirmation:EmailConfirmationType
// }