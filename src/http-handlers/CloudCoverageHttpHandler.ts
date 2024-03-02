import axios from 'axios';
import { findFirstGreaterDateIndex, formatDateTimestamp } from '../utils/utils';

const apiUrl = 'https://api.open-meteo.com/v1/forecast';
const dayInMs = 86400000;

export const getCloudCoverage = async (
  latitude: number,
  longitude: number,
  time: number,
): Promise<number[]> => {
  const cloudCoverageResponse = await axios.get(apiUrl, {
    params: {
      latitude,
      longitude,
      hourly: 'cloud_cover',
      start_date: formatDateTimestamp(time),
      end_date: formatDateTimestamp(time + dayInMs)
    },
  });

  const hoursTable = cloudCoverageResponse?.data.hourly?.time as string[]
  const indexOfDesiredHour = findFirstGreaterDateIndex(time, hoursTable)

  if (indexOfDesiredHour === null) {
    return [];
  }

  const cloudCoverage: number[] = []
  for (let i = indexOfDesiredHour; i < indexOfDesiredHour + 5; i++) {
    cloudCoverage.push(cloudCoverageResponse?.data?.hourly?.cloud_cover[i])
  }

  return cloudCoverage;
};

