(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Vueble = {}));
}(this, (function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        props: {
            table: {}            
        },
        methods: {
            parse: function parse(input, params) {
                if(typeof input == 'function') {
                    return input(params)
                }
                return input
            }
        }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    var isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return function (id, style) { return addStyle(id, style); };
    }
    var HEAD;
    var styles = {};
    function addStyle(id, css) {
        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            var code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    { style.element.setAttribute('media', css.media); }
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                var index = style.ids.size - 1;
                var textNode = document.createTextNode(code);
                var nodes = style.element.childNodes;
                if (nodes[index])
                    { style.element.removeChild(nodes[index]); }
                if (nodes.length)
                    { style.element.insertBefore(textNode, nodes[index]); }
                else
                    { style.element.appendChild(textNode); }
            }
        }
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "table-builder" }, [
        _vm.table
          ? _c(
              "table",
              _vm._g(
                _vm._b(
                  {},
                  "table",
                  _vm.parse(_vm.table.attrs, {
                    table: _vm.table,
                    model: _vm.model
                  }),
                  false
                ),
                _vm.parse(_vm.table.events, { table: _vm.table, model: _vm.model })
              ),
              [
                _vm.table.header
                  ? _c(
                      "thead",
                      _vm._g(
                        _vm._b(
                          {},
                          "thead",
                          _vm.parse(_vm.table.header.attrs, {
                            table: _vm.table,
                            model: _vm.model
                          }),
                          false
                        ),
                        _vm.parse(_vm.table.header.events, {
                          table: _vm.table,
                          model: _vm.model
                        })
                      ),
                      _vm._l(
                        _vm.parse(_vm.table.header.rows, {
                          table: _vm.table,
                          model: _vm.model
                        }),
                        function(row, i) {
                          return _c(
                            "tr",
                            _vm._g(
                              _vm._b(
                                { key: "thead-tr-" + i },
                                "tr",
                                _vm.parse(row.attrs, {
                                  table: _vm.table,
                                  row: row,
                                  model: _vm.model
                                }),
                                false
                              ),
                              _vm.parse(row.events, {
                                table: _vm.table,
                                row: row,
                                model: _vm.model
                              })
                            ),
                            _vm._l(
                              _vm.parse(row.cols, {
                                table: _vm.table,
                                row: row,
                                model: _vm.model
                              }),
                              function(col, i) {
                                return _c(
                                  "th",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        key: "thead-tr-th-" + i,
                                        domProps: { innerHTML: _vm._s(col.label) }
                                      },
                                      "th",
                                      _vm.parse(col.attrs, {
                                        table: _vm.table,
                                        row: row,
                                        col: col,
                                        model: _vm.model
                                      }),
                                      false
                                    ),
                                    _vm.parse(col.events, {
                                      table: _vm.table,
                                      row: row,
                                      col: col,
                                      model: _vm.model
                                    })
                                  )
                                )
                              }
                            ),
                            0
                          )
                        }
                      ),
                      0
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.table.body
                  ? _c(
                      "tbody",
                      _vm._g(
                        _vm._b(
                          {},
                          "tbody",
                          _vm.parse(_vm.table.body.attrs, {
                            table: _vm.table,
                            model: _vm.model
                          }),
                          false
                        ),
                        _vm.parse(_vm.table.body.events, {
                          table: _vm.table,
                          model: _vm.model
                        })
                      ),
                      _vm._l(
                        _vm.parse(_vm.table.body.rows, {
                          table: _vm.table,
                          model: _vm.model
                        }),
                        function(row, i) {
                          return _c(
                            "tr",
                            _vm._g(
                              _vm._b(
                                { key: "thead-tr-" + i },
                                "tr",
                                _vm.parse(row.attrs, {
                                  table: _vm.table,
                                  row: row,
                                  model: _vm.model
                                }),
                                false
                              ),
                              _vm.parse(row.events, {
                                table: _vm.table,
                                row: row,
                                model: _vm.model
                              })
                            ),
                            _vm._l(
                              _vm.parse(row.cols, {
                                table: _vm.table,
                                row: row,
                                model: _vm.model
                              }),
                              function(col, i) {
                                return _c(
                                  "td",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        key: "tbody-tr-td-" + i,
                                        domProps: { innerHTML: _vm._s(col.label) }
                                      },
                                      "td",
                                      _vm.parse(col.attrs, {
                                        table: _vm.table,
                                        row: row,
                                        col: col,
                                        model: _vm.model
                                      }),
                                      false
                                    ),
                                    _vm.parse(col.events, {
                                      table: _vm.table,
                                      row: row,
                                      col: col,
                                      model: _vm.model
                                    })
                                  )
                                )
                              }
                            ),
                            0
                          )
                        }
                      ),
                      0
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.table.footer
                  ? _c(
                      "tfoot",
                      _vm._g(
                        _vm._b(
                          {},
                          "tfoot",
                          _vm.parse(_vm.table.footer.attrs, {
                            table: _vm.table,
                            model: _vm.model
                          }),
                          false
                        ),
                        _vm.parse(_vm.table.footer.events, {
                          table: _vm.table,
                          model: _vm.model
                        })
                      ),
                      _vm._l(
                        _vm.parse(_vm.table.footer.rows, {
                          table: _vm.table,
                          model: _vm.model
                        }),
                        function(row, i) {
                          return _c(
                            "tr",
                            _vm._g(
                              _vm._b(
                                { key: "tfoot-tr-" + i },
                                "tr",
                                _vm.parse(row.attrs, {
                                  table: _vm.table,
                                  row: row,
                                  model: _vm.model
                                }),
                                false
                              ),
                              _vm.parse(row.events, {
                                table: _vm.table,
                                row: row,
                                model: _vm.model
                              })
                            ),
                            _vm._l(
                              _vm.parse(row.cols, {
                                table: _vm.table,
                                row: row,
                                model: _vm.model
                              }),
                              function(col, i) {
                                return _c(
                                  "td",
                                  _vm._g(
                                    _vm._b(
                                      {
                                        key: "tfoot-tr-td-" + i,
                                        domProps: { innerHTML: _vm._s(col.label) }
                                      },
                                      "td",
                                      _vm.parse(col.attrs, {
                                        table: _vm.table,
                                        row: row,
                                        col: col,
                                        model: _vm.model
                                      }),
                                      false
                                    ),
                                    _vm.parse(col.events, {
                                      table: _vm.table,
                                      row: row,
                                      col: col,
                                      model: _vm.model
                                    })
                                  )
                                )
                              }
                            ),
                            0
                          )
                        }
                      ),
                      0
                    )
                  : _vm._e()
              ]
            )
          : _vm._e()
      ])
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-e845f050_0", { source: ".table-builder *[data-v-e845f050] {\n  box-sizing: border-box;\n}\n.row[data-v-e845f050] {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n[class*=\"col-\"][data-v-e845f050] {\n  width: 100%;\n}\n.col-1[data-v-e845f050] {\n  max-width: 8.333333333333332%;\n  padding: 15px;\n}\n.col-2[data-v-e845f050] {\n  max-width: 16.666666666666664%;\n  padding: 15px;\n}\n.col-3[data-v-e845f050] {\n  max-width: 25%;\n  padding: 15px;\n}\n.col-4[data-v-e845f050] {\n  max-width: 33.33333333333333%;\n  padding: 15px;\n}\n.col-5[data-v-e845f050] {\n  max-width: 41.66666666666667%;\n  padding: 15px;\n}\n.col-6[data-v-e845f050] {\n  max-width: 50%;\n  padding: 15px;\n}\n.col-7[data-v-e845f050] {\n  max-width: 58.333333333333336%;\n  padding: 15px;\n}\n.col-8[data-v-e845f050] {\n  max-width: 66.66666666666666%;\n  padding: 15px;\n}\n.col-9[data-v-e845f050] {\n  max-width: 75%;\n  padding: 15px;\n}\n.col-10[data-v-e845f050] {\n  max-width: 83.33333333333334%;\n  padding: 15px;\n}\n.col-11[data-v-e845f050] {\n  max-width: 91.66666666666666%;\n  padding: 15px;\n}\n.col-12[data-v-e845f050] {\n  max-width: 100%;\n  padding: 15px;\n}\n", map: {"version":3,"sources":["/home/everaldoreis/public_html/wordpress/vueble/src/Vueble.vue","Vueble.vue"],"names":[],"mappings":"AAwCA;EACA,sBAAA;ACvCA;ADwCA;EACA,aAAA;EACA,eAAA;EACA,WAAA;ACtCA;ADuCA;EACA,WAAA;ACrCA;ADuCA;EACA,6BAAA;EACA,aAAA;ACrCA;ADmCA;EACA,8BAAA;EACA,aAAA;ACjCA;AD+BA;EACA,cAAA;EACA,aAAA;AC7BA;AD2BA;EACA,6BAAA;EACA,aAAA;ACzBA;ADuBA;EACA,6BAAA;EACA,aAAA;ACrBA;ADmBA;EACA,cAAA;EACA,aAAA;ACjBA;ADeA;EACA,8BAAA;EACA,aAAA;ACbA;ADWA;EACA,6BAAA;EACA,aAAA;ACTA;ADOA;EACA,cAAA;EACA,aAAA;ACLA;ADGA;EACA,6BAAA;EACA,aAAA;ACDA;ADDA;EACA,6BAAA;EACA,aAAA;ACGA;ADLA;EACA,eAAA;EACA,aAAA;ACOA","file":"Vueble.vue","sourcesContent":["<template>\n    <div class=\"table-builder\">\n        <table v-if=\"table\" v-bind=\"parse(table.attrs, {table, model})\" v-on=\"parse(table.events, {table, model})\">\n            <thead v-if=\"table.header\" v-bind=\"parse(table.header.attrs, {table, model})\" v-on=\"parse(table.header.events, {table, model})\">\n                <tr v-for=\"(row, i) in parse(table.header.rows, {table, model})\" :key=\"`thead-tr-${i}`\" v-bind=\"parse(row.attrs, {table, row, model})\" v-on=\"parse(row.events, {table, row, model})\">\n                    <th v-for=\"(col, i) in parse(row.cols, {table, row, model})\" v-html=\"col.label\" :key=\"`thead-tr-th-${i}`\" v-bind=\"parse(col.attrs, {table, row, col, model})\" v-on=\"parse(col.events, {table, row, col, model})\"></th>\n                </tr>\n            </thead>\n            <tbody v-if=\"table.body\" v-bind=\"parse(table.body.attrs, {table, model})\" v-on=\"parse(table.body.events, {table, model})\">\n                <tr v-for=\"(row, i) in parse(table.body.rows, {table, model})\" :key=\"`thead-tr-${i}`\" v-bind=\"parse(row.attrs, {table, row, model})\" v-on=\"parse(row.events, {table, row, model})\">\n                    <td v-for=\"(col, i) in parse(row.cols, {table, row, model})\" v-html=\"col.label\" :key=\"`tbody-tr-td-${i}`\" v-bind=\"parse(col.attrs, {table, row, col, model})\" v-on=\"parse(col.events, {table, row, col, model})\"></td>\n                </tr>\n            </tbody>\n            <tfoot v-if=\"table.footer\" v-bind=\"parse(table.footer.attrs, {table, model})\" v-on=\"parse(table.footer.events, {table, model})\">\n                <tr v-for=\"(row, i) in parse(table.footer.rows, {table, model})\" :key=\"`tfoot-tr-${i}`\" v-bind=\"parse(row.attrs, {table, row, model})\" v-on=\"parse(row.events, {table, row, model})\">\n                    <td v-for=\"(col, i) in parse(row.cols, {table, row, model})\" v-html=\"col.label\" :key=\"`tfoot-tr-td-${i}`\" v-bind=\"parse(col.attrs, {table, row, col, model})\" v-on=\"parse(col.events, {table, row, col, model})\"></td>\n                </tr>\n            </tfoot>\n        </table>\n    </div>\n</template>\n\n<script>\nexport default {\n    props: {\n        table: {}            \n    },\n    methods: {\n        parse(input, params) {\n            if(typeof input == 'function') {\n                return input(params)\n            }\n            return input\n        }\n    }\n}\n</script>\n\n<style lang=\"stylus\" scoped>\n.table-builder\n    *\n        box-sizing border-box\n.row\n  display flex\n  flex-wrap wrap \n  width 100%\n[class*=\"col-\"]\n  width 100%\nfor i in 1..12\n  .col-{i}\n    max-width unit(100% * (i / 12), '%')\n    padding 15px\n</style>",".table-builder * {\n  box-sizing: border-box;\n}\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n[class*=\"col-\"] {\n  width: 100%;\n}\n.col-1 {\n  max-width: 8.333333333333332%;\n  padding: 15px;\n}\n.col-2 {\n  max-width: 16.666666666666664%;\n  padding: 15px;\n}\n.col-3 {\n  max-width: 25%;\n  padding: 15px;\n}\n.col-4 {\n  max-width: 33.33333333333333%;\n  padding: 15px;\n}\n.col-5 {\n  max-width: 41.66666666666667%;\n  padding: 15px;\n}\n.col-6 {\n  max-width: 50%;\n  padding: 15px;\n}\n.col-7 {\n  max-width: 58.333333333333336%;\n  padding: 15px;\n}\n.col-8 {\n  max-width: 66.66666666666666%;\n  padding: 15px;\n}\n.col-9 {\n  max-width: 75%;\n  padding: 15px;\n}\n.col-10 {\n  max-width: 83.33333333333334%;\n  padding: 15px;\n}\n.col-11 {\n  max-width: 91.66666666666666%;\n  padding: 15px;\n}\n.col-12 {\n  max-width: 100%;\n  padding: 15px;\n}\n"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-e845f050";
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
    	if (install.installed) { return; }
    	install.installed = true;
    	Vue.component('Vueble', __vue_component__);
    }

    // Create module definition for Vue.use()
    var plugin = {
    	install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
    	GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
    	GlobalVue = global.Vue;
    }
    if (GlobalVue) {
    	GlobalVue.use(plugin);
    }

    exports.default = __vue_component__;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
