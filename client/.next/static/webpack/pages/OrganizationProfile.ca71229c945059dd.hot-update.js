"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/OrganizationProfile",{

/***/ "./utils/utils.js":
/*!************************!*\
  !*** ./utils/utils.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculateRemainingTime: function() { return /* binding */ calculateRemainingTime; },\n/* harmony export */   formatCurrency: function() { return /* binding */ formatCurrency; },\n/* harmony export */   getUserAdminOrgs: function() { return /* binding */ getUserAdminOrgs; },\n/* harmony export */   getUserOrganizations: function() { return /* binding */ getUserOrganizations; }\n/* harmony export */ });\n/* harmony import */ var _utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/graphFunctions */ \"./utils/graphFunctions.ts\");\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viem */ \"./node_modules/viem/_esm/index.js\");\n/* harmony import */ var _utils_tableland__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/tableland */ \"./utils/tableland.js\");\n/* harmony import */ var _constants_HackRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants/HackRegistry */ \"./constants/HackRegistry.ts\");\n\n\n\n\n\nconst formatCurrency = (value)=>{\n    value = BigInt(value) / BigInt(10 ** 18);\n    let formattedValue;\n    if (value < BigInt(1000)) {\n        // If value is less than a thousand\n        formattedValue = \"$\".concat(value.toString());\n    } else if (value < BigInt(1000000)) {\n        // If value is less than a million\n        formattedValue = \"$\".concat(value / BigInt(1000), \"K\");\n    } else if (value < BigInt(1000000000)) {\n        // If value is less than a billion\n        formattedValue = \"$\".concat(value / BigInt(1000000), \"M\");\n    } else if (value < BigInt(1000000000000)) {\n        // If value is less than a trillion\n        formattedValue = \"$\".concat(value / BigInt(1000000000), \"B\");\n    } else {\n        // If value is a trillion or more\n        formattedValue = \"$\".concat(value / BigInt(1000000000000), \"T\");\n    }\n    return formattedValue;\n};\nconst calculateRemainingTime = (currentTime, endTime)=>{\n    let remainingTimeInSeconds = endTime - currentTime;\n    remainingTimeInSeconds = parseInt(remainingTimeInSeconds);\n    const days = Math.floor(remainingTimeInSeconds / (3600 * 24));\n    const hours = Math.floor(remainingTimeInSeconds % (3600 * 24) / 3600);\n    const minutes = Math.floor(remainingTimeInSeconds % 3600 / 60);\n    let formattedTime = \"\";\n    if (days > 0) formattedTime += \"\".concat(days, \"d \");\n    if (hours > 0) formattedTime += \"\".concat(hours, \"h \");\n    if (minutes > 0) formattedTime += \"\".concat(minutes, \"m\");\n    return formattedTime || \"ENDED\";\n};\nconst getUserOrganizations = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        console.log(resp);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n        for (const wearer of resp.hat.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"MANAGER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n        for (const wearer of resp.hat.subhats.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"REVIEWER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n    }\n    return partOfProfiles;\n};\nconst getUserAdminOrgs = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n    }\n    return partOfProfiles;\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Y7UUFFQSxLQUFLLE1BQU1JLFVBQVViLEtBQUtJLEdBQUcsQ0FBQ1UsT0FBTyxDQUFDQSxPQUFPLENBQUNULE9BQU8sQ0FBRTtZQUNyRCxJQUFJUSxPQUFPUCxFQUFFLEtBQUlaLG9CQUFBQSw4QkFBQUEsUUFBU2EsV0FBVyxLQUFJO2dCQUN2QyxJQUFJUixPQUFPLE1BQU05QixpRUFBZUEsQ0FBQztvQkFBQzRCLFFBQVFXLFNBQVM7aUJBQUM7Z0JBQ3BELElBQUlDLE1BQU07b0JBQUVDLGFBQWFYO29CQUFNWSxNQUFNO2dCQUFXO2dCQUNoRGYsZUFBZWdCLElBQUksQ0FBQ0g7Z0JBQ3BCO1lBQ0Y7UUFDRjtJQUNGO0lBRUEsT0FBT2I7QUFDVCxFQUFFO0FBR0ssTUFBTW1CLG1CQUFtQixPQUFPckI7SUFDbkMsTUFBTUMsV0FBVyxNQUFNNUIsd0VBQXNCQTtJQUM3QyxJQUFJNkIsaUJBQWlCLEVBQUU7SUFDdkIsS0FBSyxNQUFNQyxXQUFXRixTQUFVO1FBQzlCLE1BQU1HLFdBQVdELFFBQVFDLFFBQVE7UUFDakMsSUFBSUMsT0FBT2pDLGtEQUFZQSxDQUFDO1lBQUM7U0FBVSxFQUFFO1lBQUNnQztTQUFTO1FBQy9DLElBQUlFLE9BQU8sTUFBTW5DLHFFQUFjQSxDQUFDa0M7UUFDaEMsTUFBTUksY0FBY0gsS0FBS0ksR0FBRyxDQUFDQyxPQUFPLENBQUMsRUFBRSxDQUFDQyxFQUFFLEtBQUlaLG9CQUFBQSw4QkFBQUEsUUFBU2EsV0FBVztRQUNsRSxJQUFJSixhQUFhO1lBQ2YsSUFBSUosT0FBTyxNQUFNOUIsaUVBQWVBLENBQUM7Z0JBQUM0QixRQUFRVyxTQUFTO2FBQUM7WUFDcEQsSUFBSUMsTUFBTTtnQkFBRUMsYUFBYVg7Z0JBQU1ZLE1BQU07WUFBUTtZQUM3Q2YsZUFBZWdCLElBQUksQ0FBQ0g7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBT2I7QUFDVCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3V0aWxzL3V0aWxzLmpzP2I4M2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UHJvZmlsZUhhdHMgfSBmcm9tIFwiQC91dGlscy9ncmFwaEZ1bmN0aW9uc1wiO1xuXG5pbXBvcnQgeyBlbmNvZGVQYWNrZWQgfSBmcm9tIFwidmllbVwiO1xuXG5pbXBvcnQge1xuICBnZXRBbGxQcm9maWxlc0FkbWluSGF0LFxuICBnZXRBbGxBY3RpdmVQb29scyxcbiAgZ2V0UHJvZmlsZXNEYXRhLFxuICBnZXRBbGxQb29sc0NyZWF0ZWRCeVByb2ZpbGUsXG4gIGdldEFsbFBvb2xzUmVnaXN0ZXJlZEJ5UHJvZmlsZSxcbn0gZnJvbSBcIkAvdXRpbHMvdGFibGVsYW5kXCI7XG5cbmltcG9ydCB7IHVzZUFjY291bnQsIHVzZVB1YmxpY0NsaWVudCwgdXNlV2FsbGV0Q2xpZW50IH0gZnJvbSBcIndhZ21pXCI7XG5pbXBvcnQgeyBDT05UUkFDVF9BQkksIENPTlRSQUNUX0FERFJFU1MgfSBmcm9tIFwiQC9jb25zdGFudHMvSGFja1JlZ2lzdHJ5XCI7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRDdXJyZW5jeSA9ICh2YWx1ZSkgPT4ge1xuICB2YWx1ZSA9IEJpZ0ludCh2YWx1ZSkgLyBCaWdJbnQoMTAgKiogMTgpO1xuXG4gIGxldCBmb3JtYXR0ZWRWYWx1ZTtcblxuICBpZiAodmFsdWUgPCBCaWdJbnQoMTAwMCkpIHtcbiAgICAvLyBJZiB2YWx1ZSBpcyBsZXNzIHRoYW4gYSB0aG91c2FuZFxuICAgIGZvcm1hdHRlZFZhbHVlID0gYCQke3ZhbHVlLnRvU3RyaW5nKCl9YDtcbiAgfSBlbHNlIGlmICh2YWx1ZSA8IEJpZ0ludCgxMDAwMDAwKSkge1xuICAgIC8vIElmIHZhbHVlIGlzIGxlc3MgdGhhbiBhIG1pbGxpb25cbiAgICBmb3JtYXR0ZWRWYWx1ZSA9IGAkJHsodmFsdWUgLyBCaWdJbnQoMTAwMCkpfUtgO1xuICB9IGVsc2UgaWYgKHZhbHVlIDwgQmlnSW50KDEwMDAwMDAwMDApKSB7XG4gICAgLy8gSWYgdmFsdWUgaXMgbGVzcyB0aGFuIGEgYmlsbGlvblxuICAgIGZvcm1hdHRlZFZhbHVlID0gYCQkeyh2YWx1ZSAvIEJpZ0ludCgxMDAwMDAwKSl9TWA7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCBCaWdJbnQoMTAwMDAwMDAwMDAwMCkpIHtcbiAgICAvLyBJZiB2YWx1ZSBpcyBsZXNzIHRoYW4gYSB0cmlsbGlvblxuICAgIGZvcm1hdHRlZFZhbHVlID0gYCQkeyh2YWx1ZSAvIEJpZ0ludCgxMDAwMDAwMDAwKSl9QmA7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgdmFsdWUgaXMgYSB0cmlsbGlvbiBvciBtb3JlXG4gICAgZm9ybWF0dGVkVmFsdWUgPSBgJCR7KHZhbHVlIC8gQmlnSW50KDEwMDAwMDAwMDAwMDApKX1UYDtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVSZW1haW5pbmdUaW1lID0gKGN1cnJlbnRUaW1lLCBlbmRUaW1lKSA9PiB7XG4gIGxldCByZW1haW5pbmdUaW1lSW5TZWNvbmRzID0gZW5kVGltZSAtIGN1cnJlbnRUaW1lO1xuICByZW1haW5pbmdUaW1lSW5TZWNvbmRzID0gcGFyc2VJbnQocmVtYWluaW5nVGltZUluU2Vjb25kcyk7XG4gIGNvbnN0IGRheXMgPSBNYXRoLmZsb29yKHJlbWFpbmluZ1RpbWVJblNlY29uZHMgLyAoMzYwMCAqIDI0KSk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcigocmVtYWluaW5nVGltZUluU2Vjb25kcyAlICgzNjAwICogMjQpKSAvIDM2MDApO1xuICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigocmVtYWluaW5nVGltZUluU2Vjb25kcyAlIDM2MDApIC8gNjApO1xuXG4gIGxldCBmb3JtYXR0ZWRUaW1lID0gXCJcIjtcbiAgaWYgKGRheXMgPiAwKSBmb3JtYXR0ZWRUaW1lICs9IGAke2RheXN9ZCBgO1xuICBpZiAoaG91cnMgPiAwKSBmb3JtYXR0ZWRUaW1lICs9IGAke2hvdXJzfWggYDtcbiAgaWYgKG1pbnV0ZXMgPiAwKSBmb3JtYXR0ZWRUaW1lICs9IGAke21pbnV0ZXN9bWA7XG5cbiAgcmV0dXJuIGZvcm1hdHRlZFRpbWUgfHwgXCJFTkRFRFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJPcmdhbml6YXRpb25zID0gYXN5bmMgKGFkZHJlc3MpID0+IHtcbiAgY29uc3QgcHJvZmlsZXMgPSBhd2FpdCBnZXRBbGxQcm9maWxlc0FkbWluSGF0KCk7XG4gIGxldCBwYXJ0T2ZQcm9maWxlcyA9IFtdO1xuICBmb3IgKGNvbnN0IHByb2ZpbGUgb2YgcHJvZmlsZXMpIHtcbiAgICBjb25zdCBhZG1pbkhhdCA9IHByb2ZpbGUuYWRtaW5IYXQ7XG4gICAgbGV0IGRhdGEgPSBlbmNvZGVQYWNrZWQoW1widWludDI1NlwiXSwgW2FkbWluSGF0XSk7XG4gICAgbGV0IHJlc3AgPSBhd2FpdCBnZXRQcm9maWxlSGF0cyhkYXRhKTtcbiAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICBjb25zdCBzZWFyY2hBZG1pbiA9IHJlc3AuaGF0LndlYXJlcnNbMF0uaWQgPT0gYWRkcmVzcz8udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc2VhcmNoQWRtaW4pIHtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0UHJvZmlsZXNEYXRhKFtwcm9maWxlLnByb2ZpbGVJRF0pO1xuICAgICAgbGV0IG9iaiA9IHsgcHJvZmlsZURhdGE6IGRhdGEsIHR5cGU6IFwiQURNSU5cIiB9O1xuICAgICAgcGFydE9mUHJvZmlsZXMucHVzaChvYmopO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGZvciAoY29uc3Qgd2VhcmVyIG9mIHJlc3AuaGF0LnN1YmhhdHMud2VhcmVycykge1xuICAgICAgaWYgKHdlYXJlci5pZCA9PSBhZGRyZXNzPy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0UHJvZmlsZXNEYXRhKFtwcm9maWxlLnByb2ZpbGVJRF0pO1xuICAgICAgICBsZXQgb2JqID0geyBwcm9maWxlRGF0YTogZGF0YSwgdHlwZTogXCJNQU5BR0VSXCIgfTtcbiAgICAgICAgcGFydE9mUHJvZmlsZXMucHVzaChvYmopO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHdlYXJlciBvZiByZXNwLmhhdC5zdWJoYXRzLnN1YmhhdHMud2VhcmVycykge1xuICAgICAgaWYgKHdlYXJlci5pZCA9PSBhZGRyZXNzPy50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0UHJvZmlsZXNEYXRhKFtwcm9maWxlLnByb2ZpbGVJRF0pO1xuICAgICAgICBsZXQgb2JqID0geyBwcm9maWxlRGF0YTogZGF0YSwgdHlwZTogXCJSRVZJRVdFUlwiIH07XG4gICAgICAgIHBhcnRPZlByb2ZpbGVzLnB1c2gob2JqKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRPZlByb2ZpbGVzO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0VXNlckFkbWluT3JncyA9IGFzeW5jIChhZGRyZXNzKSA9PiB7XG4gICAgY29uc3QgcHJvZmlsZXMgPSBhd2FpdCBnZXRBbGxQcm9maWxlc0FkbWluSGF0KCk7XG4gICAgbGV0IHBhcnRPZlByb2ZpbGVzID0gW107XG4gICAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgICBjb25zdCBhZG1pbkhhdCA9IHByb2ZpbGUuYWRtaW5IYXQ7XG4gICAgICBsZXQgZGF0YSA9IGVuY29kZVBhY2tlZChbXCJ1aW50MjU2XCJdLCBbYWRtaW5IYXRdKTtcbiAgICAgIGxldCByZXNwID0gYXdhaXQgZ2V0UHJvZmlsZUhhdHMoZGF0YSk7XG4gICAgICBjb25zdCBzZWFyY2hBZG1pbiA9IHJlc3AuaGF0LndlYXJlcnNbMF0uaWQgPT0gYWRkcmVzcz8udG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChzZWFyY2hBZG1pbikge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgICAgbGV0IG9iaiA9IHsgcHJvZmlsZURhdGE6IGRhdGEsIHR5cGU6IFwiQURNSU5cIiB9O1xuICAgICAgICBwYXJ0T2ZQcm9maWxlcy5wdXNoKG9iaik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIHBhcnRPZlByb2ZpbGVzO1xuICB9O1xuIl0sIm5hbWVzIjpbImdldFByb2ZpbGVIYXRzIiwiZW5jb2RlUGFja2VkIiwiZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCIsImdldEFsbEFjdGl2ZVBvb2xzIiwiZ2V0UHJvZmlsZXNEYXRhIiwiZ2V0QWxsUG9vbHNDcmVhdGVkQnlQcm9maWxlIiwiZ2V0QWxsUG9vbHNSZWdpc3RlcmVkQnlQcm9maWxlIiwidXNlQWNjb3VudCIsInVzZVB1YmxpY0NsaWVudCIsInVzZVdhbGxldENsaWVudCIsIkNPTlRSQUNUX0FCSSIsIkNPTlRSQUNUX0FERFJFU1MiLCJmb3JtYXRDdXJyZW5jeSIsInZhbHVlIiwiQmlnSW50IiwiZm9ybWF0dGVkVmFsdWUiLCJ0b1N0cmluZyIsImNhbGN1bGF0ZVJlbWFpbmluZ1RpbWUiLCJjdXJyZW50VGltZSIsImVuZFRpbWUiLCJyZW1haW5pbmdUaW1lSW5TZWNvbmRzIiwicGFyc2VJbnQiLCJkYXlzIiwiTWF0aCIsImZsb29yIiwiaG91cnMiLCJtaW51dGVzIiwiZm9ybWF0dGVkVGltZSIsImdldFVzZXJPcmdhbml6YXRpb25zIiwiYWRkcmVzcyIsInByb2ZpbGVzIiwicGFydE9mUHJvZmlsZXMiLCJwcm9maWxlIiwiYWRtaW5IYXQiLCJkYXRhIiwicmVzcCIsImNvbnNvbGUiLCJsb2ciLCJzZWFyY2hBZG1pbiIsImhhdCIsIndlYXJlcnMiLCJpZCIsInRvTG93ZXJDYXNlIiwicHJvZmlsZUlEIiwib2JqIiwicHJvZmlsZURhdGEiLCJ0eXBlIiwicHVzaCIsIndlYXJlciIsInN1YmhhdHMiLCJnZXRVc2VyQWRtaW5PcmdzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/utils.js\n"));

/***/ })

});