let fs = require('fs');
let _ = require('lodash');

let bookPath = './api/translation/kjv/book/'
let books = fs.readdirSync(bookPath);
books.forEach(b => {
    let chapterPath = bookPath + b + '/chapter';
    let chapters = fs.readdirSync(chapterPath);
    chapters = _.orderBy(chapters, _.parseInt);
    fs.writeFileSync(chapterPath + 's.json', JSON.stringify(chapters, null, 2));

    chapters.forEach(c => {
        let versePath = chapterPath + '/' + c + '/verse';
        let verses = fs.readdirSync(versePath);
        verses = verses.map(v => v.split('.')[0]);
        verses = _.orderBy(verses, _.parseInt);
        fs.writeFileSync(versePath + 's.json', JSON.stringify(verses, null, 2));
    })
})