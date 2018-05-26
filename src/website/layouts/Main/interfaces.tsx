interface Transform {
  left: number;
  top: number;
  height?: number;
  width?: number;
  skew?: number;
}

export interface ElementStyle {
  offset?: Transform;
  red?: Transform;
  green?: Transform;
  blue?: Transform;
}

export interface MainProps {}

export interface MainState {
  headerVisible?: boolean;
  scanlinesOpacity: number;
  headerStyle?: ElementStyle;
}
