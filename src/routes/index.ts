import express, { Request, Response, Router } from "express";
import { getState, info, editAction } from '../contollers/UserContollers'
import { singnin, singnup } from '../contollers/AuthContollers'
import { getCategories, setAd, getList, editAd, getItem } from '../contollers/AdsContollers'
import { privat } from '../midweres/AuthMid'
import AuthValidator from '../validators/AuthValidator'
import userValidato from '../validators/userValidato'
const route = Router()
route.get('/ping', (req: Request, resp: Response) => {
    resp.json({ pong: true })
})

route.get('/states', getState)

route.post('/user/singnin', AuthValidator.singnin, singnin)
route.post('/user/singnup', AuthValidator.singup, singnup)

route.get('/user/me', privat, info)
route.put('/user/editMe', userValidato.editAction, privat, editAction)

route.get('/categoriees', getCategories)
route.post('/ad/add', privat, setAd)
route.get('/ad/list', getList)
route.get('/ad/item', getItem)
route.post('/ad/edit/:id', privat, editAd)



export default route