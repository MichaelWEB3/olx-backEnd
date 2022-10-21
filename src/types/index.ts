export type UsersTypes = {
    name: string,
    email: string,
    state: string,
    passWord: string,
    token: string
}

export type StatesTypes = {
    name: string
}

export type CategoriesTypes = {
    name: string,
    slug: string
}

export type AdTypes = {
    title: String,
    idUser: string,
    imgs: [{ url: string, defalt: boolean }],
    category: string,
    price: string,
    priceNegocible: string,
    description: string,
    views: number,
    status: string,
    state: string,
    dateCreated: string
}