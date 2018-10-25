'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var shallowequal = _interopDefault(require('shallowequal'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var StoreContext = React.createContext();

var isStateObj = function isStateObj(obj) {
  return obj !== null && _typeof(obj) === "object" && !Array.isArray(obj);
};

function useStore(mapState) {
  var store = React.useContext(StoreContext);

  var _useState = React.useState(mapState(store.getState())),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  React.useEffect(function () {
    var stateCache = state;
    return store.subscribe(function () {
      var updatedState = mapState(store.getState());

      if (updatedState === stateCache || isStateObj(updatedState) && isStateObj(stateCache) && shallowequal(updatedState, stateCache)) {
        return;
      }

      stateCache = updatedState;
      setState(updatedState);
    });
  }, []);
  return state;
}
function useAction(mapActions) {
  var store = React.useContext(StoreContext);
  return mapActions(store.dispatch);
}
var Provider = function Provider(_ref) {
  var children = _ref.children,
      store = _ref.store;
  return React__default.createElement(StoreContext.Provider, {
    value: store
  }, children);
};

exports.useStore = useStore;
exports.useAction = useAction;
exports.Provider = Provider;
