const u = require('wlj-utilities');

const books = require('./api/translation/kjv/books.json');
books.forEach(book => {
    const p = `/translation/kjv/book/${book}`;
    const command = `aws s3 sync ./api${p} s3://bible-api${p}`;
    const output = u.executeCommand(command);
    console.log(output);
});

(() => {
    const p = `/translation/kjv/books.json`;
    const command = `aws s3 cp ./api${p} s3://bible-api${p}`;
    const output = u.executeCommand(command);
    console.log(output);
})();