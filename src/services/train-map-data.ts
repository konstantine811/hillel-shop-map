const map = new Map();

const cacheObj = {};

interface ServerRequestProps {
  id: number;
  lat: number;
  lan: number;
}

function serverRequest(obj: ServerRequestProps): Promise<any> {
  if (map.has(obj)) {
    return Promise.resolve(map.get(obj));
  }
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lan}&appid=${obj.id}`
  )
    .then((res) => res.json())
    .then((data) => {
      map.set(obj, data);
      return data;
    });
}
