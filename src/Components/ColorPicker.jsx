import React from "react";
import {colorOptions} from '../Entities/FrontPage'

export default function ColorPicker({ setColor }) {
  const divColorOption = (color) => {
    return (
      <div
        onClick={() => setColor(color)}
        key={color.name}
        className="color"
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
