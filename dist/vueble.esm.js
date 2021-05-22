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
        parse: function parse() {
            var params = [], len = arguments.length;
            while ( len-- ) params[ len ] = arguments[ len ];

            var input = params[0];
            var table = params[1] || null;
            var row = params[2] || null;
            var col = params[3] || null;
            if(typeof input == 'function') {
                return input(table, row, col)
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
            _vm._b({}, "table", _vm.parse(_vm.table.attrs, _vm.table), false),
            _vm.parse(_vm.table.events, _vm.table)
          ),
          [
            _vm.table.header
              ? _c(
                  "thead",
                  _vm._g(
                    _vm._b(
                      {},
                      "thead",
                      _vm.parse(_vm.table.header.attrs, _vm.table),
                      false
                    ),
                    _vm.parse(_vm.table.header.events, _vm.table)
                  ),
                  _vm._l(_vm.parse(_vm.table.header.rows, _vm.table), function(
                    row,
                    i
                  ) {
                    return _c(
                      "tr",
                      _vm._g(
                        _vm._b(
                          { key: "thead-tr-" + i },
                          "tr",
                          _vm.parse(row.attrs, _vm.table, row),
                          false
                        ),
                        _vm.parse(row.events, _vm.table, row)
                      ),
                      _vm._l(_vm.parse(row.cols, _vm.table, row), function(
                        col,
                        i
                      ) {
                        return _c(
                          "th",
                          _vm._g(
                            _vm._b(
                              {
                                key: "thead-tr-th-" + i,
                                domProps: { innerHTML: _vm._s(col.label) }
                              },
                              "th",
                              _vm.parse(col.attrs, _vm.table, row, col),
                              false
                            ),
                            _vm.parse(col.events, _vm.table, row, col)
                          )
                        )
                      }),
                      0
                    )
                  }),
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
                      _vm.parse(_vm.table.body.attrs, _vm.table),
                      false
                    ),
                    _vm.parse(_vm.table.body.events, _vm.table)
                  ),
                  _vm._l(_vm.parse(_vm.table.body.rows, _vm.table), function(
                    row,
                    i
                  ) {
                    return _c(
                      "tr",
                      _vm._g(
                        _vm._b(
                          { key: "thead-tr-" + i },
                          "tr",
                          _vm.parse(row.attrs, _vm.table, row),
                          false
                        ),
                        _vm.parse(row.events, _vm.table, row)
                      ),
                      _vm._l(_vm.parse(row.cols, _vm.table, row), function(
                        col,
                        i
                      ) {
                        return _c(
                          "td",
                          _vm._g(
                            _vm._b(
                              {
                                key: "tbody-tr-td-" + i,
                                domProps: { innerHTML: _vm._s(col.label) }
                              },
                              "td",
                              _vm.parse(col.attrs, _vm.table, row, col),
                              false
                            ),
                            _vm.parse(col.events, _vm.table, row, col)
                          )
                        )
                      }),
                      0
                    )
                  }),
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
                      _vm.parse(_vm.table.footer.attrs, _vm.table),
                      false
                    ),
                    _vm.parse(_vm.table.footer.events, _vm.table)
                  ),
                  _vm._l(_vm.parse(_vm.table.footer.rows, _vm.table), function(
                    row,
                    i
                  ) {
                    return _c(
                      "tr",
                      _vm._g(
                        _vm._b(
                          { key: "tfoot-tr-" + i },
                          "tr",
                          _vm.parse(row.attrs, _vm.table, row),
                          false
                        ),
                        _vm.parse(row.events, _vm.table, row)
                      ),
                      _vm._l(_vm.parse(row.cols, _vm.table, row), function(
                        col,
                        i
                      ) {
                        return _c(
                          "td",
                          _vm._g(
                            _vm._b(
                              {
                                key: "tfoot-tr-td-" + i,
                                domProps: { innerHTML: _vm._s(col.label) }
                              },
                              "td",
                              _vm.parse(col.attrs, _vm.table, row, col),
                              false
                            ),
                            _vm.parse(col.events, _vm.table, row, col)
                          )
                        )
                      }),
                      0
                    )
                  }),
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
    inject("data-v-2fc1550b_0", { source: ".table-builder *[data-v-2fc1550b] {\n  box-sizing: border-box;\n}\n.row[data-v-2fc1550b] {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n[class*=\"col-\"][data-v-2fc1550b] {\n  width: 100%;\n}\n.col-1[data-v-2fc1550b] {\n  max-width: 8.333333333333332%;\n  padding: 15px;\n}\n.col-2[data-v-2fc1550b] {\n  max-width: 16.666666666666664%;\n  padding: 15px;\n}\n.col-3[data-v-2fc1550b] {\n  max-width: 25%;\n  padding: 15px;\n}\n.col-4[data-v-2fc1550b] {\n  max-width: 33.33333333333333%;\n  padding: 15px;\n}\n.col-5[data-v-2fc1550b] {\n  max-width: 41.66666666666667%;\n  padding: 15px;\n}\n.col-6[data-v-2fc1550b] {\n  max-width: 50%;\n  padding: 15px;\n}\n.col-7[data-v-2fc1550b] {\n  max-width: 58.333333333333336%;\n  padding: 15px;\n}\n.col-8[data-v-2fc1550b] {\n  max-width: 66.66666666666666%;\n  padding: 15px;\n}\n.col-9[data-v-2fc1550b] {\n  max-width: 75%;\n  padding: 15px;\n}\n.col-10[data-v-2fc1550b] {\n  max-width: 83.33333333333334%;\n  padding: 15px;\n}\n.col-11[data-v-2fc1550b] {\n  max-width: 91.66666666666666%;\n  padding: 15px;\n}\n.col-12[data-v-2fc1550b] {\n  max-width: 100%;\n  padding: 15px;\n}\n", map: {"version":3,"sources":["/home/everaldoreis/public_html/wordpress/vueble/src/Vueble.vue","Vueble.vue"],"names":[],"mappings":"AA4CA;EACA,sBAAA;AC3CA;AD4CA;EACA,aAAA;EACA,eAAA;EACA,WAAA;AC1CA;AD2CA;EACA,WAAA;ACzCA;AD2CA;EACA,6BAAA;EACA,aAAA;ACzCA;ADuCA;EACA,8BAAA;EACA,aAAA;ACrCA;ADmCA;EACA,cAAA;EACA,aAAA;ACjCA;AD+BA;EACA,6BAAA;EACA,aAAA;AC7BA;AD2BA;EACA,6BAAA;EACA,aAAA;ACzBA;ADuBA;EACA,cAAA;EACA,aAAA;ACrBA;ADmBA;EACA,8BAAA;EACA,aAAA;ACjBA;ADeA;EACA,6BAAA;EACA,aAAA;ACbA;ADWA;EACA,cAAA;EACA,aAAA;ACTA;ADOA;EACA,6BAAA;EACA,aAAA;ACLA;ADGA;EACA,6BAAA;EACA,aAAA;ACDA;ADDA;EACA,eAAA;EACA,aAAA;ACGA","file":"Vueble.vue","sourcesContent":["<template>\n    <div class=\"table-builder\">\n        <table v-if=\"table\" v-bind=\"parse(table.attrs, table)\" v-on=\"parse(table.events, table)\">\n            <thead v-if=\"table.header\" v-bind=\"parse(table.header.attrs, table)\" v-on=\"parse(table.header.events, table)\">\n                <tr v-for=\"(row, i) in parse(table.header.rows, table)\" :key=\"`thead-tr-${i}`\" v-bind=\"parse(row.attrs, table, row)\" v-on=\"parse(row.events, table, row)\">\n                    <th v-for=\"(col, i) in parse(row.cols, table, row)\" v-html=\"col.label\" :key=\"`thead-tr-th-${i}`\" v-bind=\"parse(col.attrs, table, row, col)\" v-on=\"parse(col.events, table, row, col)\"></th>\n                </tr>\n            </thead>\n            <tbody v-if=\"table.body\" v-bind=\"parse(table.body.attrs, table)\" v-on=\"parse(table.body.events, table)\">\n                <tr v-for=\"(row, i) in parse(table.body.rows, table)\" :key=\"`thead-tr-${i}`\" v-bind=\"parse(row.attrs, table, row)\" v-on=\"parse(row.events, table, row)\">\n                    <td v-for=\"(col, i) in parse(row.cols, table, row)\" v-html=\"col.label\" :key=\"`tbody-tr-td-${i}`\" v-bind=\"parse(col.attrs, table, row, col)\" v-on=\"parse(col.events, table, row, col)\"></td>\n                </tr>\n            </tbody>\n            <tfoot v-if=\"table.footer\" v-bind=\"parse(table.footer.attrs, table)\" v-on=\"parse(table.footer.events, table)\">\n                <tr v-for=\"(row, i) in parse(table.footer.rows, table)\" :key=\"`tfoot-tr-${i}`\" v-bind=\"parse(row.attrs, table, row)\" v-on=\"parse(row.events, table, row)\">\n                    <td v-for=\"(col, i) in parse(row.cols, table, row)\" v-html=\"col.label\" :key=\"`tfoot-tr-td-${i}`\" v-bind=\"parse(col.attrs, table, row, col)\" v-on=\"parse(col.events, table, row, col)\"></td>\n                </tr>\n            </tfoot>\n        </table>\n    </div>\n</template>\n\n<script>\nexport default {\n    props: {\n        table: {}            \n    },\n    methods: {\n        parse(...params) {\n            var input = params[0]\n            var table = params[1] || null\n            var row = params[2] || null\n            var col = params[3] || null\n            if(typeof input == 'function') {\n                return input(table, row, col)\n            }\n            return input\n        }\n    }\n}\n</script>\n\n<style lang=\"stylus\" scoped>\n.table-builder\n    *\n        box-sizing border-box\n.row\n  display flex\n  flex-wrap wrap \n  width 100%\n[class*=\"col-\"]\n  width 100%\nfor i in 1..12\n  .col-{i}\n    max-width unit(100% * (i / 12), '%')\n    padding 15px\n</style>",".table-builder * {\n  box-sizing: border-box;\n}\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n}\n[class*=\"col-\"] {\n  width: 100%;\n}\n.col-1 {\n  max-width: 8.333333333333332%;\n  padding: 15px;\n}\n.col-2 {\n  max-width: 16.666666666666664%;\n  padding: 15px;\n}\n.col-3 {\n  max-width: 25%;\n  padding: 15px;\n}\n.col-4 {\n  max-width: 33.33333333333333%;\n  padding: 15px;\n}\n.col-5 {\n  max-width: 41.66666666666667%;\n  padding: 15px;\n}\n.col-6 {\n  max-width: 50%;\n  padding: 15px;\n}\n.col-7 {\n  max-width: 58.333333333333336%;\n  padding: 15px;\n}\n.col-8 {\n  max-width: 66.66666666666666%;\n  padding: 15px;\n}\n.col-9 {\n  max-width: 75%;\n  padding: 15px;\n}\n.col-10 {\n  max-width: 83.33333333333334%;\n  padding: 15px;\n}\n.col-11 {\n  max-width: 91.66666666666666%;\n  padding: 15px;\n}\n.col-12 {\n  max-width: 100%;\n  padding: 15px;\n}\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-2fc1550b";
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

export default __vue_component__;
export { install };
