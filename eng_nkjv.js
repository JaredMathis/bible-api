const fs = require('fs');

function getName(name) {
    return name
        .replace(' ','-')
        .replace(' ','-');
}

let bible = require('./data/eng_nkjv.json');
let bookNames = 
    bible.books
    .map(b => getName(b.name));

//console.log(bookNames);

let prefix = './api/translation/nkjv/';

fs.writeFileSync(
    prefix + 'books.json', 
    JSON.stringify(bookNames, null, 2));

bible.books.forEach(b => {
    let i = 1;
    let chapters = b.chapters.map(c => (i++).toString());
    let d1 = prefix + 'book/';
    if (!fs.existsSync(d1)) {
        fs.mkdirSync(d1);
    }
    let d2 = d1 + getName(b.name) + '/';
    if (!fs.existsSync(d2)) {
        fs.mkdirSync(d2);
    }
    fs.writeFileSync(
        d2 + 'chapters.json', 
        JSON.stringify(chapters, null, 2));
    
    b.chapters.forEach(c => {
        let d3 = d2 + c.num + '/';
        if (!fs.existsSync(d3)) {
            fs.mkdirSync(d3);
        }
        let verses = c.verses.map(v => v.num.toString());
        fs.writeFileSync(
            d3 + 'verses.json', 
            JSON.stringify(verses, null, 2));
        
        c.verses.forEach(v => {
            let d4 = d3 + 'verse/';
            if (!fs.existsSync(d4)) {
                fs.mkdirSync(d4);
            }
            let verse = {
                "book": getName(b.name),
                "chapter": c.num.toString(),
                "verse": v.num.toString(),
                "text": v.text
            }
            fs.writeFileSync(
                d4 + v.num + '.json', 
                JSON.stringify(verse, null, 2)); 
        });
    })
});