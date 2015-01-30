Package.describe({
  name: 'anonyfox:tags',
  version: '0.0.3',
  summary: 'Extract relevant tags from any text string. Works in the client and on the server.',
  git: 'https://github.com/Anonyfox/meteor-tags.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  // api.addFiles('anonyfox:tags.js');
  api.use(['coffeescript','underscore'],['client','server']);
  api.addFiles([
	  'stopwords/stopwords_de.coffee',
	  'stopwords/stopwords_en.coffee',
	  'tags.coffee.md',
	  'globals.js'
  ],['client','server']);
  api.export('Tags', ['client','server'])
});

Package.onTest(function(api) {
  api.use(['tinytest','coffeescript','underscore'],['client','server']);
  api.addFiles([
	  'stopwords/stopwords_de.coffee',
	  'stopwords/stopwords_en.coffee',
	  'porter-stemmer.js',
	  'tags.coffee.md',
	  'globals.js'
  ],['client','server']);
  api.addFiles('tests.coffee');
});
