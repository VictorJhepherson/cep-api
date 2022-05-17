import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

export default function loginRequired(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[2];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch {
    return res
      .status(401)
      .send({ success: false, message: 'Falha na autenticação' });
  }
}
