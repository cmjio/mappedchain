const { create } = require('../src/mapper')

test('string alias', () => {
  const raw = {
    foo: 'bar'
  }
  const mapper = (alias) => {
    alias('string').to('foo')
  }

  mapper.source = 'test'

  const mapped = create(raw, mapper)

  expect(mapped).toBeTruthy()
  expect(mapped.string).toEqual(raw.foo)
})

test('function alias', () => {
  const raw = {
    foo: 'bar'
  }
  const mapper = (alias) => {
    alias('fn1').to((src) => src.foo)
    alias('fn2').to(() => 3)
    alias('fn3').to(function () { return this.fn1 })
  }

  mapper.source = 'test2'

  const mapped = create(raw, mapper)

  expect(mapped).toBeTruthy()
  expect(mapped.fn1).toEqual(raw.foo)
  expect(mapped.fn2).toEqual(3)
  expect(mapped.fn3).toEqual(mapped.fn1)
})
