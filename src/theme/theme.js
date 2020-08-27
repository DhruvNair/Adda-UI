import { theme as defaultTheme } from "@chakra-ui/core"
export default {
    ...defaultTheme,
    fonts: {
        ...defaultTheme.fonts,
        primary: "Montserrat, sans-serif",
        secondary: "Ropa Sans, sans-serif"
    },
    colors: {
        ...defaultTheme.colors,
        primaryColor: "#cc2d6f",
        secondaryColor: "#cccccc",
        lightColor: "#149f98",
        darkColor: "#51283e",
        darkestColor: "#10292e"
    },
};