import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ColorHex, ColorRGB } from "../types/Color";

export type ColorsContextType = {
    colors: ColorHex[];
    setColors: (colors: ColorHex[]) => void;
    filters: ColorRGB;
    setFilters: (filters: ColorRGB) => void;
}

type ColorsProviderProps = {
    children: React.ReactNode;
}

const ColorsContext = React.createContext<ColorsContextType>({} as ColorsContextType);

export default ColorsContext;
export const ColorsConsumer = ColorsContext.Consumer;

export const useColorsContext = () =>{
    return React.useContext(ColorsContext);
}

export const ColorsContextProvider = ({children}: ColorsProviderProps) => {
    const [colors, setColors] = useLocalStorage("colors", [
        {hexValue: "#000000", isDefault: true},
        {hexValue: "#FFFFFF", isDefault: true},
        {hexValue: "#FF0000", isDefault: true},
        {hexValue: "#00FF00", isDefault: true},
        {hexValue: "#0000FF", isDefault: true},
        {hexValue: "#FFFF00", isDefault: true},
        {hexValue: "#00FFFF", isDefault: true},
        {hexValue: "#FF00FF", isDefault: true},
    ]);
    const [filters, setFilters] = useState({red: -1, green: -1, blue: -1, saturation: -1, isDefault: false} as ColorRGB);

    return (
        <ColorsContext.Provider value={{colors, setColors, filters, setFilters}}>
            {children}
        </ColorsContext.Provider>
    )
}