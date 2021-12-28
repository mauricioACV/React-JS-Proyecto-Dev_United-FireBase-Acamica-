import React from "react";
import {colorOptions} from '../../Entities/FrontPage'

export default function ColorPicker({ userColor, setUserColor }) {

  const divColorOption = (color) => {
    return (
      <div
        onClick={() => setUserColor(color)}
        key={color.name}
        className={`color ${userColor && (color.hex === userColor.hex) ? "outlineWhite" : ""}`}
        style={{ backgroundColor: color.hex }}
      />
    );
  };

  const colorOption = () => {
    return colorOptions.map((color) => {
      return divColorOption(color);
    });
  };

  return (
    <div className="color-picker">{colorOption()}</div>
  );
}
