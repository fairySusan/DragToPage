export interface componentTy {
  component: (config: componentTy) => JSX.Element,
  label: string,
  propValue: any,
  icon: JSX.Element,
  style: any
}