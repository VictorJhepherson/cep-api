import express from 'express';
import { searchCep } from '../modules/cepModules';

class cepController {
  async findCep(req, res, next) {
    try {
      const { cep } = req.body;
      const IResult = await searchCep(cep);

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
      if (e instanceof Error) {
        return res.status(500).send({
          success: false,
          data: '',
          token: '',
          errors: [e.message],
        });
      }
    }
  }
}

export default new cepController();
