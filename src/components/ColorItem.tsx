import { useColorsContext } from '../contexts/useContext';

import styles from '../styles/color.module.scss';

interface ColorItemProps {
    color: string;
    isDefault?: boolean;
}

const ColorItem = ({ color, isDefault }: ColorItemProps) => {
    const { colors, setColors } = useColorsContext();

    const removeColor = (color: string) => {
        const newColors = [...colors.filter(c => c.hexValue !== color)];
        setColors([...newColors]);
        localStorage.setItem('colors', JSON.stringify(newColors));
    }

    return (
        <div className={styles.colorItem} style={{ backgroundColor: color }}>
            <p>
                {color}
            </p>
            {!isDefault ? <button onClick={e => removeColor(color)}>X</button> : null}
        </div>
    )
}

export default ColorItem;