export type IpDataType = {
    endPoint: string
    ipAddress: string
    issuedAt: number
    attempts: number
}

export let attempt = 0;

export const ipCollection: IpDataType[] = [];