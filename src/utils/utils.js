export function numberWithCommas(x) {
  return x ? x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') : 0;
}
