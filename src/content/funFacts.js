// Fun facts about Git and GitHub, told by our characters.
// They stand around the empty left and right sides of the home page,
// and hovering over one shows their fact.
//
// side: 'left' (in the sidebar) or 'right' (under the right panel cards)
// character: who tells it ('jackson', 'charley', 'lily')
// pose / flip: how they stand ('stand' or 'point', and flip to face the other way)
// label: the small line on top of the card
//
// Facts must be true. Each one is something well documented about Git or GitHub.
export const FUN_FACTS = [
  {
    id: 'git-creator',
    side: 'left',
    character: 'jackson',
    pose: 'stand',
    flip: false,
    label: 'Git fun fact',
    text: 'Git was created in 2005 by Linus Torvalds, the same person who started Linux. He built it so thousands of people could work on Linux together.',
  },
  {
    id: 'git-name',
    side: 'left',
    character: 'lily',
    pose: 'point',
    flip: false,
    label: 'Git fun fact',
    text: 'Where does the name come from? "Git" is British slang for an annoying person, and Linus joked that he names all his projects after himself.',
  },
  {
    id: 'git-offline',
    side: 'left',
    character: 'charley',
    pose: 'stand',
    flip: false,
    label: 'Git fun fact',
    text: 'Git keeps the whole history on your own computer, so you can commit with no internet at all. You only need Wi-Fi to push or pull.',
  },
  {
    id: 'commit-ids',
    side: 'right',
    character: 'charley',
    pose: 'point',
    flip: true,
    label: 'Git fun fact',
    text: 'A full commit ID is 40 characters long and is made from the commit itself. The short IDs, like the ones on our map, are just the first 7 characters.',
  },
  {
    id: 'github-history',
    side: 'right',
    character: 'jackson',
    pose: 'stand',
    flip: false,
    label: 'GitHub fun fact',
    text: 'GitHub launched in 2008. Ten years later, in 2018, Microsoft bought it for $7.5 billion.',
  },
  {
    id: 'main-branch',
    side: 'right',
    character: 'lily',
    pose: 'stand',
    flip: false,
    label: 'GitHub fun fact',
    text: 'In 2020, GitHub started calling the first branch of new repositories "main" instead of "master". That\'s why our map says HEAD -> main.',
  },
]
