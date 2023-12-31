import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";
import createTheme from "@mui/material/styles/createTheme";

const robotoFont = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

const poppinsFont = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const customTheme = createTheme({
  typography: {
    fontFamily: {
      poppins: poppinsFont.style.fontFamily,
      roboto: robotoFont.style.fontFamily,
    },
  },
});
