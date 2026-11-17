import rss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addFilter("dateDisplay", (d) =>
    new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date)
  );
  // Blog hidden for now: remove this line (and re-add the nav link/button) to bring it back.
  eleventyConfig.ignores.add("src/blog/**");
  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
