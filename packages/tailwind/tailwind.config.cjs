const defaultTheme = require('tailwindcss/defaultTheme');
// Plugins
const daisyui = require('daisyui');
const lineClamp = require('@tailwindcss/line-clamp');
const patterns = require('tailwind-heropatterns');
/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT:
  // Every package that wants to use this tailwind config
  // needs to define the `content` property and tell tailwind
  // where to watch for classnames

  darkMode: 'class',
  mode: 'jit',

  theme: {
    extend: {
      fontFamily: {
        sans: ['roboto', ...defaultTheme.fontFamily.sans]
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    }
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#45B1E8',
          secondary: '#E8456B',
          accent: '#3AE8C4',
          "--btn-text-case": "none",
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=black]'],
          primary: '#45B1E8',
          secondary: '#E8456B',
          accent: '#3AE8C4',
          "--btn-text-case": "none",
          '--rounded-box': '0.2rem',
          '--rounded-btn': '0.2rem'
        }
      }
    ]
  },

  plugins: [
    daisyui,
    lineClamp,
    patterns({
      // as per tailwind docs you can pass variants
      variants: [],

      // the list of patterns you want to generate a class for
      // the names must be in kebab-case
      // an empty array will generate all 87 patterns
      patterns: [
        'anchors-away',
        'architect',
        'autumn',
        'aztec',
        'bamboo',
        'bank-note',
        'bathroom-floor',
        'bevel-circle',
        'boxes',
        'brick-wall',
        'bubbles',
        'cage',
        'charlie-brown',
        'church-on-sunday',
        'circles-squares',
        'circuit-board',
        'connections',
        'cork-screw',
        'current',
        'curtain',
        'cutout',
        'death-star',
        'diagonal-lines',
        'diagonal-stripes',
        'dominos',
        'endless-clouds',
        'eyes',
        'falling-triangles',
        'fancy-rectangles',
        'flipped-diamonds',
        'floating-cogs',
        'floor-tile',
        'formal-invitation',
        'four-point-stars',
        'glamorous',
        'graph-paper',
        'groovy',
        'happy-intersection',
        'heavy-rain',
        'hexagons',
        'hideout',
        'houndstooth',
        'i-like-food',
        'intersecting-circles',
        'jigsaw',
        'jupiter',
        'kiwi',
        'leaf',
        'lines-in-motion',
        'lips',
        'lisbon',
        'melt',
        'moroccan',
        'morphing-diamonds',
        'overcast',
        'overlapping-circles',
        'overlapping-diamonds',
        'overlapping-hexagons',
        'parkay-floor',
        'piano-man',
        'pie-factory',
        'pixel-dots',
        'plus',
        'polka-dots',
        'rails',
        'rain',
        'random-shapes',
        'rounded-plus-connected',
        'signal',
        'skulls',
        'slanted-stars',
        'squares',
        'squares-in-squares',
        'stamp-collection',
        'steel-beams',
        'stripes',
        'temple',
        'texture',
        'tic-tac-toe',
        'tiny-checkers',
        'topography',
        'volcano-lamp',
        'wallpaper',
        'wiggle',
        'x-equals',
        'yyy',
        'zig-zag'
      ],

      // The foreground colors of the pattern
      colors: {
        default: '#9C92AC',
        primary: '#45B1E8',
        secondary: '#E8456B',
        accent: '#3AE8C4'
      },

      // The foreground opacity
      opacity: {
        default: '0.4',
        100: '0.5',
        200: '0.7',
        300: '1.0'
      }
    })
  ]
};
