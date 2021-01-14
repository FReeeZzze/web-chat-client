// eslint-disable-next-line import/prefer-default-export
export function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
