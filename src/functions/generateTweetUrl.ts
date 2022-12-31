export const generateTweetUrl = (text: string): string => {
  const url = new URL('https://twitter.com/intent/tweet')
  url.searchParams.set('text', text)
  url.searchParams.set('hashtags', encodeURI('absolute_tempo'))
  url.searchParams.set('url', encodeURI(window.location.href))

  return url.toString()
}
