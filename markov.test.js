import { MarkovMachine } from './markov';

// describe('get some text', function () {});
test('write something to the console', () => {
  console.log('This is the test script');
});

test('playing with any', function () {
  const randNum = Math.random() * 6;
  expect(randNum).toEqual(expect.any(Number));
  const mm = new MarkovMachine(
    'The cat has a hat in his cap under the sheets.'
  );
  expect(mm.makeText()).toEqual(expect.any(String));
});
