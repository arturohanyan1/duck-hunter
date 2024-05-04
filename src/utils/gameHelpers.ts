import { IDuckDataType, IZoneSize } from "../types/common";
import { getRandomItemFromArray } from "./helpers";

export const createDuck = (width: number): IDuckDataType => {
  const state = getRandomItemFromArray(["top_left", "top_right"]);
  const min = 40;
  const max = width - 40;
  const xPos = Math.floor(Math.random() * (max - min + 1)) + min;
  const newDuck = {
    state: state,
    position: { x: xPos, y: -40 },
    dirChangedCount: 0,
    dirChangedDelay: 0,
    shotStateDelay: 0,
  };
  return newDuck;
};

const isInvalidPos = (x: number, y: number, zone: IZoneSize): boolean => {
  return x < 0 || x > zone.width - 40 || y < -40 || y > zone.height - 40;
};

const getNewState = (
  data: IDuckDataType,
  zoneSize: IZoneSize,
  newXPos: number,
  newYPos: number
): IDuckDataType => {
  const newData = { ...data };
  const newStates =
    data.dirChangedCount === 2
      ? newYPos < 0
        ? ["top_left", "top_right"]
        : ["left", "right", "top_left", "top_right"]
      : [
          "left",
          "right",
          "top_left",
          "top_right",
          "bottom_left",
          "bottom_right",
        ];
  const idx = newStates.findIndex((st: string) => st === data.state);
  newStates.splice(idx, 1);
  const availableStates = newStates;

  if (data.dirChangedCount > 2) {
    newData.position = { x: newXPos, y: newYPos };
    return newData;
  } else if (isInvalidPos(newXPos, newYPos, zoneSize)) {
    const newState = getRandomItemFromArray(availableStates);
    newData.state = newState;
    newData.dirChangedCount = data.dirChangedCount + 1;
    return newData;
  } else {
    newData.position = { x: newXPos, y: newYPos };
    return newData;
  }
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
  } else if (data.state === "top_left") {
    const newXPos = data.position.x - 1;
    const newYPos = data.position.y + 1;
    return getNewState(data, zoneSize, newXPos, newYPos);
  } else if (data.state === "top_right") {
    const newXPos = data.position.x + 1;
    const newYPos = data.position.y + 1;
    return getNewState(data, zoneSize, newXPos, newYPos);
  } else if (data.state === "bottom_left") {
    const newXPos = data.position.x - 1;
    const newYPos = data.position.y - 1;
    return getNewState(data, zoneSize, newXPos, newYPos);
  } else if (data.state === "bottom_right") {
    const newXPos = data.position.x + 1;
    const newYPos = data.position.y - 1;
    return getNewState(data, zoneSize, newXPos, newYPos);
  } else if (data.state === "left") {
    const newXPos = data.position.x - 1;
    const newYPos = data.position.y;
    return getNewState(data, zoneSize, newXPos, newYPos);
  } else if (data.state === "right") {
    const newXPos = data.position.x + 1;
    const newYPos = data.position.y;
    return getNewState(data, zoneSize, newXPos, newYPos);
  } else {
    return newData;
  }
};
