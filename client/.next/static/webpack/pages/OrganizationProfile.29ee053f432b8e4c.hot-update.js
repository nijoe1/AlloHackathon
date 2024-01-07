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

/***/ "./components/ManageOrganizationTab.jsx":
/*!**********************************************!*\
  !*** ./components/ManageOrganizationTab.jsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_FaPlus_react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=FaPlus!=!react-icons/fa */ \"__barrel_optimize__?names=FaPlus!=!./node_modules/react-icons/fa/index.esm.js\");\n/* harmony import */ var _constants_Hats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/constants/Hats */ \"./constants/Hats.ts\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst StyledTable = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.chakra)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Table, {\n    baseStyle: {\n        width: \"full\",\n        \"th, td\": {\n            textAlign: \"center\"\n        }\n    }\n});\n_c = StyledTable;\n\n\nconst ManageOrganizationTab = (orgID)=>{\n    _s();\n    const [detailsFetched, setDetailsFetched] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [newMembers, setNewMembers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [showRemoveToggle, setShowRemoveToggle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [members, setMembers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        async function fetch() {\n            let res = await (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.getOrgMembers)(orgID);\n            setMembers(res);\n            setDetailsFetched(!detailsFetched);\n        }\n        if (!detailsFetched) fetch();\n    }, []);\n    const handleAddMember = ()=>{\n        setNewMembers([\n            ...newMembers,\n            {\n                role: \"Manager\",\n                address: \"\"\n            }\n        ]);\n    };\n    const handleRoleChange = (index, role)=>{\n        const updatedMembers = [\n            ...newMembers\n        ];\n        updatedMembers[index].role = role;\n        setNewMembers(updatedMembers);\n    };\n    const handleAddressChange = (index, address)=>{\n        const updatedMembers = [\n            ...newMembers\n        ];\n        updatedMembers[index].address = address;\n        setNewMembers(updatedMembers);\n    };\n    const handleAssignRoles = ()=>{\n        // Implement logic to assign roles to new members\n        console.log(\"Assigning roles to new members:\", newMembers);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.VStack, {\n        spacing: 4,\n        width: \"full\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Center, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-wrap items-center gap-2 \",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Text, {\n                            fontSize: \"md\",\n                            fontWeight: \"semibold\",\n                            textAlign: \"center\",\n                            mb: 4,\n                            children: \"Add Members\"\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                            lineNumber: 76,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Switch, {\n                            isChecked: showRemoveToggle,\n                            onChange: ()=>setShowRemoveToggle(!showRemoveToggle),\n                            mb: 4\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                            lineNumber: 79,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Text, {\n                            fontSize: \"md\",\n                            fontWeight: \"semibold\",\n                            textAlign: \"center\",\n                            mb: 4,\n                            children: \"Remove members\"\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                            lineNumber: 84,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                    lineNumber: 75,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                lineNumber: 74,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StyledTable, {\n                variant: \"simple\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Thead, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Tr, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Th, {\n                                    children: \"Role\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                    lineNumber: 93,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Th, {\n                                    children: \"Address\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                    lineNumber: 94,\n                                    columnNumber: 13\n                                }, undefined),\n                                showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Th, {\n                                    children: \"Remove\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                    lineNumber: 95,\n                                    columnNumber: 34\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                            lineNumber: 92,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                        lineNumber: 91,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Tbody, {\n                        children: [\n                            members.map((member, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Tr, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Td, {\n                                            children: member.role\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                            lineNumber: 101,\n                                            columnNumber: 15\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Td, {\n                                            children: member.address\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                            lineNumber: 102,\n                                            columnNumber: 15\n                                        }, undefined),\n                                        showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                                                colorScheme: \"red\",\n                                                children: \"Remove\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                                lineNumber: 105,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                            lineNumber: 104,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                    lineNumber: 100,\n                                    columnNumber: 13\n                                }, undefined)),\n                            !showRemoveToggle && newMembers.map((member, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Tr, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Select, {\n                                                value: member.role,\n                                                onChange: (e)=>handleRoleChange(index, e.target.value),\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                        value: \"Manager\",\n                                                        children: \"Manager\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                                        lineNumber: 118,\n                                                        columnNumber: 21\n                                                    }, undefined),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                        value: \"Reviewer\",\n                                                        children: \"Reviewer\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                                        lineNumber: 119,\n                                                        columnNumber: 21\n                                                    }, undefined)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                                lineNumber: 114,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                            lineNumber: 113,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                                                value: member.address,\n                                                onChange: (e)=>handleAddressChange(index, e.target.value),\n                                                placeholder: \"Enter address\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                                lineNumber: 123,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                            lineNumber: 122,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                                    lineNumber: 112,\n                                    columnNumber: 15\n                                }, undefined))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                        lineNumber: 98,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                lineNumber: 90,\n                columnNumber: 7\n            }, undefined),\n            !showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Center, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                    leftIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaPlus_react_icons_fa__WEBPACK_IMPORTED_MODULE_5__.FaPlus, {}, void 0, false, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                        lineNumber: 137,\n                        columnNumber: 23\n                    }, void 0),\n                    colorScheme: \"blue\",\n                    onClick: handleAddMember,\n                    children: \"Add Member\"\n                }, void 0, false, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                    lineNumber: 136,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                lineNumber: 135,\n                columnNumber: 9\n            }, undefined),\n            !showRemoveToggle && newMembers.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Flex, {\n                justifyContent: \"flex-end\",\n                width: \"full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                    colorScheme: \"green\",\n                    onClick: handleAssignRoles,\n                    children: \"Assign Roles\"\n                }, void 0, false, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                    lineNumber: 148,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n                lineNumber: 147,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.jsx\",\n        lineNumber: 73,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ManageOrganizationTab, \"zkH2LLYBkDYH2AhkZHNnoNVSc2U=\");\n_c1 = ManageOrganizationTab;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ManageOrganizationTab);\nvar _c, _c1;\n$RefreshReg$(_c, \"StyledTable\");\n$RefreshReg$(_c1, \"ManageOrganizationTab\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNWLG9CQUNBRixXQUFXMkIsR0FBRyxDQUFDLENBQUNDLFFBQVFoQixzQkFDdEIsOERBQUN0QyxnREFBRUE7O3NEQUNELDhEQUFDRSxnREFBRUE7c0RBQ0QsNEVBQUNDLG9EQUFNQTtnREFDTHFELE9BQU9GLE9BQU9uQixJQUFJO2dEQUNsQmdCLFVBQVUsQ0FBQ00sSUFBTXBCLGlCQUFpQkMsT0FBT21CLEVBQUVDLE1BQU0sQ0FBQ0YsS0FBSzs7a0VBRXZELDhEQUFDRzt3REFBT0gsT0FBTTtrRUFBVTs7Ozs7O2tFQUN4Qiw4REFBQ0c7d0RBQU9ILE9BQU07a0VBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7O3NEQUc3Qiw4REFBQ3RELGdEQUFFQTtzREFDRCw0RUFBQ0UsbURBQUtBO2dEQUNKb0QsT0FBT0YsT0FBT2xCLE9BQU87Z0RBQ3JCZSxVQUFVLENBQUNNLElBQU1qQixvQkFBb0JGLE9BQU9tQixFQUFFQyxNQUFNLENBQUNGLEtBQUs7Z0RBQzFESSxhQUFZOzs7Ozs7Ozs7Ozs7bUNBZFR0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFzQmhCLENBQUNWLGtDQUNBLDhEQUFDckIsb0RBQU1BOzBCQUNMLDRFQUFDWCxvREFBTUE7b0JBQ0xpRSx3QkFBVSw4REFBQ2pELGdGQUFNQTs7Ozs7b0JBQ2pCMkMsYUFBWTtvQkFDWk8sU0FBUzVCOzhCQUNWOzs7Ozs7Ozs7OztZQU1KLENBQUNOLG9CQUFvQkYsV0FBV3FDLE1BQU0sR0FBRyxtQkFDeEMsOERBQUMxRCxrREFBSUE7Z0JBQUMyRCxnQkFBZTtnQkFBV2pELE9BQU07MEJBQ3BDLDRFQUFDbkIsb0RBQU1BO29CQUFDMkQsYUFBWTtvQkFBUU8sU0FBU3JCOzhCQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPbEU7R0F2SE1uQjtNQUFBQTtBQXlITiwrREFBZUEscUJBQXFCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvTWFuYWdlT3JnYW5pemF0aW9uVGFiLmpzeD8zYjk4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2UgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGdldE9yZ01lbWJlcnMgfSBmcm9tIFwiQC91dGlscy91dGlsc1wiO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIFRhYmxlLFxuICBUaGVhZCxcbiAgVGJvZHksXG4gIFRyLFxuICBUaCxcbiAgVGQsXG4gIFNlbGVjdCxcbiAgSW5wdXQsXG4gIEZsZXgsXG4gIFN3aXRjaCxcbiAgQ2VudGVyLFxuICBUZXh0LFxuICBJY29uLFxuICBWU3RhY2ssXG4gIGNoYWtyYSxcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7IEZhUGx1cyB9IGZyb20gXCJyZWFjdC1pY29ucy9mYVwiO1xuXG5jb25zdCBTdHlsZWRUYWJsZSA9IGNoYWtyYShUYWJsZSwge1xuICBiYXNlU3R5bGU6IHtcbiAgICB3aWR0aDogXCJmdWxsXCIsXG4gICAgXCJ0aCwgdGRcIjoge1xuICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgIH0sXG4gIH0sXG59KTtcblxuaW1wb3J0IHsgSEFUU19BQkksIEhBVFNfQ09OVFJBQ1RfQUREUkVTUyB9IGZyb20gXCJAL2NvbnN0YW50cy9IYXRzXCI7XG5pbXBvcnQgeyB1c2VBY2NvdW50LCB1c2VQdWJsaWNDbGllbnQsIHVzZVdhbGxldENsaWVudCB9IGZyb20gXCJ3YWdtaVwiO1xuXG5jb25zdCBNYW5hZ2VPcmdhbml6YXRpb25UYWIgPSAob3JnSUQpID0+IHtcblxuICBjb25zdCBbZGV0YWlsc0ZldGNoZWQsIHNldERldGFpbHNGZXRjaGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW25ld01lbWJlcnMsIHNldE5ld01lbWJlcnNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2hvd1JlbW92ZVRvZ2dsZSwgc2V0U2hvd1JlbW92ZVRvZ2dsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5jb25zdCBbbWVtYmVycyAsIHNldE1lbWJlcnNdID0gXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2goKSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgZ2V0T3JnTWVtYmVycyhvcmdJRCk7XG4gICAgICBzZXRNZW1iZXJzKHJlcyk7XG4gICAgICBzZXREZXRhaWxzRmV0Y2hlZCghZGV0YWlsc0ZldGNoZWQpO1xuICAgIH1cbiAgICBpZiAoIWRldGFpbHNGZXRjaGVkKSBmZXRjaCgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlQWRkTWVtYmVyID0gKCkgPT4ge1xuICAgIHNldE5ld01lbWJlcnMoWy4uLm5ld01lbWJlcnMsIHsgcm9sZTogXCJNYW5hZ2VyXCIsIGFkZHJlc3M6IFwiXCIgfV0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJvbGVDaGFuZ2UgPSAoaW5kZXgsIHJvbGUpID0+IHtcbiAgICBjb25zdCB1cGRhdGVkTWVtYmVycyA9IFsuLi5uZXdNZW1iZXJzXTtcbiAgICB1cGRhdGVkTWVtYmVyc1tpbmRleF0ucm9sZSA9IHJvbGU7XG4gICAgc2V0TmV3TWVtYmVycyh1cGRhdGVkTWVtYmVycyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQWRkcmVzc0NoYW5nZSA9IChpbmRleCwgYWRkcmVzcykgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXJzID0gWy4uLm5ld01lbWJlcnNdO1xuICAgIHVwZGF0ZWRNZW1iZXJzW2luZGV4XS5hZGRyZXNzID0gYWRkcmVzcztcbiAgICBzZXROZXdNZW1iZXJzKHVwZGF0ZWRNZW1iZXJzKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBc3NpZ25Sb2xlcyA9ICgpID0+IHtcbiAgICAvLyBJbXBsZW1lbnQgbG9naWMgdG8gYXNzaWduIHJvbGVzIHRvIG5ldyBtZW1iZXJzXG4gICAgY29uc29sZS5sb2coXCJBc3NpZ25pbmcgcm9sZXMgdG8gbmV3IG1lbWJlcnM6XCIsIG5ld01lbWJlcnMpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFZTdGFjayBzcGFjaW5nPXs0fSB3aWR0aD1cImZ1bGxcIj5cbiAgICAgIDxDZW50ZXI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yIFwiPlxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwibWRcIiBmb250V2VpZ2h0PVwic2VtaWJvbGRcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIiBtYj17NH0+XG4gICAgICAgICAgICB7XCJBZGQgTWVtYmVyc1wifVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICBpc0NoZWNrZWQ9e3Nob3dSZW1vdmVUb2dnbGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gc2V0U2hvd1JlbW92ZVRvZ2dsZSghc2hvd1JlbW92ZVRvZ2dsZSl9XG4gICAgICAgICAgICBtYj17NH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwibWRcIiBmb250V2VpZ2h0PVwic2VtaWJvbGRcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIiBtYj17NH0+XG4gICAgICAgICAgICB7XCJSZW1vdmUgbWVtYmVyc1wifVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0NlbnRlcj5cblxuICAgICAgPFN0eWxlZFRhYmxlIHZhcmlhbnQ9XCJzaW1wbGVcIj5cbiAgICAgICAgPFRoZWFkPlxuICAgICAgICAgIDxUcj5cbiAgICAgICAgICAgIDxUaD5Sb2xlPC9UaD5cbiAgICAgICAgICAgIDxUaD5BZGRyZXNzPC9UaD5cbiAgICAgICAgICAgIHtzaG93UmVtb3ZlVG9nZ2xlICYmIDxUaD5SZW1vdmU8L1RoPn1cbiAgICAgICAgICA8L1RyPlxuICAgICAgICA8L1RoZWFkPlxuICAgICAgICA8VGJvZHk+XG4gICAgICAgICAge21lbWJlcnMubWFwKChtZW1iZXIsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8VHIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgIDxUZD57bWVtYmVyLnJvbGV9PC9UZD5cbiAgICAgICAgICAgICAgPFRkPnttZW1iZXIuYWRkcmVzc308L1RkPlxuICAgICAgICAgICAgICB7c2hvd1JlbW92ZVRvZ2dsZSAmJiAoXG4gICAgICAgICAgICAgICAgPFRkPlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjb2xvclNjaGVtZT1cInJlZFwiPlJlbW92ZTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvVGQ+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1RyPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHshc2hvd1JlbW92ZVRvZ2dsZSAmJlxuICAgICAgICAgICAgbmV3TWVtYmVycy5tYXAoKG1lbWJlciwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPFRyIGtleT17aW5kZXh9PlxuICAgICAgICAgICAgICAgIDxUZD5cbiAgICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21lbWJlci5yb2xlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZVJvbGVDaGFuZ2UoaW5kZXgsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1hbmFnZXJcIj5NYW5hZ2VyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSZXZpZXdlclwiPlJldmlld2VyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L1RkPlxuICAgICAgICAgICAgICAgIDxUZD5cbiAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bWVtYmVyLmFkZHJlc3N9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlQWRkcmVzc0NoYW5nZShpbmRleCwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGFkZHJlc3NcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1RkPlxuICAgICAgICAgICAgICA8L1RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvVGJvZHk+XG4gICAgICA8L1N0eWxlZFRhYmxlPlxuXG4gICAgICB7IXNob3dSZW1vdmVUb2dnbGUgJiYgKFxuICAgICAgICA8Q2VudGVyPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGxlZnRJY29uPXs8RmFQbHVzIC8+fVxuICAgICAgICAgICAgY29sb3JTY2hlbWU9XCJibHVlXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFkZE1lbWJlcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBBZGQgTWVtYmVyXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvQ2VudGVyPlxuICAgICAgKX1cblxuICAgICAgeyFzaG93UmVtb3ZlVG9nZ2xlICYmIG5ld01lbWJlcnMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxGbGV4IGp1c3RpZnlDb250ZW50PVwiZmxleC1lbmRcIiB3aWR0aD1cImZ1bGxcIj5cbiAgICAgICAgICA8QnV0dG9uIGNvbG9yU2NoZW1lPVwiZ3JlZW5cIiBvbkNsaWNrPXtoYW5kbGVBc3NpZ25Sb2xlc30+XG4gICAgICAgICAgICBBc3NpZ24gUm9sZXNcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9GbGV4PlxuICAgICAgKX1cbiAgICA8L1ZTdGFjaz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZU9yZ2FuaXphdGlvblRhYjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlIiwiZ2V0T3JnTWVtYmVycyIsIkJveCIsIkJ1dHRvbiIsIlRhYmxlIiwiVGhlYWQiLCJUYm9keSIsIlRyIiwiVGgiLCJUZCIsIlNlbGVjdCIsIklucHV0IiwiRmxleCIsIlN3aXRjaCIsIkNlbnRlciIsIlRleHQiLCJJY29uIiwiVlN0YWNrIiwiY2hha3JhIiwiRmFQbHVzIiwiU3R5bGVkVGFibGUiLCJiYXNlU3R5bGUiLCJ3aWR0aCIsInRleHRBbGlnbiIsIkhBVFNfQUJJIiwiSEFUU19DT05UUkFDVF9BRERSRVNTIiwidXNlQWNjb3VudCIsInVzZVB1YmxpY0NsaWVudCIsInVzZVdhbGxldENsaWVudCIsIk1hbmFnZU9yZ2FuaXphdGlvblRhYiIsIm9yZ0lEIiwiZGV0YWlsc0ZldGNoZWQiLCJzZXREZXRhaWxzRmV0Y2hlZCIsIm5ld01lbWJlcnMiLCJzZXROZXdNZW1iZXJzIiwic2hvd1JlbW92ZVRvZ2dsZSIsInNldFNob3dSZW1vdmVUb2dnbGUiLCJtZW1iZXJzIiwic2V0TWVtYmVycyIsImZldGNoIiwicmVzIiwiaGFuZGxlQWRkTWVtYmVyIiwicm9sZSIsImFkZHJlc3MiLCJoYW5kbGVSb2xlQ2hhbmdlIiwiaW5kZXgiLCJ1cGRhdGVkTWVtYmVycyIsImhhbmRsZUFkZHJlc3NDaGFuZ2UiLCJoYW5kbGVBc3NpZ25Sb2xlcyIsImNvbnNvbGUiLCJsb2ciLCJzcGFjaW5nIiwiZGl2IiwiY2xhc3NOYW1lIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibWIiLCJpc0NoZWNrZWQiLCJvbkNoYW5nZSIsInZhcmlhbnQiLCJtYXAiLCJtZW1iZXIiLCJjb2xvclNjaGVtZSIsInZhbHVlIiwiZSIsInRhcmdldCIsIm9wdGlvbiIsInBsYWNlaG9sZGVyIiwibGVmdEljb24iLCJvbkNsaWNrIiwibGVuZ3RoIiwianVzdGlmeUNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/ManageOrganizationTab.jsx\n"));

/***/ })

});