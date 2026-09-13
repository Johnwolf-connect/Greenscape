const GREENSCAPE_BUNDLE_URL = 'https://at.adobe.com/14FDFKdh1ZJdtOu0'

export default async function handler(req, res) {
  try {
    const response = await fetch(GREENSCAPE_BUNDLE_URL, { redirect: 'follow' })
    if (!response.ok) {
      res.status(response.status).send('GreenScape bundle unavailable')
      return
    }

    const html = await response.text()
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).send(html)
  } catch (error) {
    console.error('GreenScape proxy error:', error)
    res.status(500).send('GreenScape temporarily unavailable')
  }
}
