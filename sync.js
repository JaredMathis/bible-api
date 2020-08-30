const u = require('wlj-utilities');

const versions = require('./api/translations.json');
    
(() => {
    const p = `/translations.json`;
    const command = `aws s3 cp ./api${p} s3://bible-api${p}`;
    const output = u.executeCommand(command);
    console.log(output);
})();

versions.forEach(version => {
    const books = require(`./api/translation/${version}/books.json`);
    books.forEach(book => {
        const p = `/translation/${version}/book/${book}`;
        const command = `aws s3 sync ./api${p} s3://bible-api${p}`;
        const output = u.executeCommand(command);
        console.log(output);
    });
    
    (() => {
        const p = `/translation/${version}/books.json`;
        const command = `aws s3 cp ./api${p} s3://bible-api${p}`;
        const output = u.executeCommand(command);
        console.log(output);
    })();
})
