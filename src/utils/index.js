export const isEmpty = (data) => {
  if (data === undefined || data === '') return true;

  return false;
};

export const validatePass = (password) => {
  if (password.length >= 6 || password.length <= 10) return true;

  return false;
};

export const Trim = (str) => {
  return str.replace(/^\s+|\s+$/g, '');
};

export const isCep = (cep) => {
  const regex = /[\d]{8}/g;

  const newCep = Trim(cep);
  if (newCep.length > 0) {
    if (newCep.match(regex)) return true;

    return false;
  }

  return false;
};
