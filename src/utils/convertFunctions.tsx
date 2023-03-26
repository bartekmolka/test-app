import { ColorRGB } from "../types/Color";

export const hexToRgb = (hex: string) => {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);
    return { red, green, blue };
};

export const rgbToHex = (rgb: Omit<ColorRGB, 'saturation'>) => {
    const hexR = rgb.red.toString(16).padStart(2, '0').toUpperCase();
    const hexG = rgb.green.toString(16).padStart(2, '0').toUpperCase();
    const hexB = rgb.blue.toString(16).padStart(2, '0').toUpperCase();
    return '#' + hexR + hexG + hexB;
}

export function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;

    let hue = 0;
    if (delta !== 0) {
        if (cmax === r) {
            hue = ((g - b) / delta) % 6;
        } else if (cmax === g) {
            hue = (b - r) / delta + 2;
        } else {
            hue = (r - g) / delta + 4;
        }
    }
    hue = Math.round(hue * 60);

    const lightness = (cmax + cmin) / 2;

    let saturation = 0;
    if (delta !== 0) {
        saturation = delta / (1 - Math.abs(2 * lightness - 1));
    }
    saturation = +(saturation * 100).toFixed(1);

    if (saturation < 0) {
        saturation = 0;
    } else if (saturation > 100) {
        saturation = 100;
    }

    return { hue, saturation, lightness };
}