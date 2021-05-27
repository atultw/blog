const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addCollection("post", function(collection) {
        return collection.getFilteredByGlob("src/**/*.md");
    });    
    
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy("src/img");



    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy");
    });

    return {
        dir: {
            input: "src",
            output: "pub"
        }
    }
};