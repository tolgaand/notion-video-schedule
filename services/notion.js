require("dotenv").config();
const { Client } = require("@notionhq/client");

// Init Client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

module.exports = async function getVideos() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };
  const { results } = await notion.request(payload);

  const videos = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.Date.date.start,
      description: page.properties.Description.rich_text[0].text.content,
      tags: page.properties.Tags.rich_text[0].text.content,
      img: page.properties.img.files[0].name,
    };
  });
  return videos;
};
