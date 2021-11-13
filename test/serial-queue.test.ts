import * as A from '@prelude/array'
import * as Q from '../cjs/index.js'
import eventually from './eventually.js'
import sleep from './sleep.js'

test('simple', async () => {
  const xs: number[] = []
  const f =
    (x: number) =>
      sleep(Math.random() * 100).then(() => { xs.push(x) })
  const q = Q.of(f)
  for (let i = 0; i < 100; i++) {
    Q.push(q, i)
    await sleep(Math.random() * 10)
  }
  await eventually(async () => xs.length === 100)
  expect(xs).toEqual(A.indices(100))
}, 10 * 1000)
