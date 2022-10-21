import { Request, Response } from "express";
import Ads from "../models/Ads";
import Categories from "../models/Categories";
import States from "../models/States";
import Users from "../models/Users";
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt";

export const getState = async (req: Request, resp: Response) => {
  let states = await States.find();
  if (states) {
    resp.json({ status: true, states });
  }
};
export const info = async (req: Request, resp: Response) => {
  let token = req.query.token;
  const user = await Users.findOne({ token });
  const state = await States.findById(user?.state);
  const ads = await Ads.find({ idUser: user?._id.toString() });
  let AdsList = [{}];
  for (let i in ads) {
    const cat = await Categories.findById(ads[i].category);
    AdsList.push({
      id: ads[i]._id,
      status: ads[i].status,
      imgs: ads[i].imgs,
      dateCreate: ads[i].dateCreated,
      title: ads[i].title,
      price: ads[i].price,
      priceNegocible: ads[i].priceNegocible,
      description: ads[i].description,
      views: ads[i].views,
      category: cat?.slug,
    });
  }
  resp.json({
    user,
    state,
    ads: ads,
  });
};
export const editAction = async (req: Request, resp: Response) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    resp.json({ error: erros.mapped() });
    return;
  }
  const data = matchedData(req);
  let update = {
    ...data,
  };
  if (data.name) update.name = data.name;
  if (data.email) {
    const checkEmail = await Users.findOne({ email: data.email });
    if (checkEmail) {
      resp.json({ error: "email ja existe" });
      return;
    }
    update.email = data.email;
  }
  if (data.state) {
    const stateCheck = await Users.findOne({ state: data.state });
    if (!stateCheck) {
      resp.json({ error: "estado não existe" });
      return;
    }
    update.state = data.state;
  }
  if (data.password) {
    update.passWord = await bcrypt.hash(data.passWord, 10);
  }
  await Users.findOneAndUpdate({ token: data.token }, { $set: update });
  resp.json({ status: true });
};
