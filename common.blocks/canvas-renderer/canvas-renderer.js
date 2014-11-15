modules.define('canvas-renderer', ['highlight', 'i-bem__dom', 'html2canvas'], function(provide, hljs, BEMDOM, h2c) {

    BEMDOM.decl(this.name, {
        beforeSetMod: {
            lang: {
                '*': function() {
                    this._codeContainer
                        .removeClass(this.getMod('lang'))
                }
            }
        },

        onSetMod: {
            js: {
                inited: function() {
                    this._source = this.findBlockOn('source', 'textarea');
                    this._preview = this.elem('preview');
                    this._codeContainer = this.elem('code-container');
                    this._saveButton = this.findBlockOn('get-image', 'button');

                    this._lang = this.findBlockOn('lang', 'select');
                    this._style = this.elem('style');

                    this._saveButton.on('click', this._onButtonClick, this);
                    this._source.on('change', this._onSourceChange, this);
                    this._lang.on('change', this._onLangChange, this);
                }
            },

            lang: {
                '*': function() {
                    this._codeContainer
                        .addClass(this.lang);

                    hljs.highlightBlock(this._codeContainer.get(0));
                }
            }
        },

        _onSourceChange: function() {
            var val = this._source.getVal();
            this._codeContainer
                .text(val);

            this.lang = hljs.highlightAuto(val).language;
            this._lang.setVal(this.lang);
        },

        _onLangChange: function() {
            this.lang = this._lang.getVal();
            this
                .setMod('lang', this.lang);
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
