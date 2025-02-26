function toHex(colorComponent: number) {
  return Math.round(colorComponent).toString(16).padStart(2, "0");
}

export function addColorOpacity(color: string, opacity: number) {
  let r = Number.parseInt(color.slice(1, 3), 16);
  let g = Number.parseInt(color.slice(3, 5), 16);
  let b = Number.parseInt(color.slice(5, 7), 16);

  // Calculate the new color components
  r += (255 - r) * opacity;
  g += (255 - g) * opacity;
  b += (255 - b) * opacity;

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function makeColorDarker(color: string, factor: number) {
  let r = Number.parseInt(color.slice(1, 3), 16);
  let g = Number.parseInt(color.slice(3, 5), 16);
  let b = Number.parseInt(color.slice(5, 7), 16);

  r *= factor;
  g *= factor;
  b *= factor;

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
