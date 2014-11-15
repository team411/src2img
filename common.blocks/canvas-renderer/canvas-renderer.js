modules.define('canvas-renderer', ['highlight', 'i-bem__dom'], function(provide, hljs, BEMDOM) {

    BEMDOM.decl(this.name, {

        onSetMod: {
            js: {
                inited: function() {
                    this._source = this.elem('source');
                    this._preview = this.elem('preview');
                    this._lang = this.elem('lang');
                    this._style = this.elem('style');

                    console.log('renderer inited! ', this._preview, this._style)
                }
            }
        },

        _onSourceChange: function() {

        },

        _onLangChange: function() {

        },

        _onStyleChange: function() {

        }

    });

    provide(BEMDOM);

});
