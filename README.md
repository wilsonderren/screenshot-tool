# Create a series of screenshots from a CSV file

This is a hopefully reasonably straightforward tool to create a page of screenshots from a list of URIs. We use it to help up mark student work. We need to check that sites are responsive, so we needed a way of taking multiple screenshots of the same site.

This tool has only been tested on a Mac. You will need to use the command line - [this is a good intro on how to do that](https://hellowebbooks.com/learn-command-line/) or I can also recommend the [codeacademy tutorial](https://www.codecademy.com/learn/learn-the-command-line).

## Installing the tool
There are probably better ways of doing this but this is way that worked for me. 

* You need to have [node and npm installed on your computer](https://treehouse.github.io/installation-guides/mac/node-mac.html).
* Download the zip file containing all these files from github. Unzip it and move it to the folder where you want to use the tool.
* Open terminal and navigate to the folder where all the files are located (you can type `cd` and drag and drop the folder from the finder and terminal will fill in the path). 
* Run `npm install` and the `package.json` file will install the dependencies.
* Everythings should now be ready to go. 

## Using the tool
* Most likely you'll be starting with a list in Excel. What the tool needs is a list of names and complete URIs (e.g. starting `http://` or `https://`). Save this list as a CSV, open it in visual studio code or another text editor, and add a line at the top with `name,url`. You also need to make sure that the file is saved with CRLF line endings (go to the bottom of visual studio code and click on `LF` - it should give you the choice to change this to `CRLF`.
* Open up screenshot.js and modify the viewport sizes if needed - at the moment it's set to a small mobile, a bigger mobile, a tablet and a desktop resolution.
* If you want to modify the way the screenshots are displayed, edit the CSS code you can see on the line starting `stream.write("<style>`
* Start your terminal and go to the folder where you installed the tool (again, if you need to, you can type `cd` and drag and drop the folder from the finder and terminal will fill in the path).
* Run `node screenshot.js` and the system will tell you what's going on.
* You should then see a folder starting `screenshots-` which will eventually have all the screenshots and an `index.html` file within it.
* Open or move that folder, then click on `index.html` - you should see all your screenshots.
