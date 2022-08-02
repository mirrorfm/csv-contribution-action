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

    // Catch any error
    parser.on('error', function (err) {
      reject(err);
    });

    // Test that the parsed records matched the expected records
    parser.on('end', function () {
      resolve(records);
    });

    // Write data to the stream
    parser.write(str);

    // Close the readable stream
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

try {
  const fileContent = core.getInput('file-content');
  csvStringToObject(fileContent).then((obj) => {
    const duplicates = findDuplicates(obj);
    if (duplicates.length > 0) {
      core.setFailed('Found duplicates ' + duplicates);
    }
  }).catch((error) => {
    core.setFailed(error.message);
  })
} catch (error) {
  core.setFailed(error.message);
}

module.exports = {
  csvStringToObject,
  findDuplicates,
}