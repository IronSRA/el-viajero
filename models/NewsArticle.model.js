const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsArticleSchema = new Schema({
  title: String,
  description: String,
  url_to_image: String,
  url: String,
  published_at: String,
  source_name: String,
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', newsArticleSchema);
module.exports = Article;