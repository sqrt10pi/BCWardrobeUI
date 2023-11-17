const UglifyJS = require("uglify-js");
const fs = require("fs");

const entries = fs.readFileSync("./files.txt", "utf-8").split("\n").filter(Boolean);

const code = Object.fromEntries(entries.map(e => {
    return [e, fs.readFileSync(e, "utf-8")]
}))

var result = UglifyJS.minify(code/*, 
    { sourceMap: {
    filename: "render-char-to-data.js",
    url: "inline"
}}*/);

if (result.error) {
    console.log(result.error);
}

fs.writeFileSync("./dist/render-char-to-data.js", result.code);

console.log("done");