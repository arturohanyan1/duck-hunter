import { IDuckDataType, IZoneSize } from "../types/common";

const filterValue = <T>(value: T): boolean =>
  value !== undefined && value !== null;

export const getQueryString = (
  params: Record<string, any>,
  joinArrayValues = false
): string => {
  return Object.entries(params)
    .filter(([_, value]) => filterValue(value))
    .map(([key, value]) => {
      if (!Array.isArray(value)) {
        return key + "=" + encodeURIComponent(value);
      } else if (joinArrayValues) {
        return (
          key +
          "=" +
          value
            .filter(filterValue)
            .map((item) => encodeURIComponent(item))
            .join(",")
        );
      } else {
        return value
          .filter(filterValue)
          .map((item) => `${key}[]` + "=" + encodeURIComponent(item))
          .join("&");
      }
    })
    .filter(Boolean)
    .join("&");
};

export const getRandomItemFromArray = (arr: any): any => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const createDuck = (width: number): IDuckDataType => {
  const state = getRandomItemFromArray(["top_left", "top_right"]);
  const min = 40;
  const max = width - 40;
  const xPos = Math.floor(Math.random() * (max - min + 1)) + min;
  const newDuck = {
    state: state,
    position: { x: xPos, y: -40 },
    dirChangedCount: 0,
    shotStateDelay: 0,
  };
  return newDuck;
};

export const changeDuckData = (
  data: IDuckDataType,
  zoneSize: IZoneSize
): IDuckDataType => {
  let newData = { ...data };
  if (data.state === "shot") {
    if (data.shotStateDelay > 25) {
      newData.state = "death";
      return newData;
    } else {
      newData.shotStateDelay = data.shotStateDelay + 1;
      return newData;
    }
  } else if (data.state === "death") {
    if (data.position.y < -40) {
      newData.state = "missed";
      return newData;
    } else {
      newData.position = { x: data.position.x, y: data.position.y - 1 };
      return newData;
    }
  } else {
    newData.position = { x: data.position.x + 1, y: data.position.y + 1 };
    return newData;
  }
};
