import React from 'react'
import { ColorHex } from '../types/Color'

const useLocalStrorage = (key: string, initValue: ColorHex[]) => {
    const [value, setValue] = React.useState(() => {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initValue
    })

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue];
}

export default useLocalStrorage;