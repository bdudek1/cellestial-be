import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

import { CelestialWeatherDTO } from './dto/CelestialWeatherDTO';
import { getCelestials } from './http-handlers/VisibleCelestialsHttpHandler';
import { getCloudCoverage } from './http-handlers/CloudCoverageHttpHandler';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const options = {
  key: fs.readFileSync('root/private.pem'),
  cert: fs.readFileSync('root/certificate.pem')
};

const httpsServer = https.createServer(options, app);

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Cellestial BE!');
});

app.get('/visibility', async (req: Request, res: Response) => {
  const { latitude, longitude, time } = req.query;
  if (!latitude || !longitude || !time) {
    res.status(400).send('Bad Request');
  }

  const lat = Number(latitude);
  const long = Number(longitude);
  const timeStamp = Number(time);

  try {
    const [celestials, cloudCover] = await Promise.all([
      getCelestials(lat, long, timeStamp),
      getCloudCoverage(lat, long, timeStamp),
    ]);

    res.send({
      visibleCellestials: celestials,
      cloudCoverage: cloudCover,
    } as CelestialWeatherDTO);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

httpsServer.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
