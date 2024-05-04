export type IZoneSize = {
  width: number;
  height: number;
};

export type IDuckStateType =
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom-left"
  | "bottom-right"
  | "shot"
  | "death"
  | "missed";

export interface IDuckDataType {
  state: IDuckStateType;
  position: { x: number; y: number };
  dirChangedCount: number;
  shotStateDelay: number;
}
