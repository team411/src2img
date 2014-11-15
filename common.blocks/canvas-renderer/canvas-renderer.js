modules.define('canvas-renderer', ['highlight', 'i-bem__dom'], function(provide, hljs, BEMDOM) {

    BEMDOM.decl(this.name, {

        onSetMod: {
            js: {
                inited: function() {
                    this._source = this.findBlockOn('source', 'textarea');
                    this._preview = this.elem('preview');
                    this._codeContainer = this.elem('code-container');

                    this._lang = this.findBlockOn('lang', 'select');
                    this._style = this.elem('style');

                    this._source.on('change', this._onSourcePaste, this);
                    //console.log('renderer inited! ', this._source)
                }
            }
        },

        _onSourcePaste: function() {
            var val = this._source.getVal();
            this.oldLang = this.lang;
            this.lang = hljs.highlightAuto(val).language;

            //console.log(hljs.highlightAuto(val));
            if (this.oldLang === this.lang) {
                return;
            }
            this._lang.setVal(this.lang);
            this._codeContainer
                .text(val)
                .removeClass(this.oldLang)
                .addClass(this.lang);

            //console.log(this._codeContainer.get(0));

            hljs.highlightBlock(this._codeContainer.get(0));
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
