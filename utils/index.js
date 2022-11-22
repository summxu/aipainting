/*
 * @Author: Chenxu
 * @Date: 2022-11-21 17:32:23
 * @LastEditTime: 2022-11-21 21:01:23
 * @Msg: Nothing
 */
export function rdmRgbColor () {
  //随机生成RGB颜色
  let arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(Math.floor(Math.random() * 256));
  }
  let [r, g, b] = arr;
  // rgb颜色
  // var color=`rgb(${r},${g},${b})`;
  // 16进制颜色
  var color = `#${r.toString(16).length > 1 ? r.toString(16) : '0' + r.toString(16)}${g.toString(16).length > 1 ? g.toString(16) : '0' + g.toString(16)}${b.toString(16).length > 1 ? b.toString(16) : '0' + b.toString(16)}`;
  return color;
}