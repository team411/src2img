modules.define('canvas-renderer', ['highlight', 'i-bem__dom', 'html2canvas'], function(provide, hljs, BEMDOM, h2c) {

    BEMDOM.decl(this.name, {

        onSetMod: {
            js: {
                inited: function() {
                    this._source = this.findBlockOn('source', 'textarea');
                    this._preview = this.elem('preview');
                    this._codeContainer = this.elem('code-container');
                    this._saveButton = this.findBlockOn('get-image', 'button');

                    this._lang = this.findBlockOn('lang', 'select');
                    this._style = this.elem('style');


                    this._source.on('change', this._onSourcePaste, this);
                    this._saveButton.on('click', this._onButtonClick, this);
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

        _onButtonClick: function() {
            h2c(this._codeContainer.get(0), {
                onrendered: function(canvas) {
                    this.domElem.attr('href', canvas.toDataURL());
                    this.domElem.attr('download', 'src2img.png');
                }.bind(this._saveButton)
            });
        },

        _onStyleChange: function() {

        }

    });

    provide(BEMDOM);

});
