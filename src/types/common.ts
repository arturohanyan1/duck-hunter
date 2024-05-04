export type IZoneSize = {
  width: number;
  height: number;
};

export type IDuckStateType =
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right"
  | "shot"
  | "death"
  | "missed";

export interface IDuckDataType {
  state: IDuckStateType;
  position: { x: number; y: number };
  dirChangedCount: number;
  dirChangedDelay: number;
  dirDuration: number;
  shotStateDelay: number;
}
