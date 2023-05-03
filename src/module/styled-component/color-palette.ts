export const mpColors = {
  'grayLightest': '#E8EBED',
  'grayLighter': '#C9CDD2',
  'grayLight': '#9EA4AA',
  'gray': '#72787F',
  'grayDark': '#454C53',
  'grayDarker': '#26282B',
  'grayDarkest': '#1B1D1F',

  'black': '#000000',

  'greenLight': '#1FD67D',
  'green': '#06BC67',
  'greenDark': '#0B9D59',

  'orangeLight': '#FF8861',
  'orange': '#FD671C',
  'orangeDark': '#F04800',

  'redLighter': '#FD8795',
  'redLight': '#FB4B60',
  'red': '#FA243C',
  'redDark': '#DC0412',
  'redDarker': '#B40418',

  'white': '#FFFFFF',

  'blueLighter': '#C7E1FF',
  'blueLight': '#58A6FF',
  'blue': '#2188FF',
  'blueDark': '#0166D6',
  'blueDarker': '#0056B8',

  'yellowLighter': '#FFF5B1',
  'yellowLight': '#FFEA7F',
  'yellow': '#FFD33D',
  'yellowDark': '#F9C513',

  'purpleLight': '#B083F0',
  'purple': '#6F42C1',
  'purpleDark': '#5A32A3',

  'tealLight': '#98C6CD',
  'teal': '#449DA7',
  'tealDark': '#3F8A92',

  'hoverWeak': 'rgba(230, 232, 235, 0.25)',
  'hoverStrong': 'rgba(230, 232, 235, 0.7)',

  'backdrop': 'rgba(0, 0, 0, 0.5)',

  'transparent': 'rgba(255, 255, 255, 0)',

  'magic-gradient': 'linear-gradient(245deg, #91a0f2 0%, hsl(277, 100%, 68%) 100%)',
  'warm-gradient': 'linear-gradient(245deg, #fab375 0%, rgb(238, 105, 79) 100%)',
  'wave-gradient': 'linear-gradient(245deg, #75e6d9 0%, hsl(202, 98%, 47%) 100%)',
};

export const mpServiceColors = {
  kokomu: {
    'primary': '#FA243C',
  },
  mms: {
    'primary': '#2188FF',
  }
}

export type MpColor = keyof typeof mpColors | string;

