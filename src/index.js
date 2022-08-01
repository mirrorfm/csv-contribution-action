const core = require('@actions/core');
const github = require('@actions/github');
const { parse } = require('csv-parse');

try {
  const fileContent = core.getInput('file-content');

  console.log(csvStringToObject(fileContent));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message)
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
    throw (err);
  });

  parser.write(fileContent);
  parser.end();

  return records;
}

module.exports = csvStringToObject;
