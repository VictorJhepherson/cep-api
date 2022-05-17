import dotenv from 'dotenv';
dotenv.config();

import bcryptjs from 'bcryptjs';
import { userValidator, loginValidator } from '../errors/errors';
import User from '../models/Users';

export const create = async (user) => {
  const IResult = { success: true, data: '', errors: [] };
  try {
    const valid = await userValidator(user);

    if (valid.success) {
      const passwordHash = await bcryptjs.hash(user.password, 9);

      const data = new User({
        username: user.username,
        email: user.email,
        password: passwordHash,
      });

      const newUser = await data.save();

      IResult.data = newUser;
      return IResult;
    }

    IResult.success = false;
    IResult.errors = valid.errors;
    return IResult;
  } catch (e) {
    if (e instanceof Error) {
      IResult.success = false;
      IResult.errors.push(e.message);
      return IResult;
    }
  }
};

export const login = async (user) => {
  const IResult = { success: true, data: '', errors: [] };
  try {
    const valid = await loginValidator(user);

    if (valid.success) {
      const compare = await bcryptjs.compare(
        user.password,
        valid.data.password,
      );

      if (compare) {
        IResult.data = valid.data;
        return IResult;
      }
    }

    IResult.success = false;
    IResult.errors = valid.errors;
    return IResult;
  } catch (e) {
    if (e instanceof Error) {
      IResult.success = false;
      IResult.errors.push(e.message);
      return IResult;
    }
  }
};
