import font from './font';

type TestCase = [boolean, string, string, string];
let testsCases: Array<TestCase> = [
  [true, 'proxima', 'regular', ''],
  [true, 'proxima', 'regular', 'it'],
];

it('just works', () => {
  for (const t in testsCases) {
    let f = font(t[1], t[2], t[3]);
    console.log(f);
  }
});
