import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import States from "../models/States";
import Users from "../models/Users";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
export const singnup = async (req: Request, resp: Response) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    resp.json({ error: erros.mapped() });
  }
  const data = matchedData(req);
  const user = await Users.findOne({
    email: data.email,
  });

  if (user) {
    resp.json({ error: { email: { msg: "email ja existe" } } });
    return;
  }
  if (ObjectId.isValid(data.state)) {
    const stateVerify = await States.findById(data.state);
    if (!stateVerify) {
      resp.json({ error: { state: { msg: "estado não existe" } } });
      return;
    }
  } else {
    resp.json({ error: { state: { msg: "codigo de estado não existe" } } });
    return;
  }
  const passworldhask = await bcrypt.hash(data.passworld, 10);
  const payload = (Date.now() + Math.random()).toString();
  const token = await bcrypt.hash(payload, 10);
  const newUser = new Users({
    name: data.name,
    email: data.email,
    passWord: passworldhask,
    token,
    state: data.state,
  });

  await newUser.save();
  resp.json({ sucess: true, token });
};
export const singnin = async (req: Request, resp: Response) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    resp.json({ error: erros.mapped() });
  }
  const data = matchedData(req);

  const user = await Users.findOne({ email: data.email });
  if (!user) {
    resp.json({ error: { email: { msg: "Email ou senha não encontrado" } } });
    return;
  }

  //validar semja
  const match = await bcrypt.compare(data.passworld, user.passWord);
  if (!match) {
    resp.json({ error: { email: { msg: "Email ou senha não encontrado" } } });
    return;
  }
  const payload = (Date.now() + Math.random()).toString();
  const token = await bcrypt.hash(payload, 10);
  user.token = token;
  user.save();
  resp.json({ sucess: true, token });
};
