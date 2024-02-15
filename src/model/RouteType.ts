export type RouteType = {
    path: string,
    label: string,
    authenticated?: boolean,
    always?: boolean,
    admin?: boolean,
    no_authenticated?: boolean
}