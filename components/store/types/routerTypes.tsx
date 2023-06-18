// enum typeEnum {
//     INITIALIZE,
//     NAVIGATION,
// }

export type routerType = {
    payload: payloadType
    type: String
}

export type payloadType = {
    order?: Number
    route: String
    query?: String
    data?: any
    isActive?: boolean
}