// enum typeEnum {
//     INITIALIZE,
//     NAVIGATION,
// }

export type routerType = {
    payload: payloadType
    type: string
}

export type changeRouterType = {
    payload:   changeRouterTypePayload
    type: string
}

export  type changeRouterTypePayload = {
    to : number,
    from? : number
}

export type payloadType = {
    order?: Number
    route: string
    query?: string
    data?: any
    isActive?: boolean
    id? : number
}

