import sleep from './sleep.js'

const eventually =
  async <T, U>(
    f: () => Promise<T>,
    {
      retry = _ => _ < 10,
      delay = 1000,
      predicate = _ => Boolean(_),
      reject = _ => { throw _ }
    }: {
      delay?: number,
      retry?: (n: number, duration: number) => boolean,
      predicate?: (value: T | U) => boolean,
      reject?: (err: unknown) => U
    } = {}
  ): Promise<T | U> => {
    const before = Date.now()
    let i = 0
    while (retry(i++, Date.now() - before)) {
      const r = await f().catch(reject)
      if (predicate(r)) {
        return r
      }
      await sleep(delay)
    }
    return reject(undefined)
  }

export default eventually
