"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/userOrgs",{

/***/ "./pages/userOrgs/index.tsx":
/*!**********************************!*\
  !*** ./pages/userOrgs/index.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _components_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/navbar */ \"./components/navbar.tsx\");\n/* harmony import */ var _components_Animation_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/Animation/Loading */ \"./components/Animation/Loading.tsx\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _utils_tableland__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils/tableland */ \"./utils/tableland.js\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wagmi */ \"./node_modules/wagmi/dist/index.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nconst Index = ()=>{\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { address: account } = (0,wagmi__WEBPACK_IMPORTED_MODULE_7__.useAccount)();\n    const [organizations, setOrganizations] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    async function fetchIPFSMetadata(ipfsHash) {\n        const metadataUrl = \"https://ipfs.io/ipfs/\".concat(ipfsHash);\n        try {\n            const response = await fetch(metadataUrl);\n            if (!response.ok) throw new Error(\"Failed to fetch IPFS metadata\");\n            return await response.json();\n        } catch (error) {\n            console.error(\"Error fetching IPFS metadata:\", error);\n            return null;\n        }\n    }\n    async function getOrganizations() {\n        var _orgsWithMetadata__profileData_, _orgsWithMetadata_;\n        const orgs = await (0,_utils_utils__WEBPACK_IMPORTED_MODULE_5__.getUserOrganizations)(account);\n        const orgsWithMetadata = await Promise.all(orgs.map(async (org)=>{\n            var _org_profileData_;\n            const metadata = await fetchIPFSMetadata(\"\".concat(org === null || org === void 0 ? void 0 : (_org_profileData_ = org.profileData[0]) === null || _org_profileData_ === void 0 ? void 0 : _org_profileData_.ProfileMetadata));\n            let obj = {\n                ...org,\n                description: metadata === null || metadata === void 0 ? void 0 : metadata.description,\n                image: metadata === null || metadata === void 0 ? void 0 : metadata.image\n            };\n            return obj;\n        }));\n        await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_6__.getAllPoolsCreatedByProfile)((_orgsWithMetadata_ = orgsWithMetadata[0]) === null || _orgsWithMetadata_ === void 0 ? void 0 : (_orgsWithMetadata__profileData_ = _orgsWithMetadata_.profileData[0]) === null || _orgsWithMetadata__profileData_ === void 0 ? void 0 : _orgsWithMetadata__profileData_.profileID);\n        setOrganizations(orgsWithMetadata);\n        setIsLoading(false);\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        getOrganizations();\n    }, [\n        account\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {\n        w: \"full\",\n        bg: \"gray.100\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                lineNumber: 73,\n                columnNumber: 7\n            }, undefined),\n            isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Animation_Loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                lineNumber: 75,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Grid, {\n                p: 5,\n                templateColumns: \"repeat(auto-fill, minmax(250px, 1fr))\",\n                gap: 6,\n                mt: {\n                    base: \"12%\",\n                    md: \"3%\"\n                },\n                mx: \"13%\",\n                children: organizations.map((orgData, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.GridItem, {\n                        bg: \"white\",\n                        boxShadow: \"xl\",\n                        p: 5,\n                        rounded: \"xl\",\n                        transition: \"transform 0.2s, box-shadow 0.2s\",\n                        _hover: {\n                            transform: \"scale(1.05)\",\n                            boxShadow: \"2xl\"\n                        },\n                        border: \"1px solid\",\n                        borderColor: \"gray.200\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Badge, {\n                                colorScheme: orgData.type === \"ADMIN\" ? \"red\" : orgData.type === \"MANAGER\" ? \"purple\" : \"blue\",\n                                fontSize: \"sm\",\n                                children: orgData.type\n                            }, void 0, false, {\n                                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                lineNumber: 96,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                className: \"flex flex-col items-center\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Text, {\n                                        mb: \"3\",\n                                        fontWeight: \"bold\",\n                                        fontSize: \"lg\",\n                                        children: orgData.profileData[0].name\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                        lineNumber: 109,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Image, {\n                                        src: \"\".concat(orgData.image),\n                                        alt: orgData.profileData[0].name,\n                                        borderRadius: \"lg\",\n                                        w: \"100\",\n                                        h: \"100\",\n                                        mt: 2\n                                    }, void 0, false, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                        lineNumber: 112,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                lineNumber: 108,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                p: 3,\n                                mt: 5,\n                                mb: 1,\n                                bg: \"gray.50\",\n                                rounded: \"md\",\n                                border: \"2px solid\",\n                                borderColor: \"gray.200\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Text, {\n                                    fontSize: \"sm\",\n                                    color: \"gray.600\",\n                                    noOfLines: 3,\n                                    children: orgData.description\n                                }, void 0, false, {\n                                    fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                    lineNumber: 131,\n                                    columnNumber: 17\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {\n                                mt: 4,\n                                className: \"flex flex-col items-center\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Badge, {\n                                        colorScheme: \"green\",\n                                        fontSize: \"sm\",\n                                        children: [\n                                            \"Distributed \",\n                                            orgData.profileData[0].fundsDistributed,\n                                            \" In\",\n                                            \" \",\n                                            orgData.profileData[0].poolsCreated,\n                                            \" Pools\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                        lineNumber: 137,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Badge, {\n                                        colorScheme: \"blue\",\n                                        fontSize: \"sm\",\n                                        mt: 1,\n                                        children: [\n                                            \"Received \",\n                                            orgData.profileData[0].fundsReceived,\n                                            \" From\",\n                                            \" \",\n                                            orgData.profileData[0].poolsRegistered,\n                                            \" Pools\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                        lineNumber: 141,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                lineNumber: 136,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Button, {\n                                mt: 4,\n                                colorScheme: \"blue\",\n                                w: \"full\",\n                                onClick: ()=>router.push({\n                                        pathname: \"/OrganizationProfile\",\n                                        query: {\n                                            orgID: orgData.profileData[0].profileID,\n                                            Access: orgData.type\n                                        }\n                                    }),\n                                children: \"View Details\"\n                            }, void 0, false, {\n                                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                                lineNumber: 147,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, index, true, {\n                        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                        lineNumber: 85,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n                lineNumber: 77,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/nick-w3/Desktop/AlloHackathon/client/pages/userOrgs/index.tsx\",\n        lineNumber: 72,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Index, \"pKHMtIxQd0G0PnJtLBIUONTIGEE=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        wagmi__WEBPACK_IMPORTED_MODULE_7__.useAccount\n    ];\n});\n_c = Index;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Index);\nvar _c;\n$RefreshReg$(_c, \"Index\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FDTEMsT0FBTTlCLFFBQVFmLFdBQVcsQ0FBQyxFQUFFLENBQUNLLFNBQVM7NENBQ3RDeUMsUUFBUS9CLFFBQVFVLElBQUk7d0NBQ3RCO29DQUNGOzBDQUVIOzs7Ozs7O3VCQTFFSVQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtRm5CO0dBbEpNMUM7O1FBQ1diLGtEQUFTQTtRQUNLWSw2Q0FBVUE7OztLQUZuQ0M7QUFvSk4sK0RBQWVBLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdXNlck9yZ3MvaW5kZXgudHN4Pzk5OTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHtcbiAgQm94LFxuICBJbWFnZSxcbiAgVGV4dCxcbiAgTGluayxcbiAgR3JpZCxcbiAgR3JpZEl0ZW0sXG4gIEJhZGdlLFxuICBCdXR0b24sXG59IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgeyBGYVR3aXR0ZXIsIEZhR2l0aHViLCBGYUdsb2JlIH0gZnJvbSBcInJlYWN0LWljb25zL2ZhXCI7XG5pbXBvcnQgTmF2YmFyIGZyb20gXCJAL2NvbXBvbmVudHMvbmF2YmFyXCI7XG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiQC9jb21wb25lbnRzL0FuaW1hdGlvbi9Mb2FkaW5nXCI7XG5pbXBvcnQgeyBnZXRVc2VyT3JnYW5pemF0aW9ucyB9IGZyb20gXCJAL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQge1xuICBnZXRBbGxQb29sc0NyZWF0ZWRCeVByb2ZpbGUsXG4gIGdldEFsbFBvb2xzUmVnaXN0ZXJlZEJ5UHJvZmlsZSxcbn0gZnJvbSBcIkAvdXRpbHMvdGFibGVsYW5kXCI7XG5pbXBvcnQgeyB1c2VBY2NvdW50IH0gZnJvbSBcIndhZ21pXCI7XG5cbmNvbnN0IEluZGV4ID0gKCkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgeyBhZGRyZXNzOiBhY2NvdW50IH0gPSB1c2VBY2NvdW50KCk7XG4gIGNvbnN0IFtvcmdhbml6YXRpb25zLCBzZXRPcmdhbml6YXRpb25zXSA9IHVzZVN0YXRlPGFueVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBhc3luYyBmdW5jdGlvbiBmZXRjaElQRlNNZXRhZGF0YShpcGZzSGFzaDogc3RyaW5nKSB7XG4gICAgY29uc3QgbWV0YWRhdGFVcmwgPSBgaHR0cHM6Ly9pcGZzLmlvL2lwZnMvJHtpcGZzSGFzaH1gO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKG1ldGFkYXRhVXJsKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBJUEZTIG1ldGFkYXRhXCIpO1xuICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIElQRlMgbWV0YWRhdGE6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldE9yZ2FuaXphdGlvbnMoKSB7XG4gICAgY29uc3Qgb3JncyA9IGF3YWl0IGdldFVzZXJPcmdhbml6YXRpb25zKGFjY291bnQpO1xuICAgIGNvbnN0IG9yZ3NXaXRoTWV0YWRhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIG9yZ3MubWFwKGFzeW5jIChvcmcpID0+IHtcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBmZXRjaElQRlNNZXRhZGF0YShcbiAgICAgICAgICBgJHtvcmc/LnByb2ZpbGVEYXRhWzBdPy5Qcm9maWxlTWV0YWRhdGF9YFxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgLi4ub3JnLFxuXG4gICAgICAgICAgZGVzY3JpcHRpb246IG1ldGFkYXRhPy5kZXNjcmlwdGlvbiBhcyBzdHJpbmcsXG5cbiAgICAgICAgICBpbWFnZTogbWV0YWRhdGE/LmltYWdlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgYXdhaXQgZ2V0QWxsUG9vbHNDcmVhdGVkQnlQcm9maWxlKFxuICAgICAgb3Jnc1dpdGhNZXRhZGF0YVswXT8ucHJvZmlsZURhdGFbMF0/LnByb2ZpbGVJRFxuICAgICk7XG4gICAgc2V0T3JnYW5pemF0aW9ucyhvcmdzV2l0aE1ldGFkYXRhKTtcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXRPcmdhbml6YXRpb25zKCk7XG4gIH0sIFthY2NvdW50XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94IHc9XCJmdWxsXCIgYmc9XCJncmF5LjEwMFwiPlxuICAgICAgPE5hdmJhciAvPlxuICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgPExvYWRpbmcgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxHcmlkXG4gICAgICAgICAgcD17NX1cbiAgICAgICAgICB0ZW1wbGF0ZUNvbHVtbnM9XCJyZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMjUwcHgsIDFmcikpXCJcbiAgICAgICAgICBnYXA9ezZ9XG4gICAgICAgICAgbXQ9e3sgYmFzZTogXCIxMiVcIiwgbWQ6IFwiMyVcIiB9fVxuICAgICAgICAgIG14PVwiMTMlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtvcmdhbml6YXRpb25zLm1hcCgob3JnRGF0YSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxHcmlkSXRlbVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBiZz1cIndoaXRlXCJcbiAgICAgICAgICAgICAgYm94U2hhZG93PVwieGxcIlxuICAgICAgICAgICAgICBwPXs1fVxuICAgICAgICAgICAgICByb3VuZGVkPVwieGxcIlxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPVwidHJhbnNmb3JtIDAuMnMsIGJveC1zaGFkb3cgMC4yc1wiXG4gICAgICAgICAgICAgIF9ob3Zlcj17eyB0cmFuc2Zvcm06IFwic2NhbGUoMS4wNSlcIiwgYm94U2hhZG93OiBcIjJ4bFwiIH19XG4gICAgICAgICAgICAgIGJvcmRlcj1cIjFweCBzb2xpZFwiXG4gICAgICAgICAgICAgIGJvcmRlckNvbG9yPVwiZ3JheS4yMDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8QmFkZ2VcbiAgICAgICAgICAgICAgICBjb2xvclNjaGVtZT17XG4gICAgICAgICAgICAgICAgICBvcmdEYXRhLnR5cGUgPT09IFwiQURNSU5cIlxuICAgICAgICAgICAgICAgICAgICA/IFwicmVkXCJcbiAgICAgICAgICAgICAgICAgICAgOiBvcmdEYXRhLnR5cGUgPT09IFwiTUFOQUdFUlwiXG4gICAgICAgICAgICAgICAgICAgID8gXCJwdXJwbGVcIlxuICAgICAgICAgICAgICAgICAgICA6IFwiYmx1ZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvbnRTaXplPVwic21cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge29yZ0RhdGEudHlwZX1cbiAgICAgICAgICAgICAgPC9CYWRnZT5cbiAgICAgICAgICAgICAgPEJveCBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxUZXh0IG1iPVwiM1wiIGZvbnRXZWlnaHQ9XCJib2xkXCIgZm9udFNpemU9XCJsZ1wiPlxuICAgICAgICAgICAgICAgICAge29yZ0RhdGEucHJvZmlsZURhdGFbMF0ubmFtZX1cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgICAgICBzcmM9e2Ake29yZ0RhdGEuaW1hZ2V9YH1cbiAgICAgICAgICAgICAgICAgIGFsdD17b3JnRGF0YS5wcm9maWxlRGF0YVswXS5uYW1lfVxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzPVwibGdcIlxuICAgICAgICAgICAgICAgICAgdz1cIjEwMFwiXG4gICAgICAgICAgICAgICAgICBoPVwiMTAwXCJcbiAgICAgICAgICAgICAgICAgIG10PXsyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICBwPXszfVxuICAgICAgICAgICAgICAgIG10PXs1fVxuICAgICAgICAgICAgICAgIG1iPXsxfVxuICAgICAgICAgICAgICAgIGJnPVwiZ3JheS41MFwiXG4gICAgICAgICAgICAgICAgcm91bmRlZD1cIm1kXCJcbiAgICAgICAgICAgICAgICBib3JkZXI9XCIycHggc29saWRcIlxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yPVwiZ3JheS4yMDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9XCJzbVwiIGNvbG9yPVwiZ3JheS42MDBcIiBub09mTGluZXM9ezN9PlxuICAgICAgICAgICAgICAgICAge29yZ0RhdGEuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICA8Qm94IG10PXs0fSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxCYWRnZSBjb2xvclNjaGVtZT1cImdyZWVuXCIgZm9udFNpemU9XCJzbVwiPlxuICAgICAgICAgICAgICAgICAgRGlzdHJpYnV0ZWQge29yZ0RhdGEucHJvZmlsZURhdGFbMF0uZnVuZHNEaXN0cmlidXRlZH0gSW57XCIgXCJ9XG4gICAgICAgICAgICAgICAgICB7b3JnRGF0YS5wcm9maWxlRGF0YVswXS5wb29sc0NyZWF0ZWR9IFBvb2xzXG4gICAgICAgICAgICAgICAgPC9CYWRnZT5cbiAgICAgICAgICAgICAgICA8QmFkZ2UgY29sb3JTY2hlbWU9XCJibHVlXCIgZm9udFNpemU9XCJzbVwiIG10PXsxfT5cbiAgICAgICAgICAgICAgICAgIFJlY2VpdmVkIHtvcmdEYXRhLnByb2ZpbGVEYXRhWzBdLmZ1bmRzUmVjZWl2ZWR9IEZyb217XCIgXCJ9XG4gICAgICAgICAgICAgICAgICB7b3JnRGF0YS5wcm9maWxlRGF0YVswXS5wb29sc1JlZ2lzdGVyZWR9IFBvb2xzXG4gICAgICAgICAgICAgICAgPC9CYWRnZT5cbiAgICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIG10PXs0fVxuICAgICAgICAgICAgICAgIGNvbG9yU2NoZW1lPVwiYmx1ZVwiXG4gICAgICAgICAgICAgICAgdz1cImZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICByb3V0ZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBgL09yZ2FuaXphdGlvblByb2ZpbGVgLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICAgIG9yZ0lEOm9yZ0RhdGEucHJvZmlsZURhdGFbMF0ucHJvZmlsZUlELFxuICAgICAgICAgICAgICAgICAgICAgIEFjY2Vzczogb3JnRGF0YS50eXBlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBWaWV3IERldGFpbHNcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0dyaWRJdGVtPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0dyaWQ+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5kZXg7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJvdXRlciIsIkJveCIsIkltYWdlIiwiVGV4dCIsIkdyaWQiLCJHcmlkSXRlbSIsIkJhZGdlIiwiQnV0dG9uIiwiTmF2YmFyIiwiTG9hZGluZyIsImdldFVzZXJPcmdhbml6YXRpb25zIiwiZ2V0QWxsUG9vbHNDcmVhdGVkQnlQcm9maWxlIiwidXNlQWNjb3VudCIsIkluZGV4Iiwicm91dGVyIiwiYWRkcmVzcyIsImFjY291bnQiLCJvcmdhbml6YXRpb25zIiwic2V0T3JnYW5pemF0aW9ucyIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsImZldGNoSVBGU01ldGFkYXRhIiwiaXBmc0hhc2giLCJtZXRhZGF0YVVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsImdldE9yZ2FuaXphdGlvbnMiLCJvcmdzV2l0aE1ldGFkYXRhIiwib3JncyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJvcmciLCJtZXRhZGF0YSIsInByb2ZpbGVEYXRhIiwiUHJvZmlsZU1ldGFkYXRhIiwib2JqIiwiZGVzY3JpcHRpb24iLCJpbWFnZSIsInByb2ZpbGVJRCIsInciLCJiZyIsInAiLCJ0ZW1wbGF0ZUNvbHVtbnMiLCJnYXAiLCJtdCIsImJhc2UiLCJtZCIsIm14Iiwib3JnRGF0YSIsImluZGV4IiwiYm94U2hhZG93Iiwicm91bmRlZCIsInRyYW5zaXRpb24iLCJfaG92ZXIiLCJ0cmFuc2Zvcm0iLCJib3JkZXIiLCJib3JkZXJDb2xvciIsImNvbG9yU2NoZW1lIiwidHlwZSIsImZvbnRTaXplIiwiY2xhc3NOYW1lIiwibWIiLCJmb250V2VpZ2h0IiwibmFtZSIsInNyYyIsImFsdCIsImJvcmRlclJhZGl1cyIsImgiLCJjb2xvciIsIm5vT2ZMaW5lcyIsImZ1bmRzRGlzdHJpYnV0ZWQiLCJwb29sc0NyZWF0ZWQiLCJmdW5kc1JlY2VpdmVkIiwicG9vbHNSZWdpc3RlcmVkIiwib25DbGljayIsInB1c2giLCJwYXRobmFtZSIsInF1ZXJ5Iiwib3JnSUQiLCJBY2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/userOrgs/index.tsx\n"));

/***/ })

});