import axios from 'axios';

const apiUrl = 'https://api.open-meteo.com/v1/forecast';

export const getCloudCoverage = async (
  latitude: number,
  longitude: number,
): Promise<number[]> => {
  const cloudCoverageResponse = await axios.get(apiUrl, {
    params: {
      latitude,
      longitude,
      hourly: 'cloud_cover',
      forecast_hours: 5,
    },
  });

  return cloudCoverageResponse.data.hourly.cloud_cover;
};
