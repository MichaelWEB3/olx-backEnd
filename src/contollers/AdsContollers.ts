import { json, Request, Response } from "express";
import Categories from "../models/Categories";
import * as dotenv from "dotenv";
import Ads from "../models/Ads";
import Users from "../models/Users";
import { v4 as uuidv4 } from "uuid";
import jimp from "jimp";
import States from "../models/States";

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
export const getList = async (req: Request, resp: Response) => {
  const { sort = "asc", offset = 0, limit = 8, q, cat, state } = req.query;
  console.log(q);
  let filtes: any = { status: true };
  if (q) {
    console.log(q);
    filtes.title = { $regex: q, $options: "i" };
  }
  if (cat) {
    const c = await Categories.findOne({ slug: cat }).exec();
    if (c) filtes.category = c._id.toHexString();
  }
  if (state) {
    const s = await States.findOne({ name: state }).exec();
    if (s) filtes.state = s._id.toHexString();
  }

  const adsTotal = await Ads.find(filtes).exec();
  const total = adsTotal?.length;
  const adsDate = await Ads.find(filtes)
    .sort({
      dateCreated: sort == "desc" ? -1 : 1,
    })
    .skip(Number(offset))
    .limit(Number(limit))
    .exec();
  let ads = [];

  for (let i in adsDate) {
    let image;

    let defaltImg = adsDate[i].imgs.find((e) => e.defalt == true);
    if (defaltImg) {
      image = `${process.env.BASE}/media/${defaltImg.url}`;
    } else {
      image = `${process.env.BASE}/media/defalut.jpg`;
    }
    ads.push({
      id: adsDate[i]._id,
      title: adsDate[i]?.title,
      price: adsDate[i]?.price,
      priceNegocible: adsDate[i]?.priceNegocible,
      image,
    });
  }

  resp.json({ status: "sucess", ads, total });
};
export const editAd = async (req: Request, resp: Response) => {};
export const getItem = async (req: Request, resp: Response) => {
  const idPost = req.query.id;
  const getOneAd = await Ads.findById(idPost);
  console.log(getOneAd);
  resp.json({ status: "success", getOneAd });
};
