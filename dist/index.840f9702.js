// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"bUI0q":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "fec9d251840f9702";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"9XOu0":[function(require,module,exports) {
class App {
    constructor(){
        // moving target
        this.control_wrapper = document.querySelector(".btnController--active");
        this.control = this.control_wrapper.querySelector("rect");
        this.control_wrapper_params = {
            matrix: this.control_wrapper.getAttribute("transform").replace(/^matrix\(/, "").replace(/\)$/, "").split(",").map(parseFloat),
            screenCTM: this.control_wrapper.getScreenCTM()
        };
        // gear zones
        this.rZone = document.querySelector("#btnR");
        this.nZone = document.querySelector("#btnN");
        this.dZone = document.querySelector("#btnD");
        this.zoneRND = [
            false,
            true,
            false
        ];
        // bounds
        this.validArea = document.querySelector(".groove");
        this.bound = this.validArea.getBoundingClientRect();
        this.bound_control = this.control_wrapper.getBoundingClientRect();
        this.bound_rZone = this.rZone.getBoundingClientRect();
        this.bound_dZone = this.dZone.getBoundingClientRect();
        // time
        this.longPressTime = 1300;
        this.transitionMotionTime = 800;
        // states
        this.states = {
            isTapped: false,
            isLongPressed: false,
            isMouseUp: false
        };
        this.inInteractiveArea = false;
        // viewport x & y
        this.mouseX = {
            start: null,
            current: 0,
            target: 0,
            lerp: 0.1
        };
        this.mouseY = {
            start: null,
            current: 0,
            target: 0,
            lerp: 0.1
        };
        // svg coordinate x & y
        this.mouseX_svg = {
            current: 0,
            target: 0,
            lerp: 0.1
        };
        this.mouseY_svg = {
            current: 0,
            target: 0,
            lerp: 0.1
        };
        this.sounds = {
            start: new Audio({
                volume: 0.2,
                src: "https://cdn.pixabay.com/download/audio/2022/01/07/audio_ea449d6cea.mp3?filename=start-13691.mp3"
            }),
            loading: new Audio("https://cdn.pixabay.com/download/audio/2022/03/18/audio_35451d26a8.mp3?filename=teleport-sound-95186.mp3"),
            click: new Audio("https://cdn.pixabay.com/download/audio/2023/01/02/audio_d2f20885a2.mp3?filename=click-for-game-menu-131903.mp3"),
            error: new Audio("https://cdn.pixabay.com/download/audio/2023/01/04/audio_8969bfb5fa.mp3?filename=error-warning-login-denied-132113.mp3")
        };
        this.addEventListeners(this.control_wrapper);
        this.addSnapListeners();
        this.update();
    }
    /* -------------
   ------------ EVENTS
   -------------- */ onTouchStart({ clientX , clientY  }) {
        // get values
        this.mouseX.start = clientX;
        this.mouseY.start = clientY;
        // event states
        this.states.isTapped = true;
        this.states.isMouseUp = false;
        this.startModeDelay = window.setTimeout(()=>{
            this.states.isTapped = false;
            this.states.isLongPressed = true;
        }, this.longPressTime);
    }
    onTouchMove({ clientX , clientY  }) {
        // get values
        this.mouseX.current = clientX;
        this.mouseY.current = clientY;
        // transform to svg mouse values
        this.mouseY_svg.current = this.transformFromViewportToSVGElement(this.mouseX.current, this.mouseY.current, this.control_wrapper_params.screenCTM, this.control_wrapper_params.matrix).y;
    }
    onTouchEnd({ clientX , clientY  }) {
        this.mouseX.target = clientX;
        this.mouseY.target = clientY;
        this.mouseY_svg.target = this.transformFromViewportToSVGElement(this.mouseX.target, this.mouseY.target, this.control_wrapper_params.screenCTM, this.control_wrapper_params.matrix).y;
        // event states
        clearTimeout(this.startModeDelay);
        this.states.isLongPressed = false;
        this.states.isMouseUp = true;
        // dragend getback home latency
        window.setTimeout(()=>{
            this.states.isMouseUp = false;
        }, this.transitionMotionTime);
    }
    onMouseEnterR = (_)=>this.zoneRND = [
            true,
            false,
            false
        ];
    onMouseEnterN = (_)=>this.zoneRND = [
            false,
            true,
            false
        ];
    onMouseEnterD = (_)=>this.zoneRND = [
            false,
            false,
            true
        ];
    /* -------------
  ------------ LISTENERS
  -------------- */ addEventListeners(element) {
        // element.addEventListener('mousedown', this.onTouchStart.bind(this))
        // element.addEventListener('mousemove', this.onTouchMove.bind(this))
        // element.addEventListener('mouseup', this.onTouchEnd.bind(this))
        element.addEventListener("touchstart", this.onTouchStart.bind(this));
        element.addEventListener("touchmove", this.onTouchMove.bind(this));
        element.addEventListener("touchend", this.onTouchEnd.bind(this));
    }
    addSnapListeners() {
        this.rZone.addEventListener("mouseenter", this.onMouseEnterR.bind(this));
        this.rZone.addEventListener("touchmove", this.onMouseEnterR.bind(this));
        this.nZone.addEventListener("mouseenter", this.onMouseEnterN.bind(this));
        this.nZone.addEventListener("touchmove", this.onMouseEnterN.bind(this));
        this.dZone.addEventListener("mouseenter", this.onMouseEnterD.bind(this));
        this.dZone.addEventListener("touchmove", this.onMouseEnterD.bind(this));
    }
    /* -------------
   ------------ LOOPS & FRAMES
   -------------- */ update() {
        this.detectBoundingBox();
        this.detectMotionStates(this.motionStateName, this.control);
        switch(this.motionStateName){
            case "normalState":
                this.showNormalState();
                break;
            case "prepState":
                this.showPrepState();
                break;
            case "prepFailureState":
                this.showPrepFailureState();
                break;
            case "ondragState":
                this.showOndragState();
                break;
            case "ondragEndState":
                this.showOndragEndState();
                break;
        }
        // update next frames
        this.frame = window.requestAnimationFrame(this.update.bind(this));
    }
    /* -------------
  ------------ MOTION STATUS
  -------------- */ showNormalState() {
        this.changeBtnColor(this.motionStateName, this.control);
        // change outer shadow
        this.control_wrapper.classList.remove("btn__outerGlow-blue");
        this.control_wrapper.classList.remove("btn__outerGlow-white");
        this.control.removeAttribute("stroke");
        this.control_wrapper.classList.add("btn__dropShadow");
        console.log("normal state");
    }
    showPrepState() {
        // change outer shadow
        this.control_wrapper.classList.remove("btn__dropShadow");
        this.control_wrapper.classList.add("btn__outerGlow-blue");
        // color change effect
        console.log("prepMotion");
    }
    showPrepFailureState() {
        console.log("prepfailure shows!");
        //audio
        this.sounds.error.play();
        // bouncy effect
        this.control_wrapper.animate([
            {
                transform: "none"
            },
            {
                transform: "scaleX(1) scaleY(1)",
                offset: 0
            },
            {
                transform: "scaleX(1.1) scaleY(0.95)",
                offset: 0.05
            },
            {
                transform: "scaleX(1) scaleY(1)",
                offset: 0.1
            }
        ], {
            easing: "ease-in-out",
            duration: 100,
            iterations: 3
        });
        // transition back to normal state
        window.setTimeout(()=>{
            this.states.isTapped = false;
        }, this.transitionMotionTime);
    }
    showOndragState() {
        console.log("is dragging!");
        this.changeBtnColor(this.motionStateName, this.control);
        // reset current mouse value to the center
        // pass transformed mouse positions to SVG wrapper
        this.control_wrapper_params.matrix[5] = parseFloat(this.mouseY_svg.current) - parseFloat(this.control.getAttribute("y")) - this.control.height.animVal.value / 2;
        this.control_wrapper.setAttribute("transform", `matrix(${this.control_wrapper_params.matrix.join(",")})`);
    }
    showOndragEndState() {
        console.log("drag ends");
        // change button color
        this.changeBtnColor(this.motionStateName, this.control);
        // change button outer shadow
        this.control_wrapper.classList.remove("btn__outerGlow-blue");
        this.control_wrapper.classList.add("btn__outerGlow-white");
        this.control.setAttribute("stroke", "#94E8FF");
        // snapping
        const snapY_viewport = {
            min: this.bound_rZone.bottom,
            max: this.bound_dZone.top
        };
        const snapY_svgCanvas = {};
        // get Y min value in SVG coordinate
        snapY_svgCanvas.min = this.transformFromViewportToSVGElement(0, snapY_viewport.min, this.control_wrapper_params.screenCTM, this.control_wrapper_params.matrix).y - parseFloat(this.control.getAttribute("y")) - this.control.height.animVal.value;
        // get Y max value in SVG coordinate
        snapY_svgCanvas.max = this.transformFromViewportToSVGElement(0, snapY_viewport.max, this.control_wrapper_params.screenCTM, this.control_wrapper_params.matrix).y - parseFloat(this.control.getAttribute("y"));
        const matrix = this.getSVGMatrix(this.control_wrapper);
        //snap detection
        matrix[5] = this.zoneRND[0] ? snapY_svgCanvas.min // snap to rzone
         : this.zoneRND[2] ? snapY_svgCanvas.max // snap to dzone
         : 0 // snap to nzone
        ;
        // change gear_name style
        const gearR = document.getElementById("gearR");
        const gearN = document.getElementById("gearN");
        const gearD = document.getElementById("gearD");
        if (this.zoneRND[0]) {
            gearR.classList.add("gear__name--active");
            gearN.classList.remove("gear__name--active");
            gearD.classList.remove("gear__name--active");
        } else if (this.zoneRND[1]) {
            gearR.classList.remove("gear__name--active");
            gearN.classList.add("gear__name--active");
            gearD.classList.remove("gear__name--active");
        } else if (this.zoneRND[2]) {
            gearR.classList.remove("gear__name--active");
            gearN.classList.remove("gear__name--active");
            gearD.classList.add("gear__name--active");
            gearD.style.transform = "translateY(-2px)";
        }
        // implement snap
        this.control_wrapper.setAttribute("transform", `matrix(${matrix.join(",")})`);
    }
    /* -------------
  ------------ UTILS
  -------------- */ detectMotionStates() {
        if (this.states.isTapped && !this.states.isMouseUp) this.motionStateName = "prepState";
        else if (this.states.isTapped && this.states.isMouseUp) this.motionStateName = "prepFailureState";
        else if (this.states.isLongPressed && this.inInteractiveArea) this.motionStateName = "ondragState";
        else if (this.states.isMouseUp && !this.states.isTapped) this.motionStateName = "ondragEndState";
        else this.motionStateName = "normalState";
    }
    detectBoundingBox() {
        const yMin = this.bound.top + this.control.height.animVal.value / 1.4;
        const yMax = this.bound.top + this.bound.height - this.control.height.animVal.value / 1.4;
        if (yMin < this.mouseY.current && this.mouseY.current < yMax) this.inInteractiveArea = true;
        else this.inInteractiveArea = false;
    }
    changeBtnColor(motionStateName, control) {
        let controlId = control.getAttribute("class");
        let gradientId = controlId.replace(/^btn(\w+)-color$/, "#linear-gradient-$1");
        let gradient = document.querySelector(`${gradientId}`);
        let gradientVals = gradient.querySelectorAll("stop");
        if (motionStateName === "normalState") {
            // turn grey
            gradientVals[0].setAttribute("stop-color", "#93969b");
            gradientVals[1].setAttribute("stop-color", "#1f1f1f");
        } else {
            // turn blue
            gradientVals[0].setAttribute("stop-color", "#88aaf0");
            gradientVals[1].setAttribute("stop-color", "#0d57f1");
        }
    }
    transformFromViewportToSVGElement(mouseX, mouseY, sctm, svgMatrix) {
        const point = new DOMPoint(mouseX, mouseY);
        // const screenCTM = svgElement.getScreenCTM()
        // const svgElementMatrix = getSVGMatrix(svgElement)
        const transformedPoint = point.matrixTransform(sctm.inverse());
        // console.log(point, sctm, sctm.inverse(), transformedPoint)
        if (svgMatrix !== null) {
            transformedPoint.x *= svgMatrix[0] // scale x
            ;
            transformedPoint.y *= svgMatrix[3] // scale y
            ;
        }
        return {
            x: transformedPoint.x,
            y: transformedPoint.y
        };
    }
    getSVGMatrix(svgElement) {
        const matrix = svgElement.getAttribute("transform");
        return matrix.replace(/^matrix\(/, "").replace(/\)$/, "").split(",").map(parseFloat);
    }
}
new App();

},{}]},["bUI0q","9XOu0"], "9XOu0", "parcelRequirebb15")

//# sourceMappingURL=index.840f9702.js.map
