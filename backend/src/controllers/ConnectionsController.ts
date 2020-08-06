import { Request, Response } from 'express';
import db from '../database/connection';

class ConnectionsController {
  async index(request: Request, response: Response) {
    const connectionTotal = await db('connections').count('* as total');

    const { total } = connectionTotal[0];

    return response.json({ total });
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await db('connections').insert({
      user_id,
    });

    return response.status(200).send();
  }
}

export default ConnectionsController;
