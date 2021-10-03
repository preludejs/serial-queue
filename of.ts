import type { SerialQueue } from './prelude.js'

export const of =
  <Args extends unknown[], R>(
    f: (...args: Args) => Promise<R>,
    { drained }: {
      drained?: () => void
    } = {}
  ): SerialQueue<Args, R> => ({
    f,
    entries: [],
    drained
  })

export default of
