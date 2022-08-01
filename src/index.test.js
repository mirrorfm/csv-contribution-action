const csvStringToObject = require('./index');

test('validates invalid CSV', () => {
  expect(csvStringToObject('a,b,c\na,b')).toStrictEqual([]);
});

test('parses valid CSV', () => {
  expect(csvStringToObject('a,b,c\n')).toStrictEqual([['a', 'b', 'c']]);
  expect(csvStringToObject('a,b,c\na,b,c')).toStrictEqual([['a', 'b', 'c'], ['a', 'b', 'c']]);
});
