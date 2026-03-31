import { isPointInPolygon } from 'geolib';

export const fetchBoundary = async () => {
  const res = await fetch("http://192.168.1.203:8000/get-boundary/");
  const data = await res.json();
  return data.boundary;
};

export const checkInsideBoundary = (user: any, boundary: any[]) => {
  return isPointInPolygon(
    { latitude: user.latitude, longitude: user.longitude },
    boundary
  );
};