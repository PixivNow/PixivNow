import { VercelRequest, VercelResponse } from '@vercel/node'
import cheerio from 'cheerio'
import { handleError, replaceUrl, request } from '../utils'

export default async (req: VercelRequest, res: VercelResponse) => {
  const token = req.cookies.PHPSESSID || req.query.token
  if (!token) {
    return res.status(403).send({ message: '未配置用户密钥' })
  }

  request('get', '/', req.query, req.headers)
    .then(({ data }) => {
      const $ = cheerio.load(data)
      const $meta = $('#meta-global-data')
      if ($meta.length < 0 || !$meta.attr('content')) {
        return res.status(403).send({ message: '无效的用户密钥' })
      }
      try {
        const meta = typeof $meta.attr('content') === 'object'
          ? $meta.attr('content')?.userData
          : JSON.parse($meta.attr('content') as string)?.userData
        if (meta) {
          return res.send(replaceUrl(meta))
        }
        throw ''
      } catch (e) {
        throw { message: '意料外的元数据' }
      }
    })
    .catch((err) => {
      return handleError(err, res)
    })
}
