import express from 'express';
import jwt from 'jsonwebtoken';
import { create, login } from '../modules/userModules';

class userController {
  async createUser(req, res, next) {
    try {
      const user = req.body;
      const IResult = await create(user);

      if (IResult.success) {
        return res.status(200).send({
          success: true,
          data: IResult.data,
          token: '',
          errors: [],
        });
      }

      return res.status(400).send({
        success: false,
        data: '',
        token: '',
        errors: IResult.errors,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async loginUser(req, res, next) {
    try {
      const user = req.body;
      const IResult = await login(user);

      if (IResult.success) {
        const token = jwt.sign(
          {
            username: IResult.data.username,
            email: IResult.data.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: '7d' },
        );

        return res.status(200).send({
          success: true,
          data: IResult.data,
          token: token,
          errors: [],
        });
      }

      return res.status(400).send({
        success: false,
        data: '',
        token: '',
        errors: IResult.errors,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new userController();
