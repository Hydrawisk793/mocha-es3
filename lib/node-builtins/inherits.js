// The ISC License
//
// Copyright (c) Isaac Z. Schlueter
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
// LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
// OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
// PERFORMANCE OF THIS SOFTWARE.

// Copied from `inherits`. (https://github.com/isaacs/inherits.git)

if (_isObjectCreateFullySupported()) {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        })
      }
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor
        var TempCtor = function () {}
        TempCtor.prototype = superCtor.prototype
        ctor.prototype = new TempCtor()
        ctor.prototype.constructor = ctor
      }
    }
  }
  
  function _isObjectCreateFullySupported()
  {
    var ctx = {
      create : void 0
    };
  
    var create = Object.create;
    if(!("result" in ctx) || ctx.create !== create)
    {
      ctx.create = create;
      ctx.result = (function ()
      {
        var result = true;
  
        try
        {
          ctx.create.call(Object, {}, {
            a : {
              value : function () {},
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
        catch(error)
        {
          result = false;
        }
  
        return result;
      })();
    }
  
    return ctx.result;
  }