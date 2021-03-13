export interface componentTy {
  id: number,
  component: (config: componentTy) => JSX.Element,
  label: string,
  propValue: any,
  icon: JSX.Element,
  style: any
}