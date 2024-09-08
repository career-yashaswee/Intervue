function flattenColorPalette(colors) {
  const flattened = {};

  // Iterate over each color in the palette
  for (const [color, shades] of Object.entries(colors)) {
    // Check if the color has shades (is an object)
    if (typeof shades === "object") {
      for (const [shade, value] of Object.entries(shades)) {
        flattened[`${color}-${shade}`] = value;
      }
    } else {
      // If not, it's a base color (like black, white)
      flattened[color] = shades;
    }
  }

  return flattened;
}

export default flattenColorPalette;
