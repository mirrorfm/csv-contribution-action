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

const findDuplicates = function(obj) {
  const counts = obj.map((item) => item[0]).reduce((m, k) => m.set(k, (m.has(k) ? m.get(k) : 0) + 1), new Map());
  return Array.from(counts.entries()).filter(([_, c]) => c > 1).map(([k]) => k);
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
