// each letter is one pixel, a dot is empty:
// H hair, S skin, B cheek, E eye, T shirt, D tie, P pants, K shoes
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

const SHARED = {
  S: '--char-skin',
  B: '--char-blush',
  E: '--char-eye',
  P: '--char-pants',
  K: '--char-shoes',
}

// Which character guides each unit on the map. This lives here, not in the
// unit JSON, so the lesson files only hold lesson content and the map's
// words all live in this one file.
export const UNIT_GUIDES = {
  'unit-1': 'jackson',
  'unit-2': 'charley',
  'unit-3': 'lily',
}

export const CHARACTERS = {
  jackson: {
    name: 'Jackson',
    fullName: 'Jackson Stark',
    role: 'Unit 1 guide',
    intro: "Hi, I'm Jackson! I just got a new laptop, and I need Git set up before class tomorrow.",
    // The speech bubble next to the current lesson on the map, one per lesson id.
    says: {
      'u1-l1': "Hi, I'm Jackson! I'm new to Git too. Let's start here.",
      'u1-l2': 'I just got a new laptop. Help me set up Git before class!',
      'u1-l3': "Git is ready. Now let's learn the commands that save our work.",
      'u1-l4': "Last step: let's put our work on GitHub so everyone can see it!",
    },
    // The speech bubble once every lesson in the unit is finished.
    done: 'Unit 1 done! Charley is waiting for you in Unit 2.',
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
    waiting:
      "you'll help me build dark mode on a branch, so I don't break the version that already works.",
    says: {
      'u2-l1': "My weather app finally works! Help me build dark mode on a branch so I don't break it.",
      'u2-l2': "Dark mode works on my branch. Let's merge it into main on GitHub!",
      'u2-l3': 'My app is getting popular! Jackson is joining the team to add a 5-day forecast.',
      'u2-l4': "Uh oh, Lily's portfolio broke in two places. Let's undo both mistakes.",
    },
    done: 'Unit 2 done! Lily will take it from here in Unit 3.',
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
    done: 'You finished the whole course. Nice work!',
    next: {
      'u3-l1':
        "you'll help Jackson find the ID of the commit that added the forecast, and see where those IDs come from.",
      'u3-l2': "you'll help me find the hidden folder where Git keeps its whole database.",
      'u3-l3':
        "the Wi-Fi goes down while the three of us are working, and you'll see why Git keeps working anyway.",
    },
    finale:
      "I put my portfolio on GitHub, undid a commit that broke my contact form, and found Git's hidden database. Thanks for helping all three of us!",
    poses: { stand: LILY, point: LILY_POINT },
    colors: { ...SHARED, H: '--char-hair-blond', T: '--accent-tint' },
  },
}
