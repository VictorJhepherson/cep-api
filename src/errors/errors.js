import validator from 'validator';
import User from '../models/Users';
import { isEmpty, validatePass, isCep } from '../utils';

export const userValidator = async (user) => {
  const IResult = { success: true, errors: [] };
  let userExists;

  if (!isEmpty(user.email)) {
    userExists = await User.findOne({ email: user.email });
  }

  if (userExists) {
    IResult.success = false;
    IResult.errors.push('Usuário já cadastrado');
    return IResult;
  }

  if (isEmpty(user.email) || !validator.isEmail(user.email)) {
    IResult.success = false;
    IResult.errors.push('E-mail inválido');
    return IResult;
  }

  if (isEmpty(user.password) || !validatePass(user.password)) {
    IResult.success = false;
    IResult.errors.push('Senha deve conter de 6 a 10 caracteres');
    return IResult;
  }

  return IResult;
};

export const loginValidator = async (user) => {
  const IResult = { success: true, data: '', errors: [] };
  let userExists;

  if (!isEmpty(user.email)) {
    userExists = await User.findOne({ email: user.email });
  }

  if (!userExists) {
    IResult.success = false;
    IResult.errors.push('Usuário não encontrado!');
    return IResult;
  }

  IResult.data = userExists;
  return IResult;
};

export const cepValidator = (cep) => {
  const IResult = { success: true, errors: [] };

  if (isEmpty(cep) || !isCep(cep)) {
    IResult.success = false;
    IResult.errors.push('CEP inválido!');
    return IResult;
  }

  return IResult;
};
