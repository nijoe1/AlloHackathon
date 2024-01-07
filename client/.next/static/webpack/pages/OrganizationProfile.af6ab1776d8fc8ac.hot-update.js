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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculateRemainingTime: function() { return /* binding */ calculateRemainingTime; },\n/* harmony export */   formatCurrency: function() { return /* binding */ formatCurrency; },\n/* harmony export */   getOrgMembers: function() { return /* binding */ getOrgMembers; },\n/* harmony export */   getUserAdminOrgs: function() { return /* binding */ getUserAdminOrgs; },\n/* harmony export */   getUserOrganizations: function() { return /* binding */ getUserOrganizations; }\n/* harmony export */ });\n/* harmony import */ var _utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/graphFunctions */ \"./utils/graphFunctions.ts\");\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viem */ \"./node_modules/viem/_esm/index.js\");\n/* harmony import */ var _utils_tableland__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/tableland */ \"./utils/tableland.js\");\n/* harmony import */ var _constants_HackRegistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants/HackRegistry */ \"./constants/HackRegistry.ts\");\n\n\n\n\n\nconst formatCurrency = (value)=>{\n    value = BigInt(value) / BigInt(10 ** 18);\n    let formattedValue;\n    if (value < BigInt(1000)) {\n        // If value is less than a thousand\n        formattedValue = \"$\".concat(value.toString());\n    } else if (value < BigInt(1000000)) {\n        // If value is less than a million\n        formattedValue = \"$\".concat(value / BigInt(1000), \"K\");\n    } else if (value < BigInt(1000000000)) {\n        // If value is less than a billion\n        formattedValue = \"$\".concat(value / BigInt(1000000), \"M\");\n    } else if (value < BigInt(1000000000000)) {\n        // If value is less than a trillion\n        formattedValue = \"$\".concat(value / BigInt(1000000000), \"B\");\n    } else {\n        // If value is a trillion or more\n        formattedValue = \"$\".concat(value / BigInt(1000000000000), \"T\");\n    }\n    return formattedValue;\n};\nconst calculateRemainingTime = (currentTime, endTime)=>{\n    let remainingTimeInSeconds = endTime - currentTime;\n    remainingTimeInSeconds = parseInt(remainingTimeInSeconds);\n    const days = Math.floor(remainingTimeInSeconds / (3600 * 24));\n    const hours = Math.floor(remainingTimeInSeconds % (3600 * 24) / 3600);\n    const minutes = Math.floor(remainingTimeInSeconds % 3600 / 60);\n    let formattedTime = \"\";\n    if (days > 0) formattedTime += \"\".concat(days, \"d \");\n    if (hours > 0) formattedTime += \"\".concat(hours, \"h \");\n    if (minutes > 0) formattedTime += \"\".concat(minutes, \"m\");\n    return formattedTime || \"ENDED\";\n};\nconst getUserOrganizations = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n        for (const wearer of resp.hat.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"MANAGER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n        for (const wearer of resp.hat.subhats.subhats.wearers){\n            if (wearer.id == (address === null || address === void 0 ? void 0 : address.toLowerCase())) {\n                let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                    profile.profileID\n                ]);\n                let obj = {\n                    profileData: data,\n                    type: \"REVIEWER\"\n                };\n                partOfProfiles.push(obj);\n                continue;\n            }\n        }\n    }\n    return partOfProfiles;\n};\nconst getOrgMembers = async (profileID)=>{\n    const adminHat = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfileAdminHat)(profileID);\n    console.log(adminHat);\n    let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n        \"uint256\"\n    ], [\n        adminHat\n    ]);\n    let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n    let RolesArray = console.log(resp);\n};\nfunction parseHatObjectOneDimensional(hatData) {\n    const result = [];\n    const addressAccessMap = new Map(); // To track access role for each address\n    function parseHat(hat, access) {\n        const wearerAddress = hat.wearers[0].id;\n        if (!addressAccessMap.has(wearerAddress)) {\n            addressAccessMap.set(wearerAddress, access);\n            result.push({\n                accessRole: access,\n                address: wearerAddress\n            });\n        }\n        if (hat.subHats && hat.subHats.length > 0) {\n            hat.subHats.forEach((subHat)=>{\n                parseHat(subHat, access);\n            });\n        }\n    }\n    parseHat(hatData.hat, \"Admin\");\n    return result;\n}\nconst getUserAdminOrgs = async (address)=>{\n    const profiles = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getAllProfilesAdminHat)();\n    let partOfProfiles = [];\n    for (const profile of profiles){\n        const adminHat = profile.adminHat;\n        let data = (0,viem__WEBPACK_IMPORTED_MODULE_3__.encodePacked)([\n            \"uint256\"\n        ], [\n            adminHat\n        ]);\n        let resp = await (0,_utils_graphFunctions__WEBPACK_IMPORTED_MODULE_0__.getProfileHats)(data);\n        const searchAdmin = resp.hat.wearers[0].id == (address === null || address === void 0 ? void 0 : address.toLowerCase());\n        if (searchAdmin) {\n            let data = await (0,_utils_tableland__WEBPACK_IMPORTED_MODULE_1__.getProfilesData)([\n                profile.profileID\n            ]);\n            let obj = {\n                profileData: data,\n                type: \"ADMIN\"\n            };\n            partOfProfiles.push(obj);\n            continue;\n        }\n    }\n    return partOfProfiles;\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUkwQixPQUFPLENBQUNFLE9BQU8sQ0FBQyxDQUFDQztnQkFDbkJULFNBQVNTLFFBQVFSO1lBQ25CO1FBQ0Y7SUFDRjtJQUVBRCxTQUFTSixRQUFRaEIsR0FBRyxFQUFFO0lBRXRCLE9BQU9pQjtBQUNUO0FBQ08sTUFBTWEsbUJBQW1CLE9BQU90QztJQUNyQyxNQUFNQyxXQUFXLE1BQU0xQix3RUFBc0JBO0lBQzdDLElBQUkyQixpQkFBaUIsRUFBRTtJQUN2QixLQUFLLE1BQU1DLFdBQVdGLFNBQVU7UUFDOUIsTUFBTUcsV0FBV0QsUUFBUUMsUUFBUTtRQUNqQyxJQUFJQyxPQUFPL0Isa0RBQVlBLENBQUM7WUFBQztTQUFVLEVBQUU7WUFBQzhCO1NBQVM7UUFDL0MsSUFBSUUsT0FBTyxNQUFNakMscUVBQWNBLENBQUNnQztRQUNoQyxNQUFNRSxjQUFjRCxLQUFLRSxHQUFHLENBQUNDLE9BQU8sQ0FBQyxFQUFFLENBQUNDLEVBQUUsS0FBSVYsb0JBQUFBLDhCQUFBQSxRQUFTVyxXQUFXO1FBQ2xFLElBQUlKLGFBQWE7WUFDZixJQUFJRixPQUFPLE1BQU03QixpRUFBZUEsQ0FBQztnQkFBQzJCLFFBQVFTLFNBQVM7YUFBQztZQUNwRCxJQUFJQyxNQUFNO2dCQUFFQyxhQUFhVDtnQkFBTVUsTUFBTTtZQUFRO1lBQzdDYixlQUFlYyxJQUFJLENBQUNIO1lBQ3BCO1FBQ0Y7SUFDRjtJQUVBLE9BQU9YO0FBQ1QsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy91dGlscy5qcz9iODNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFByb2ZpbGVIYXRzIH0gZnJvbSBcIkAvdXRpbHMvZ3JhcGhGdW5jdGlvbnNcIjtcblxuaW1wb3J0IHsgZW5jb2RlUGFja2VkIH0gZnJvbSBcInZpZW1cIjtcblxuaW1wb3J0IHtcbiAgZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCxcbiAgZ2V0UHJvZmlsZXNEYXRhLFxuICBnZXRQcm9maWxlQWRtaW5IYXQsXG59IGZyb20gXCJAL3V0aWxzL3RhYmxlbGFuZFwiO1xuXG5pbXBvcnQgeyB1c2VBY2NvdW50LCB1c2VQdWJsaWNDbGllbnQsIHVzZVdhbGxldENsaWVudCB9IGZyb20gXCJ3YWdtaVwiO1xuaW1wb3J0IHsgQ09OVFJBQ1RfQUJJLCBDT05UUkFDVF9BRERSRVNTIH0gZnJvbSBcIkAvY29uc3RhbnRzL0hhY2tSZWdpc3RyeVwiO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0Q3VycmVuY3kgPSAodmFsdWUpID0+IHtcbiAgdmFsdWUgPSBCaWdJbnQodmFsdWUpIC8gQmlnSW50KDEwICoqIDE4KTtcblxuICBsZXQgZm9ybWF0dGVkVmFsdWU7XG5cbiAgaWYgKHZhbHVlIDwgQmlnSW50KDEwMDApKSB7XG4gICAgLy8gSWYgdmFsdWUgaXMgbGVzcyB0aGFuIGEgdGhvdXNhbmRcbiAgICBmb3JtYXR0ZWRWYWx1ZSA9IGAkJHt2YWx1ZS50b1N0cmluZygpfWA7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCBCaWdJbnQoMTAwMDAwMCkpIHtcbiAgICAvLyBJZiB2YWx1ZSBpcyBsZXNzIHRoYW4gYSBtaWxsaW9uXG4gICAgZm9ybWF0dGVkVmFsdWUgPSBgJCR7dmFsdWUgLyBCaWdJbnQoMTAwMCl9S2A7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCBCaWdJbnQoMTAwMDAwMDAwMCkpIHtcbiAgICAvLyBJZiB2YWx1ZSBpcyBsZXNzIHRoYW4gYSBiaWxsaW9uXG4gICAgZm9ybWF0dGVkVmFsdWUgPSBgJCR7dmFsdWUgLyBCaWdJbnQoMTAwMDAwMCl9TWA7XG4gIH0gZWxzZSBpZiAodmFsdWUgPCBCaWdJbnQoMTAwMDAwMDAwMDAwMCkpIHtcbiAgICAvLyBJZiB2YWx1ZSBpcyBsZXNzIHRoYW4gYSB0cmlsbGlvblxuICAgIGZvcm1hdHRlZFZhbHVlID0gYCQke3ZhbHVlIC8gQmlnSW50KDEwMDAwMDAwMDApfUJgO1xuICB9IGVsc2Uge1xuICAgIC8vIElmIHZhbHVlIGlzIGEgdHJpbGxpb24gb3IgbW9yZVxuICAgIGZvcm1hdHRlZFZhbHVlID0gYCQke3ZhbHVlIC8gQmlnSW50KDEwMDAwMDAwMDAwMDApfVRgO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVJlbWFpbmluZ1RpbWUgPSAoY3VycmVudFRpbWUsIGVuZFRpbWUpID0+IHtcbiAgbGV0IHJlbWFpbmluZ1RpbWVJblNlY29uZHMgPSBlbmRUaW1lIC0gY3VycmVudFRpbWU7XG4gIHJlbWFpbmluZ1RpbWVJblNlY29uZHMgPSBwYXJzZUludChyZW1haW5pbmdUaW1lSW5TZWNvbmRzKTtcbiAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IocmVtYWluaW5nVGltZUluU2Vjb25kcyAvICgzNjAwICogMjQpKTtcbiAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKChyZW1haW5pbmdUaW1lSW5TZWNvbmRzICUgKDM2MDAgKiAyNCkpIC8gMzYwMCk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChyZW1haW5pbmdUaW1lSW5TZWNvbmRzICUgMzYwMCkgLyA2MCk7XG5cbiAgbGV0IGZvcm1hdHRlZFRpbWUgPSBcIlwiO1xuICBpZiAoZGF5cyA+IDApIGZvcm1hdHRlZFRpbWUgKz0gYCR7ZGF5c31kIGA7XG4gIGlmIChob3VycyA+IDApIGZvcm1hdHRlZFRpbWUgKz0gYCR7aG91cnN9aCBgO1xuICBpZiAobWludXRlcyA+IDApIGZvcm1hdHRlZFRpbWUgKz0gYCR7bWludXRlc31tYDtcblxuICByZXR1cm4gZm9ybWF0dGVkVGltZSB8fCBcIkVOREVEXCI7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlck9yZ2FuaXphdGlvbnMgPSBhc3luYyAoYWRkcmVzcykgPT4ge1xuICBjb25zdCBwcm9maWxlcyA9IGF3YWl0IGdldEFsbFByb2ZpbGVzQWRtaW5IYXQoKTtcbiAgbGV0IHBhcnRPZlByb2ZpbGVzID0gW107XG4gIGZvciAoY29uc3QgcHJvZmlsZSBvZiBwcm9maWxlcykge1xuICAgIGNvbnN0IGFkbWluSGF0ID0gcHJvZmlsZS5hZG1pbkhhdDtcbiAgICBsZXQgZGF0YSA9IGVuY29kZVBhY2tlZChbXCJ1aW50MjU2XCJdLCBbYWRtaW5IYXRdKTtcbiAgICBsZXQgcmVzcCA9IGF3YWl0IGdldFByb2ZpbGVIYXRzKGRhdGEpO1xuICAgIGNvbnN0IHNlYXJjaEFkbWluID0gcmVzcC5oYXQud2VhcmVyc1swXS5pZCA9PSBhZGRyZXNzPy50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzZWFyY2hBZG1pbikge1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBnZXRQcm9maWxlc0RhdGEoW3Byb2ZpbGUucHJvZmlsZUlEXSk7XG4gICAgICBsZXQgb2JqID0geyBwcm9maWxlRGF0YTogZGF0YSwgdHlwZTogXCJBRE1JTlwiIH07XG4gICAgICBwYXJ0T2ZQcm9maWxlcy5wdXNoKG9iaik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCB3ZWFyZXIgb2YgcmVzcC5oYXQuc3ViaGF0cy53ZWFyZXJzKSB7XG4gICAgICBpZiAod2VhcmVyLmlkID09IGFkZHJlc3M/LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBnZXRQcm9maWxlc0RhdGEoW3Byb2ZpbGUucHJvZmlsZUlEXSk7XG4gICAgICAgIGxldCBvYmogPSB7IHByb2ZpbGVEYXRhOiBkYXRhLCB0eXBlOiBcIk1BTkFHRVJcIiB9O1xuICAgICAgICBwYXJ0T2ZQcm9maWxlcy5wdXNoKG9iaik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgd2VhcmVyIG9mIHJlc3AuaGF0LnN1YmhhdHMuc3ViaGF0cy53ZWFyZXJzKSB7XG4gICAgICBpZiAod2VhcmVyLmlkID09IGFkZHJlc3M/LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBnZXRQcm9maWxlc0RhdGEoW3Byb2ZpbGUucHJvZmlsZUlEXSk7XG4gICAgICAgIGxldCBvYmogPSB7IHByb2ZpbGVEYXRhOiBkYXRhLCB0eXBlOiBcIlJFVklFV0VSXCIgfTtcbiAgICAgICAgcGFydE9mUHJvZmlsZXMucHVzaChvYmopO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydE9mUHJvZmlsZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0T3JnTWVtYmVycyA9IGFzeW5jIChwcm9maWxlSUQpID0+IHtcbiAgY29uc3QgYWRtaW5IYXQgPSBhd2FpdCBnZXRQcm9maWxlQWRtaW5IYXQocHJvZmlsZUlEKTtcbiAgY29uc29sZS5sb2coYWRtaW5IYXQpO1xuICBsZXQgZGF0YSA9IGVuY29kZVBhY2tlZChbXCJ1aW50MjU2XCJdLCBbYWRtaW5IYXRdKTtcbiAgbGV0IHJlc3AgPSBhd2FpdCBnZXRQcm9maWxlSGF0cyhkYXRhKTtcbiAgbGV0IFJvbGVzQXJyYXkgPSBcbiAgY29uc29sZS5sb2cocmVzcCk7XG59O1xuXG5mdW5jdGlvbiBwYXJzZUhhdE9iamVjdE9uZURpbWVuc2lvbmFsKGhhdERhdGEpIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGNvbnN0IGFkZHJlc3NBY2Nlc3NNYXAgPSBuZXcgTWFwKCk7IC8vIFRvIHRyYWNrIGFjY2VzcyByb2xlIGZvciBlYWNoIGFkZHJlc3NcblxuICBmdW5jdGlvbiBwYXJzZUhhdChoYXQsIGFjY2Vzcykge1xuICAgIGNvbnN0IHdlYXJlckFkZHJlc3MgPSBoYXQud2VhcmVyc1swXS5pZDtcblxuICAgIGlmICghYWRkcmVzc0FjY2Vzc01hcC5oYXMod2VhcmVyQWRkcmVzcykpIHtcbiAgICAgIGFkZHJlc3NBY2Nlc3NNYXAuc2V0KHdlYXJlckFkZHJlc3MsIGFjY2Vzcyk7XG4gICAgICByZXN1bHQucHVzaCh7IGFjY2Vzc1JvbGU6IGFjY2VzcywgYWRkcmVzczogd2VhcmVyQWRkcmVzcyB9KTtcbiAgICB9XG5cbiAgICBpZiAoaGF0LnN1YkhhdHMgJiYgaGF0LnN1YkhhdHMubGVuZ3RoID4gMCkge1xuICAgICAgaGF0LnN1YkhhdHMuZm9yRWFjaCgoc3ViSGF0KSA9PiB7XG4gICAgICAgIHBhcnNlSGF0KHN1YkhhdCwgYWNjZXNzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSGF0KGhhdERhdGEuaGF0LCBcIkFkbWluXCIpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgY29uc3QgZ2V0VXNlckFkbWluT3JncyA9IGFzeW5jIChhZGRyZXNzKSA9PiB7XG4gIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgZ2V0QWxsUHJvZmlsZXNBZG1pbkhhdCgpO1xuICBsZXQgcGFydE9mUHJvZmlsZXMgPSBbXTtcbiAgZm9yIChjb25zdCBwcm9maWxlIG9mIHByb2ZpbGVzKSB7XG4gICAgY29uc3QgYWRtaW5IYXQgPSBwcm9maWxlLmFkbWluSGF0O1xuICAgIGxldCBkYXRhID0gZW5jb2RlUGFja2VkKFtcInVpbnQyNTZcIl0sIFthZG1pbkhhdF0pO1xuICAgIGxldCByZXNwID0gYXdhaXQgZ2V0UHJvZmlsZUhhdHMoZGF0YSk7XG4gICAgY29uc3Qgc2VhcmNoQWRtaW4gPSByZXNwLmhhdC53ZWFyZXJzWzBdLmlkID09IGFkZHJlc3M/LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHNlYXJjaEFkbWluKSB7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGdldFByb2ZpbGVzRGF0YShbcHJvZmlsZS5wcm9maWxlSURdKTtcbiAgICAgIGxldCBvYmogPSB7IHByb2ZpbGVEYXRhOiBkYXRhLCB0eXBlOiBcIkFETUlOXCIgfTtcbiAgICAgIHBhcnRPZlByb2ZpbGVzLnB1c2gob2JqKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0T2ZQcm9maWxlcztcbn07XG4iXSwibmFtZXMiOlsiZ2V0UHJvZmlsZUhhdHMiLCJlbmNvZGVQYWNrZWQiLCJnZXRBbGxQcm9maWxlc0FkbWluSGF0IiwiZ2V0UHJvZmlsZXNEYXRhIiwiZ2V0UHJvZmlsZUFkbWluSGF0IiwidXNlQWNjb3VudCIsInVzZVB1YmxpY0NsaWVudCIsInVzZVdhbGxldENsaWVudCIsIkNPTlRSQUNUX0FCSSIsIkNPTlRSQUNUX0FERFJFU1MiLCJmb3JtYXRDdXJyZW5jeSIsInZhbHVlIiwiQmlnSW50IiwiZm9ybWF0dGVkVmFsdWUiLCJ0b1N0cmluZyIsImNhbGN1bGF0ZVJlbWFpbmluZ1RpbWUiLCJjdXJyZW50VGltZSIsImVuZFRpbWUiLCJyZW1haW5pbmdUaW1lSW5TZWNvbmRzIiwicGFyc2VJbnQiLCJkYXlzIiwiTWF0aCIsImZsb29yIiwiaG91cnMiLCJtaW51dGVzIiwiZm9ybWF0dGVkVGltZSIsImdldFVzZXJPcmdhbml6YXRpb25zIiwiYWRkcmVzcyIsInByb2ZpbGVzIiwicGFydE9mUHJvZmlsZXMiLCJwcm9maWxlIiwiYWRtaW5IYXQiLCJkYXRhIiwicmVzcCIsInNlYXJjaEFkbWluIiwiaGF0Iiwid2VhcmVycyIsImlkIiwidG9Mb3dlckNhc2UiLCJwcm9maWxlSUQiLCJvYmoiLCJwcm9maWxlRGF0YSIsInR5cGUiLCJwdXNoIiwid2VhcmVyIiwic3ViaGF0cyIsImdldE9yZ01lbWJlcnMiLCJjb25zb2xlIiwibG9nIiwiUm9sZXNBcnJheSIsInBhcnNlSGF0T2JqZWN0T25lRGltZW5zaW9uYWwiLCJoYXREYXRhIiwicmVzdWx0IiwiYWRkcmVzc0FjY2Vzc01hcCIsIk1hcCIsInBhcnNlSGF0IiwiYWNjZXNzIiwid2VhcmVyQWRkcmVzcyIsImhhcyIsInNldCIsImFjY2Vzc1JvbGUiLCJzdWJIYXRzIiwibGVuZ3RoIiwiZm9yRWFjaCIsInN1YkhhdCIsImdldFVzZXJBZG1pbk9yZ3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/utils.js\n"));

/***/ })

});