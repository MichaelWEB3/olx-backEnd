import { Request, Response } from "express";
import Categories from "../models/Categories";
import * as dotenv from "dotenv";
import Ads from "../models/Ads";
import Users from "../models/Users";
import { v4 as uuidv4 } from "uuid";
import jimp from "jimp";

const addimg = async (buffer: any) => {
  let newName = `${uuidv4()}.jpg`;
  let tmpImg = await jimp.read(buffer.data);
  tmpImg.cover(500, 500).quality(80).write(`./public/media/${newName}`);
  return newName;
};

export const getCategories = async (req: Request, resp: Response) => {
  const cats = await Categories.find();
  let categories: Array<object> = [];
  for (let i in cats) {
    categories.push({
      ...cats[i],
      img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`,
    });
  }
  resp.json({ satus: "sucess", categories: categories });
};
export const setAd = async (req: Request, resp: Response) => {
  const token = req.query.token;
  const users = await Users.findOne({ token: token });
  const { category, price, priceNegocible, description, status, state, title } =
    req.body;
  if (!title) {
    resp.json({ satus: "error", msg: "titulo não preenchido" });
  }
  if (!category) {
    resp.json({ satus: "error", msg: "titulo não preenchido" });
  }
  let imgs = [];
  if (req.files && req.files.img) {
    if (req.files.img) {
      let url = await addimg(req.files.img);
      imgs.push({
        url,
        default: false,
      });
    }
  }
  const info = await new Ads({
    idUser: users?._id,
    category,
    price,
    priceNegocible,
    description,
    views: 0,
    status,
    state,
    title,
    dateCreated: new Date(),
    imgs: imgs,
  }).save();

  resp.json({ satus: "sucess", users });
};
export const getList = async (req: Request, resp: Response) => {};
export const editAd = async (req: Request, resp: Response) => {};
export const getItem = async (req: Request, resp: Response) => {};
