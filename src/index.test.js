const { csvStringToObject, findDuplicates } = require('./index');

test('validates invalid CSV', () => {
  expect(csvStringToObject('a,b,c\na,b')).toStrictEqual([]);
});

test('parses valid CSV', () => {
  expect(csvStringToObject('a,b,c\n')).toStrictEqual([['a', 'b', 'c']]);
  expect(csvStringToObject('a,b,c\na,b,c')).toStrictEqual([['a', 'b', 'c'], ['a', 'b', 'c']]);
  expect(csvStringToObject(`a,b,c
a,b,c`)).toStrictEqual([['a', 'b', 'c'], ['a', 'b', 'c']]);
})

test('find duplicates', () => {
  expect(findDuplicates([['a', 'b', 'b'], ['a', 'b', 'c']])).toStrictEqual(["a"]);
  expect(findDuplicates([['a1', 'b', 'b'], ['a2', 'b', 'c'], ['a1', 'b', 'b'], ['a2', 'b', 'c']])).toStrictEqual(["a1", "a2"]);
});
