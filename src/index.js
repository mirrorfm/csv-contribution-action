const core = require('@actions/core');
const { parse } = require('csv-parse');

const csvStringToObject = async function(str) {
  return new Promise((resolve, reject) => {
    const records = [];

    const parser = parse({
      delimiter: ',',
    });

    parser.on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });

    parser.on('error', function (err) {
      reject(err);
    });

    parser.on('end', function () {
      resolve(records);
    });

    parser.write(str);
    parser.end();
  });
}

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let pivot = array[0];

  let left = [];
  let right = [];

  for (let i = 1; i < array.length; i++) {
    array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
  }

  return quickSort(left).concat(pivot, quickSort(right));
}

const findDuplicates = function(obj) {
  const keys = obj.map((item) => item[0])
  const sortedKeys = quickSort(keys);

  let results = [];
  for (let i = 0; i < sortedKeys.length - 1; i++) {
    if (sortedKeys[i + 1] === sortedKeys[i]) {
      results.push(sortedKeys[i]);
    }
  }

  return results;
}

// main code
const fileContent = core.getInput('file-content');
const findDuplicatesStr = core.getInput('find-duplicates');

csvStringToObject(fileContent).then((obj) => {
  if (findDuplicatesStr === 'true') {
    const duplicates = findDuplicates(obj);

    if (duplicates.length > 0) {
      core.setFailed(`Found duplicates: ${duplicates}`);
    }
  }
}).catch((error) => {
  core.setFailed(`Invalid CSV: ${error.message}`);
});

module.exports = {
  csvStringToObject,
  findDuplicates,
}