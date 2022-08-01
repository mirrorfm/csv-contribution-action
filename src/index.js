const core = require('@actions/core');
const { parse } = require('csv-parse');

try {
  const fileContent = core.getInput('file-content');
  console.log(fileContent);
  console.log(csvStringToObject(fileContent));
} catch (error) {
  core.setFailed(error.message);
}

function csvStringToObject(fileContent) {
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

  parser.on('error', (err) => {
    console.error(err.message);
    // throw (err);
  });

  parser.write(fileContent);
  parser.end();

  return records;
}

module.exports = csvStringToObject;
