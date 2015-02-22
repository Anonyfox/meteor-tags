# anonyfox:tags

A fast approach to extract relevant tags from any text string. Works on the client and on the server.

## installation

`meteor add anonyfox:tags`

## usage

The first and most common usecase: extract relevant keywords from any given text, aka *auto-tagging*:

`tagsArray = Tags.findFrom "a text string of any length and format"`

There is also a special usecase for when you have already an array of keywords/tags, but are unsure
if the quality of these tags are good enough:

`goodTags = Tags.clean questionableTags`

Finally, there is also a neat helper when you just need to split a string (e.g. user searchfield input)
into an array of words and want to remove junk:

`inputWords = Tags.split ""`

The Code is written in literate coffeescript, so feel free to browse the sourcecode directly here on
github in a nicely formatted manner :)

## ToDo

- [ ] Instead of transferring the heavy stopword-lists to the client, proxy client requests through
  a server method
- [ ] improve the algorithm to find multi-word phrases instead of just single words
- [ ] refactor the source code to improve readability and performance even further
- [ ] Add more test cases to ensure quality and enable better collaboration

## License

This code is licenced under the LGPL 3.0. Do whatever you want with this code, but I'd like to
get improvements and bugfixes back.