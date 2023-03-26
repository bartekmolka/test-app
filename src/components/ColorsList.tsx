import React, { useEffect } from 'react'
import { useColorsContext } from '../contexts/useContext';
import { ColorHex, ColorRGB } from '../types/Color';
import { hexToRgb, rgbToHex, rgbToHsl } from '../utils/convertFunctions';
import ColorItem from './ColorItem';

export const ColorsList = () => {
    const { filters, colors } = useColorsContext();

    const sortColors = (colors: ColorHex[]) => {
        const rgbValues: Omit<ColorRGB, 'saturation'>[] = colors.map(color => {
            const rgb = hexToRgb(color.hexValue);
            return {
                red: rgb.red,
                green: rgb.green,
                blue: rgb.blue,
                isDefault: color.isDefault
            };
        });

        rgbValues.sort((a, b) => {
            if (a.red !== b.red) {
              return b.red - a.red;
            } else if (a.green !== b.green) {
              return b.green - a.green;
            } else if (a.blue !== b.blue) {
              return b.blue - a.blue;
            } else {
              return 0;
            }
        });

        const hexValues: ColorHex[] = rgbValues.map(color => {
            const hex = rgbToHex(color);
            return {hexValue: hex, isDefault: color.isDefault};
        })
        return hexValues;
    }

    const [newColors, setNewColors] = React.useState<ColorHex[]>(sortColors(colors));

    useEffect(() => {
        setNewColors(sortColors(colors));
        setNewColors([...newColors])
        setNewColors(filterColors(colors));
    }, [filters, colors])

    const filterColors = (colors: ColorHex[]) => {
        const filteredColors: ColorHex[] = colors.filter(color => {
            const rgb = hexToRgb(color.hexValue);
            const calculatedRed = Math.floor(255*filters.red/100);
            const calculatedGreen = Math.floor(255*filters.green/100);
            const calculatedBlue = Math.floor(255*filters.blue/100);

            const hsl = rgbToHsl(rgb.red,rgb.green,rgb.blue);

            return rgb.red > calculatedRed && rgb.green > calculatedGreen && rgb.blue > calculatedBlue && hsl.saturation > filters.saturation;
        });

        return sortColors(filteredColors);
    }

    return (
        <div>
            {newColors.map((color, index) => {
                return (
                    <ColorItem key={index} color={color.hexValue} isDefault={color.isDefault}/>
                )
            })}
        </div>
    )
}
