
const puppeteer = require('puppeteer');
const generatePdfContent = require('./generatePdfData.js').generatePdfData;

const generatePdf = async (answers, gitHubInfo) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = {
    path: `pdf/${gitHubInfo.name} userProfile.pdf`,
    format:'A4'
};
  await page.setContent(generatePdfContent(answers.color, gitHubInfo ));
  await page.screenshot({ path: 'screenshot/output.png' });
  await page.pdf(options);
  await browser.close();
}

module.exports.generatePdf = generatePdf;