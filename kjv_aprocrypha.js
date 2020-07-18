let _ = require('lodash');
const fs = require('fs');
const path = require('path');

let booksMap = fs.readFileSync('./data/kjv_apocrypha/book_names.txt', 'utf8');
booksMap = booksMap.split('\r\n');
booksMap = booksMap.map(b => b.split('\t'));
booksMap = booksMap.filter(b => !b[0].endsWith('A') && b[0])
booksMap = _.keyBy(booksMap, b => b[0])
booksMap = _.mapValues(booksMap, b => b[1].replace(' ','-').replace(' ','-'))
// console.log({books});
booksMap['44N'] = 'Acts';
let books = _.values(booksMap);

let translation = 'kjv';
let prefix = `./api/translation/${translation}/`;
let p = prefix + 'books.json'
ensureDirectoryExists(p);
fs.writeFileSync(p, JSON.stringify(books, null, 2));

let contents = fs.readFileSync('./data/kjv_apocrypha/kjv_apocrypha_utf8.txt', 'utf8');
let lines = contents.split('\r\n');
lines = lines.filter(line => !line.startsWith('#'));
lines = lines.map(line => line.split('\t'));

lines = lines.map(line => {
    let book = booksMap[line[0]];
    return {
        book,
        chapter: line[1],
        verse: line[2],
        text: line[5],
    };
});
lines = lines.filter(line => !!line.book);

let bookNames = _.keys(_.groupBy(lines, 'book'));

// console.log({bookNames});


lines.forEach(line => {
    const p = prefix + `book/${line.book}/chapter/${line.chapter}/verse/${line.verse}.json`;
    ensureDirectoryExists(p);
    fs.writeFileSync(p, JSON.stringify(line, null, 2));
})

function ensureDirectoryExists(p) {
    //console.log(ensureDirectoryExists.name, {p});
    const d = path.dirname(p);
    if (d && d !== p) {
        ensureDirectoryExists(d);
    }
    if (!fs.existsSync(d)) {
        fs.mkdirSync(d);
    }
}