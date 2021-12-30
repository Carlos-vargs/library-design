import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    fonts: {
        body: "'Roboto Mono', monospace",
        heading: "'Roboto Mono', monospace",
        mono: "'Roboto Mono', monospace",
    },
    colors: {
        blackColorHeader:"#0E0E0E",
        blueColorButton:"#4886B5",
        blueColorButtonHover:"#3D749D",
      },
})

export default theme