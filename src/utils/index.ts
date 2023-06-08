export function generateColorGradient(): Array<string> {
  let colorArray = [];
  let n = 100;
  let chunk = 5;
  for (let i = 0; i < n; i++) {
    if (i % chunk === 0) {
      let red = (255 * i) / 100;
      let green = (255 * (100 - i)) / 100;
      let blue = 0;
      colorArray.push(`rgb(${red}, ${green}, ${blue})`);
    }
  }
  return colorArray;
}

export function getDegrees(
  step: number = 5,
  min: number = 0,
  max: number = 100,
): Array<number> {
  let decibels = [];
  for (let i = min; i < max; i += step) {
    decibels.push(i);
  }
  return decibels;
}
