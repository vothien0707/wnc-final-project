import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";

class UserController {
  async signup(req, res) {
    try {
      const { username, password, displayName } = req.body;

      const checkUser = await UserModel.findOne({ username });

      if (checkUser) return responseHandler.badRequest(res, "Username is already exists ");

      const user = new UserModel();

      user.username = username;
      user.displayName = displayName;
      user.setPassword(password);

      await user.save();

      const token = jwt.sign({ data: user.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "24h" });

      responseHandler.created(res, {
        token,
        ...user._doc,
        id: user.id,
      });
    } catch {
      responseHandler.internalServerError(res);
    }
  }

  async signin(req, res) {
    try {
      const { username, password } = req.body;

      const user = await UserModel.findOne({ username }).select("username password displayName salt id");

      if (!user) return responseHandler.badRequest(res, "User does not exist");

      if (!user.validatePassword(password)) return responseHandler.badRequest(res, "Password incorrect");

      const token = jwt.sign({ data: user.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "24h" });

      user.password = undefined;
      user.salt = undefined;

      responseHandler.created(res, {
        token,
        ...user._doc,
        id: user.id,
      });
    } catch {
      responseHandler.internalServerError(res);
    }
  }

  async updatePassword(req, res) {
    try {
      const { password, newPassword } = req.body;

      if (req.user) {
        const user = await UserModel.findById(req.user.id).select("password id salt");

        if (!user) return responseHandler.unauthorizedError(res);

        if (!user.validatePassword(password)) return responseHandler.badRequest(res, "Password incorrect");

        user.setPassword(newPassword);

        await user.save();

        responseHandler.ok(res);
      }
    } catch {
      responseHandler.internalServerError(res);
    }
  }

  async getUserInfo(req, res) {
    try {
      if (req.user) {
        const user = await UserModel.findById(req.user.id);

        if (!user) return responseHandler.notFound(res);

        responseHandler.ok(res, user);
      }
    } catch {
      responseHandler.internalServerError(res);
    }
  }
}

export default UserController;
