/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/navbar.tsx":
/*!*******************************!*\
  !*** ./components/navbar.tsx ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__]);\n_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst Navbar = ()=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed z-50 top-0 left-0 w-full\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-screen bg-gradient-to-r from-gray via-gray to-gray-800 border border-4 border-black rounded-md \",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-between mx-6 ml-10 mb-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        onClick: ()=>router.push(\"/\"),\n                        className: \"mt-2 cursor-pointer\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-semibold text-gray-200 mt-3 text-2xl\",\n                            children: \"\\uD83D\\uDE80RocketFunding\"\n                        }, void 0, false, {\n                            fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                            lineNumber: 12,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                        lineNumber: 11,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center mx-auto\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \" px-1 py-1 rounded-3xl flex mt-4 \",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    onClick: ()=>router.push(\"/userProfiles\"),\n                                    className: \"bg-gray-100 rounded-3xl px-2 py-1 mx-1 cursor-pointer \",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \" text-center text-md font-semibold my-auto text-black\",\n                                        children: \"Profiles\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                                        lineNumber: 22,\n                                        columnNumber: 17\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                                    lineNumber: 18,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    onClick: ()=>router.push(\"/pools\"),\n                                    className: \"bg-gray-100 rounded-3xl px-2 py-1 mx-1 cursor-pointer\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-center text-md font-semibold my-auto text-black\",\n                                        children: \"Pools\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                                        lineNumber: 30,\n                                        columnNumber: 17\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                                    lineNumber: 26,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    onClick: ()=>router.push(\"/create\"),\n                                    className: \"bg-gray-100 rounded-3xl px-2 py-1 mx-1 cursor-pointer\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                        className: \"text-center text-md font-semibold my-auto text-black\",\n                                        children: \"Create\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                                        lineNumber: 38,\n                                        columnNumber: 17\n                                    }, undefined)\n                                }, void 0, false, {\n                                    fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                                    lineNumber: 34,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                            lineNumber: 17,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                        lineNumber: 16,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-4\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_1__.ConnectButton, {\n                            accountStatus: \"full\",\n                            showBalance: false,\n                            chainStatus: \"full\"\n                        }, void 0, false, {\n                            fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                            lineNumber: 45,\n                            columnNumber: 13\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n                lineNumber: 10,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/components/navbar.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL25hdmJhci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXVEO0FBQ2Y7QUFDZDtBQUUxQixNQUFNRyxTQUFTO0lBQ2IsTUFBTUMsU0FBU0gsc0RBQVNBO0lBQ3hCLHFCQUNFLDhEQUFDSTtRQUFJQyxXQUFVO2tCQUNiLDRFQUFDRDtZQUFJQyxXQUFVO3NCQUNiLDRFQUFDRDtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNEO3dCQUFJRSxTQUFTLElBQU1ILE9BQU9JLElBQUksQ0FBQzt3QkFBTUYsV0FBVTtrQ0FDOUMsNEVBQUNHOzRCQUFFSCxXQUFVO3NDQUE0Qzs7Ozs7Ozs7Ozs7a0NBSTNELDhEQUFDRDt3QkFBSUMsV0FBVTtrQ0FDYiw0RUFBQ0Q7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDRDtvQ0FDQ0UsU0FBUyxJQUFNSCxPQUFPSSxJQUFJLENBQUM7b0NBQzNCRixXQUFVOzhDQUVWLDRFQUFDRzt3Q0FBRUgsV0FBVTtrREFBd0Q7Ozs7Ozs7Ozs7OzhDQUl2RSw4REFBQ0Q7b0NBQ0NFLFNBQVMsSUFBTUgsT0FBT0ksSUFBSSxDQUFDO29DQUMzQkYsV0FBVTs4Q0FFViw0RUFBQ0c7d0NBQUVILFdBQVU7a0RBQXVEOzs7Ozs7Ozs7Ozs4Q0FJdEUsOERBQUNEO29DQUNDRSxTQUFTLElBQU1ILE9BQU9JLElBQUksQ0FBQztvQ0FDM0JGLFdBQVU7OENBRVYsNEVBQUNHO3dDQUFFSCxXQUFVO2tEQUF1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FNMUUsOERBQUNEO3dCQUFJQyxXQUFVO2tDQUNiLDRFQUFDTixpRUFBYUE7NEJBQ1pVLGVBQWM7NEJBQ2RDLGFBQWE7NEJBQ2JDLGFBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU8xQjtBQUVBLGlFQUFlVCxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwLy4vY29tcG9uZW50cy9uYXZiYXIudHN4PzdmMGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29ubmVjdEJ1dHRvbiB9IGZyb20gXCJAcmFpbmJvdy1tZS9yYWluYm93a2l0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgTmF2YmFyID0gKCkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIHotNTAgdG9wLTAgbGVmdC0wIHctZnVsbFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LXNjcmVlbiBiZy1ncmFkaWVudC10by1yIGZyb20tZ3JheSB2aWEtZ3JheSB0by1ncmF5LTgwMCBib3JkZXIgYm9yZGVyLTQgYm9yZGVyLWJsYWNrIHJvdW5kZWQtbWQgXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gbXgtNiBtbC0xMCBtYi00XCI+XG4gICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9cIil9IGNsYXNzTmFtZT1cIm10LTIgY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTIwMCBtdC0zIHRleHQtMnhsXCI+XG4gICAgICAgICAgICAgIPCfmoBSb2NrZXRGdW5kaW5nXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIG14LWF1dG9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIHB4LTEgcHktMSByb3VuZGVkLTN4bCBmbGV4IG10LTQgXCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi91c2VyUHJvZmlsZXNcIil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JheS0xMDAgcm91bmRlZC0zeGwgcHgtMiBweS0xIG14LTEgY3Vyc29yLXBvaW50ZXIgXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIiB0ZXh0LWNlbnRlciB0ZXh0LW1kIGZvbnQtc2VtaWJvbGQgbXktYXV0byB0ZXh0LWJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICBQcm9maWxlc1xuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9wb29sc1wiKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmF5LTEwMCByb3VuZGVkLTN4bCBweC0yIHB5LTEgbXgtMSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LW1kIGZvbnQtc2VtaWJvbGQgbXktYXV0byB0ZXh0LWJsYWNrXCI+XG4gICAgICAgICAgICAgICAgICBQb29sc1xuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9jcmVhdGVcIil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JheS0xMDAgcm91bmRlZC0zeGwgcHgtMiBweS0xIG14LTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgdGV4dC1tZCBmb250LXNlbWlib2xkIG15LWF1dG8gdGV4dC1ibGFja1wiPlxuICAgICAgICAgICAgICAgICAgQ3JlYXRlXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNFwiPlxuICAgICAgICAgICAgPENvbm5lY3RCdXR0b25cbiAgICAgICAgICAgICAgYWNjb3VudFN0YXR1cz1cImZ1bGxcIlxuICAgICAgICAgICAgICBzaG93QmFsYW5jZT17ZmFsc2V9XG4gICAgICAgICAgICAgIGNoYWluU3RhdHVzPVwiZnVsbFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyO1xuIl0sIm5hbWVzIjpbIkNvbm5lY3RCdXR0b24iLCJ1c2VSb3V0ZXIiLCJSZWFjdCIsIk5hdmJhciIsInJvdXRlciIsImRpdiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJwdXNoIiwicCIsImFjY291bnRTdGF0dXMiLCJzaG93QmFsYW5jZSIsImNoYWluU3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/navbar.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/navbar */ \"./components/navbar.tsx\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rainbow-me/rainbowkit/styles.css */ \"./node_modules/@rainbow-me/rainbowkit/dist/index.css\");\n/* harmony import */ var _rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_rainbow_me_rainbowkit_styles_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rainbow-me/rainbowkit */ \"@rainbow-me/rainbowkit\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_chains__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wagmi/chains */ \"wagmi/chains\");\n/* harmony import */ var wagmi_providers_public__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! wagmi/providers/public */ \"wagmi/providers/public\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__, _components_navbar__WEBPACK_IMPORTED_MODULE_3__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__, wagmi__WEBPACK_IMPORTED_MODULE_6__, wagmi_chains__WEBPACK_IMPORTED_MODULE_7__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_8__]);\n([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__, _components_navbar__WEBPACK_IMPORTED_MODULE_3__, _rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__, wagmi__WEBPACK_IMPORTED_MODULE_6__, wagmi_chains__WEBPACK_IMPORTED_MODULE_7__, wagmi_providers_public__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\nconst { chains, publicClient } = (0,wagmi__WEBPACK_IMPORTED_MODULE_6__.configureChains)([\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_7__.arbitrumSepolia,\n    wagmi_chains__WEBPACK_IMPORTED_MODULE_7__.arbitrum\n], [\n    (0,wagmi_providers_public__WEBPACK_IMPORTED_MODULE_8__.publicProvider)()\n]);\nconst { connectors } = (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__.getDefaultWallets)({\n    appName: \"My RainbowKit App\",\n    projectId: \"ad9d4173328447d73a95b113fec565eb\",\n    chains\n});\nconst wagmiConfig = (0,wagmi__WEBPACK_IMPORTED_MODULE_6__.createConfig)({\n    autoConnect: true,\n    connectors,\n    publicClient\n});\nconst id = \"\";\nfunction App({ Component, pageProps }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ChakraProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_6__.WagmiConfig, {\n            config: wagmiConfig,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__.RainbowKitProvider, {\n                theme: (0,_rainbow_me_rainbowkit__WEBPACK_IMPORTED_MODULE_5__.lightTheme)({\n                    accentColor: \"#e5e7eb\",\n                    accentColorForeground: \"black\",\n                    fontStack: \"system\"\n                }),\n                chains: chains,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/_app.tsx\",\n                        lineNumber: 49,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/_app.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/_app.tsx\",\n                lineNumber: 41,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/_app.tsx\",\n            lineNumber: 40,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/_app.tsx\",\n        lineNumber: 39,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBRW9CO0FBQ1Q7QUFDRTtBQUtYO0FBQ21DO0FBQ1Y7QUFDRDtBQUNoQjtBQUV4QyxNQUFNLEVBQUVZLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUdSLHNEQUFlQSxDQUM5QztJQUFDRyx5REFBZUE7SUFBRUMsa0RBQVFBO0NBQUMsRUFDM0I7SUFBQ0Msc0VBQWNBO0NBQUc7QUFHcEIsTUFBTSxFQUFFSSxVQUFVLEVBQUUsR0FBR1oseUVBQWlCQSxDQUFDO0lBQ3ZDYSxTQUFTO0lBQ1RDLFdBQVc7SUFDWEo7QUFDRjtBQUVBLE1BQU1LLGNBQWNYLG1EQUFZQSxDQUFDO0lBQy9CWSxhQUFhO0lBQ2JKO0lBQ0FEO0FBQ0Y7QUFFQSxNQUFNTSxLQUFLO0FBRUksU0FBU0MsSUFBSSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM1RCxNQUFNQyxTQUFTWixzREFBU0E7SUFFeEIscUJBQ0UsOERBQUNYLDREQUFjQTtrQkFDYiw0RUFBQ08sOENBQVdBO1lBQUNpQixRQUFRUDtzQkFDbkIsNEVBQUNkLHNFQUFrQkE7Z0JBQ2pCc0IsT0FBT3JCLGtFQUFVQSxDQUFDO29CQUNoQnNCLGFBQWE7b0JBQ2JDLHVCQUF1QjtvQkFDdkJDLFdBQVc7Z0JBQ2I7Z0JBQ0FoQixRQUFRQTs7a0NBRVIsOERBQUNYLDBEQUFNQTs7Ozs7a0NBQ1AsOERBQUNvQjt3QkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2xDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IHsgQ2hha3JhUHJvdmlkZXIgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IE5hdmJhciBmcm9tIFwiQC9jb21wb25lbnRzL25hdmJhclwiO1xuaW1wb3J0IFwiQHJhaW5ib3ctbWUvcmFpbmJvd2tpdC9zdHlsZXMuY3NzXCI7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0V2FsbGV0cyxcbiAgUmFpbmJvd0tpdFByb3ZpZGVyLFxuICBsaWdodFRoZW1lLFxufSBmcm9tIFwiQHJhaW5ib3ctbWUvcmFpbmJvd2tpdFwiO1xuaW1wb3J0IHsgY29uZmlndXJlQ2hhaW5zLCBjcmVhdGVDb25maWcsIFdhZ21pQ29uZmlnIH0gZnJvbSBcIndhZ21pXCI7XG5pbXBvcnQgeyBhcmJpdHJ1bVNlcG9saWEsIGFyYml0cnVtIH0gZnJvbSBcIndhZ21pL2NoYWluc1wiO1xuaW1wb3J0IHsgcHVibGljUHJvdmlkZXIgfSBmcm9tIFwid2FnbWkvcHJvdmlkZXJzL3B1YmxpY1wiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5cbmNvbnN0IHsgY2hhaW5zLCBwdWJsaWNDbGllbnQgfSA9IGNvbmZpZ3VyZUNoYWlucyhcbiAgW2FyYml0cnVtU2Vwb2xpYSwgYXJiaXRydW1dLFxuICBbcHVibGljUHJvdmlkZXIoKV0sXG4pO1xuXG5jb25zdCB7IGNvbm5lY3RvcnMgfSA9IGdldERlZmF1bHRXYWxsZXRzKHtcbiAgYXBwTmFtZTogXCJNeSBSYWluYm93S2l0IEFwcFwiLFxuICBwcm9qZWN0SWQ6IFwiYWQ5ZDQxNzMzMjg0NDdkNzNhOTViMTEzZmVjNTY1ZWJcIixcbiAgY2hhaW5zLFxufSk7XG5cbmNvbnN0IHdhZ21pQ29uZmlnID0gY3JlYXRlQ29uZmlnKHtcbiAgYXV0b0Nvbm5lY3Q6IHRydWUsXG4gIGNvbm5lY3RvcnMsXG4gIHB1YmxpY0NsaWVudCxcbn0pO1xuXG5jb25zdCBpZCA9IFwiXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gIHJldHVybiAoXG4gICAgPENoYWtyYVByb3ZpZGVyPlxuICAgICAgPFdhZ21pQ29uZmlnIGNvbmZpZz17d2FnbWlDb25maWd9PlxuICAgICAgICA8UmFpbmJvd0tpdFByb3ZpZGVyXG4gICAgICAgICAgdGhlbWU9e2xpZ2h0VGhlbWUoe1xuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiI2U1ZTdlYlwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3JGb3JlZ3JvdW5kOiBcImJsYWNrXCIsXG4gICAgICAgICAgICBmb250U3RhY2s6IFwic3lzdGVtXCIsXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgY2hhaW5zPXtjaGFpbnN9XG4gICAgICAgID5cbiAgICAgICAgICA8TmF2YmFyIC8+XG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L1JhaW5ib3dLaXRQcm92aWRlcj5cbiAgICAgIDwvV2FnbWlDb25maWc+XG4gICAgPC9DaGFrcmFQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJDaGFrcmFQcm92aWRlciIsIk5hdmJhciIsImdldERlZmF1bHRXYWxsZXRzIiwiUmFpbmJvd0tpdFByb3ZpZGVyIiwibGlnaHRUaGVtZSIsImNvbmZpZ3VyZUNoYWlucyIsImNyZWF0ZUNvbmZpZyIsIldhZ21pQ29uZmlnIiwiYXJiaXRydW1TZXBvbGlhIiwiYXJiaXRydW0iLCJwdWJsaWNQcm92aWRlciIsInVzZVJvdXRlciIsImNoYWlucyIsInB1YmxpY0NsaWVudCIsImNvbm5lY3RvcnMiLCJhcHBOYW1lIiwicHJvamVjdElkIiwid2FnbWlDb25maWciLCJhdXRvQ29ubmVjdCIsImlkIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicm91dGVyIiwiY29uZmlnIiwidGhlbWUiLCJhY2NlbnRDb2xvciIsImFjY2VudENvbG9yRm9yZWdyb3VuZCIsImZvbnRTdGFjayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@chakra-ui/react");;

/***/ }),

/***/ "@rainbow-me/rainbowkit":
/*!*****************************************!*\
  !*** external "@rainbow-me/rainbowkit" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@rainbow-me/rainbowkit");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/chains":
/*!*******************************!*\
  !*** external "wagmi/chains" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/chains");;

/***/ }),

/***/ "wagmi/providers/public":
/*!*****************************************!*\
  !*** external "wagmi/providers/public" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/providers/public");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@rainbow-me"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();