import type { SerialQueue } from './prelude.js'

const next =
  <Args extends unknown[], R>(queue: SerialQueue<Args, R>): void => {
    const { f } = queue
    const { resolve, reject, args } = queue.entries[0]
    f(...args)
      .then(resolve)
      .catch(reject)
      .finally(() => (
        queue.entries.shift() && queue.entries.length > 0 ?
          next(queue) :
          queue.drained?.()
      ))
  }

export default next
