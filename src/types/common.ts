export interface IDuckDataType {
  state:
    | "left"
    | "right"
    | "top_left"
    | "top_right"
    | "bottom-left"
    | "bottom-right"
    | "shot"
    | "death";
  position: { x: number; y: number };
  dirChangedCount: number;
  shotStateTime: number;
}
