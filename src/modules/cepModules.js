import api from '../services/api';
import cache from '../utils/cache';
import { cepValidator } from '../errors/errors';
import { timeExp } from '../utils';

export const searchCep = async (cep) => {
  try {
    const IResult = { success: true, data: '', errors: [] };
    const valid = cepValidator(cep);

    if (valid.success) {
      const cached = await cache.get(cep);

      if (cached) {
        IResult.data = cached;
        return IResult;
      }

      const response = await api.get(`/ws/${cep}/json/`);

      if (response) {
        cache.set(cep, response.data, timeExp);
        IResult.data = response.data;
        return IResult;
      }
    }

    IResult.success = false;
    IResult.errors = valid.errors;
    return IResult;
  } catch (e) {
    console.log(e);
  }
};
