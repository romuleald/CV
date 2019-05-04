const nunjucks = require('nunjucks');
const fs = require('fs');

const ie18nDatas = require('./src/i18n/i18n');
nunjucks.configure('src', {autoescape: false});

const writeHTML = (textDatas, lang) => {
    const HTMLCompiled = nunjucks.render('index.html', textDatas);
    const fileName = `index-${lang}.html`;
    const path = `build/`;
    fs.writeFile(`${path}${fileName}`, HTMLCompiled, (err) => {
        if (err) throw err;
        console.log(`The file ${fileName} has been saved in path ${path}!`);
    });
};

Object.keys(ie18nDatas).forEach((lang) => {
    writeHTML(ie18nDatas[lang], lang);
});
