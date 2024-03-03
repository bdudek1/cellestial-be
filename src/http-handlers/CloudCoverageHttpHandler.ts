import axios from 'axios';
import { findFirstGreaterDateIndex, formatDateTimestamp } from '../utils/utils';
import { CloudCoverageEntryDTO } from '../dto/CloudCoverageEntryDTO';

const apiUrl = 'https://api.open-meteo.com/v1/forecast';
const dayInMs = 86400000;

export const getCloudCoverage = async (
  latitude: number,
  longitude: number,
  time: number,
): Promise<CloudCoverageEntryDTO[]> => {
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

  const cloudCoverage: CloudCoverageEntryDTO[] = []
  for (let i = indexOfDesiredHour; i < indexOfDesiredHour + 5; i++) {
    cloudCoverage.push({
      dateString: cloudCoverageResponse?.data?.hourly?.time[i],
      cloudCoverage: cloudCoverageResponse?.data?.hourly?.cloud_cover[i]
    } as CloudCoverageEntryDTO)
  }

  return cloudCoverage;
};

