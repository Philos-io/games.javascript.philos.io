/**
 * Adopted from https://github.com/facebook/flux/blob/e0a52d0dada7b78e7197026dc8cf35d84991f0e8/examples/flux-todomvc/js/dispatcher/__tests__/AppDispatcher-test.js
 */

/**
 *  Copyright (c) 2014-2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

jest.autoMockOff()

import { dispatcher } from '../Dispatcher'

describe('Dispatcher', () => {
  it('sends actions to subscribers', () => {
    var listener = jest.genMockFunction()
    dispatcher.register(listener)

    var payload = {}
    dispatcher.dispatch(payload)
    expect(listener.mock.calls.length).toBe(1)
    expect(listener.mock.calls[0][0]).toBe(payload)
  })

  it('waits with chained dependencies properly', () => {
    var payload = {}

    var listener1Done = false
    var listener1 = function(pl) {
      dispatcher.waitFor([index2, index4])
      // Second, third, and fourth listeners should have now been called
      expect(listener2Done).toBe(true)
      expect(listener3Done).toBe(true)
      expect(listener4Done).toBe(true)
      listener1Done = true
    }
    var index1 = dispatcher.register(listener1)

    var listener2Done = false
    var listener2 = function(pl) {
      dispatcher.waitFor([index3])
      expect(listener3Done).toBe(true)
      listener2Done = true
    }
    var index2 = dispatcher.register(listener2)

    var listener3Done = false
    var listener3 = function(pl) {
      listener3Done = true
    }
    var index3 = dispatcher.register(listener3)

    var listener4Done = false
    var listener4 = function(pl) {
      dispatcher.waitFor([index3])
      expect(listener3Done).toBe(true)
      listener4Done = true
    }
    var index4 = dispatcher.register(listener4)

    runs(() => {
      dispatcher.dispatch(payload)
    })

    waitsFor(() => {
      return listener1Done
    }, 'Not all subscribers were properly called', 500)

    runs(() => {
      expect(listener1Done).toBe(true)
      expect(listener2Done).toBe(true)
      expect(listener3Done).toBe(true)
    })
  })
})