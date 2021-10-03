import type { SerialQueue } from './prelude.js'
import next from './next.js'

export const push =
  <Args extends unknown[], R>(queue: SerialQueue<Args, R>, ...args: Args): Promise<R> =>
    new Promise<R>((resolve, reject) => (
      queue.entries.push({ resolve, reject, args }) === 1 ?
        next(queue) :
        undefined
    ))

export default push
