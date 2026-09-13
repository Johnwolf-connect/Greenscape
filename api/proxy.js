const SOURCES = {
  js: 'https://at.adobe.com/D1w0P5M9FTbaEkN6',
  css: 'https://at.adobe.com/68DOK9uY0sdVPWIM',
}

export default async function handler(req, res) {
  const kind = String(req.query.kind || '')
  const source = SOURCES[kind]

  if (!source) {
    res.status(404).send('Not found')
    return
  }

  try {
    const response = await fetch(source, { redirect: 'follow' })
    if (!response.ok) {
      res.status(response.status).send('Greenscape asset unavailable')
      return
    }

    const body = Buffer.from(await response.arrayBuffer())
    res.setHeader(
      'Content-Type',
      kind === 'css'
        ? 'text/css; charset=utf-8'
        : 'text/javascript; charset=utf-8',
    )
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400',
    )
    res.status(200).send(body)
  } catch (error) {
    console.error('Greenscape asset proxy error:', error)
    res.status(500).send('Greenscape asset temporarily unavailable')
  }
}
