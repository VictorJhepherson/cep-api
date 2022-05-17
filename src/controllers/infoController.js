import express from 'express';
import { infoAPI } from '../utils';

class infoController {
  infoApi(req, res, next) {
    try {
      return res.status(200).send({
        success: true,
        data: infoAPI,
        token: '',
        errors: [],
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

export default new infoController();
