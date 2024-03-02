import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { CellestialDTO } from './dto/CelestialDTO';
import { CelestialWeatherDTO } from './dto/CelestialWeatherDTO';
import { getCelestials } from './http-handlers/VisibleCelestialsHttpHandler';
import { getCloudCoverage } from './http-handlers/CloudCoverageHttpHandler';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

type VisibilityRequest = {
  latitude: number;
  longitude: number;
  time: number;
};

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

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
