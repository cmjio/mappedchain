import * as chain from '../src/mappedchain'

test('test entry', () => {
  expect(chain).toBeTruthy()
  expect(typeof chain.mapper.create).toEqual('function')
  expect(typeof chain.create).toEqual('function')
})