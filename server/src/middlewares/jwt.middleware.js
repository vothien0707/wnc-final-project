import jwt from "jsonwebtoken";

import responseHandler from "../handlers/response.handler.js";
import UserModel from "../models/UserModel.js";

const tokenDecoded = (req) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const [, token] = authHeader.split(" ");

      return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const decoded = tokenDecoded(req);

  if (!decoded) return responseHandler.unauthorizedError(res);

  const user = await UserModel.findById(decoded.data);

  if (!user) return responseHandler.unauthorizedError(res);

  req.user = user;

  next();
};

export default { tokenDecoded, auth };
