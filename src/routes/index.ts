import express from 'express';
import { Response, Request } from 'express';
import imageProcess from './api/imageProcess';
import path from 'path';
const routes = express.Router();

const defaultImages = [
  'fjord',
  'encenadaport',
  'icelandwaterfall',
  'palmtunnel',
  'santamonica',
];

//the endpoint that open one of the default images
routes.get('/', (req: Request, res: Response): void | unknown => {
  const qImageName: string = req.query.image as string;

  if (!defaultImages.includes(qImageName)) {
    return res.status(400).send('Please enter valid image name');
  }

  res.sendFile(path.resolve('./images/full') + `/${qImageName}.jpg`);
});

routes.use('/imageProcess', imageProcess);

export default routes;
