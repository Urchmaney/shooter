/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./img/space-shooter.png":
/*!*******************************!*\
  !*** ./img/space-shooter.png ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"73d7c9194abf0fdfea07cca4d69d665d.png\");\n\n//# sourceURL=webpack:///./img/space-shooter.png?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bullet; });\nclass Bullet {\n  constructor(x = 0, y = 0, interval = 5, width = 5, height = 10) {\n    this.interval = interval;\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n  }\n\n  move() {\n    this.y += this.interval;\n  }\n\n  getPosition() {\n    return { x: this.x, y: this.y };\n  }\n\n  get() {\n    const bullet = document.createElement('div');\n    bullet.style.width = `${this.width}px`;\n    bullet.style.height = `${this.height}px`;\n    bullet.style.position = 'absolute';\n    bullet.style.bottom = `${this.y}px`;\n    bullet.style.left = `${this.x}px`;\n    bullet.style.backgroundColor = 'red';\n    return bullet;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shooter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shooter */ \"./src/shooter.js\");\n/* harmony import */ var _bullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\n\n\nconst bullets = [];\nconst shooter = new _shooter__WEBPACK_IMPORTED_MODULE_0__[\"default\"](window.innerWidth);\nconst main = document.getElementById('main');\n\nconst displayBoard = () => {\n  main.innerHTML = '';\n  main.appendChild(shooter.get());\n  bullets.forEach(bullet => main.appendChild(bullet.get()));\n};\n\nconst moveBullets = () => {\n  const windowHeight = window.innerHeight;\n  bullets.forEach(bullet => {\n    bullet.move();\n    // possible bug\n    if (bullet.getPosition().y > windowHeight) bullets.shift();\n  });\n  displayBoard();\n};\n\nwindow.addEventListener('load', () => {\n  displayBoard();\n});\n\nwindow.addEventListener('keydown', (e) => {\n  if (e.keyCode === 39) shooter.moveRight();\n  if (e.keyCode === 37) shooter.moveLeft();\n  if (e.keyCode === 32) bullets.push(new _bullet__WEBPACK_IMPORTED_MODULE_1__[\"default\"](shooter.getPosition(), 110, 20));\n});\n\nconst interval = setInterval(moveBullets, 100);\n\nsetTimeout(() => {\n  clearInterval(interval);\n}, 20000);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/shooter.js":
/*!************************!*\
  !*** ./src/shooter.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Shooter; });\n/* harmony import */ var _img_space_shooter_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/space-shooter.png */ \"./img/space-shooter.png\");\n\n\nclass Shooter {\n  constructor(boardSize, moveBy = 5, width = 100, height = 100) {\n    this.size = boardSize;\n    this.moveBy = moveBy;\n    this.position = this.size / 2;\n    this.width = width;\n    this.height = height;\n  }\n\n  moveRight() {\n    this.position += this.position >= this.size - (this.width / 2) ? 0 : this.moveBy;\n  }\n\n  moveLeft() {\n    this.position -= this.position <= (this.width / 2) ? 0 : this.moveBy;\n  }\n\n  getPosition() {\n    return this.position;\n  }\n\n  get() {\n    const img = document.createElement('img');\n    img.src = _img_space_shooter_png__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n    img.style.position = 'absolute';\n    img.style.bottom = 0;\n    img.style.left = `${this.position - (this.width / 2)}px`;\n    img.height = this.height;\n    img.width = this.width;\n    return img;\n  }\n}\n\n//# sourceURL=webpack:///./src/shooter.js?");

/***/ })

/******/ });