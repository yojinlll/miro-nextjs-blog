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
    <div className={sc['pager']}>
      {
        page > 1 ? <Link href={_hrefMaker(page - 1)}><a>上一页</a></Link> : <span className={sc['unactive']}>上一页</span>
      }

      <span className={sc['pager-link-list']}>
        {
          y.map((i, idx) => {
            return <span key={idx} className={sc['pager-item']}>{
              i > 0
                ? <Link href={_hrefMaker(i)}><a className={sc[i === page && 'pager-active']}>{i}</a></Link>
                : '...'
            }</span>
          })
        }
      </span>

      {
        page < totalPage ? <Link href={_hrefMaker(page + 1)}><a>下一页</a></Link> : <span className={sc['unactive']}>下一页</span>
      }

      <span style={{marginLeft: '24px'}}>第 {page} 页</span>
    </div>
  )
  return { pager }
}