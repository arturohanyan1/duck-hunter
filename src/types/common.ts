export type IZoneSize = {
  width: number;
  height: number;
};

export type IDuckState =
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right"
  | "shot"
  | "death"
  | "missed";

export interface IDuckData {
  state: IDuckState;
  position: { x: number; y: number };
  dirChangedCount: number;
  dirChangedDelay: number;
  dirDuration: number;
  shotStateDelay: number;
}

export type IDogState = "dog_find_1" | "dog_find_2" | "dog_laugh" | "dog_hide";

export interface IDogData {
  state: IDogState;
  position: { x: number; y: number };
  onAction: boolean;
}
