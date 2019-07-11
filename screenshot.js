// we need npm install csv-parser
// we need npm install fs
// we need npm install slugify
// we need npm install puppeteer
// create package.json

// edit these to suit your requirements
// the CSV file must start with the names of the fields

const csv_filename = 'list-of-urls.csv';

var screensizes = {
    phone: { width: 320, height: 480, type: 'mobile' },
    bigphone: { width: 375, height: 812, type: 'mobile' },
    tablet: { width: 768, height: 1024, type: 'mobile' },
    desktop: { width: 1368, height: 768, type: 'desktop' }
};

// load dependencies
const csv = require('csv-parser');
const fs = require('fs');
const slugify = require('slugify');
const puppeteer = require('puppeteer');
process.setMaxListeners(Infinity); // this is probably a bad idea but it works

// create the folder date and time string
var runtime = new Date().toISOString().slice(0, 19);
runtime = runtime.replace("T", "-");
runtime = runtime.replace(/:/g, "-");


console.log("Starting to take screenshots now");
console.log("--------------------------------");

// take the screenshots
async function getScreenshot(browser_width, browser_height, browser_condition, browser_url, screenshot_filename) {

    var isMobile_test = false;
    if (browser_condition == "mobile") { isMobile_test = true; }
    let browser = await puppeteer.launch({ headless: true });
    let page = await browser.newPage();
    await page.setViewport({
        width: browser_width,
        height: browser_height,
        isMobile: isMobile_test
    });
    await page.goto(browser_url);

    await page.screenshot({ path: "screenshots-" + runtime + "/" + screenshot_filename + '.png', type: 'png' });
    await page.close();
    await browser.close();

}


fs.mkdirSync("screenshots-" + runtime);
var stream = fs.createWriteStream("screenshots-" + runtime + "/index.html");

stream.once('open', function(fd) {

    var start = new Date().toISOString().slice(0, 10);

    stream.write("<!DOCTYPE html><html><head><title>Screenshots taken " + start + "</title>");

    // this is the styling for the HTML output

    stream.write("<style>html { box-sizing: border-box; } *, *:before, *:after { box-sizing: inherit; }body {font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"; color: #333; margin: 2rem; display:flex; flex-wrap:wrap; background: #eee; gap:1%;} .shot {flex: 0 0 31%; background: #fff; padding: 1rem; } .shot h2 {margin:0; padding:0.2rem 0 1rem 0;  font-size: 1rem;} .shot a {text-decoration:none; color: #333;} .size {} .size h3 {font-weight:bold; margin:0; padding: 0.5rem 0 0.5rem 0; color:red; font-weight: 700; font-size: 1rem;} .size img {display:block; margin-bottom: 3rem; box-shadow: 0 0 2px rgba(0,0,0,0.2);} img {max-width: 100%; height: auto;} </style>");

    stream.write("</head><body>");

    // run through our CSV file

    fs.createReadStream(csv_filename)
        .pipe(csv())
        .on('data', (row) => {

            // take all the screenshots for each row

            console.log("Working on " + row.name);
            stream.write("\r\n<div class=\"shot\"><a href=\"" + row.url + "\"><h2>" + row.name + "</h2>");
            Object.keys(screensizes).forEach(key => {

                var screenshot_filename = slugify(row.name, { lower: true }) + "-" + screensizes[key].width + "x" + screensizes[key].height;

                getScreenshot(screensizes[key].width, screensizes[key].height, screensizes[key].type, row.url, screenshot_filename);
                stream.write("\r\n<div class=\"size\"><h3>" + screensizes[key].width + " &#215; " + screensizes[key].height + "</h3><img src=\"" + screenshot_filename + ".png\" /></div>");
            });


            stream.write("</a></div>");

        })
        .on('end', () => {
            stream.write("</body></html>");
            stream.end();

            // finish making the html file and let people know it's finished

            console.log("--------------------------------");
            console.log("CSV file successfully processed.\r\nThere should be a folder called \'screenshots-" + runtime + "\' and a HTML index.html file to view the screenshots in this folder.\r\nOpen index.html in a web browser, ideally Firefox Developer Edition.");
        });
});