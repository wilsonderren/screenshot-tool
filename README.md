# Create a series of screenshots from a CSV file

This is a hopefully reasonably straightforward tool to create a page of screenshots from a list of URIs. We use it to help up mark student work. We need to check that sites are responsive, so we needed a way of taking multiple screenshots of the same site.

## Installing the tool


## Using the tool
* Most likely you'll be starting with a list in Excel. What the tool needs is a list of names and complete URIs (e.g. starting `http://` or `https://`). Save this list as a CSV, open it in visual studio code or another text editor, and add a line at the top with `name,url`. You also need to make sure that the file is saved with CRLF line endings (go to the bottom of visual studio code and click on `LF` - it should give you the choice to change this to `CRLF`.
* Open up screenshot.js and modify the viewport sizes if needed - at the moment it's set to a small mobile, a bigger mobile, a tablet and a desktop resolution.
* If you want to modify the way the screenshots are displayed, edit the CSS code you can see on the line starting `stream.write("<style>`
* Start your terminal and go to the folder where you installed the tool (you can type cd and drag and drop the folder from the finder and terminal will fill in the path).
* Run `node screenshot.js` and the system will tell you what's going on.
* You should then see a folder starting `screenshots-` which will eventually have all the screenshots and an `index.html` file within it.
* Open or move that folder, then click on `index.html` - you should see all your screenshots.
