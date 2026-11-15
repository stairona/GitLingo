// Our three demo users, drawn as pixel art.
// Each sprite is a list of rows. Each letter is one pixel, and a dot is empty.
// PixelCharacter.jsx turns every letter into a little square of that color.
//
//   H hair   S skin   B cheek (blush)   E eye
//   T shirt  D tie or shirt detail      P pants   K shoes
//   R skirt  L legs (skin under a skirt)

// Jackson Stark: short brown hair.
const JACKSON = [
  '..HHHHHH..',
  '..HHHHHH..',
  '..HSSSSH..',
  '..SESSES..',
  '..BSSSSB..',
  '..SSSSSS..',
  '.TTTDDTTT.',
  'TTTTDDTTTT',
  'STTTDDTTTS',
  '.TTTDDTTT.',
  '.PPPPPPPP.',
  '.PPP..PPP.',
  '.PPP..PPP.',
  '.KKK..KKK.',
]

// Charley Dunkel: tall, brown hair with a swoop.
const CHARLEY = [
  '..HHHHHH..',
  '.HHHHHHH..',
  '..HHHHHH..',
  '..HHHSSH..',
  '..SESSES..',
  '..BSSSSB..',
  '..SSSSSS..',
  '.TTTDDTTT.',
  'TTTTDDTTTT',
  'TTTTDDTTTT',
  'STTTDDTTTS',
  '.TTTDDTTT.',
  '.PPPPPPPP.',
  '.PPP..PPP.',
  '.PPP..PPP.',
  '.PPP..PPP.',
  '.PPP..PPP.',
  '.KKK..KKK.',
]

// Lily Lurvey: medium-length blond hair down to her shoulders.
const LILY = [
  '..HHHHHH..',
  '.HHHHHHHH.',
  '.HSSSSSSH.',
  '.HSESSESH.',
  '.HBSSSSBH.',
  '.HHSSSSHH.',
  '.TTTTTTTT.',
  'STTTTTTTTS',
  '.TTTTTTTT.',
  '.RRRRRRRR.',
  '.RRRRRRRR.',
  '..LL..LL..',
  '..LL..LL..',
  '..KK..KK..',
]

// Which color each letter uses, per character. Every value is a variable from global.css.
const SHARED = {
  S: '--char-skin',
  L: '--char-skin',
  B: '--char-blush',
  E: '--char-eye',
  P: '--char-pants',
  K: '--char-shoes',
}

export const CHARACTERS = {
  jackson: {
    name: 'Jackson',
    sprite: JACKSON,
    colors: { ...SHARED, H: '--char-hair-brown', T: '--accent-light', D: '--accent-deep' },
  },
  charley: {
    name: 'Charley',
    sprite: CHARLEY,
    colors: { ...SHARED, H: '--char-hair-brown', T: '--accent', D: '--accent-tint' },
  },
  lily: {
    name: 'Lily',
    sprite: LILY,
    colors: { ...SHARED, H: '--char-hair-blond', T: '--accent-tint', R: '--accent-deep' },
  },
}
