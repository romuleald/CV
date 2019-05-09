const nunjucks = require('nunjucks');
const fs = require('fs');

const path = `docs/`;
const i18nDatas = require('../src/i18n/i18n');
nunjucks.configure('src', {autoescape: false});
const allLang = Object.keys(i18nDatas);

const writeHTML = (textDatas, lang) => {
    const contextDatas = {
        currentLang: lang,
        allLang: allLang,
        ...textDatas
    };
    const HTMLCompiled = nunjucks.render('index-lang.html', contextDatas);
    const fileName = `index-${lang}.html`;
    fs.writeFile(`${path}${fileName}`, HTMLCompiled, (err) => {
        if (err) throw err;
        console.log(`The file ${fileName} has been saved in path ${path}!`);
    });
};

allLang.forEach((lang) => {
    writeHTML(i18nDatas[lang], lang);
});
