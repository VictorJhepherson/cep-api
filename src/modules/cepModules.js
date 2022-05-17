import api from '../services/api';
import { cepValidator } from '../errors/errors';

export const searchCep = async (cep) => {
  try {
    const IResult = { success: true, data: '', errors: [] };
    const valid = cepValidator(cep);

    if (valid.success) {
      const response = await api.get(`/ws/${cep}/json/`);

      if (response) {
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
