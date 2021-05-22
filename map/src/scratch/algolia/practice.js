const TEMP_ALGOLIA_SEARCH_KEY = 'b049e333322e95986b663829b88e2ad2f';
const ALGOLIA_APP_ID = 'F7OG87T3T6';
import algoliasearch from 'algoliasearch';
const fs = require('fs');

const client = algoliasearch(ALGOLIA_APP_ID, TEMP_ALGOLIA_SEARCH_KEY);
const index = client.initIndex('contacts');
// const contactsJSON = require('./contacts.json');

// Calling the readFileSync() method
// to read 'input.txt' file
const data = fs.readFileSync('./contacts.json', {
  encoding: 'utf8',
  flag: 'r',
});

// Display the file data
console.log(substr(data, 200));

index
  .saveObjects(contactsJSON, {
    autoGenerateObjectIDIfNotExists: true,
  })
  .then(result => {
    console.log(result);
  });
console.log('after');
