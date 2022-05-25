import express from 'express';
import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import processImg from '../../imageApp';

const imageProcess = express.Router();

const defaultImages = [
  'fjord',
  'encenadaport',
  'icelandwaterfall',
  'palmtunnel',
  'santamonica',
];

//the endpoint for images processing
imageProcess.get(
  '/',
  async (req: Request, res: Response): Promise<void | unknown> => {
    //creates the directory for the resized images if not found already
    if (!fs.existsSync('./images/resized')) {
      fs.mkdir('./images/resized', (err) => {
        if (err) throw err;
      });
    }

    const qImageName: string = req.query.image as string;
    const qImageWidth: string = req.query.width as string;
    const qImageHeight: string = req.query.height as string;
    const parsedImageWidth: number = parseInt(qImageWidth);
    const parsedImageHeight: number = parseInt(qImageHeight);

    //validating and handling errors

    if (!qImageName || !defaultImages.includes(qImageName)) {
      return res.status(400).send('Please Enter a valid Image name');
    }

    if (
      !qImageName ||
      (!defaultImages.includes(qImageName) &&
        (isNaN(parsedImageHeight) ||
          parsedImageHeight <= 0 ||
          !parsedImageHeight) &&
        (parsedImageWidth || parsedImageWidth <= 0 || !parsedImageWidth))
    ) {
      return res.status(400).send('Please Enter image name, width, and height');
    }

    if (isNaN(parsedImageWidth) || parsedImageWidth <= 0 || !parsedImageWidth) {
      return res
        .status(400)
        .send('Please Enter a valid width that is positive');
    }

    if (
      isNaN(parsedImageHeight) ||
      parsedImageHeight <= 0 ||
      !parsedImageHeight
    ) {
      return res
        .status(400)
        .send('Please Enter a valid height that is positive');
    }

    if (
      (isNaN(parsedImageHeight) ||
        parsedImageHeight <= 0 ||
        !parsedImageHeight) &&
      (parsedImageWidth || parsedImageWidth <= 0 || !parsedImageWidth)
    ) {
      return res
        .status(400)
        .send('Please Enter a valid width and height that is positive');
    }

    //checks if the image already exists sends it instead of processing it again
    if (
      fs.existsSync(
        path.resolve('./images/resized') +
          `/${qImageName}_${qImageWidth}_${qImageHeight}.jpg`
      )
    ) {
      res.sendFile(
        path.resolve('./images/resized') +
          `/${qImageName}_${qImageWidth}_${qImageHeight}.jpg`
      );
    } else {
      await processImg(qImageName, parsedImageWidth, parsedImageHeight);
      res.sendFile(
        path.resolve('./images/resized') +
          `/${qImageName}_${qImageWidth}_${qImageHeight}.jpg`
      );
      return 'processed';
    }
  }
);

export default imageProcess;
