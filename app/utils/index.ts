/* eslint-disable no-magic-numbers */
import { FastifyReply } from 'fastify';

export const successResponse = async(res: FastifyReply, msg: string, data: any) => {

  res.code(200);
  res.send({
    data,
    success: true,
    message: msg
  });

};