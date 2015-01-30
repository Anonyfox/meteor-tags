# Tagger
This module has only one thing to do: get a text string, and return some important keywords, aka "tags".

    @Tags =
      findFrom: (str, excludes) ->
        cleanData(pickResults(analyze(cleanStringData(str, excludes))), excludes)
      clean: (tags, excludes) -> cleanData tags, excludes
      split: (str) -> cleanStringData str

The StopWords are provided externally as list objects. We initialize them once for further usage on application startup in the client.

    stopwords = _.union _.values(StopWords)...

Transform any string in a clean array of words.

    cleanStringData = (str, excludes) ->
      ary = str.toLowerCase().
        replace(/[^\w\u00e4\u00f6\u00fc\u00df]/g, " "). # unicode for äöüß
        replace(/\s{2,}/g, " ") # compress whitespace
        .split(" ")
      if excludes?.length
        rx = _.map excludes, (e) -> new RegExp(e, "i")
        ary = _.reject ary, (t) -> _.some (r.test t for r in rx)
      _.without(ary, stopwords...)

Analyze an array of words for occurance statistics. For better results, porter-stemmer is applied on every word internally. Returns a dictionary object of the form: `{'stem': {words: ['w1','w2'], hits: ['w1','w2']}}`.

    analyze = (ary) ->
      dictionary = {}
      for word in ary
        stem = stemmer word
        if dictionary[stem]
          unless _.contains dictionary[stem].words, word
            dictionary[stem].words.push word
          dictionary[stem].hits += 1
        else
          dictionary[stem] = {words: [word], hits: 1}
      return dictionary

Choose the best results out of a dictionary object and returns an array of words (aka: tags).

    pickResults = (dictionary) ->
      totalWords = _.flatten _.map _.values(dictionary), (v) -> v.words
      sum = totalWords.length
      tags = []
      constraint = switch
        when sum <= 30 then 0
        when sum <= 100 then 1
        when sum <= 250 then 2
        when sum <= 500 then 3
        when sum <= 1000 then 4
        when sum <= 2500 then 6
        when sum <= 5000 then 8
        when sum <= 10000 then 12
        else 15
      for k,v of dictionary when v.hits > constraint and k.length > 1
        # several options available: pick one!
        # tags.push word for word in v.words # all words of a stem
        tags.push _.min v.words, (w) -> w.length # the shortest word of a stem
        # tags.push k # the stem itself
      return tags

A simple function that cleans up an array of words.

    cleanData = (ary, excludes) ->
      list = []
      for word in ary
        if /\s/.test word
          list.push w for w in word.split /\s/
        else
          list.push word
      tags = _.uniq _.compact _.filter list, (t) ->
        (t.length > 1) and
        (t.length < 30) and
        ($.trim(t.replace(/\d+/gi,"")).length > 1)
      tags = _.map tags, (t) -> t.toLowerCase()
      tags = _.without(tags, stopwords...)
      if excludes?.length
        rx = _.map excludes, (e) -> new RegExp(e, "i")
        tags = _.reject tags, (t) -> _.some (r.test t for r in rx)
      return tags
