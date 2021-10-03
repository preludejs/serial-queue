import * as A from '@prelude/array'
import * as F from '@prelude/function'
import * as Q from '../index.js'

test('simple', async () => {
  const xs: number[] = []
  const f =
    (x: number) =>
      F.sleep(Math.random() * 100).then(() => { xs.push(x) })
  const q = Q.of(f)
  for (let i = 0; i < 100; i++) {
    Q.push(q, i)
    await F.sleep(Math.random() * 10)
  }
  await F.eventually(async () => xs.length === 100)
  expect(xs).toEqual(A.indices(100))
}, 10 * 1000)
