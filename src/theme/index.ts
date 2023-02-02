export interface Theme {
   color: Color;
   font:  Font;
   border:Border;
   header: Header;
}

interface Header{
   height: string;
}

interface Border {
   radius: string;
}

export interface Color {
   first:       string;
   firstBg:     string;
   firstHover: string;
   first5Alpha: string;
   second:      string;
   secondBg:    string;
   third:       string;
   thirdBg:     string;
   fourth:      string;
   fourthBg:    string;
   fifth:       string;
}

export interface Font {
   size:       LineHeight;
   lineHeight: string;
   family:     Family;
}

export interface Family {
   roboto:     string;
   robotoSlab: string;
}

export interface LineHeight {
   xs:    string;
   sm:    string;
   base:  string;
   lg:    string;
   xl:    string;
   "2xl": string;
}

export const theme:Theme = {
   color: {
      first: "#FF859B",
      firstHover: '#af5d6c',
      firstBg: "#1C1B1E",
      first5Alpha: "rgba(255, 133, 155, 0.05)",

      second: "#948F99",
      secondBg: "#262529",

      third: "#F4EDE8",
      thirdBg: "#0D0C0F",

      fourth: "#E5E5E5",
      fourthBg: "#3E3B47",

      fifth: "#999591",
   },
   font: {
      size: {
         xs: "1.2rem",
         sm: "1.4rem",
         base: "1.6rem",
         lg:"2.4rem",
         xl: "3.2rem",
         "2xl": "4.8rem",
      },
      lineHeight: '130%'    ,
      family: {
         roboto: '"Roboto", sans-serif',
         robotoSlab: '"Roboto Slab", serif',
      },
   },
   border: {
      radius: "1rem"
   },
   header:{
      height: "10.5rem"
   }
}

