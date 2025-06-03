import { Geist, Montserrat_Alternates } from "next/font/google";


export const geistSans = Geist({
    subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ['500', '700'],
});