const SOURCE='https://at.adobe.com/gv3lVbZ60cJQBLlW';

export default async function handler(req,res){
  try{
    const r=await fetch(SOURCE,{redirect:'follow'});
    if(!r.ok){res.status(r.status).send('Greenscape source unavailable');return;}
    const html=await r.text();
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(html);
  }catch(e){
    console.error(e);
    res.status(500).send('Greenscape temporarily unavailable');
  }
}
