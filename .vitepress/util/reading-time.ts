const WORDS_PER_MINUTE = 200

export const estimateReadingTime = function(content: string) {
  const segmenter = new Intl.Segmenter('en-EN', { granularity: 'word' })
  const wordCount = Array.from(new Set(segmenter.segment(content)))
    .filter(it => it.isWordLike)
    .length
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE)
  return readingTime
}