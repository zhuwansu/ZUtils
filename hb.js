(function (window, $) {
    //jquery html builder
    // build easy html element
    var PLUGIN_NAME = "hb";

    function AttrModel(name, value) {
        this.content = [];
        this.toString = function () {
            return this.content.join(' ')
        }
        this.next = function (name, value) {
            name = name || '';
            value = value || '';
            if (name && !value) {
                this.content.push(name);
            }
            if (name && value) {
                this.content.push(name + "=\"" + value + "\"");
            };
            return this;
        }
        this.next(name, value)
    }

    var _export = {
        default: function (e, content, attr) {
            content = content || '';
            attr = attr || '';
            return '<' + e + ' ' + attr + ' >' + content + '</' + e + '>';
        },
        a: function (content, href) {
            if (!href) {
                href = "javascript:(0);";
            }
            content = content || '';
            return '<a ' + new AttrModel("href", href) + '>' + content + '</a>';
        },
        attr: function (name, value) {
            return new AttrModel(name, value);
        }
    }

    window[PLUGIN_NAME] = function (options) {
        return _export[options]
            ? _export[options].apply(this, Array.prototype.slice.call(arguments, 1))
            : _export.default.apply(this, arguments);
    }

    window[PLUGIN_NAME].version = "1.0";

    var _$export = {}
    for (var i in _export) {
        _$export['$' + i] = function (v) {
            return $(_export[i](v))
        }
    }
    if (!$) return;

    window['$' + PLUGIN_NAME] = function () {
        return $(window[PLUGIN_NAME].apply(this, arguments))
    };
})(window, jQuery);
