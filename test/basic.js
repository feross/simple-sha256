var sha256 = require('../')
var test = require('tape')

const TEXT = 'hey there'
const HASH = '74ef874a9fa69a86e091ea6dc2668047d7e102d518bebed19f8a3958f664e3da'

test('sha256', function (t) {
  t.plan(2)

  // buffer
  sha256(Buffer.from(TEXT)).then(hash => {
    t.equal(hash, HASH)
  })
  // string
  sha256(TEXT).then(hash => {
    t.equal(hash, HASH)
  })
})

test('sha256.sync', function (t) {
  if (process.browser) {
    t.pass('skipping in browser')
    return t.end()
  }

  // buffer
  t.equal(sha256.sync(Buffer.from(TEXT)), HASH)
  // string
  t.equal(sha256.sync(TEXT), HASH)

  t.end()
})
