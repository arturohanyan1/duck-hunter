import { IDogData, IDogState, IDuckData, IZoneSize } from "../types/common";
import {
  DOG_DIR_CHANGE_DELAY,
  DOG_HEIGHT,
  DOG_WIDTH,
  DUCK_DIR_CHANGE_RANGE,
  DUCK_MAX_DIR_CHANGE_COUNT,
  DUCK_MAX_SHOT_STATE_DELAY,
  DUCK_SIZE,
} from "./constants";
import { getRandomItemFromArray } from "./helpers";

// DUCk
const createDuck = (width: number): IDuckData => {
  const state = getRandomItemFromArray(["top_left", "top_right"]);
  const min = DUCK_SIZE;
  const max = width - DUCK_SIZE;
  const xPos = Math.floor(Math.random() * (max - min + 1)) + min;
  const dirChangedDelay =
    Math.floor(
      Math.random() *
        (DUCK_DIR_CHANGE_RANGE.max - DUCK_DIR_CHANGE_RANGE.min + 1)
    ) + 100;
  const newDuck = {
    state: state,
    position: { x: xPos, y: -DUCK_SIZE },
    dirChangedCount: 0,
    dirChangedDelay: dirChangedDelay,
    dirDuration: 0,
    shotStateDelay: 0,
  };
  return newDuck;
};

const isInvalidPos = (x: number, y: number, zone: IZoneSize): boolean => {
  return (
    x < 0 ||
    x > zone.width - DUCK_SIZE ||
    y < -DUCK_SIZE ||
    y > zone.height - DUCK_SIZE
  );
};

const isFlyAwayPos = (x: number, y: number, zone: IZoneSize): boolean => {
  return (
    x < -DUCK_SIZE ||
    x > zone.width + DUCK_SIZE ||
    y < -DUCK_SIZE ||
    y > zone.height
  );
};

const getNewState = (
  data: IDuckData,
  zoneSize: IZoneSize,
  newXPos: number,
  newYPos: number
): IDuckData => {
  const newData = { ...data };
  const newStates =
    data.dirChangedCount === DUCK_MAX_DIR_CHANGE_COUNT
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

  newData.dirDuration = data.dirDuration + 1;
  if (data.dirChangedCount > DUCK_MAX_DIR_CHANGE_COUNT) {
    newData.position = { x: newXPos, y: newYPos };
    if (isFlyAwayPos(newXPos, newYPos, zoneSize)) {
      newData.state = "fly_away";
    }
    return newData;
  } else if (
    isInvalidPos(newXPos, newYPos, zoneSize) ||
    newData.dirDuration === data.dirChangedDelay
  ) {
    const newState = getRandomItemFromArray(availableStates);
    newData.state = newState;
    newData.dirChangedCount = data.dirChangedCount + 1;
    if (newData.dirDuration === data.dirChangedDelay) {
      newData.dirDuration = 0;
    }
    return newData;
  } else {
    newData.position = { x: newXPos, y: newYPos };
    return newData;
  }
};

const changeDuckData = (data: IDuckData, zoneSize: IZoneSize): IDuckData => {
  let newData = { ...data };
  if (data.state === "shot") {
    if (data.shotStateDelay > DUCK_MAX_SHOT_STATE_DELAY) {
      newData.state = "death";
      return newData;
    } else {
      newData.shotStateDelay = data.shotStateDelay + 1;
      return newData;
    }
  } else if (data.state === "death") {
    if (data.position.y < -DUCK_SIZE) {
      newData.state = "hunted";
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

const changeDucksData = (
  ducks: IDuckData[],
  zoneSize: IZoneSize
): {
  visibleDucks: IDuckData[];
  flyAwayDucks: IDuckData[];
  huntedDucks: IDuckData[];
} => {
  const newDucks = ducks.map((el: IDuckData) => changeDuckData(el, zoneSize));
  const filteredDucks = newDucks.reduce(
    (acc: any, cur: IDuckData) => {
      if (cur.state === "fly_away") {
        acc.flyAwayDucks.push(cur);
      } else if (cur.state === "hunted") {
        acc.huntedDucks.push(cur);
      } else {
        acc.visibleDucks.push(cur);
      }
      return acc;
    },
    {
      visibleDucks: [],
      flyAwayDucks: [],
      huntedDucks: [],
    }
  );
  return filteredDucks;
};

// DOG
const createDog = (width: number): IDogData => {
  const xPos = Math.round(width / 2 - DOG_WIDTH / 2);
  return {
    state: "dog_hide",
    position: { x: xPos, y: -72 },
    dirChanged: false,
    dirChangedDelay: 0,
  };
};

const getDogState = (duck: IDuckData): IDogState => {
  switch (duck.state) {
    case "fly_away":
      return "dog_laugh";
    case "hunted":
      return "dog_find_1";
    default:
      return "dog_hide";
  }
};

const getDogXPos = (duck: IDuckData, zone: IZoneSize): number => {
  const state = getDogState(duck);
  if (state === "dog_find_1") {
    if (duck.position.x <= 0) {
      return 0;
    } else if (duck.position.x >= zone.width - DOG_WIDTH) {
      return zone.width - DOG_WIDTH;
    } else {
      return duck.position.x;
    }
  }
  return Math.round(zone.width / 2 - DOG_WIDTH / 2);
};

const changeDogData = (
  dog: IDogData,
  duck: IDuckData,
  zoneSize: IZoneSize
): IDogData => {
  if (dog.position.y === -DOG_HEIGHT && dog.dirChanged) {
    const newDog = createDog(zoneSize.width);
    return newDog;
  } else {
    const newDog = { ...dog };
    const newDogState = getDogState(duck);
    const newXPos = getDogXPos(duck, zoneSize);
    newDog.state = newDogState;
    newDog.position.x = newXPos;
    if (dog.position.y < 0) {
      if (dog.dirChanged) {
        newDog.position.y = dog.position.y - 1;
      } else {
        newDog.position.y = dog.position.y + 1;
      }
    } else {
      if (dog.dirChangedDelay > DOG_DIR_CHANGE_DELAY) {
        newDog.dirChanged = true;
        newDog.position.y = dog.position.y - 1;
      } else {
        newDog.dirChangedDelay = dog.dirChangedDelay + 1;
        newDog.position.y = dog.position.y;
      }
    }
    return newDog;
  }
};

export { createDuck, changeDucksData, createDog, changeDogData };
