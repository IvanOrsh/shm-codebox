export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(
    parseInt(color1.slice(1, 3), 16),
    parseInt(color1.slice(3, 5), 16),
    parseInt(color1.slice(5, 7), 16)
  );
  const lum2 = getLuminance(
    parseInt(color2.slice(1, 3), 16),
    parseInt(color2.slice(3, 5), 16),
    parseInt(color2.slice(5, 7), 16)
  );

  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
}

export function hexToRGB(hex: string): [number, number, number] {
  if (hex.length !== 3 && hex.length !== 6) {
    return [0, 0, 0];
  }

  if (hex.length === 3) {
    return [
      parseInt(hex.slice(0, 1), 16),
      parseInt(hex.slice(1, 2), 16),
      parseInt(hex.slice(2, 3), 16),
    ];
  }

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `#${[r, g, b]
    .map((v) => {
      const hex = v.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("")}`;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function modifyColors(
  hslColors: string[],
  saturationValues: number[],
  lightnessVales: number[]
): string[] {
  const modifiedHslColors: string[] = [];

  for (let i = 0; i < hslColors.length; i++) {
    const hslColor = hslColors[i];
    const lightnessVale = lightnessVales[i];
    const saturationValue = saturationValues[i];

    const currentHue = hslColor.match(/hsl\((\d+), (\d+)%, (\d+)%\)/)![1];

    const modifiedHslColor = `hsl(${currentHue}, ${saturationValue}%, ${lightnessVale}%)`;

    modifiedHslColors.push(modifiedHslColor);
  }

  return modifiedHslColors;
}

export function cssColorToRGB(cssColor: string): number[] {
  const matches = cssColor.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/
  );

  if (!matches) {
    throw new Error(`Invalid CSS color: ${cssColor}`);
  }

  const [_, r, g, b, a] = matches;

  return [parseInt(r, 10), parseInt(g, 10), parseInt(b, 10)];
}

export function convertToHSL(colors: string[]): string[] {
  const hslColors: string[] = [];

  for (const color of colors) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const rNormalized = r / 255;
    const gNormalized = g / 255;
    const bNormalized = b / 255;

    const max = Math.max(rNormalized, gNormalized, bNormalized);
    const min = Math.min(rNormalized, gNormalized, bNormalized);

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max != min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      // just die already
      h =
        max === rNormalized
          ? ((gNormalized - bNormalized) / d +
              (gNormalized < bNormalized ? 6 : 0)) /
            6
          : max === gNormalized
          ? ((bNormalized - rNormalized) / d + 2) / 6
          : ((rNormalized - gNormalized) / d + 4) / 6;
    }

    hslColors.push(
      `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
        l * 100
      )}%)`
    );
  }

  return modifyColors(hslColors, [70, 80, 90, 100, 30], [90, 80, 65, 50, 40]);
}

export function generateColors(color1: string, color2: string): string[] {
  const [r1, g1, b1] = hexToRGB(color1);
  const [r2, g2, b2] = hexToRGB(color2);
  const [rRef, gRef, bRef] = cssColorToRGB("rgba(0, 0, 0, 0.7)");

  const avgR = Math.floor((r1 + r2) / 2);
  const avgG = Math.floor((g1 + g2) / 2);
  const avgB = Math.floor((b1 + b2) / 2);

  let color3 = rgbToHex(avgR + 20, avgG - 20, avgB - 20);
  let color4 = rgbToHex(avgR - 20, avgG + 20, avgB + 20);
  let color5 = rgbToHex(avgR + 10, avgG + 10, avgB - 30);
  let color6 = rgbToHex(avgR - 30, avgG - 10, avgB + 10);
  let color7 = rgbToHex(avgR + 20, avgG - 10, avgB + 20);

  const minContrastRatio = 4.5;

  [color3, color4, color5, color6, color7] = [
    color3,
    color4,
    color5,
    color6,
    color7,
  ].map((color) => {
    const [r, g, b] = hexToRGB(color);
    const contrastRatio = getContrastRatio(
      rgbToHex(rRef, gRef, bRef),
      rgbToHex(r, g, b)
    );

    if (contrastRatio < minContrastRatio) {
      const factor = (minContrastRatio + 0.05) / contrastRatio;
      return rgbToHex(
        Math.min(255, Math.max(0, Math.round(r * factor))),
        Math.min(255, Math.max(0, Math.round(g * factor))),
        Math.min(255, Math.max(0, Math.round(b * factor)))
      );
    }

    return color;
  });

  return convertToHSL([color1, color2, color3, color4, color5, color6, color7]);
}
