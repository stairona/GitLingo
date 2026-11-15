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
    fullName: 'Jackson Stark',
    role: 'Unit 1 guide',
    // What the hover card says, in Jackson's own words, talking to you.
    // It all comes from our lesson docs (docs/lessons).
    // intro: who they are. next: what you'll do in the lesson after the one
    // the guide is standing at, looked up by that lesson's id. guideNote.js
    // puts the next lesson's number and name in front, like
    // "Next up, Lesson 3 (Main commands): you'll help..."
    intro: "Hi, I'm Jackson! I just got a new laptop, and I need Git set up before class tomorrow.",
    next: {
      'u1-l1':
        "you'll help me set up Git on my computer, so every change I save is signed with my name and email.",
      'u1-l2':
        "you'll help my friend Charley start saving a weather app with Git, so nothing gets lost.",
      'u1-l3':
        "you'll help my friend Lily put a portfolio website on GitHub, so it's backed up and everyone can see it.",
      'u1-l4':
        'Charley will show you branches, so you can try a new idea without breaking what already works.',
    },
    poses: { stand: JACKSON, point: JACKSON_POINT },
    colors: { ...SHARED, H: '--char-hair-brown', T: '--accent-light', D: '--accent-deep' },
  },
  charley: {
    name: 'Charley',
    fullName: 'Charley Dunkel',
    role: 'Unit 2 guide',
    intro: "Hi, I'm Charley! I built a weather app for a class project, and I keep making it better.",
    // waiting: what the guide says on a locked unit, about its first lesson.
    waiting:
      "you'll help me build dark mode on a branch, so I don't break the version that already works.",
    next: {
      'u2-l1':
        "you'll help me merge my dark mode branch into main with a pull request on GitHub.",
      'u2-l2':
        "Jackson joins my weather app team, and you'll help Jackson copy the project and add a 5-day forecast.",
      'u2-l3':
        "you'll help Lily undo two mistakes: an edit that broke the home page, and a pushed commit that broke the contact form.",
      'u2-l4':
        'Lily takes you under the hood, starting with the three areas every change moves through.',
    },
    poses: { stand: CHARLEY, point: CHARLEY_POINT },
    colors: { ...SHARED, H: '--char-hair-brown', T: '--accent', D: '--accent-tint' },
  },
  lily: {
    name: 'Lily',
    fullName: 'Lily Lurvey',
    role: 'Unit 3 guide',
    intro: "Hi, I'm Lily! I built a portfolio website, and now I want to know how Git really works.",
    waiting:
      "you'll help Charley put only a bug fix in the next snapshot and leave some messy notes out.",
    next: {
      'u3-l1':
        "you'll help Jackson find the ID of the commit that added the forecast, and see where those IDs come from.",
      'u3-l2': "you'll help me find the hidden folder where Git keeps its whole database.",
      'u3-l3':
        "the Wi-Fi goes down while the three of us are working, and you'll see why Git keeps working anyway.",
    },
    // finale: what Lily says at the very last lesson, when nothing comes next.
    finale:
      "I put my portfolio on GitHub, undid a commit that broke my contact form, and found Git's hidden database. Thanks for helping all three of us!",
    poses: { stand: LILY, point: LILY_POINT },
    colors: { ...SHARED, H: '--char-hair-blond', T: '--accent-tint' },
  },
}
