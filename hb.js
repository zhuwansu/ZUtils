(function (window, $) {
    //jquery html builder
    // build easy html element
    var PLUGIN_NAME = "hb";

    function func(options) {
        if (typeof options === 'string') {
            var method = $.fn[PLUGIN_NAME].methods[options];
            if (!method) {
                method = $.fn[PLUGIN_NAME].methods.default;
                return method.apply(this, arguments);
            }
            return method.apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' + options + ' does not exist on jQuery' + PLUGIN_NAME);
        }
    }
    $.fn[PLUGIN_NAME] = func;

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
            return '<a ' + new AttrModel("href",href) + '>' + content + '</a>';
        },
        attr: function (name, value) {
            return new AttrModel(name, value);
        }
    }
    var _$export = {}
    for (var i in _export) {
        _$export['$' + i] = function (v) {
            return $(_export[i](v))
        }
    }
    $.extend(_export, _$export);

    $.fn[PLUGIN_NAME].version = "1.0";
    $.fn[PLUGIN_NAME].methods = _export;
    window[PLUGIN_NAME] = $.fn[PLUGIN_NAME];
    window['$' + PLUGIN_NAME] = function () {
        return $($.fn[PLUGIN_NAME].apply(this, arguments))
    };
})(window, jQuery);