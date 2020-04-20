import { create } from '../src/chain'
import * as mapper from '../src/mapper'

test('create chain', () => {

  const srcs = ['a', 'b', 'c']
  let i = 0;
  const models = new Array(3).fill(null).map((v, index, arr) => {
    v = i;
    const customMapper = (alias) => {
      alias('name').to('model_name')
      alias('uid').to('id')
      alias('original').to(() => arr)
      alias('index').to(() => v)
      alias('uidRef').to(() => this.uid)
    }

    customMapper.source = srcs[index];

    const o = {};
    o['model_name'] = 'model' + index;
    o['id'] = index;

    i += 1;

    return mapper.create(o, customMapper)
  })

  const chain = create(...models)

  expect(chain).toBeTruthy()
  expect(chain.get('name')).toEqual('model0')
  expect(chain.get('name', 'c')).toEqual('model2')
  expect(chain.get('name', ['b', 'c'])).toEqual('model1')
  expect(chain.get('index', ['c'])).toEqual(2)
})