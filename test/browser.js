// These tests are not run on node versions prior to 14, as they lack webcrypto.

const crypto = require('crypto')

if (!globalThis.crypto) {
  globalThis.crypto = crypto
}

const sha256 = require('../browser')
const test = require('tape')

if (globalThis.crypto.webcrypto) {
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
    t.throws(function () {
      sha256.sync(Buffer.from(TEXT))
    }, /No support for sha256\.sync\(\) in the browser, use sha256\(\)/)

    t.end()
  })
}
