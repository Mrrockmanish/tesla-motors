module.exports = {
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1440px'
    },

    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '4.5rem'
    },

    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      '85': '#858585',
      'D2': '#D20C18',
      '35': '#35322F',
      '78': '#787878',
      'F1': '#F1F1F1',
      'F2': '#F2F2F2',
      '30': '#303030',
      '9E': '#9E9E9E',
      '94': '#949494',
      '8A': '#8A8A8A',
      'EC': '#ECECEC',
      '50': '#505050',
      '33': '#333333'
    }

  },

  corePlugins: {
    float: false
  },

  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
  
}
