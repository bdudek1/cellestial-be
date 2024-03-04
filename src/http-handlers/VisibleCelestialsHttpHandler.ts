import axios from 'axios';
import { CellestialDTO } from '../dto/CelestialDTO';
import { convertTimestampToIsoDate, formatNumber } from '../utils/utils';

const apiUrl = 'https://api.visibleplanets.dev/v3';

export const getCelestials = async (
  latitude: number,
  longitude: number,
  time: number,
): Promise<CellestialDTO[]> => {
  const celestials: CellestialDTO[] = [];

  const celestialResponse = await axios.get(apiUrl, {
    params: {
      latitude: latitude,
      longitude: longitude,
      time: convertTimestampToIsoDate(time),
    },
  });

  celestialResponse.data.data.forEach((celestial: any) => {
    if (!celestial.aboveHorizon) {
      return;
    }

    celestials.push({
      name: celestial?.name,
      constellation: celestial?.constellation,
      rightAscension: formatNumber(celestial?.rightAscension.raw, 2),
      declination: formatNumber(celestial?.declination.raw, 2),
      altitude: formatNumber(celestial?.altitude, 2),
      azimuth: formatNumber(celestial?.azimuth, 2),
      magnitude: formatNumber(celestial?.magnitude, 2),
      nakedEyeObject: celestial?.nakedEyeObject,
    } as CellestialDTO);
  });

  return celestials;
};
