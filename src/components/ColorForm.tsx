import React from 'react'
import { useColorsContext } from '../contexts/useContext';

import styles from '../styles/form.module.scss';
import { ColorHex } from '../types/Color';

function ColorForm() {
  const [color, setColor] = React.useState<ColorHex>({} as ColorHex);
  const { colors, setColors } = useColorsContext();
  const regexColorCheck = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  const allowedChars = "0123456789ABCDEF#"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputString: string = e.target.value;

    if (inputString.length > 7) return;

    for (let i = 0; i < inputString.length; i++) {
      if (allowedChars.indexOf(inputString[i]) === -1) {
        inputString.substring(0, inputString.length - 1);
        return;
      };
    }

    if (inputString.length > 1 && inputString[inputString.length - 1] === '#') {
      inputString.substring(0, inputString.length - 1);
      return;
    };

    setColor({
      hexValue: inputString,
      isDefault: false
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sixDigitsColor: string = color.hexValue;
    if (color.hexValue.length === 4) {
      sixDigitsColor = color.hexValue.substring(0, 1) + color.hexValue.substring(1, 2) + color.hexValue.substring(1, 2) + color.hexValue.substring(2, 3) + color.hexValue.substring(2, 3) + color.hexValue.substring(3, 4) + color.hexValue.substring(3, 4);
    }

    if(colors.find(c => c.hexValue === sixDigitsColor)) {
      alert("This color already exists!");
      return;
    }

    if (color.hexValue.match(regexColorCheck)) {
      setColors([...colors, { hexValue: sixDigitsColor, isDefault: false }])
      localStorage.setItem('colors', JSON.stringify(colors));
    }
    else {
      alert("Please enter a valid hex color code");
    }
  };

  return (
    <div>
      <h1>Add colors here! 🎨 🥳</h1>
      <form onSubmit={e => handleSubmit(e)} className={styles.form}>
        <input type="text" id="colorInput" value={color.hexValue || ''} onChange={e => handleChange(e)} placeholder="Please type your color" />
        <input type="submit" value="Save your color!" />
      </form>
    </div>
  )
}

export default ColorForm;