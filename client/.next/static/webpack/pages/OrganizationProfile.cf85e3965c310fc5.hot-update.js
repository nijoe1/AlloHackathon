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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculateRemainingTime: function() { return /* binding */ calculateRemainingTime; },\n/* harmony export */   formatCurrency: function() { return /* binding */ formatCurrency; },\n/* harmony export */   getOrg: function() { return /* binding */ getOrg; },\n/* harmony export */   getUserAdminOrgs: function() { return /* binding */ getUserAdminOrgs; },\n/* harmony export */   getUserOrganizations: function() { return /* binding */ getUserOrganizations; }\n/* harmony export */ });\n/* harmony import */ var _utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/graphFunctions */ \"./utils/graphFunctions.ts\");\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viem */ \"./node_modules/viem/_esm/index.js\");\n/* harmony import */ var _utils_tableland__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/tableland */ \"./utils/tableland.js\");\n/* harmony import */ var _constants_HackRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants/HackRegistry */ \"./constants/HackRegistry.ts\");\n\n\n\n\n\nconst formatCurrency = (value)=>{\n    value = BigInt(value) / BigInt(10 ** 18);\n    let formattedValue;\n    if (value < BigInt(1000)) {\n        // If value is less than a thousand\n        formattedValue = \"$\".concat(value.toString());\n    } else if (value < BigInt(1000000)) {\n        // If value is less than a million\n        formattedValue = \"$\".concat(value / BigInt(1000), \"K\");\n    } else if (value < BigInt(1000000000)) {\n        // If value is less than a billion\n        formattedValue = \"$\".concat(value / BigInt(1000000), \"M\");\n    } else if (value < BigInt(1000000000000)) {\n        // If value is less than a trillion\n        formattedValue = \"$\".concat(value / BigInt(1000000000), \"B\");\n    } else {\n        // If value is a trillion or more\n        formattedValue = \"$\".concat(value / BigInt(1000000000000), \"T\");\n    }\n    return formattedValue;\n};\nconst calculateRemainingTime = (currentTime, endTime)=>{\n    let remainingTimeInSeconds = endTime - currentTime;\n    remainingTimeInSeconds = parseInt(remainingTimeInSeconds);\n    const days = Math.floor(remainingTimeInSeconds / (3600 * 24));\n    const hours = Math.floor(remainingTimeInSeconds % (3600 * 24) / 3600);\n    const minutes = Math.floor(remainingTimeInSeconds % 3600 / 60);\n    let formattedTime = \"\";\n    if (days > 0) formattedTime += \"\".concat(days, \"d \");\n    if (hours > 0) formattedTime += \"\".concat(hours, \"h \");\n    if (minutes > 0) formattedTime += \"\".concat(minutes, \"m\");\n    return formattedTime || \"ENDED\";\n};\nconst getUserOrganizations = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n        for (const wearer of resp.hat.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"MANAGER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n        for (const wearer of resp.hat.subhats.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"REVIEWER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n    }\n    return partOfProfiles;\n};\nconst getOrg = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n        for (const wearer of resp.hat.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"MANAGER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n        for (const wearer of resp.hat.subhats.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"REVIEWER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n    }\n    return partOfProfiles;\n};\nconst getUserAdminOrgs = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n    }\n    return partOfProfiles;\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRO1lBQzdDYixlQUFlYyxJQUFJLENBQUNIO1lBQ3BCO1FBQ0Y7SUFDRjtJQUVBLE9BQU9YO0FBQ1QsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy91dGlscy5qcz9iODNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFByb2ZpbGVIYXRzIH0gZnJvbSBcIkAvdXRpbHMvZ3JhcGhGdW5jdGlvbnNcIjtcblxuaW1wb3J0IHsgZW5jb2RlUGFja2VkIH0gZnJvbSBcInZpZW1cIjtcblxuaW1wb3J0IHtcbiAgZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCxcbiAgZ2V0QWxsQWN0aXZlUG9vbHMsXG4gIGdldFByb2ZpbGVzRGF0YSxcbiAgZ2V0QWxsUG9vbHNDcmVhdGVkQnlQcm9maWxlLFxuICBnZXRBbGxQb29sc1JlZ2lzdGVyZWRCeVByb2ZpbGUsXG59IGZyb20gXCJAL3V0aWxzL3RhYmxlbGFuZFwiO1xuXG5pbXBvcnQgeyB1c2VBY2NvdW50LCB1c2VQdWJsaWNDbGllbnQsIHVzZVdhbGxldENsaWVudCB9IGZyb20gXCJ3YWdtaVwiO1xuaW1wb3J0IHsgQ09OVFJBQ1RfQUJJLCBDT05UUkFDVF9BRERSRVNTIH0gZnJvbSBcIkAvY29uc3RhbnRzL0hhY2tSZWdpc3RyeVwiO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgdmFsdWUgPSBCaWdJbnQodmFsdWUpIC8gQmlnSW50KDEwICoqIDE4KTtcblxuICBsZXQgZm9ybWF0dGVkVmFsdWU7XG5cbiAgaWYgKHZhbHVlIDwgQmlnSW50KDEwMDApKSB7XG4gICAgLy8gSWYgdmFsdWUgaXMgbGVzcyB0aGFuIGEgdGhvdXNhbmRcbiAgICBmb3JtYXR0ZWRWYWx1ZSA9IGAkJHt2YWx1ZS50b1N0cmluZygpfWA7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCBCaWdJbnQoMTAwMDAwMCkpIHtcbiAgICAvLyBJZiB2YWx1ZSBpcyBsZXNzIHRoYW4gYSBtaWxsaW9uXG4gICAgZm9ybWF0dGVkVmFsdWUgPSBgJCR7KHZhbHVlIC8gQmlnSW50KDEwMDApKX1LYDtcbiAgfSBlbHNlIGlmICh2YWx1ZSA8IEJpZ0ludCgxMDAwMDAwMDAwKSkge1xuICAgIC8vIElmIHZhbHVlIGlzIGxlc3MgdGhhbiBhIGJpbGxpb25cbiAgICBmb3JtYXR0ZWRWYWx1ZSA9IGAkJHsodmFsdWUgLyBCaWdJbnQoMTAwMDAwMCkpfU1gO1xuICB9IGVsc2UgaWYgKHZhbHVlIDwgQmlnSW50KDEwMDAwMDAwMDAwMDApKSB7XG4gICAgLy8gSWYgdmFsdWUgaXMgbGVzcyB0aGFuIGEgdHJpbGxpb25cbiAgICBmb3JtYXR0ZWRWYWx1ZSA9IGAkJHsodmFsdWUgLyBCaWdJbnQoMTAwMDAwMDAwMCkpfUJgO1xuICB9IGVsc2Uge1xuICAgIC8vIElmIHZhbHVlIGlzIGEgdHJpbGxpb24gb3IgbW9yZVxuICAgIGZvcm1hdHRlZFZhbHVlID0gYCQkeyh2YWx1ZSAvIEJpZ0ludCgxMDAwMDAwMDAwMDAwKSl9VGA7XG4gIH1cblxuICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlUmVtYWluaW5nVGltZSA9IChjdXJyZW50VGltZSwgZW5kVGltZSkgPT4ge1xuICBsZXQgcmVtYWluaW5nVGltZUluU2Vjb25kcyA9IGVuZFRpbWUgLSBjdXJyZW50VGltZTtcbiAgcmVtYWluaW5nVGltZUluU2Vjb25kcyA9IHBhcnNlSW50KHJlbWFpbmluZ1RpbWVJblNlY29uZHMpO1xuICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihyZW1haW5pbmdUaW1lSW5TZWNvbmRzIC8gKDM2MDAgKiAyNCkpO1xuICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IoKHJlbWFpbmluZ1RpbWVJblNlY29uZHMgJSAoMzYwMCAqIDI0KSkgLyAzNjAwKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHJlbWFpbmluZ1RpbWVJblNlY29uZHMgJSAzNjAwKSAvIDYwKTtcblxuICBsZXQgZm9ybWF0dGVkVGltZSA9IFwiXCI7XG4gIGlmIChkYXlzID4gMCkgZm9ybWF0dGVkVGltZSArPSBgJHtkYXlzfWQgYDtcbiAgaWYgKGhvdXJzID4gMCkgZm9ybWF0dGVkVGltZSArPSBgJHtob3Vyc31oIGA7XG4gIGlmIChtaW51dGVzID4gMCkgZm9ybWF0dGVkVGltZSArPSBgJHttaW51dGVzfW1gO1xuXG4gIHJldHVybiBmb3JtYXR0ZWRUaW1lIHx8IFwiRU5ERURcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyT3JnYW5pemF0aW9ucyA9IGFzeW5jIChhZGRyZXNzKSA9PiB7XG4gIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCgpO1xuICBsZXQgcGFydE9mUHJvZmlsZXMgPSBbXTtcbiAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgY29uc3QgYWRtaW5IYXQgPSBwcm9maWxlLmFkbWluSGF0O1xuICAgIGxldCBkYXRhID0gZW5jb2RlUGFja2VkKFtcInVpbnQyNTZcIl0sIFthZG1pbkhhdF0pO1xuICAgIGxldCByZXNwID0gYXdhaXQgZ2V0UHJvZmlsZUhhdHMoZGF0YSk7XG4gICAgY29uc3Qgc2VhcmNoQWRtaW4gPSByZXNwLmhhdC53ZWFyZXJzWzBdLmlkID09IGFkZHJlc3M/LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHNlYXJjaEFkbWluKSB7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgIGxldCBvYmogPSB7IHByb2ZpbGVEYXRhOiBkYXRhLCB0eXBlOiBcIkFETUlOXCIgfTtcbiAgICAgIHBhcnRPZlByb2ZpbGVzLnB1c2gob2JqKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHdlYXJlciBvZiByZXNwLmhhdC5zdWJoYXRzLndlYXJlcnMpIHtcbiAgICAgIGlmICh3ZWFyZXIuaWQgPT0gYWRkcmVzcz8udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgICAgbGV0IG9iaiA9IHsgcHJvZmlsZURhdGE6IGRhdGEsIHR5cGU6IFwiTUFOQUdFUlwiIH07XG4gICAgICAgIHBhcnRPZlByb2ZpbGVzLnB1c2gob2JqKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB3ZWFyZXIgb2YgcmVzcC5oYXQuc3ViaGF0cy5zdWJoYXRzLndlYXJlcnMpIHtcbiAgICAgIGlmICh3ZWFyZXIuaWQgPT0gYWRkcmVzcz8udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgICAgbGV0IG9iaiA9IHsgcHJvZmlsZURhdGE6IGRhdGEsIHR5cGU6IFwiUkVWSUVXRVJcIiB9O1xuICAgICAgICBwYXJ0T2ZQcm9maWxlcy5wdXNoKG9iaik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0T2ZQcm9maWxlcztcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldE9yZyA9IGFzeW5jIChhZGRyZXNzKSA9PiB7XG4gIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCgpO1xuICBsZXQgcGFydE9mUHJvZmlsZXMgPSBbXTtcbiAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgY29uc3QgYWRtaW5IYXQgPSBwcm9maWxlLmFkbWluSGF0O1xuICAgIGxldCBkYXRhID0gZW5jb2RlUGFja2VkKFtcInVpbnQyNTZcIl0sIFthZG1pbkhhdF0pO1xuICAgIGxldCByZXNwID0gYXdhaXQgZ2V0UHJvZmlsZUhhdHMoZGF0YSk7XG4gICAgY29uc3Qgc2VhcmNoQWRtaW4gPSByZXNwLmhhdC53ZWFyZXJzWzBdLmlkID09IGFkZHJlc3M/LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHNlYXJjaEFkbWluKSB7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgIGxldCBvYmogPSB7IHByb2ZpbGVEYXRhOiBkYXRhLCB0eXBlOiBcIkFETUlOXCIgfTtcbiAgICAgIHBhcnRPZlByb2ZpbGVzLnB1c2gob2JqKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHdlYXJlciBvZiByZXNwLmhhdC5zdWJoYXRzLndlYXJlcnMpIHtcbiAgICAgIGlmICh3ZWFyZXIuaWQgPT0gYWRkcmVzcz8udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgICAgbGV0IG9iaiA9IHsgcHJvZmlsZURhdGE6IGRhdGEsIHR5cGU6IFwiTUFOQUdFUlwiIH07XG4gICAgICAgIHBhcnRPZlByb2ZpbGVzLnB1c2gob2JqKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB3ZWFyZXIgb2YgcmVzcC5oYXQuc3ViaGF0cy5zdWJoYXRzLndlYXJlcnMpIHtcbiAgICAgIGlmICh3ZWFyZXIuaWQgPT0gYWRkcmVzcz8udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgICAgbGV0IG9iaiA9IHsgcHJvZmlsZURhdGE6IGRhdGEsIHR5cGU6IFwiUkVWSUVXRVJcIiB9O1xuICAgICAgICBwYXJ0T2ZQcm9maWxlcy5wdXNoKG9iaik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0T2ZQcm9maWxlcztcbn07XG5cblxuZXhwb3J0IGNvbnN0IGdldFVzZXJBZG1pbk9yZ3MgPSBhc3luYyAoYWRkcmVzcykgPT4ge1xuICAgIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCgpO1xuICAgIGxldCBwYXJ0T2ZQcm9maWxlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgcHJvZmlsZSBvZiBwcm9maWxlcykge1xuICAgICAgY29uc3QgYWRtaW5IYXQgPSBwcm9maWxlLmFkbWluSGF0O1xuICAgICAgbGV0IGRhdGEgPSBlbmNvZGVQYWNrZWQoW1widWludDI1NlwiXSwgW2FkbWluSGF0XSk7XG4gICAgICBsZXQgcmVzcCA9IGF3YWl0IGdldFByb2ZpbGVIYXRzKGRhdGEpO1xuICAgICAgY29uc3Qgc2VhcmNoQWRtaW4gPSByZXNwLmhhdC53ZWFyZXJzWzBdLmlkID09IGFkZHJlc3M/LnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoc2VhcmNoQWRtaW4pIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBnZXRQcm9maWxlc0RhdGEoW3Byb2ZpbGUucHJvZmlsZUlEXSk7XG4gICAgICAgIGxldCBvYmogPSB7IHByb2ZpbGVEYXRhOiBkYXRhLCB0eXBlOiBcIkFETUlOXCIgfTtcbiAgICAgICAgcGFydE9mUHJvZmlsZXMucHVzaChvYmopO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHJldHVybiBwYXJ0T2ZQcm9maWxlcztcbiAgfTtcbiJdLCJuYW1lcyI6WyJnZXRQcm9maWxlSGF0cyIsImVuY29kZVBhY2tlZCIsImdldEFsbFByb2ZpbGVzQWRtaW5IYXQiLCJnZXRBbGxBY3RpdmVQb29scyIsImdldFByb2ZpbGVzRGF0YSIsImdldEFsbFBvb2xzQ3JlYXRlZEJ5UHJvZmlsZSIsImdldEFsbFBvb2xzUmVnaXN0ZXJlZEJ5UHJvZmlsZSIsInVzZUFjY291bnQiLCJ1c2VQdWJsaWNDbGllbnQiLCJ1c2VXYWxsZXRDbGllbnQiLCJDT05UUkFDVF9BQkkiLCJDT05UUkFDVF9BRERSRVNTIiwiZm9ybWF0Q3VycmVuY3kiLCJ2YWx1ZSIsIkJpZ0ludCIsImZvcm1hdHRlZFZhbHVlIiwidG9TdHJpbmciLCJjYWxjdWxhdGVSZW1haW5pbmdUaW1lIiwiY3VycmVudFRpbWUiLCJlbmRUaW1lIiwicmVtYWluaW5nVGltZUluU2Vjb25kcyIsInBhcnNlSW50IiwiZGF5cyIsIk1hdGgiLCJmbG9vciIsImhvdXJzIiwibWludXRlcyIsImZvcm1hdHRlZFRpbWUiLCJnZXRVc2VyT3JnYW5pemF0aW9ucyIsImFkZHJlc3MiLCJwcm9maWxlcyIsInBhcnRPZlByb2ZpbGVzIiwicHJvZmlsZSIsImFkbWluSGF0IiwiZGF0YSIsInJlc3AiLCJzZWFyY2hBZG1pbiIsImhhdCIsIndlYXJlcnMiLCJpZCIsInRvTG93ZXJDYXNlIiwicHJvZmlsZUlEIiwib2JqIiwicHJvZmlsZURhdGEiLCJ0eXBlIiwicHVzaCIsIndlYXJlciIsInN1YmhhdHMiLCJnZXRPcmciLCJnZXRVc2VyQWRtaW5PcmdzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/utils.js\n"));

/***/ })

});