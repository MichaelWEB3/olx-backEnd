import { Request, Response, NextFunction } from "express";
import Users from "../models/Users";

export const privat = async (req: Request, resp: Response, next: NextFunction) => {

    if (req.query.token || req.body.token) {
        let token = req.query.token || req.body.token
        const user = await Users.findOne({ token })
        if (user) {
            next()
        } else {
            resp.json({ staus: 404, msg: 'erro token invalido' })

        }
    } else {
        resp.json({ staus: 404, msg: 'erro token' })
    }
}   