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

/***/ "./components/ManageOrganizationTab.tsx":
/*!**********************************************!*\
  !*** ./components/ManageOrganizationTab.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_FaPlus_react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=FaPlus!=!react-icons/fa */ \"__barrel_optimize__?names=FaPlus!=!./node_modules/react-icons/fa/index.esm.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst StyledTable = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.chakra)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Table, {\n    baseStyle: {\n        width: \"full\",\n        \"th, td\": {\n            textAlign: \"center\"\n        }\n    }\n});\n_c = StyledTable;\nconst ManageOrganizationTab = ()=>{\n    _s();\n    const [members, setMembers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            role: \"Admin\",\n            address: \"0x123...ABC\"\n        },\n        {\n            role: \"Manager\",\n            address: \"0x456...DEF\"\n        }\n    ]);\n    const [newMembers, setNewMembers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [showRemoveToggle, setShowRemoveToggle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleAddMember = ()=>{\n        setNewMembers([\n            ...newMembers,\n            {\n                role: \"Manager\",\n                address: \"\"\n            }\n        ]);\n    };\n    const handleRoleChange = (index, role)=>{\n        const updatedMembers = [\n            ...newMembers\n        ];\n        updatedMembers[index].role = role;\n        setNewMembers(updatedMembers);\n    };\n    const handleAddressChange = (index, address)=>{\n        const updatedMembers = [\n            ...newMembers\n        ];\n        updatedMembers[index].address = address;\n        setNewMembers(updatedMembers);\n    };\n    const handleAssignRoles = ()=>{\n        // Implement logic to assign roles to new members\n        console.log(\"Assigning roles to new members:\", newMembers);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.VStack, {\n        spacing: 4,\n        width: \"full\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Center, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-wrap items-center gap-2 \",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {\n                            fontSize: \"md\",\n                            fontWeight: \"semibold\",\n                            textAlign: \"center\",\n                            children: \"Add Members\"\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 66,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Switch, {\n                            isChecked: showRemoveToggle,\n                            onChange: ()=>setShowRemoveToggle(!showRemoveToggle),\n                            mb: 4\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 69,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {\n                            fontSize: \"md\",\n                            fontWeight: \"semibold\",\n                            textAlign: \"center\",\n                            children: \"Remove members\"\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                    lineNumber: 65,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StyledTable, {\n                variant: \"simple\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Thead, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tr, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Th, {\n                                    children: \"Role\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 83,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Th, {\n                                    children: \"Address\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 84,\n                                    columnNumber: 13\n                                }, undefined),\n                                showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Th, {\n                                    children: \"Remove\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 34\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 82,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                        lineNumber: 81,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tbody, {\n                        children: [\n                            members.map((member, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tr, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: member.role\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 91,\n                                            columnNumber: 15\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: member.address\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 92,\n                                            columnNumber: 15\n                                        }, undefined),\n                                        showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                                                colorScheme: \"red\",\n                                                children: \"Remove\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                lineNumber: 95,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 94,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 90,\n                                    columnNumber: 13\n                                }, undefined)),\n                            !showRemoveToggle && newMembers.map((member, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tr, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Select, {\n                                                value: member.role,\n                                                onChange: (e)=>handleRoleChange(index, e.target.value),\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                        value: \"Manager\",\n                                                        children: \"Manager\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                        lineNumber: 108,\n                                                        columnNumber: 21\n                                                    }, undefined),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                        value: \"Reviewer\",\n                                                        children: \"Reviewer\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                        lineNumber: 109,\n                                                        columnNumber: 21\n                                                    }, undefined)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                lineNumber: 104,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 103,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Input, {\n                                                value: member.address,\n                                                onChange: (e)=>handleAddressChange(index, e.target.value),\n                                                placeholder: \"Enter address\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                lineNumber: 113,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 112,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 102,\n                                    columnNumber: 15\n                                }, undefined))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, undefined),\n            !showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Center, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    leftIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaPlus_react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaPlus, {}, void 0, false, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                        lineNumber: 127,\n                        columnNumber: 23\n                    }, void 0),\n                    colorScheme: \"blue\",\n                    onClick: handleAddMember,\n                    children: \"Add Member\"\n                }, void 0, false, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                    lineNumber: 126,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 125,\n                columnNumber: 9\n            }, undefined),\n            !showRemoveToggle && newMembers.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {\n                justifyContent: \"flex-end\",\n                width: \"full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    colorScheme: \"green\",\n                    onClick: handleAssignRoles,\n                    children: \"Assign Roles\"\n                }, void 0, false, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                    lineNumber: 138,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 137,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ManageOrganizationTab, \"yL2vsh2cOuT7q5qQcUs2bKKW9CA=\");\n_c1 = ManageOrganizationTab;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ManageOrganizationTab);\nvar _c, _c1;\n$RefreshReg$(_c, \"StyledTable\");\n$RefreshReg$(_c1, \"ManageOrganizationTab\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBT21CLEVBQUVDLE1BQU0sQ0FBQ0YsS0FBSzs7a0VBRXZELDhEQUFDRzt3REFBT0gsT0FBTTtrRUFBVTs7Ozs7O2tFQUN4Qiw4REFBQ0c7d0RBQU9ILE9BQU07a0VBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7O3NEQUc3Qiw4REFBQzNDLGdEQUFFQTtzREFDRCw0RUFBQ0UsbURBQUtBO2dEQUNKeUMsT0FBT0YsT0FBT3ZCLE9BQU87Z0RBQ3JCbUIsVUFBVSxDQUFDTyxJQUFNakIsb0JBQW9CRixPQUFPbUIsRUFBRUMsTUFBTSxDQUFDRixLQUFLO2dEQUMxREksYUFBWTs7Ozs7Ozs7Ozs7O21DQWRUdEI7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBc0JoQixDQUFDSixrQ0FDQSw4REFBQ2hCLG9EQUFNQTswQkFDTCw0RUFBQ1gsb0RBQU1BO29CQUNMc0Qsd0JBQVUsOERBQUN2QyxnRkFBTUE7Ozs7O29CQUNqQmlDLGFBQVk7b0JBQ1pPLFNBQVMxQjs4QkFDVjs7Ozs7Ozs7Ozs7WUFNSixDQUFDRixvQkFBb0JGLFdBQVcrQixNQUFNLEdBQUcsbUJBQ3hDLDhEQUFDL0Msa0RBQUlBO2dCQUFDZ0QsZ0JBQWU7Z0JBQVd2QyxPQUFNOzBCQUNwQyw0RUFBQ2xCLG9EQUFNQTtvQkFBQ2dELGFBQVk7b0JBQVFPLFNBQVNyQjs4QkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT2xFO0dBakhNZDtNQUFBQTtBQW1ITiwrREFBZUEscUJBQXFCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvTWFuYWdlT3JnYW5pemF0aW9uVGFiLnRzeD8xMzNjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIFRhYmxlLFxuICBUaGVhZCxcbiAgVGJvZHksXG4gIFRyLFxuICBUaCxcbiAgVGQsXG4gIFNlbGVjdCxcbiAgSW5wdXQsXG4gIEZsZXgsXG4gIFN3aXRjaCxcbiAgQ2VudGVyLFxuICBUZXh0LFxuICBJY29uLFxuICBWU3RhY2ssXG4gIGNoYWtyYSxcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7IEZhUGx1cyB9IGZyb20gXCJyZWFjdC1pY29ucy9mYVwiO1xuXG5jb25zdCBTdHlsZWRUYWJsZSA9IGNoYWtyYShUYWJsZSwge1xuICBiYXNlU3R5bGU6IHtcbiAgICB3aWR0aDogXCJmdWxsXCIsXG4gICAgXCJ0aCwgdGRcIjoge1xuICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgIH0sXG4gIH0sXG59KTtcblxuY29uc3QgTWFuYWdlT3JnYW5pemF0aW9uVGFiID0gKCkgPT4ge1xuICBjb25zdCBbbWVtYmVycywgc2V0TWVtYmVyc10gPSB1c2VTdGF0ZShbXG4gICAgeyByb2xlOiBcIkFkbWluXCIsIGFkZHJlc3M6IFwiMHgxMjMuLi5BQkNcIiB9LFxuICAgIHsgcm9sZTogXCJNYW5hZ2VyXCIsIGFkZHJlc3M6IFwiMHg0NTYuLi5ERUZcIiB9LFxuICAgIC8vIC4uLiBtb3JlIGR1bW15IG1lbWJlcnNcbiAgXSk7XG4gIGNvbnN0IFtuZXdNZW1iZXJzLCBzZXROZXdNZW1iZXJzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3dSZW1vdmVUb2dnbGUsIHNldFNob3dSZW1vdmVUb2dnbGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZUFkZE1lbWJlciA9ICgpID0+IHtcbiAgICBzZXROZXdNZW1iZXJzKFsuLi5uZXdNZW1iZXJzLCB7IHJvbGU6IFwiTWFuYWdlclwiLCBhZGRyZXNzOiBcIlwiIH1dKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSb2xlQ2hhbmdlID0gKGluZGV4LCByb2xlKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZE1lbWJlcnMgPSBbLi4ubmV3TWVtYmVyc107XG4gICAgdXBkYXRlZE1lbWJlcnNbaW5kZXhdLnJvbGUgPSByb2xlO1xuICAgIHNldE5ld01lbWJlcnModXBkYXRlZE1lbWJlcnMpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZHJlc3NDaGFuZ2UgPSAoaW5kZXgsIGFkZHJlc3MpID0+IHtcbiAgICBjb25zdCB1cGRhdGVkTWVtYmVycyA9IFsuLi5uZXdNZW1iZXJzXTtcbiAgICB1cGRhdGVkTWVtYmVyc1tpbmRleF0uYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgc2V0TmV3TWVtYmVycyh1cGRhdGVkTWVtYmVycyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQXNzaWduUm9sZXMgPSAoKSA9PiB7XG4gICAgLy8gSW1wbGVtZW50IGxvZ2ljIHRvIGFzc2lnbiByb2xlcyB0byBuZXcgbWVtYmVyc1xuICAgIGNvbnNvbGUubG9nKFwiQXNzaWduaW5nIHJvbGVzIHRvIG5ldyBtZW1iZXJzOlwiLCBuZXdNZW1iZXJzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxWU3RhY2sgc3BhY2luZz17NH0gd2lkdGg9XCJmdWxsXCI+XG4gICAgICA8Q2VudGVyPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiBcIj5cbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cIm1kXCIgZm9udFdlaWdodD1cInNlbWlib2xkXCIgdGV4dEFsaWduPVwiY2VudGVyXCIgPlxuICAgICAgICAgICAge1wiQWRkIE1lbWJlcnNcIn1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFN3aXRjaFxuICAgICAgICAgICAgaXNDaGVja2VkPXtzaG93UmVtb3ZlVG9nZ2xlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHNldFNob3dSZW1vdmVUb2dnbGUoIXNob3dSZW1vdmVUb2dnbGUpfVxuICAgICAgICAgICAgbWI9ezR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cIm1kXCIgZm9udFdlaWdodD1cInNlbWlib2xkXCIgdGV4dEFsaWduPVwiY2VudGVyXCIgPlxuICAgICAgICAgICAge1wiUmVtb3ZlIG1lbWJlcnNcIn1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9DZW50ZXI+XG5cbiAgICAgIDxTdHlsZWRUYWJsZSB2YXJpYW50PVwic2ltcGxlXCI+XG4gICAgICAgIDxUaGVhZD5cbiAgICAgICAgICA8VHI+XG4gICAgICAgICAgICA8VGg+Um9sZTwvVGg+XG4gICAgICAgICAgICA8VGg+QWRkcmVzczwvVGg+XG4gICAgICAgICAgICB7c2hvd1JlbW92ZVRvZ2dsZSAmJiA8VGg+UmVtb3ZlPC9UaD59XG4gICAgICAgICAgPC9Ucj5cbiAgICAgICAgPC9UaGVhZD5cbiAgICAgICAgPFRib2R5PlxuICAgICAgICAgIHttZW1iZXJzLm1hcCgobWVtYmVyLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPFRyIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICA8VGQ+e21lbWJlci5yb2xlfTwvVGQ+XG4gICAgICAgICAgICAgIDxUZD57bWVtYmVyLmFkZHJlc3N9PC9UZD5cbiAgICAgICAgICAgICAge3Nob3dSZW1vdmVUb2dnbGUgJiYgKFxuICAgICAgICAgICAgICAgIDxUZD5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b24gY29sb3JTY2hlbWU9XCJyZWRcIj5SZW1vdmU8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L1RkPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9Ucj5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7IXNob3dSZW1vdmVUb2dnbGUgJiZcbiAgICAgICAgICAgIG5ld01lbWJlcnMubWFwKChtZW1iZXIsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDxUciBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgICA8VGQ+XG4gICAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXttZW1iZXIucm9sZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVSb2xlQ2hhbmdlKGluZGV4LCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNYW5hZ2VyXCI+TWFuYWdlcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUmV2aWV3ZXJcIj5SZXZpZXdlcjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9TZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9UZD5cbiAgICAgICAgICAgICAgICA8VGQ+XG4gICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21lbWJlci5hZGRyZXNzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUFkZHJlc3NDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBhZGRyZXNzXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9UZD5cbiAgICAgICAgICAgICAgPC9Ucj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L1Rib2R5PlxuICAgICAgPC9TdHlsZWRUYWJsZT5cblxuICAgICAgeyFzaG93UmVtb3ZlVG9nZ2xlICYmIChcbiAgICAgICAgPENlbnRlcj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBsZWZ0SWNvbj17PEZhUGx1cyAvPn1cbiAgICAgICAgICAgIGNvbG9yU2NoZW1lPVwiYmx1ZVwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBZGRNZW1iZXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQWRkIE1lbWJlclxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0NlbnRlcj5cbiAgICAgICl9XG5cbiAgICAgIHshc2hvd1JlbW92ZVRvZ2dsZSAmJiBuZXdNZW1iZXJzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8RmxleCBqdXN0aWZ5Q29udGVudD1cImZsZXgtZW5kXCIgd2lkdGg9XCJmdWxsXCI+XG4gICAgICAgICAgPEJ1dHRvbiBjb2xvclNjaGVtZT1cImdyZWVuXCIgb25DbGljaz17aGFuZGxlQXNzaWduUm9sZXN9PlxuICAgICAgICAgICAgQXNzaWduIFJvbGVzXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvRmxleD5cbiAgICAgICl9XG4gICAgPC9WU3RhY2s+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VPcmdhbml6YXRpb25UYWI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkJ1dHRvbiIsIlRhYmxlIiwiVGhlYWQiLCJUYm9keSIsIlRyIiwiVGgiLCJUZCIsIlNlbGVjdCIsIklucHV0IiwiRmxleCIsIlN3aXRjaCIsIkNlbnRlciIsIlRleHQiLCJWU3RhY2siLCJjaGFrcmEiLCJGYVBsdXMiLCJTdHlsZWRUYWJsZSIsImJhc2VTdHlsZSIsIndpZHRoIiwidGV4dEFsaWduIiwiTWFuYWdlT3JnYW5pemF0aW9uVGFiIiwibWVtYmVycyIsInNldE1lbWJlcnMiLCJyb2xlIiwiYWRkcmVzcyIsIm5ld01lbWJlcnMiLCJzZXROZXdNZW1iZXJzIiwic2hvd1JlbW92ZVRvZ2dsZSIsInNldFNob3dSZW1vdmVUb2dnbGUiLCJoYW5kbGVBZGRNZW1iZXIiLCJoYW5kbGVSb2xlQ2hhbmdlIiwiaW5kZXgiLCJ1cGRhdGVkTWVtYmVycyIsImhhbmRsZUFkZHJlc3NDaGFuZ2UiLCJoYW5kbGVBc3NpZ25Sb2xlcyIsImNvbnNvbGUiLCJsb2ciLCJzcGFjaW5nIiwiZGl2IiwiY2xhc3NOYW1lIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiaXNDaGVja2VkIiwib25DaGFuZ2UiLCJtYiIsInZhcmlhbnQiLCJtYXAiLCJtZW1iZXIiLCJjb2xvclNjaGVtZSIsInZhbHVlIiwiZSIsInRhcmdldCIsIm9wdGlvbiIsInBsYWNlaG9sZGVyIiwibGVmdEljb24iLCJvbkNsaWNrIiwibGVuZ3RoIiwianVzdGlmeUNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/ManageOrganizationTab.tsx\n"));

/***/ })

});