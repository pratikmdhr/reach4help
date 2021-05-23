import algoliasearch from 'algoliasearch';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
import algoliasearch from 'algoliasearch';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('airports');

index
  .setSettings({
    searchableAttributes: ['name', 'city', 'country', 'iata_code'],
    customRanking: ['desc(links_count)'],
  })
  .then(() => {
    console.log('set settings');
  });

// Calling the readFileSync() method
// to read 'input.txt' file
let dataJSON = fs.readFileSync('./airports.json', {
  encoding: 'utf8',
  flag: 'r',
});

dataJSON = JSON.parse(contactsJSON);

index
  .saveObjects(dataJSON, {
    autGenerateObjectIDIfNotExist: true,
  })
  .then(result => {
    console.log('I am here');
    console.log(result);
  })
  .catch(err => console.log('error ' + JSON.stringify(err, null, 2)));

console.log('after');
