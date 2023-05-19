"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/utils/proxyLazy.ts
  function proxyLazy(factory) {
    const dummy = function() {
      return void 0;
    };
    dummy[factorySymbol] = function() {
      return dummy[cacheSymbol] ??= factory();
    };
    return new Proxy(dummy, lazyHandler);
  }
  var factorySymbol, cacheSymbol, unconfigurable, isUnconfigurable, lazyHandler;
  var init_proxyLazy = __esm({
    "src/utils/proxyLazy.ts"() {
      "use strict";
      factorySymbol = Symbol("lazyFactory");
      cacheSymbol = Symbol("lazyCache");
      unconfigurable = [
        "arguments",
        "caller",
        "prototype"
      ];
      isUnconfigurable = function(key) {
        return typeof key === "string" && unconfigurable.includes(key);
      };
      lazyHandler = {
        ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(fnName) {
          return [
            fnName,
            function(target) {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              return Reflect[fnName](target[factorySymbol](), ...args);
            }
          ];
        })),
        ownKeys: function(target) {
          const cacheKeys = Reflect.ownKeys(target[factorySymbol]());
          unconfigurable.forEach(function(key) {
            return isUnconfigurable(key) && cacheKeys.push(key);
          });
          return cacheKeys;
        },
        getOwnPropertyDescriptor: function(target, p) {
          if (isUnconfigurable(p))
            return Reflect.getOwnPropertyDescriptor(target, p);
          const descriptor = Reflect.getOwnPropertyDescriptor(target[factorySymbol](), p);
          if (descriptor)
            Object.defineProperty(target, p, descriptor);
          return descriptor;
        }
      };
    }
  });

  // node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/shared.js
  var patchTypes, patchedObjects;
  var init_shared = __esm({
    "node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/shared.js"() {
      patchTypes = [
        "a",
        "b",
        "i"
      ];
      patchedObjects = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/hook.js
  function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
    const patch = patchedObjects.get(funcParent)?.[funcName];
    if (!patch)
      return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
    for (const hook of patch.b.values()) {
      const maybefuncArgs = hook.call(ctxt, funcArgs);
      if (Array.isArray(maybefuncArgs))
        funcArgs = maybefuncArgs;
    }
    let insteadPatchedFunc = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args);
    };
    for (const callback of patch.i.values()) {
      const oldPatchFunc = insteadPatchedFunc;
      insteadPatchedFunc = function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return callback.call(ctxt, args, oldPatchFunc);
      };
    }
    let workingRetVal = insteadPatchedFunc(...funcArgs);
    for (const hook of patch.a.values())
      workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
    return workingRetVal;
  }
  var init_hook = __esm({
    "node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/hook.js"() {
      init_shared();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/unpatch.js
  function unpatch(funcParent, funcName, hookId, type) {
    const patchedObject = patchedObjects.get(funcParent);
    const patch = patchedObject?.[funcName];
    if (!patch?.[type].has(hookId))
      return false;
    patch[type].delete(hookId);
    if (patchTypes.every(function(t) {
      return patch[t].size === 0;
    })) {
      const success = Reflect.defineProperty(funcParent, funcName, {
        value: patch.o,
        writable: true,
        configurable: true
      });
      if (!success)
        funcParent[funcName] = patch.o;
      delete patchedObject[funcName];
    }
    if (Object.keys(patchedObject).length == 0)
      patchedObjects.delete(funcParent);
    return true;
  }
  var init_unpatch = __esm({
    "node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/unpatch.js"() {
      init_shared();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/getPatchFunc.js
  function getPatchFunc_default(patchType) {
    return function(funcName, funcParent, callback) {
      let oneTime = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (typeof funcParent[funcName] !== "function")
        throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
      if (!patchedObjects.has(funcParent))
        patchedObjects.set(funcParent, {});
      const parentInjections = patchedObjects.get(funcParent);
      if (!parentInjections[funcName]) {
        const origFunc = funcParent[funcName];
        parentInjections[funcName] = {
          o: origFunc,
          b: /* @__PURE__ */ new Map(),
          i: /* @__PURE__ */ new Map(),
          a: /* @__PURE__ */ new Map()
        };
        const runHook = function(ctxt, args, construct) {
          const ret = hook_default(funcName, funcParent, args, ctxt, construct);
          if (oneTime)
            unpatchThisPatch();
          return ret;
        };
        const replaceProxy = new Proxy(origFunc, {
          apply: function(_, ctxt, args) {
            return runHook(ctxt, args, false);
          },
          construct: function(_, args) {
            return runHook(origFunc, args, true);
          },
          get: function(target, prop, receiver) {
            return prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver);
          }
        });
        const success = Reflect.defineProperty(funcParent, funcName, {
          value: replaceProxy,
          configurable: true,
          writable: true
        });
        if (!success)
          funcParent[funcName] = replaceProxy;
      }
      const hookId = Symbol();
      const unpatchThisPatch = function() {
        return unpatch(funcParent, funcName, hookId, patchType);
      };
      parentInjections[funcName][patchType].set(hookId, callback);
      return unpatchThisPatch;
    };
  }
  var init_getPatchFunc = __esm({
    "node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/getPatchFunc.js"() {
      init_hook();
      init_shared();
      init_unpatch();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/index.js
  var before, instead, after;
  var init_esm = __esm({
    "node_modules/.pnpm/spitroast@1.4.2/node_modules/spitroast/dist/esm/index.js"() {
      init_getPatchFunc();
      init_unpatch();
      before = getPatchFunc_default("b");
      instead = getPatchFunc_default("i");
      after = getPatchFunc_default("a");
    }
  });

  // src/metro/common.ts
  var common_exports = {};
  __export(common_exports, {
    AssetManager: () => AssetManager,
    Colors: () => Colors,
    Constants: () => Constants,
    FluxDispatcher: () => FluxDispatcher,
    Forms: () => Forms,
    I18n: () => I18n,
    NavigationNative: () => NavigationNative,
    Styles: () => Styles
  });
  var AssetManager, I18n, Forms, NavigationNative, Styles, Colors, Constants, FluxDispatcher;
  var init_common = __esm({
    "src/metro/common.ts"() {
      "use strict";
      init_metro();
      AssetManager = findByProps("getAssetByID");
      I18n = findByPropsLazy("Messages");
      Forms = findByPropsLazy("FormSection");
      NavigationNative = findByPropsLazy("NavigationContainer");
      Styles = findByPropsLazy("createThemedStyleSheet");
      Colors = findByPropsLazy("unsafe_rawColors");
      Constants = findByPropsLazy("NODE_SIZE");
      FluxDispatcher = findByPropsLazy("dispatch", "subscribe");
    }
  });

  // src/metro/index.ts
  var metro_exports = {};
  __export(metro_exports, {
    common: () => common_exports,
    factoryCallbacks: () => factoryCallbacks,
    findByDisplayName: () => findByDisplayName,
    findByDisplayNameLazy: () => findByDisplayNameLazy,
    findByName: () => findByName,
    findByNameLazy: () => findByNameLazy,
    findByProps: () => findByProps,
    findByPropsLazy: () => findByPropsLazy,
    findByStoreName: () => findByStoreName,
    findByStoreNameLazy: () => findByStoreNameLazy,
    findInitializedModule: () => findInitializedModule,
    findLazy: () => findLazy,
    getInitializedModules: () => getInitializedModules,
    initMetro: () => initMetro,
    ready: () => ready,
    waitForModule: () => waitForModule
  });
  function isInvalidExport(exports) {
    return exports == null || exports === globalThis || typeof exports === "boolean" || typeof exports === "number" || typeof exports === "string" || exports["whar???"] === null;
  }
  function blacklist(id) {
    Object.defineProperty(modules, id, {
      value: modules[id],
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  function initMetro() {
    for (const id in modules) {
      const module = modules[id];
      if (module.factory) {
        after("factory", module, function(param) {
          let { 5: exports } = param;
          if (isInvalidExport(exports))
            return;
          factoryCallbacks.forEach(function(cb) {
            return cb(exports);
          });
        }, true);
      }
    }
    waitForModule(function(m) {
      return m?.dispatch && m._actionHandlers?._orderedActionHandlers;
    }, function(FluxDispatcher2) {
      FluxDispatcher2.subscribe("CONNECTION_OPEN", function() {
        if (!_isReady) {
          _resolveReady();
          _isReady = true;
        }
      });
    });
  }
  function* getInitializedModules() {
    for (const id in modules) {
      if (modules[id].isInitialized) {
        if (isInvalidExport(modules[id].publicModule.exports)) {
          blacklist(id);
          continue;
        }
        yield modules[id].publicModule;
      }
    }
  }
  function waitForModule(filter, callback) {
    const matches = function(exports) {
      if (exports.default && exports.__esModule && filter(exports.default)) {
        factoryCallbacks.delete(matches);
        callback(exports.default);
      }
      if (filter(exports)) {
        factoryCallbacks.delete(matches);
        callback(exports);
      }
    };
    factoryCallbacks.add(matches);
    return function() {
      return factoryCallbacks.delete(matches);
    };
  }
  function findInitializedModule(filter) {
    let returnDefault = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    for (const { exports } of getInitializedModules()) {
      if (exports?.default && exports.__esModule && filter(exports.default)) {
        return returnDefault ? exports.default : exports;
      }
      if (filter(exports)) {
        return exports;
      }
    }
  }
  function findLazy(filter) {
    let returnDefault = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return proxyLazy(function() {
      return findInitializedModule(filter, returnDefault);
    });
  }
  function findByProps() {
    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }
    return findInitializedModule(function(m) {
      return props.every(function(prop) {
        return m?.[prop];
      });
    });
  }
  function findByPropsLazy() {
    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }
    return proxyLazy(function() {
      return findByProps(...props);
    });
  }
  function findByName(name) {
    let defaultExport = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return findInitializedModule(function(m) {
      return m?.name === name;
    }, defaultExport);
  }
  function findByNameLazy(name) {
    let defaultExport = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return proxyLazy(function() {
      return findByName(name, defaultExport);
    });
  }
  function findByDisplayName(displayName) {
    let defaultExport = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return findInitializedModule(function(m) {
      return m?.displayName === displayName;
    }, defaultExport);
  }
  function findByDisplayNameLazy(displayName) {
    let defaultExport = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return proxyLazy(function() {
      return findByDisplayName(displayName, defaultExport);
    });
  }
  function findByStoreName(storeName) {
    return findInitializedModule(function(m) {
      return m?.getName?.() === storeName;
    });
  }
  function findByStoreNameLazy(storeName) {
    return proxyLazy(function() {
      return findByStoreName(storeName);
    });
  }
  var factoryCallbacks, _isReady, _resolveReady, ready;
  var init_metro = __esm({
    "src/metro/index.ts"() {
      "use strict";
      init_proxyLazy();
      init_esm();
      init_common();
      factoryCallbacks = /* @__PURE__ */ new Set();
      _isReady = false;
      ready = new Promise(function(resolve) {
        return _resolveReady = resolve;
      });
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers/esm/_class_call_check.js
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor))
      throw new TypeError("Cannot call a class as a function");
  }
  var init_class_call_check = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers/esm/_class_call_check.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers/esm/_create_class.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var init_create_class = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers/esm/_create_class.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers/esm/_define_property.js
  function _define_property(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else
      obj[key] = value;
    return obj;
  }
  var init_define_property = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.1/node_modules/@swc/helpers/esm/_define_property.js"() {
    }
  });

  // node_modules/.pnpm/observable-slim@0.1.6/node_modules/observable-slim/observable-slim.js
  var require_observable_slim = __commonJS({
    "node_modules/.pnpm/observable-slim@0.1.6/node_modules/observable-slim/observable-slim.js"(exports, module) {
      var ObservableSlim2 = function() {
        var paths = [];
        var observables = [];
        var targets = [];
        var targetsProxy = [];
        var dupProxy = null;
        var _getProperty = function(obj, path) {
          return path.split(".").reduce(function(prev, curr) {
            return prev ? prev[curr] : void 0;
          }, obj || self);
        };
        var _create = function(target, domDelay, originalObservable, originalPath) {
          var observable = originalObservable || null;
          var path = originalPath || [
            {
              "target": target,
              "property": ""
            }
          ];
          paths.push(path);
          if (target instanceof Array) {
            if (!target.hasOwnProperty("__length"))
              Object.defineProperty(target, "__length", {
                enumerable: false,
                value: target.length,
                writable: true
              });
            else
              target.__length = target.length;
          }
          var changes = [];
          var _getPath = function(target2, property, jsonPointer) {
            var fullPath = "";
            var lastTarget = null;
            for (var i = 0; i < path.length; i++) {
              if (lastTarget instanceof Array && !isNaN(path[i].property)) {
                path[i].property = lastTarget.indexOf(path[i].target);
              }
              fullPath = fullPath + "." + path[i].property;
              lastTarget = path[i].target;
            }
            fullPath = fullPath + "." + property;
            fullPath = fullPath.substring(2);
            if (jsonPointer === true)
              fullPath = "/" + fullPath.replace(/\./g, "/");
            return fullPath;
          };
          var _notifyObservers = function(numChanges) {
            if (observable.paused === true)
              return;
            var domDelayIsNumber = typeof domDelay === "number";
            if (domDelayIsNumber || domDelay === true) {
              setTimeout(function() {
                if (numChanges === changes.length) {
                  var changesCopy2 = changes.slice(0);
                  changes = [];
                  for (var i2 = 0; i2 < observable.observers.length; i2++)
                    observable.observers[i2](changesCopy2);
                }
              }, domDelayIsNumber && domDelay > 0 ? domDelay : 10);
            } else {
              var changesCopy = changes.slice(0);
              changes = [];
              for (var i = 0; i < observable.observers.length; i++)
                observable.observers[i](changesCopy);
            }
          };
          var handler = {
            get: function(target2, property) {
              if (property === "__getTarget") {
                return target2;
              } else if (property === "__isProxy") {
                return true;
              } else if (property === "__getParent") {
                return function(i2) {
                  if (typeof i2 === "undefined")
                    var i2 = 1;
                  var parentPath2 = _getPath(target2, "__getParent").split(".");
                  parentPath2.splice(-(i2 + 1), i2 + 1);
                  return _getProperty(observable.parentProxy, parentPath2.join("."));
                };
              } else if (property === "__getPath") {
                var parentPath = _getPath(target2, "__getParent");
                return parentPath.slice(0, -12);
              }
              var targetProp = target2[property];
              if (target2 instanceof Date && targetProp instanceof Function && targetProp !== null) {
                return targetProp.bind(target2);
              }
              if (targetProp instanceof Object && targetProp !== null && target2.hasOwnProperty(property)) {
                if (targetProp.__isProxy === true)
                  targetProp = targetProp.__getTarget;
                if (targetProp.__targetPosition > -1 && targets[targetProp.__targetPosition] !== null) {
                  var ttp = targetsProxy[targetProp.__targetPosition];
                  for (var i = 0, l = ttp.length; i < l; i++) {
                    if (observable === ttp[i].observable) {
                      return ttp[i].proxy;
                    }
                  }
                }
                var newPath = path.slice(0);
                newPath.push({
                  "target": targetProp,
                  "property": property
                });
                return _create(targetProp, domDelay, observable, newPath);
              } else {
                return targetProp;
              }
            },
            deleteProperty: function(target2, property) {
              var originalChange = true;
              if (dupProxy === proxy) {
                originalChange = false;
                dupProxy = null;
              }
              var previousValue = Object.assign({}, target2);
              changes.push({
                "type": "delete",
                "target": target2,
                "property": property,
                "newValue": null,
                "previousValue": previousValue[property],
                "currentPath": _getPath(target2, property),
                "jsonPointer": _getPath(target2, property, true),
                "proxy": proxy
              });
              if (originalChange === true) {
                if (!observable.changesPaused)
                  delete target2[property];
                for (var a = 0, l = targets.length; a < l; a++)
                  if (target2 === targets[a])
                    break;
                var currentTargetProxy = targetsProxy[a] || [];
                var b = currentTargetProxy.length;
                while (b--) {
                  if (currentTargetProxy[b].proxy !== proxy) {
                    dupProxy = currentTargetProxy[b].proxy;
                    delete currentTargetProxy[b].proxy[property];
                  }
                }
              }
              _notifyObservers(changes.length);
              return true;
            },
            set: function(target2, property, value, receiver) {
              if (value && value.__isProxy)
                value = value.__getTarget;
              var originalChange = true;
              if (dupProxy === proxy) {
                originalChange = false;
                dupProxy = null;
              }
              var targetProp = target2[property];
              if (targetProp !== value || originalChange === false || property === "length" && target2 instanceof Array && target2.__length !== value) {
                var foundObservable = true;
                var typeOfTargetProp = typeof targetProp;
                var type = "update";
                if (typeOfTargetProp === "undefined")
                  type = "add";
                changes.push({
                  "type": type,
                  "target": target2,
                  "property": property,
                  "newValue": value,
                  "previousValue": receiver[property],
                  "currentPath": _getPath(target2, property),
                  "jsonPointer": _getPath(target2, property, true),
                  "proxy": proxy
                });
                if (property === "length" && target2 instanceof Array && target2.__length !== value) {
                  changes[changes.length - 1].previousValue = target2.__length;
                  target2.__length = value;
                }
                if (originalChange === true) {
                  if (!observable.changesPaused)
                    target2[property] = value;
                  foundObservable = false;
                  var targetPosition = target2.__targetPosition;
                  var z = targetsProxy[targetPosition].length;
                  while (z--) {
                    if (observable === targetsProxy[targetPosition][z].observable) {
                      if (targets[targetsProxy[targetPosition][z].observable.parentTarget.__targetPosition] !== null) {
                        foundObservable = true;
                        break;
                      }
                    }
                  }
                  if (foundObservable) {
                    var currentTargetProxy = targetsProxy[targetPosition];
                    for (var b = 0, l = currentTargetProxy.length; b < l; b++) {
                      if (currentTargetProxy[b].proxy !== proxy) {
                        dupProxy = currentTargetProxy[b].proxy;
                        currentTargetProxy[b].proxy[property] = value;
                      }
                    }
                    setTimeout(function() {
                      if (typeOfTargetProp === "object" && targetProp !== null) {
                        var keys = Object.keys(target2);
                        for (var i = 0, l2 = keys.length; i < l2; i++) {
                          if (target2[keys[i]] === targetProp)
                            return;
                        }
                        var stillExists = false;
                        (function iterate(target3) {
                          var keys2 = Object.keys(target3);
                          for (var i2 = 0, l3 = keys2.length; i2 < l3; i2++) {
                            var property2 = keys2[i2];
                            var nestedTarget = target3[property2];
                            if (nestedTarget instanceof Object && nestedTarget !== null)
                              iterate(nestedTarget);
                            if (nestedTarget === targetProp) {
                              stillExists = true;
                              return;
                            }
                          }
                          ;
                        })(target2);
                        if (stillExists === true)
                          return;
                        (function iterate(obj) {
                          var keys2 = Object.keys(obj);
                          for (var i2 = 0, l3 = keys2.length; i2 < l3; i2++) {
                            var objProp = obj[keys2[i2]];
                            if (objProp instanceof Object && objProp !== null)
                              iterate(objProp);
                          }
                          var c = -1;
                          for (var i2 = 0, l3 = targets.length; i2 < l3; i2++) {
                            if (obj === targets[i2]) {
                              c = i2;
                              break;
                            }
                          }
                          if (c > -1) {
                            var currentTargetProxy2 = targetsProxy[c];
                            var d = currentTargetProxy2.length;
                            while (d--) {
                              if (observable === currentTargetProxy2[d].observable) {
                                currentTargetProxy2.splice(d, 1);
                                break;
                              }
                            }
                            if (currentTargetProxy2.length == 0) {
                              targets[c] = null;
                            }
                          }
                        })(targetProp);
                      }
                    }, 1e4);
                  }
                }
                ;
                if (foundObservable) {
                  _notifyObservers(changes.length);
                }
              }
              return true;
            }
          };
          var __targetPosition = target.__targetPosition;
          if (!(__targetPosition > -1)) {
            Object.defineProperty(target, "__targetPosition", {
              value: targets.length,
              writable: false,
              enumerable: false,
              configurable: false
            });
          }
          var proxy = new Proxy(target, handler);
          if (observable === null) {
            observable = {
              "parentTarget": target,
              "domDelay": domDelay,
              "parentProxy": proxy,
              "observers": [],
              "paused": false,
              "path": path,
              "changesPaused": false
            };
            observables.push(observable);
          }
          var proxyItem = {
            "target": target,
            "proxy": proxy,
            "observable": observable
          };
          if (__targetPosition > -1) {
            if (targets[__targetPosition] === null) {
              targets[__targetPosition] = target;
            }
            targetsProxy[__targetPosition].push(proxyItem);
          } else {
            targets.push(target);
            targetsProxy.push([
              proxyItem
            ]);
          }
          return proxy;
        };
        return {
          /**
          * Create a new ES6 `Proxy` whose changes we can observe through the `observe()` method.
          * @param {object} target Plain object that we want to observe for changes.
          * @param {boolean|number} domDelay If `true`, then the observed changes to `target` will be batched up on a 10ms delay (via `setTimeout()`).
          * If `false`, then the `observer` function will be immediately invoked after each individual change made to `target`. It is helpful to set
          * `domDelay` to `true` when your `observer` function makes DOM manipulations (fewer DOM redraws means better performance). If a number greater
          * than zero, then it defines the DOM delay in milliseconds.
          * @param {function(ObservableSlimChange[])} [observer] Function that will be invoked when a change is made to the proxy of `target`.
          * When invoked, this function is passed a single argument: an array of `ObservableSlimChange` detailing each change that has been made.
          * @returns {ProxyConstructor} Proxy of the target object.
          */
          create: function(target, domDelay, observer) {
            if (target.__isProxy === true) {
              var target = target.__getTarget;
            }
            var proxy = _create(target, domDelay);
            if (typeof observer === "function")
              this.observe(proxy, observer);
            (function iterate(proxy2) {
              var target2 = proxy2.__getTarget;
              var keys = Object.keys(target2);
              for (var i = 0, l = keys.length; i < l; i++) {
                var property = keys[i];
                if (target2[property] instanceof Object && target2[property] !== null)
                  iterate(proxy2[property]);
              }
            })(proxy);
            return proxy;
          },
          /**
          * Add a new observer function to an existing proxy.
          * @param {ProxyConstructor} proxy An ES6 `Proxy` created by the `create()` method.
          * @param {function(ObservableSlimChange[])} observer Function that will be invoked when a change is made to the proxy of `target`.
          * When invoked, this function is passed a single argument: an array of `ObservableSlimChange` detailing each change that has been made.
          * @returns {void} Does not return any value.
          */
          observe: function(proxy, observer) {
            var i = observables.length;
            while (i--) {
              if (observables[i].parentProxy === proxy) {
                observables[i].observers.push(observer);
                break;
              }
            }
            ;
          },
          /**
          * Prevent any observer functions from being invoked when a change occurs to a proxy.
          * @param {ProxyConstructor} proxy An ES6 `Proxy` created by the `create()` method.
          * @returns {void} Does not return any value.
          */
          pause: function(proxy) {
            var i = observables.length;
            var foundMatch = false;
            while (i--) {
              if (observables[i].parentProxy === proxy) {
                observables[i].paused = true;
                foundMatch = true;
                break;
              }
            }
            ;
            if (foundMatch == false)
              throw new Error("ObseravableSlim could not pause observable -- matching proxy not found.");
          },
          /**
          * Resume execution of any observer functions when a change is made to a proxy.
          * @param {ProxyConstructor} proxy An ES6 `Proxy` created by the `create()` method.
          * @returns {void} Does not return any value.
          */
          resume: function(proxy) {
            var i = observables.length;
            var foundMatch = false;
            while (i--) {
              if (observables[i].parentProxy === proxy) {
                observables[i].paused = false;
                foundMatch = true;
                break;
              }
            }
            ;
            if (foundMatch == false)
              throw new Error("ObseravableSlim could not resume observable -- matching proxy not found.");
          },
          /**
          * Prevent any changes (i.e., `set`, and `deleteProperty`) from being written to the target object.
          * However, the observer functions will still be invoked to let you know what changes **WOULD** have been made.
          * This can be useful if the changes need to be approved by an external source before the changes take effect.
          * @param {ProxyConstructor} proxy An ES6 `Proxy` created by the `create()` method.
          * @returns {void} Does not return any value.
          */
          pauseChanges: function(proxy) {
            var i = observables.length;
            var foundMatch = false;
            while (i--) {
              if (observables[i].parentProxy === proxy) {
                observables[i].changesPaused = true;
                foundMatch = true;
                break;
              }
            }
            ;
            if (foundMatch == false)
              throw new Error("ObseravableSlim could not pause changes on observable -- matching proxy not found.");
          },
          /**
          * Resume the changes that were taking place prior to the call to `pauseChanges()` method.
          * @param {ProxyConstructor} proxy An ES6 `Proxy` created by the `create()` method.
          * @returns {void} Does not return any value.
          */
          resumeChanges: function(proxy) {
            var i = observables.length;
            var foundMatch = false;
            while (i--) {
              if (observables[i].parentProxy === proxy) {
                observables[i].changesPaused = false;
                foundMatch = true;
                break;
              }
            }
            ;
            if (foundMatch == false)
              throw new Error("ObseravableSlim could not resume changes on observable -- matching proxy not found.");
          },
          /**
          * Remove the observable and proxy thereby preventing any further callback observers for changes occurring to the target object.
          * @param {ProxyConstructor} proxy An ES6 `Proxy` created by the `create()` method.
          * @returns {void} Does not return any value.
          */
          remove: function(proxy) {
            var matchedObservable = null;
            var foundMatch = false;
            var c = observables.length;
            while (c--) {
              if (observables[c].parentProxy === proxy) {
                matchedObservable = observables[c];
                foundMatch = true;
                break;
              }
            }
            ;
            var a = targetsProxy.length;
            while (a--) {
              var b = targetsProxy[a].length;
              while (b--) {
                if (targetsProxy[a][b].observable === matchedObservable) {
                  targetsProxy[a].splice(b, 1);
                  if (targetsProxy[a].length === 0) {
                    targets[a] = null;
                  }
                  ;
                }
              }
              ;
            }
            ;
            if (foundMatch === true) {
              observables.splice(c, 1);
            }
          }
        };
      }();
      try {
        module.exports = ObservableSlim2;
      } catch (err) {
      }
    }
  });

  // src/api/StorageWrapper.ts
  var StorageWrapper_exports = {};
  __export(StorageWrapper_exports, {
    ObservableSlim: () => import_observable_slim.default,
    _globalAwaiter: () => _globalAwaiter,
    default: () => StorageWrapper,
    readFile: () => readFile,
    writeFile: () => writeFile
  });
  async function writeFile(path, data) {
    if (ReactNative.Platform.OS === "ios" && !RTNFileManager.saveFileToGallery)
      path = `Documents/${path}`;
    return void await RTNFileManager.writeFile("documents", path, data, "utf8");
  }
  async function readFile(path, fallback) {
    const readPath = `${RTNFileManager.getConstants().DocumentsDirPath}/${path}`;
    try {
      return await RTNFileManager.readFile(readPath, "utf8");
    } catch {
      writeFile(path, fallback);
      return fallback;
    }
  }
  var import_observable_slim, RTNFileManager, _globalAwaiter, StorageWrapper;
  var init_StorageWrapper = __esm({
    "src/api/StorageWrapper.ts"() {
      "use strict";
      init_class_call_check();
      init_create_class();
      init_define_property();
      import_observable_slim = __toESM(require_observable_slim());
      ({ RTNFileManager } = nativeModuleProxy);
      _globalAwaiter = Promise.resolve();
      StorageWrapper = /* @__PURE__ */ function() {
        "use strict";
        function StorageWrapper2(path) {
          var _this = this;
          _class_call_check(this, StorageWrapper2);
          _define_property(this, "_cachedProxy", null);
          _define_property(this, "_initAwaiter", void 0);
          _define_property(this, "callbacks", /* @__PURE__ */ new Set());
          _define_property(this, "path", void 0);
          _define_property(this, "snapshot", {});
          _define_property(this, "subscribe", function(callback) {
            _this.callbacks.add(callback);
            return function() {
              return _this.callbacks.delete(callback);
            };
          });
          _define_property(this, "useStorage", function() {
            const forceUpdate = React.useReducer(function(n) {
              return ~n;
            }, 0)[1];
            React.useEffect(function() {
              const unsub = _this.subscribe(forceUpdate);
              return function() {
                return void unsub();
              };
            }, []);
            return _this.getProxy();
          });
          _define_property(this, "getProxy", function() {
            return _this._cachedProxy ??= import_observable_slim.default.create(_this.snapshot, true, function(changes) {
              changes.forEach(async function() {
                await _this._initAwaiter;
                _this.callbacks.forEach(function(cb) {
                  return cb(_this.snapshot);
                });
                const task = writeFile(_this.path, JSON.stringify(_this.snapshot));
                _globalAwaiter = _globalAwaiter.then(function() {
                  return task;
                });
              });
            });
          });
          _define_property(this, "awaitAndGetProxy", async function() {
            await _this._initAwaiter;
            return _this.getProxy();
          });
          this.path = `pyoncord/${path}`;
          this._initAwaiter = this.begin();
        }
        _create_class(StorageWrapper2, [
          {
            key: "begin",
            value: async function begin() {
              const data = await readFile(this.path, "{}");
              Object.assign(this.snapshot, JSON.parse(data));
            }
          }
        ]);
        return StorageWrapper2;
      }();
    }
  });

  // src/api/Patcher.ts
  var Patcher_exports = {};
  __export(Patcher_exports, {
    default: () => Patcher,
    patchesInstances: () => patchesInstances
  });
  var patchesInstances, Patcher;
  var init_Patcher = __esm({
    "src/api/Patcher.ts"() {
      "use strict";
      init_class_call_check();
      init_create_class();
      init_define_property();
      init_esm();
      patchesInstances = /* @__PURE__ */ new Map();
      Patcher = /* @__PURE__ */ function() {
        "use strict";
        function Patcher2(identifier) {
          var _this = this;
          _class_call_check(this, Patcher2);
          _define_property(this, "identifier", void 0);
          _define_property(this, "patches", []);
          _define_property(this, "stopped", false);
          _define_property(this, "before", function(parent, method, patch) {
            return _this.addUnpatcher(before(method, parent, patch));
          });
          _define_property(this, "after", function(parent, method, patch) {
            return _this.addUnpatcher(after(method, parent, patch));
          });
          _define_property(this, "instead", function(parent, method, patch) {
            return _this.addUnpatcher(instead(method, parent, patch));
          });
          _define_property(this, "addUnpatcher", function(callback) {
            if (_this.stopped)
              return function() {
                return false;
              };
            if (typeof callback !== "function") {
              throw new Error("Unpatcher must be a function");
            }
            _this.patches.push(callback);
            return callback;
          });
          if (!identifier || typeof identifier !== "string") {
            throw new Error("Patcher identifier must be a non-empty string");
          }
          if (patchesInstances.has(identifier)) {
            throw new Error(`Patcher with identifier "${identifier}" already exists`);
          }
          this.identifier = identifier;
          patchesInstances.set(identifier, this);
        }
        _create_class(Patcher2, [
          {
            key: "unpatchAllAndStop",
            value: function unpatchAllAndStop() {
              let success = true;
              this.stopped = true;
              for (const unpatch2 of this.patches) {
                try {
                  if (unpatch2?.() === false)
                    throw void 0;
                } catch {
                  success = false;
                }
              }
              patchesInstances.delete(this.identifier);
              return success;
            }
          }
        ]);
        return Patcher2;
      }();
    }
  });

  // src/debug/index.ts
  var debug_exports = {};
  __export(debug_exports, {
    connectToDebugger: () => connectToDebugger
  });
  async function connectToDebugger() {
    if (websocket)
      return;
    websocket = new WebSocket("ws://localhost:9090/");
    websocket.addEventListener("open", function() {
      return console.log("Connected to debug websocket");
    });
    websocket.addEventListener("error", function(e) {
      return console.error(e.message);
    });
    websocket.addEventListener("message", function(message) {
      try {
        const toEval = new AsyncFunction(`return (${message.data})`);
        toEval().then(console.log).catch(console.error);
      } catch (e) {
        console.error(e);
      }
    });
    const unpatch2 = before2(globalThis, "nativeLoggingHook", function(param) {
      let [message, level] = param;
      if (websocket?.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify({
          level,
          message
        }));
      }
    });
    websocket.addEventListener("close", function() {
      unpatch2();
      websocket = null;
      setTimeout(connectToDebugger, 3e3);
    });
  }
  var before2, websocket, AsyncFunction;
  var init_debug = __esm({
    "src/debug/index.ts"() {
      "use strict";
      init_Patcher();
      ({ before: before2 } = new Patcher("debug-ws-patcher"));
      websocket = null;
      AsyncFunction = Object.getPrototypeOf(async function() {
      }).constructor;
    }
  });

  // src/patches/chatInput.ts
  async function patchChatInput() {
    let hideGiftButton, moduleExports;
    const unwait = waitForModule(function(m) {
      return typeof m?.defaultProps?.hideGiftButton === "boolean";
    }, function(exports) {
      moduleExports = exports;
      ({ hideGiftButton } = exports.defaultProps);
      exports.defaultProps.hideGiftButton = true;
    });
    return function() {
      return hideGiftButton !== void 0 ? moduleExports.defaultProps.hideGiftButton = hideGiftButton : unwait();
    };
  }
  var init_chatInput = __esm({
    "src/patches/chatInput.ts"() {
      "use strict";
      init_metro();
    }
  });

  // src/patches/experiments.ts
  async function patchExperiments() {
    try {
      await ready;
      UserStore.getCurrentUser().flags |= 1;
      UserStore._dispatcher._actionHandlers._computeOrderedActionHandlers("OVERLAY_INITIALIZE").forEach(function(param) {
        let { name, actionHandler } = param;
        name.includes?.("Experiment") && actionHandler?.({
          serializedExperimentStore: ExperimentStore.getSerializedState(),
          user: {
            flags: 1
          }
        });
      });
    } catch (err) {
      console.error("An error occurred while patching experiments", err);
    }
  }
  var UserStore, ExperimentStore;
  var init_experiments = __esm({
    "src/patches/experiments.ts"() {
      "use strict";
      init_metro();
      UserStore = findByStoreNameLazy("UserStore");
      ExperimentStore = findByStoreNameLazy("ExperimentStore");
    }
  });

  // src/patches/idle.ts
  async function patchIdle() {
    await ready;
    patcher.before(FluxDispatcher, "dispatch", function(args) {
      if (args[0].type === "IDLE") {
        return [
          {
            type: "THIS_TYPE_DOES_NOT_EXIST"
          }
        ];
      }
    });
    return patcher.unpatchAllAndStop;
  }
  var patcher;
  var init_idle = __esm({
    "src/patches/idle.ts"() {
      "use strict";
      init_Patcher();
      init_metro();
      init_common();
      patcher = new Patcher("idle-patcher");
    }
  });

  // src/utils/assets.ts
  var assets_exports = {};
  __export(assets_exports, {
    getAssetByID: () => getAssetByID,
    getAssetByName: () => getAssetByName,
    getAssetIDByName: () => getAssetIDByName,
    patchAssets: () => patchAssets,
    registeredAssets: () => registeredAssets
  });
  function patchAssets() {
    const unpatch2 = after2(AssetManager, "registerAsset", function(param, id2) {
      let [asset2] = param;
      registeredAssets[asset2.name] = {
        ...asset2,
        id: id2
      };
    });
    let asset, id = 1;
    while (asset = AssetManager.getAssetByID(id)) {
      registeredAssets[asset.name] ??= {
        ...asset,
        id: id++
      };
    }
    return unpatch2;
  }
  var after2, registeredAssets, getAssetByName, getAssetByID, getAssetIDByName;
  var init_assets = __esm({
    "src/utils/assets.ts"() {
      "use strict";
      init_Patcher();
      init_common();
      ({ after: after2 } = new Patcher("assets-patcher"));
      registeredAssets = {};
      getAssetByName = function(name) {
        return registeredAssets[name];
      };
      getAssetByID = function(id) {
        return AssetManager.getAssetByID(id);
      };
      getAssetIDByName = function(name) {
        return registeredAssets[name]?.id;
      };
    }
  });

  // src/utils/awaitUntil.ts
  function awaitUntil(condition) {
    let timeout = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
    return new Promise(function(resolve) {
      const interval = setInterval(function() {
        if (condition()) {
          clearInterval(interval);
          resolve();
        }
      }, timeout);
    });
  }
  var init_awaitUntil = __esm({
    "src/utils/awaitUntil.ts"() {
      "use strict";
    }
  });

  // src/utils/EventEmitter.ts
  var EventEmitter;
  var init_EventEmitter = __esm({
    "src/utils/EventEmitter.ts"() {
      "use strict";
      init_class_call_check();
      init_create_class();
      init_define_property();
      EventEmitter = /* @__PURE__ */ function() {
        "use strict";
        function EventEmitter2() {
          _class_call_check(this, EventEmitter2);
          _define_property(this, "events", /* @__PURE__ */ new Map());
        }
        _create_class(EventEmitter2, [
          {
            key: "on",
            value: function on(eventName, listener) {
              if (!this.events.get(eventName)?.add(listener)) {
                this.events.set(eventName, /* @__PURE__ */ new Set([
                  listener
                ]));
              }
            }
          },
          {
            key: "emit",
            value: function emit(eventName) {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              const listeners = this.events.get(eventName);
              if (listeners) {
                listeners.forEach(function(listener) {
                  listener(...args);
                });
              }
            }
          },
          {
            key: "off",
            value: function off(eventName, listenerToRemove) {
              const listeners = this.events.get(eventName);
              if (!listeners) {
                return;
              }
              listeners.delete(listenerToRemove);
              if (listeners.size === 0) {
                this.events.delete(eventName);
              }
            }
          }
        ]);
        return EventEmitter2;
      }();
    }
  });

  // src/utils/findInReactTree.ts
  function findInReactTree(tree, filter) {
    return findInTree(tree, filter, {
      walkable: [
        "props",
        "children",
        "child",
        "sibling"
      ]
    });
  }
  var init_findInReactTree = __esm({
    "src/utils/findInReactTree.ts"() {
      "use strict";
      init_utils();
    }
  });

  // src/utils/findInTree.ts
  function treeSearch(tree, filter, opts, depth) {
    if (depth > opts.maxDepth)
      return;
    if (!tree)
      return;
    try {
      if (filter(tree))
        return tree;
    } catch {
    }
    if (Array.isArray(tree)) {
      for (const item of tree) {
        if (typeof item !== "object" || item === null)
          continue;
        try {
          const found = treeSearch(item, filter, opts, depth + 1);
          if (found)
            return found;
        } catch {
        }
      }
    } else if (typeof tree === "object") {
      for (const key of Object.keys(tree)) {
        if (typeof tree[key] !== "object" || tree[key] === null)
          continue;
        if (opts.walkable.length && !opts.walkable.includes(key))
          continue;
        if (opts.ignore.includes(key))
          continue;
        try {
          const found = treeSearch(tree[key], filter, opts, depth + 1);
          if (found)
            return found;
        } catch {
        }
      }
    }
  }
  function findInTree(tree, filter) {
    let opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return treeSearch(tree, filter, {
      walkable: [],
      ignore: [],
      maxDepth: 100,
      ...opts
    }, 0);
  }
  var init_findInTree = __esm({
    "src/utils/findInTree.ts"() {
      "use strict";
    }
  });

  // src/utils/lazyNavigate.tsx
  async function lazyNavigate(navigation, renderPromise, screenOptions, props) {
    const Component = await renderPromise.then(function(m) {
      return m.default;
    });
    if (typeof screenOptions === "string") {
      screenOptions = {
        title: screenOptions
      };
    }
    navigation.navigate("PyoncordCustomPage", {
      ...screenOptions,
      render: function() {
        return /* @__PURE__ */ React.createElement(Component, props);
      }
    });
  }
  var init_lazyNavigate = __esm({
    "src/utils/lazyNavigate.tsx"() {
      "use strict";
    }
  });

  // src/utils/index.ts
  var utils_exports = {};
  __export(utils_exports, {
    EventEmitter: () => EventEmitter,
    assets: () => assets_exports,
    awaitUntil: () => awaitUntil,
    findInReactTree: () => findInReactTree,
    findInTree: () => findInTree,
    lazyNavigate: () => lazyNavigate,
    proxyLazy: () => proxyLazy
  });
  var init_utils = __esm({
    "src/utils/index.ts"() {
      "use strict";
      init_assets();
      init_awaitUntil();
      init_EventEmitter();
      init_findInReactTree();
      init_findInTree();
      init_lazyNavigate();
      init_proxyLazy();
    }
  });

  // src/ui/screens/General.tsx
  var General_exports = {};
  __export(General_exports, {
    default: () => General
  });
  function General() {
    const settings2 = settings.useStorage();
    return /* @__PURE__ */ React.createElement(ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      }
    }, /* @__PURE__ */ React.createElement(FormSection, {
      title: "Settings",
      titleStyleType: "no_border"
    }, /* @__PURE__ */ React.createElement(FormSwitchRow, {
      label: "Enable Discord's experiments menu",
      subLabel: "Enables the experiments menu in Discord's settings, which only staff has access to.",
      leading: /* @__PURE__ */ React.createElement(FormRow.Icon, {
        source: getAssetIDByName("ic_badge_staff")
      }),
      value: settings2.experiments !== false,
      onValueChange: function(v) {
        return settings2.experiments = v;
      }
    }), /* @__PURE__ */ React.createElement(FormSwitchRow, {
      label: "Hide gift button on chat input",
      subLabel: "Hides the gift button on the chat input.",
      leading: /* @__PURE__ */ React.createElement(FormRow.Icon, {
        source: getAssetIDByName("ic_gift_24px")
      }),
      value: settings2.hideGiftButton !== false,
      onValueChange: function(v) {
        return settings2.hideGiftButton = v;
      }
    }), /* @__PURE__ */ React.createElement(FormSwitchRow, {
      label: "Hide idle status",
      subLabel: "Hides the idling status when app is backgrounded.",
      leading: /* @__PURE__ */ React.createElement(FormRow.Icon, {
        source: getAssetIDByName("StatusIdle")
      }),
      value: settings2.hideIdling !== false,
      onValueChange: function(v) {
        return settings2.hideIdling = v;
      }
    })));
  }
  var ScrollView, FormSection, FormRow, FormSwitchRow, FormText;
  var init_General = __esm({
    "src/ui/screens/General.tsx"() {
      "use strict";
      init_src();
      init_common();
      init_assets();
      ({ ScrollView } = ReactNative);
      ({ FormSection, FormRow, FormSwitchRow, FormText } = Forms);
    }
  });

  // src/ui/screens/common.ts
  var commonStyles;
  var init_common2 = __esm({
    "src/ui/screens/common.ts"() {
      "use strict";
      init_common();
      commonStyles = Styles.createThemedStyleSheet({
        container: {
          flex: 1
        },
        list: {
          paddingVertical: 14,
          paddingHorizontal: 8
        },
        card: {
          borderRadius: 10,
          margin: 5,
          backgroundColor: Colors.colors.BACKGROUND_TERTIARY
        },
        header: {
          flexDirection: "row",
          flexWrap: "wrap"
        },
        bodyCard: {
          backgroundColor: Colors.colors.BACKGROUND_SECONDARY,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        },
        bodyText: {
          color: Colors.colors.TEXT_NORMAL,
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 18,
          textAlignVertical: "top"
        },
        actions: {
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 16,
          paddingRight: 12,
          paddingBottom: 10
        },
        iconsContainer: {
          flexDirection: "row",
          justifyContent: "flex-start"
        },
        icons: {
          width: 24,
          height: 24,
          marginHorizontal: 4,
          tintColor: Colors.colors.INTERACTIVE_NORMAL
        },
        headerText: {
          fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
          color: Colors.colors.TEXT_NORMAL,
          fontSize: 16
        },
        link: {
          color: Colors.colors.TEXT_LINK
        },
        emptyPageImage: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginTop: "10%"
        },
        emptyPageText: {
          marginTop: 10,
          color: Colors.colors.TEXT_NORMAL,
          fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
          textAlign: "center"
        },
        search: {
          margin: 0,
          marginBottom: 0,
          paddingBottom: 5,
          paddingRight: 15,
          paddingLeft: 15,
          backgroundColor: "none",
          borderBottomWidth: 0,
          background: "none"
        },
        button: {
          height: 34,
          paddingHorizontal: 16,
          marginLeft: 6
        },
        buttonIcon: {
          width: 14,
          height: 14,
          marginRight: 6,
          color: Colors.colors.TEXT_NORMAL
        },
        invalidHeader: {
          flexDirection: "column",
          flexWrap: "wrap"
        },
        invalidInfoText: {
          color: Colors.colors.TEXT_MUTED,
          fontSize: 12,
          fontWeight: "400"
        },
        warningText: {
          color: Colors.colors.TEXT_WARNING,
          fontFamily: Constants.Fonts.PRIMARY_NORMAL,
          fontSize: 12,
          paddingTop: 5
        }
      });
    }
  });

  // src/ui/screens/Plugins.tsx
  var Plugins_exports = {};
  __export(Plugins_exports, {
    default: () => UpdaterPage
  });
  function UpdaterPage() {
    return /* @__PURE__ */ React.createElement(ScrollView2, {
      style: commonStyles.container
    }, /* @__PURE__ */ React.createElement(View, {
      style: commonStyles.emptyPageImage
    }, /* @__PURE__ */ React.createElement(Text, {
      style: commonStyles.emptyPageText
    }, "Plugin system coming soon (never).")));
  }
  var View, Text, ScrollView2;
  var init_Plugins = __esm({
    "src/ui/screens/Plugins.tsx"() {
      "use strict";
      init_common2();
      ({ View, Text, ScrollView: ScrollView2 } = ReactNative);
    }
  });

  // src/patches/settings.tsx
  function SettingsSection() {
    const { FormSection: FormSection2, FormRow: FormRow2, FormIcon } = Forms;
    const navigation = NavigationNative.useNavigation();
    const title = `Pyoncord (${"04ecbfa"}) ${true ? "(DEV)" : ""}`.trimEnd();
    return /* @__PURE__ */ React.createElement(FormSection2, {
      key: "Pyoncord",
      title
    }, /* @__PURE__ */ React.createElement(FormRow2, {
      label: "Pyoncord",
      leading: /* @__PURE__ */ React.createElement(FormIcon, {
        source: assets_exports.getAssetIDByName("Discord")
      }),
      trailing: FormRow2.Arrow,
      onPress: function() {
        return lazyNavigate(navigation, Promise.resolve().then(() => (init_General(), General_exports)), "Pyoncord");
      }
    }), /* @__PURE__ */ React.createElement(FormRow2, {
      label: "Plugins",
      leading: /* @__PURE__ */ React.createElement(FormIcon, {
        source: assets_exports.getAssetIDByName("ic_progress_wrench_24px")
      }),
      trailing: FormRow2.Arrow,
      onPress: function() {
        return lazyNavigate(navigation, Promise.resolve().then(() => (init_Plugins(), Plugins_exports)), "Plugins");
      }
    }));
  }
  function patchSettings() {
    const unwaitScreens = waitForModule(function(m) {
      return m.default?.name === "getScreens";
    }, function(exports) {
      patcher2.after(exports, "default", function(args, screens) {
        return Object.assign(screens, {
          PyoncordCustomPage: {
            title: "Pyoncord",
            render: function(param) {
              let { render: PageComponent, ...args2 } = param;
              const navigation = NavigationNative.useNavigation();
              React.useEffect(function() {
                navigation.setOptions({
                  ...args2
                });
              }, []);
              return /* @__PURE__ */ React.createElement(PageComponent, null);
            }
          }
        });
      });
    });
    const unwaitWrapper = waitForModule(function(m) {
      return m.default?.name === "UserSettingsOverviewWrapper";
    }, function(exports) {
      const unpatch2 = patcher2.after(exports, "default", function(_args, ret) {
        const UserSettingsOverview = findInReactTree(ret.props.children, function(n) {
          return n.type?.name === "UserSettingsOverview";
        });
        patcher2.after(UserSettingsOverview.type.prototype, "renderSupportAndAcknowledgements", function(_args2, param) {
          let { props: { children } } = param;
          try {
            const index = children.findIndex(function(c) {
              return c?.type?.name === "UploadLogsButton";
            });
            if (index !== -1)
              children.splice(index, 1);
          } catch {
          }
        });
        patcher2.after(UserSettingsOverview.type.prototype, "render", function(_args2, res) {
          try {
            const titles = [
              I18n.Messages.BILLING_SETTINGS,
              I18n.Messages.PREMIUM_SETTINGS
            ];
            const sections = findInReactTree(res.props.children, function(n) {
              return n?.children?.[1]?.type === Forms.FormSection;
            }).children;
            const index = sections.findIndex(function(c) {
              return titles.includes(c?.props.label);
            });
            sections.splice(-~index || 4, 0, /* @__PURE__ */ React.createElement(SettingsSection, null));
          } catch (e) {
            console.error("An error occurred while trying to append Pyoncord's settings section. " + e?.stack);
          }
        });
        unpatch2();
      });
    });
    return function() {
      unwaitScreens();
      unwaitWrapper();
      patcher2.unpatchAllAndStop();
    };
  }
  var patcher2;
  var init_settings = __esm({
    "src/patches/settings.tsx"() {
      "use strict";
      init_Patcher();
      init_metro();
      init_common();
      init_utils();
      patcher2 = new Patcher("settings-patcher");
    }
  });

  // src/themes.ts
  var themes_exports = {};
  __export(themes_exports, {
    getCurrentTheme: () => getCurrentTheme
  });
  function getCurrentTheme() {
    throw new Error("Not implemented");
  }
  var init_themes = __esm({
    "src/themes.ts"() {
      "use strict";
    }
  });

  // src/patches/theme.ts
  async function patchTheme() {
    return;
    const currentTheme = getCurrentTheme();
    waitForModule(function(m) {
      return m?.unsafe_rawColors && m.meta;
    }, function(ColorModule) {
      let semanticColorsSymbol;
      const orig_rawColors = ColorModule.unsafe_rawColors;
      ColorModule.unsafe_rawColors = {
        ...ColorModule.unsafe_rawColors,
        ...currentTheme.data.rawColors
      };
      patcher3.addUnpatcher(function() {
        ColorModule.unsafe_rawColors = orig_rawColors;
      });
      patcher3.instead(ColorModule.meta, "resolveSemanticColor", function(param, orig) {
        let [theme, key] = param;
        const realKey = key[semanticColorsSymbol ??= Object.getOwnPropertySymbols(key)[0]];
        const themeIndex = theme === "dark" ? 0 : theme === "light" ? 1 : 2;
        if (currentTheme.data.semanticColors[realKey]?.[themeIndex]) {
          return currentTheme.data.semanticColors[realKey][themeIndex];
        }
        return orig(theme, key);
      });
    });
    return function() {
      return patcher3.unpatchAllAndStop();
    };
  }
  var patcher3;
  var init_theme = __esm({
    "src/patches/theme.ts"() {
      "use strict";
      init_Patcher();
      init_metro();
      init_themes();
      patcher3 = new Patcher("theme-patcher");
    }
  });

  // src/patches/index.ts
  var patches_exports = {};
  __export(patches_exports, {
    patchChatInput: () => patchChatInput,
    patchExperiments: () => patchExperiments,
    patchIdle: () => patchIdle,
    patchSettings: () => patchSettings,
    patchTheme: () => patchTheme
  });
  var init_patches = __esm({
    "src/patches/index.ts"() {
      "use strict";
      init_chatInput();
      init_experiments();
      init_idle();
      init_settings();
      init_theme();
    }
  });

  // src/api/index.ts
  var api_exports = {};
  __export(api_exports, {
    Patcher: () => Patcher_exports,
    StorageWrapper: () => StorageWrapper_exports
  });
  var init_api = __esm({
    "src/api/index.ts"() {
      "use strict";
      init_Patcher();
      init_StorageWrapper();
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    api: () => api_exports,
    debug: () => debug_exports,
    default: () => src_default,
    metro: () => metro_exports,
    patches: () => patches_exports,
    settings: () => settings,
    themes: () => themes_exports,
    utils: () => utils_exports
  });
  async function src_default() {
    const settingsProxy = await settings.awaitAndGetProxy();
    initMetro();
    connectToDebugger();
    const patches = [
      patchAssets(),
      settingsProxy.experiments !== false && patchExperiments(),
      settingsProxy.hideGiftButton !== false && patchChatInput(),
      settingsProxy.hideIdling !== false && patchIdle(),
      patchSettings()
    ];
    await Promise.all(patches);
    return function() {
      console.log("Unloading Pyoncord...");
      patches.forEach(async function(p) {
        return p && (await p)?.();
      });
    };
  }
  var settings;
  var init_src = __esm({
    "src/index.ts"() {
      "use strict";
      init_StorageWrapper();
      init_debug();
      init_metro();
      init_patches();
      init_assets();
      init_api();
      init_debug();
      init_metro();
      init_patches();
      init_themes();
      init_utils();
      settings = new StorageWrapper("settings.json");
    }
  });

  // entry.js
  init_metro();
  console.log(`Pyon! (Pyoncord, hash=${"04ecbfa"}, dev=${true})`);
  async function init() {
    try {
      window.React = findByProps("createElement");
      window.ReactNative = findByProps("View");
      window.pyoncord = {
        ...await Promise.resolve().then(() => (init_src(), src_exports))
      };
      pyoncord.unload = await pyoncord.default();
      delete pyoncord.default;
    } catch (error) {
      error = error?.stack ?? error;
      alert([
        "Failed to load Pyoncord.\n",
        `Build Hash: ${"04ecbfa"}`,
        `Debug Build: ${true}`,
        `Build Number: ${nativeModuleProxy.RTNClientInfoManager?.Build}`,
        error
      ].join("\n"));
      console.error(error);
    }
  }
  init();
})();
//# sourceURL=pyoncord
