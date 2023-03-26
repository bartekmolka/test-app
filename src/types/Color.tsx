export type ColorRGB = {
    red: number,
    green: number,
    blue: number,
    saturation: number,
    isDefault?: boolean,
}

export type Color = {
    red?: number,
    green?: number,
    blue?: number,
    saturation?: number,
    isDefault: boolean,
    hexValue?: string,
}

export type ColorHex = {
    hexValue: string,
    isDefault?: boolean,
}