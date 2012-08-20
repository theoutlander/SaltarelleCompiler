//! Script# Core Runtime
//! More information at http://projects.nikhilk.net/ScriptSharp
//!

(function () {
  var globals = {
    version: '0.7.4.0',

    isUndefined: function (o) {
      return (o === undefined);
    },

    isNull: function (o) {
      return (o === null);
    },

    isNullOrUndefined: function (o) {
      return (o === null) || (o === undefined);
    },

    isValue: function (o) {
      return (o !== null) && (o !== undefined);
    },

    referenceEquals: function (a, b) {
      return ss.isValue(a) ? a === b : !ss.isValue(b);
    }
  };

  var started = false;
  var startCallbacks = [];

  function onStartup(cb) {
    startCallbacks ? startCallbacks.push(cb) : setTimeout(cb, 0);
  }
  function startup() {
    if (startCallbacks) {
      var callbacks = startCallbacks;
      startCallbacks = null;
      for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i]();
      }
    }
  }
  if (document.addEventListener) {
    document.readyState == 'complete' ? startup() : document.addEventListener('DOMContentLoaded', startup, false);
  }
  else if (window.attachEvent) {
    window.attachEvent('onload', function () {
      startup();
    });
  }

  var ss = window.ss;
  if (!ss) {
    window.ss = ss = {
      init: onStartup,
      ready: onStartup
    };
  }
  for (var n in globals) {
    ss[n] = globals[n];
  }
  if (window && !window.Element) {
    window.Element = function() {
    };
    window.Element.isInstanceOfType = function(instance) { return instance && typeof instance.constructor === 'undefined' && typeof instance.tagName === 'string'; };
  }
})();

#include "TypeSystem\Type.js"

#include "Extensions\Object.js"

#include "Extensions\Boolean.js"

#include "Extensions\Number.js"

#include "Extensions\String.js"

#include "Extensions\Array.js"

#include "Extensions\RegExp.js"

#include "Extensions\Date.js"

#include "Extensions\Error.js"

#include "Extensions\Function.js"

#include "BCL\Debug.js"

#include "BCL\Enum.js"

#include "BCL\CultureInfo.js"

#include "BCL\IEnumerator.js"

#include "BCL\IEnumerable.js"

#include "BCL\ICollection.js"

#include "BCL\Nullable.js"

#include "BCL\IList.js"

#include "BCL\IDictionary.js"

#include "BCL\Int32.js"

#include "BCL\MutableDateTime.js"

#include "BCL\ArrayEnumerator.js"

#include "BCL\ObjectEnumerator.js"

#include "BCL\Dictionary.js"

#include "BCL\IDisposable.js"

#include "BCL\StringBuilder.js"

#include "BCL\EventArgs.js"

#include "BCL\Exception.js"

#include "BCL\IteratorBlockEnumerable.js"

#include "BCL\IteratorBlockEnumerator.js"

///////////////////////////////////////////////////////////////////////////////
// XMLHttpRequest and XML parsing helpers

if (!window.XMLHttpRequest) {
  window.XMLHttpRequest = function() {
    var progIDs = [ 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ];

    for (var i = 0; i < progIDs.length; i++) {
      try {
        var xmlHttp = new ActiveXObject(progIDs[i]);
        return xmlHttp;
      }
      catch (ex) {
      }
    }

    return null;
  }
}

ss.parseXml = function(markup) {
  try {
    if (DOMParser) {
      var domParser = new DOMParser();
      return domParser.parseFromString(markup, 'text/xml');
    }
    else {
      var progIDs = [ 'Msxml2.DOMDocument.3.0', 'Msxml2.DOMDocument' ];
        
      for (var i = 0; i < progIDs.length; i++) {
        var xmlDOM = new ActiveXObject(progIDs[i]);
        xmlDOM.async = false;
        xmlDOM.loadXML(markup);
        xmlDOM.setProperty('SelectionLanguage', 'XPath');
                
        return xmlDOM;
      }
    }
  }
  catch (ex) {
  }

  return null;
}

#include "BCL\CancelEventArgs.js"

#include "BCL\Observable.js"

#include "BCL\App.js"
