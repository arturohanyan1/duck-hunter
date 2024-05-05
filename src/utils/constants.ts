const DUCK_STATES = [
  "left",
  "right",
  "top_left",
  "top_right",
  "bottom_left",
  "bottom_right",
  "shot",
  "death",
  "missed",
];
const DUCK_SIZE = 40;
const DUCK_MAX_DIR_CHANGE_COUNT = 2;
const DUCK_DIR_CHANGE_RANGE = { max: 500, min: 200 };
const DUCK_MAX_SHOT_STATE_DELAY = 25;
const MAX_FLAYING_DUCKS_COUNT = 4;
const DUCKS_STATE_INTERVAL = 6;
const NEW_DUCK_CREATE_INTERVAL = 2000;

export {
  DUCK_STATES,
  DUCK_SIZE,
  DUCK_MAX_DIR_CHANGE_COUNT,
  DUCK_DIR_CHANGE_RANGE,
  DUCK_MAX_SHOT_STATE_DELAY,
  MAX_FLAYING_DUCKS_COUNT,
  NEW_DUCK_CREATE_INTERVAL,
  DUCKS_STATE_INTERVAL,
};
