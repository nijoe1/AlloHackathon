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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/index.mjs\");\n/* harmony import */ var _barrel_optimize_names_FaPlus_react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=FaPlus!=!react-icons/fa */ \"__barrel_optimize__?names=FaPlus!=!./node_modules/react-icons/fa/index.esm.js\");\n\nvar _s = $RefreshSig$();\n\n\n\nconst StyledTable = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.chakra)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Table, {\n    baseStyle: {\n        width: \"full\",\n        \"th, td\": {\n            textAlign: \"center\"\n        }\n    }\n});\n_c = StyledTable;\nconst ManageOrganizationTab = ()=>{\n    _s();\n    const [members, setMembers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            role: \"Admin\",\n            address: \"0x123...ABC\"\n        },\n        {\n            role: \"Manager\",\n            address: \"0x456...DEF\"\n        }\n    ]);\n    const [newMembers, setNewMembers] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [showRemoveToggle, setShowRemoveToggle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleAddMember = ()=>{\n        setNewMembers([\n            ...newMembers,\n            {\n                role: \"Manager\",\n                address: \"\"\n            }\n        ]);\n    };\n    const handleRoleChange = (index, role)=>{\n        const updatedMembers = [\n            ...newMembers\n        ];\n        updatedMembers[index].role = role;\n        setNewMembers(updatedMembers);\n    };\n    const handleAddressChange = (index, address)=>{\n        const updatedMembers = [\n            ...newMembers\n        ];\n        updatedMembers[index].address = address;\n        setNewMembers(updatedMembers);\n    };\n    const handleAssignRoles = ()=>{\n        // Implement logic to assign roles to new members\n        console.log(\"Assigning roles to new members:\", newMembers);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.VStack, {\n        spacing: 4,\n        width: \"full\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Center, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {\n                            fontSize: \"2xl\",\n                            fontWeight: \"semibold\",\n                            textAlign: \"center\",\n                            mb: \"4\",\n                            children: \"Add Members\"\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 66,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Switch, {\n                            isChecked: showRemoveToggle,\n                            onChange: ()=>setShowRemoveToggle(!showRemoveToggle),\n                            mb: 4\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 69,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Text, {\n                            fontSize: \"2xl\",\n                            fontWeight: \"semibold\",\n                            textAlign: \"center\",\n                            mb: \"4\",\n                            children: \"Remove members\"\n                        }, void 0, false, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                    lineNumber: 65,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(StyledTable, {\n                variant: \"simple\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Thead, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tr, {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Th, {\n                                    children: \"Role\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 83,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Th, {\n                                    children: \"Address\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 84,\n                                    columnNumber: 13\n                                }, undefined),\n                                showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Th, {\n                                    children: \"Remove\"\n                                }, void 0, false, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 85,\n                                    columnNumber: 34\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                            lineNumber: 82,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                        lineNumber: 81,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tbody, {\n                        children: [\n                            members.map((member, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tr, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: member.role\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 91,\n                                            columnNumber: 15\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: member.address\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 92,\n                                            columnNumber: 15\n                                        }, undefined),\n                                        showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                                                colorScheme: \"red\",\n                                                children: \"Remove\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                lineNumber: 95,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 94,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 90,\n                                    columnNumber: 13\n                                }, undefined)),\n                            !showRemoveToggle && newMembers.map((member, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Tr, {\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Select, {\n                                                value: member.role,\n                                                onChange: (e)=>handleRoleChange(index, e.target.value),\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                        value: \"Manager\",\n                                                        children: \"Manager\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                        lineNumber: 108,\n                                                        columnNumber: 21\n                                                    }, undefined),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                                        value: \"Reviewer\",\n                                                        children: \"Reviewer\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                        lineNumber: 109,\n                                                        columnNumber: 21\n                                                    }, undefined)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                lineNumber: 104,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 103,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Td, {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Input, {\n                                                value: member.address,\n                                                onChange: (e)=>handleAddressChange(index, e.target.value),\n                                                placeholder: \"Enter address\"\n                                            }, void 0, false, {\n                                                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                                lineNumber: 113,\n                                                columnNumber: 19\n                                            }, undefined)\n                                        }, void 0, false, {\n                                            fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                            lineNumber: 112,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                                    lineNumber: 102,\n                                    columnNumber: 15\n                                }, undefined))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, undefined),\n            !showRemoveToggle && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Center, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    leftIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaPlus_react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaPlus, {}, void 0, false, {\n                        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                        lineNumber: 127,\n                        columnNumber: 23\n                    }, void 0),\n                    colorScheme: \"blue\",\n                    onClick: handleAddMember,\n                    children: \"Add Member\"\n                }, void 0, false, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                    lineNumber: 126,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 125,\n                columnNumber: 9\n            }, undefined),\n            !showRemoveToggle && newMembers.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {\n                justifyContent: \"flex-end\",\n                width: \"full\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    colorScheme: \"green\",\n                    onClick: handleAssignRoles,\n                    children: \"Assign Roles\"\n                }, void 0, false, {\n                    fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                    lineNumber: 138,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n                lineNumber: 137,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/nick_w3/HatsSablierAllo/client/components/ManageOrganizationTab.tsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ManageOrganizationTab, \"yL2vsh2cOuT7q5qQcUs2bKKW9CA=\");\n_c1 = ManageOrganizationTab;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ManageOrganizationTab);\nvar _c, _c1;\n$RefreshReg$(_c, \"StyledTable\");\n$RefreshReg$(_c1, \"ManageOrganizationTab\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU1uQixpQkFBaUJDLE9BQU9rQixFQUFFQyxNQUFNLENBQUNGLEtBQUs7O2tFQUV2RCw4REFBQ0c7d0RBQU9ILE9BQU07a0VBQVU7Ozs7OztrRUFDeEIsOERBQUNHO3dEQUFPSCxPQUFNO2tFQUFXOzs7Ozs7Ozs7Ozs7Ozs7OztzREFHN0IsOERBQUMxQyxnREFBRUE7c0RBQ0QsNEVBQUNFLG1EQUFLQTtnREFDSndDLE9BQU9GLE9BQU90QixPQUFPO2dEQUNyQm1CLFVBQVUsQ0FBQ00sSUFBTWhCLG9CQUFvQkYsT0FBT2tCLEVBQUVDLE1BQU0sQ0FBQ0YsS0FBSztnREFDMURJLGFBQVk7Ozs7Ozs7Ozs7OzttQ0FkVHJCOzs7Ozs7Ozs7Ozs7Ozs7OztZQXNCaEIsQ0FBQ0osa0NBQ0EsOERBQUNoQixvREFBTUE7MEJBQ0wsNEVBQUNYLG9EQUFNQTtvQkFDTHFELHdCQUFVLDhEQUFDdEMsZ0ZBQU1BOzs7OztvQkFDakJnQyxhQUFZO29CQUNaTyxTQUFTekI7OEJBQ1Y7Ozs7Ozs7Ozs7O1lBTUosQ0FBQ0Ysb0JBQW9CRixXQUFXOEIsTUFBTSxHQUFHLG1CQUN4Qyw4REFBQzlDLGtEQUFJQTtnQkFBQytDLGdCQUFlO2dCQUFXdEMsT0FBTTswQkFDcEMsNEVBQUNsQixvREFBTUE7b0JBQUMrQyxhQUFZO29CQUFRTyxTQUFTcEI7OEJBQW1COzs7Ozs7Ozs7Ozs7Ozs7OztBQU9sRTtHQWpITWQ7TUFBQUE7QUFtSE4sK0RBQWVBLHFCQUFxQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL01hbmFnZU9yZ2FuaXphdGlvblRhYi50c3g/MTMzYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBUYWJsZSxcbiAgVGhlYWQsXG4gIFRib2R5LFxuICBUcixcbiAgVGgsXG4gIFRkLFxuICBTZWxlY3QsXG4gIElucHV0LFxuICBGbGV4LFxuICBTd2l0Y2gsXG4gIENlbnRlcixcbiAgVGV4dCxcbiAgSWNvbixcbiAgVlN0YWNrLFxuICBjaGFrcmEsXG59IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgeyBGYVBsdXMgfSBmcm9tIFwicmVhY3QtaWNvbnMvZmFcIjtcblxuY29uc3QgU3R5bGVkVGFibGUgPSBjaGFrcmEoVGFibGUsIHtcbiAgYmFzZVN0eWxlOiB7XG4gICAgd2lkdGg6IFwiZnVsbFwiLFxuICAgIFwidGgsIHRkXCI6IHtcbiAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICB9LFxuICB9LFxufSk7XG5cbmNvbnN0IE1hbmFnZU9yZ2FuaXphdGlvblRhYiA9ICgpID0+IHtcbiAgY29uc3QgW21lbWJlcnMsIHNldE1lbWJlcnNdID0gdXNlU3RhdGUoW1xuICAgIHsgcm9sZTogXCJBZG1pblwiLCBhZGRyZXNzOiBcIjB4MTIzLi4uQUJDXCIgfSxcbiAgICB7IHJvbGU6IFwiTWFuYWdlclwiLCBhZGRyZXNzOiBcIjB4NDU2Li4uREVGXCIgfSxcbiAgICAvLyAuLi4gbW9yZSBkdW1teSBtZW1iZXJzXG4gIF0pO1xuICBjb25zdCBbbmV3TWVtYmVycywgc2V0TmV3TWVtYmVyc10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzaG93UmVtb3ZlVG9nZ2xlLCBzZXRTaG93UmVtb3ZlVG9nZ2xlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVBZGRNZW1iZXIgPSAoKSA9PiB7XG4gICAgc2V0TmV3TWVtYmVycyhbLi4ubmV3TWVtYmVycywgeyByb2xlOiBcIk1hbmFnZXJcIiwgYWRkcmVzczogXCJcIiB9XSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUm9sZUNoYW5nZSA9IChpbmRleCwgcm9sZSkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXJzID0gWy4uLm5ld01lbWJlcnNdO1xuICAgIHVwZGF0ZWRNZW1iZXJzW2luZGV4XS5yb2xlID0gcm9sZTtcbiAgICBzZXROZXdNZW1iZXJzKHVwZGF0ZWRNZW1iZXJzKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRyZXNzQ2hhbmdlID0gKGluZGV4LCBhZGRyZXNzKSA9PiB7XG4gICAgY29uc3QgdXBkYXRlZE1lbWJlcnMgPSBbLi4ubmV3TWVtYmVyc107XG4gICAgdXBkYXRlZE1lbWJlcnNbaW5kZXhdLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgIHNldE5ld01lbWJlcnModXBkYXRlZE1lbWJlcnMpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFzc2lnblJvbGVzID0gKCkgPT4ge1xuICAgIC8vIEltcGxlbWVudCBsb2dpYyB0byBhc3NpZ24gcm9sZXMgdG8gbmV3IG1lbWJlcnNcbiAgICBjb25zb2xlLmxvZyhcIkFzc2lnbmluZyByb2xlcyB0byBuZXcgbWVtYmVyczpcIiwgbmV3TWVtYmVycyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8VlN0YWNrIHNwYWNpbmc9ezR9IHdpZHRoPVwiZnVsbFwiPlxuICAgICAgPENlbnRlcj5cbiAgICAgICAgPGRpdiA+XG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCIyeGxcIiBmb250V2VpZ2h0PVwic2VtaWJvbGRcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIiBtYj1cIjRcIj5cbiAgICAgICAgICAgIHtcIkFkZCBNZW1iZXJzXCJ9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgIGlzQ2hlY2tlZD17c2hvd1JlbW92ZVRvZ2dsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXRTaG93UmVtb3ZlVG9nZ2xlKCFzaG93UmVtb3ZlVG9nZ2xlKX1cbiAgICAgICAgICAgIG1iPXs0fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCIyeGxcIiBmb250V2VpZ2h0PVwic2VtaWJvbGRcIiB0ZXh0QWxpZ249XCJjZW50ZXJcIiBtYj1cIjRcIj5cbiAgICAgICAgICAgIHtcIlJlbW92ZSBtZW1iZXJzXCJ9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ2VudGVyPlxuXG4gICAgICA8U3R5bGVkVGFibGUgdmFyaWFudD1cInNpbXBsZVwiPlxuICAgICAgICA8VGhlYWQ+XG4gICAgICAgICAgPFRyPlxuICAgICAgICAgICAgPFRoPlJvbGU8L1RoPlxuICAgICAgICAgICAgPFRoPkFkZHJlc3M8L1RoPlxuICAgICAgICAgICAge3Nob3dSZW1vdmVUb2dnbGUgJiYgPFRoPlJlbW92ZTwvVGg+fVxuICAgICAgICAgIDwvVHI+XG4gICAgICAgIDwvVGhlYWQ+XG4gICAgICAgIDxUYm9keT5cbiAgICAgICAgICB7bWVtYmVycy5tYXAoKG1lbWJlciwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxUciBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgICAgPFRkPnttZW1iZXIucm9sZX08L1RkPlxuICAgICAgICAgICAgICA8VGQ+e21lbWJlci5hZGRyZXNzfTwvVGQ+XG4gICAgICAgICAgICAgIHtzaG93UmVtb3ZlVG9nZ2xlICYmIChcbiAgICAgICAgICAgICAgICA8VGQ+XG4gICAgICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yU2NoZW1lPVwicmVkXCI+UmVtb3ZlPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC9UZD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvVHI+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgeyFzaG93UmVtb3ZlVG9nZ2xlICYmXG4gICAgICAgICAgICBuZXdNZW1iZXJzLm1hcCgobWVtYmVyLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICA8VHIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAgPFRkPlxuICAgICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bWVtYmVyLnJvbGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gaGFuZGxlUm9sZUNoYW5nZShpbmRleCwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWFuYWdlclwiPk1hbmFnZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJldmlld2VyXCI+UmV2aWV3ZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvVGQ+XG4gICAgICAgICAgICAgICAgPFRkPlxuICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXttZW1iZXIuYWRkcmVzc31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVBZGRyZXNzQ2hhbmdlKGluZGV4LCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgYWRkcmVzc1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvVGQ+XG4gICAgICAgICAgICAgIDwvVHI+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9UYm9keT5cbiAgICAgIDwvU3R5bGVkVGFibGU+XG5cbiAgICAgIHshc2hvd1JlbW92ZVRvZ2dsZSAmJiAoXG4gICAgICAgIDxDZW50ZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgbGVmdEljb249ezxGYVBsdXMgLz59XG4gICAgICAgICAgICBjb2xvclNjaGVtZT1cImJsdWVcIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkTWVtYmVyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIEFkZCBNZW1iZXJcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9DZW50ZXI+XG4gICAgICApfVxuXG4gICAgICB7IXNob3dSZW1vdmVUb2dnbGUgJiYgbmV3TWVtYmVycy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgPEZsZXgganVzdGlmeUNvbnRlbnQ9XCJmbGV4LWVuZFwiIHdpZHRoPVwiZnVsbFwiPlxuICAgICAgICAgIDxCdXR0b24gY29sb3JTY2hlbWU9XCJncmVlblwiIG9uQ2xpY2s9e2hhbmRsZUFzc2lnblJvbGVzfT5cbiAgICAgICAgICAgIEFzc2lnbiBSb2xlc1xuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICApfVxuICAgIDwvVlN0YWNrPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlT3JnYW5pemF0aW9uVGFiO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJCdXR0b24iLCJUYWJsZSIsIlRoZWFkIiwiVGJvZHkiLCJUciIsIlRoIiwiVGQiLCJTZWxlY3QiLCJJbnB1dCIsIkZsZXgiLCJTd2l0Y2giLCJDZW50ZXIiLCJUZXh0IiwiVlN0YWNrIiwiY2hha3JhIiwiRmFQbHVzIiwiU3R5bGVkVGFibGUiLCJiYXNlU3R5bGUiLCJ3aWR0aCIsInRleHRBbGlnbiIsIk1hbmFnZU9yZ2FuaXphdGlvblRhYiIsIm1lbWJlcnMiLCJzZXRNZW1iZXJzIiwicm9sZSIsImFkZHJlc3MiLCJuZXdNZW1iZXJzIiwic2V0TmV3TWVtYmVycyIsInNob3dSZW1vdmVUb2dnbGUiLCJzZXRTaG93UmVtb3ZlVG9nZ2xlIiwiaGFuZGxlQWRkTWVtYmVyIiwiaGFuZGxlUm9sZUNoYW5nZSIsImluZGV4IiwidXBkYXRlZE1lbWJlcnMiLCJoYW5kbGVBZGRyZXNzQ2hhbmdlIiwiaGFuZGxlQXNzaWduUm9sZXMiLCJjb25zb2xlIiwibG9nIiwic3BhY2luZyIsImRpdiIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsIm1iIiwiaXNDaGVja2VkIiwib25DaGFuZ2UiLCJ2YXJpYW50IiwibWFwIiwibWVtYmVyIiwiY29sb3JTY2hlbWUiLCJ2YWx1ZSIsImUiLCJ0YXJnZXQiLCJvcHRpb24iLCJwbGFjZWhvbGRlciIsImxlZnRJY29uIiwib25DbGljayIsImxlbmd0aCIsImp1c3RpZnlDb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/ManageOrganizationTab.tsx\n"));

/***/ })

});