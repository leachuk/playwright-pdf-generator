/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const playwright = require('playwright');
const fs = require('fs');

const screenshotDir = './screenshots';

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

(async () => {
  const browser = await playwright['chromium'].launch();
  // set deviceScaleFactor = 2 to capture highres screenshot if mac display emulation is required.
  const context = await browser.newContext({
    viewport: {
      width: 1000,
      height: 600,
      deviceScaleFactor: 1,
    },
  });
  const page = await context.newPage();
  //await page.goto('https://www.swinburne.edu.au/study/life/why-choose-swinburne/');
  await page.setContent(`
    <h1>Sample HTML using setContent()</h1>
  `);

  await page.emulateMedia({type: 'screen'});
  await page.pdf({path: 'page.pdf', format: 'A4'});

  await browser.close();
})();
