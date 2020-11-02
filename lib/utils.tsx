export const dateFormat = function(timestamp: string | number) {
  let date = new Date(timestamp); //時間戳為10位需*1000，時間戳為13位的話不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? '0' + (date.getDate() + ' ') : date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
};