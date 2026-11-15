// Our three demo users, drawn as pixel art.
// Each sprite is a list of rows. Each letter is one pixel, and a dot is empty.
// PixelCharacter.jsx turns every letter into a little square of that color.
//
//   H hair   S skin   B cheek (blush)   E eye
//   T shirt  D tie or shirt detail      P pants   K shoes

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

// Lily Lurvey: medium-length blond hair down to the shoulders.
const LILY = [
  '..HHHHHH..',
  '.HHHHHHHH.',
  '.HSSSSSSH.',
  '.HSESSESH.',
  '.HBSSSSBH.',
  '.HHSSSSHH.',
  '.TTTTTTTT.',
  'TTTTTTTTTT',
  'STTTTTTTTS',
  '.TTTTTTTT.',
  '.PPPPPPPP.',
  '.PPP..PPP.',
  '.PPP..PPP.',
  '.KKK..KKK.',
]

// Pointing poses: the same characters with one arm stretched out to the right,
// pointing at a lesson. (To point left, the picture is just flipped.)
const JACKSON_POINT = [
  '..HHHHHH.....',
  '..HHHHHH.....',
  '..HSSSSH.....',
  '..SESSES.....',
  '..BSSSSB.....',
  '..SSSSSS.....',
  '.TTTDDTTT....',
  'TTTTDDTTTTTSS',
  'STTTDDTTT....',
  '.TTTDDTTT....',
  '.PPPPPPPP....',
  '.PPP..PPP....',
  '.PPP..PPP....',
  '.KKK..KKK....',
]

const CHARLEY_POINT = [
  '..HHHHHH.....',
  '.HHHHHHH.....',
  '..HHHHHH.....',
  '..HHHSSH.....',
  '..SESSES.....',
  '..BSSSSB.....',
  '..SSSSSS.....',
  '.TTTDDTTT....',
  'TTTTDDTTTTTSS',
  'TTTTDDTTT....',
  'STTTDDTTT....',
  '.TTTDDTTT....',
  '.PPPPPPPP....',
  '.PPP..PPP....',
  '.PPP..PPP....',
  '.PPP..PPP....',
  '.PPP..PPP....',
  '.KKK..KKK....',
]

const LILY_POINT = [
  '..HHHHHH.....',
  '.HHHHHHHH....',
  '.HSSSSSSH....',
  '.HSESSESH....',
  '.HBSSSSBH....',
  '.HHSSSSHH....',
  '.TTTTTTTT....',
  'TTTTTTTTTTTSS',
  'STTTTTTTT....',
  '.TTTTTTTT....',
  '.PPPPPPPP....',
  '.PPP..PPP....',
  '.PPP..PPP....',
  '.KKK..KKK....',
]

// Which color each letter uses, per character. Every value is a variable from global.css.
const SHARED = {
  S: '--char-skin',
  B: '--char-blush',
  E: '--char-eye',
  P: '--char-pants',
  K: '--char-shoes',
}

export const CHARACTERS = {
  jackson: {
    name: 'Jackson',
    // What the hover card shows. It comes from our lesson docs (docs/lessons).
    fullName: 'Jackson Stark',
    role: 'Unit 1 guide',
    about:
      'Just got a new laptop and needs Git set up before class. Later joins Charley\'s weather app team to add a 5-day forecast.',
    poses: { stand: JACKSON, point: JACKSON_POINT },
    colors: { ...SHARED, H: '--char-hair-brown', T: '--accent-light', D: '--accent-deep' },
  },
  charley: {
    name: 'Charley',
    fullName: 'Charley Dunkel',
    role: 'Unit 2 guide',
    about:
      'Built a weather app for a class project. Adds dark mode on its own branch, then merges it with a pull request.',
    poses: { stand: CHARLEY, point: CHARLEY_POINT },
    colors: { ...SHARED, H: '--char-hair-brown', T: '--accent', D: '--accent-tint' },
  },
  lily: {
    name: 'Lily',
    fullName: 'Lily Lurvey',
    role: 'Unit 3 guide',
    about:
      'Built a portfolio website and put it on GitHub. Undid a commit that broke the contact form, then went looking for Git\'s hidden database.',
    poses: { stand: LILY, point: LILY_POINT },
    colors: { ...SHARED, H: '--char-hair-blond', T: '--accent-tint' },
  },
}
