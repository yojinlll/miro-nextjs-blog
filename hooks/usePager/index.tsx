import Link from "next/link";
import _ from "lodash"
import stylesClass from "./index.module.scss"

const sc = stylesClass

type UsePagerOptions = {
  page: number
  totalPage: number
  hrefMaker?: (n: number) => string
}

const defaultHrefMaker = (n: number) => `?page=${n}`

export const usePager = (options: UsePagerOptions) => {
  const { page, totalPage, hrefMaker } = options
  const _hrefMaker = hrefMaker || defaultHrefMaker

  const numbers = []
  numbers.push(1)
  numbers.push(totalPage)
  for (let i = page - 3; i <= page + 3; i++) {
    numbers.push(i)
  }
  const y = _.uniq(numbers)
    .sort((a, b) => a - b)
    .filter(n => n >= 1 && n <= totalPage)
    .reduce((result, n) => (
      n - (result[result.length - 1] || 0) === 1
        ? result.concat(n)
        : result.concat(-1, n)
    ), [])

  const pager = totalPage > 1 && (
    <div>
      {
        page > 1 && <Link href={_hrefMaker(page - 1)}><a>上一页</a></Link>
      }

      {
        y.map((i, idx) => {
          return <span key={idx} className={sc['pager-item']}>{
            i > 0
              ? <Link href={_hrefMaker(i)}><a>{i}</a></Link>
              : '...'
          }</span>
        })
      }

      {
        page < totalPage && <Link href={_hrefMaker(page + 1)}><a>下一页</a></Link>
      }

      <span style={{margin: '0 6px'}}>第 {page} 页</span>
    </div>
  )
  return { pager }
}