modules.define('canvas-renderer', ['highlight', 'i-bem__dom', 'html2canvas', 'functions__throttle'], function(provide, hljs, BEMDOM, h2c, throttle) {

    BEMDOM.decl(this.name, {
        beforeSetMod: {
            lang: {
                '*': function() {
                    this._codeContainer
                        .removeClass(this.getMod('lang'));
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
                    this._style = this.findBlockOn('style', 'select');

                    this._codeStyle = this.elem('style-set');

                    this._source.on('change', throttle(this._onSourceChange, 200, false, this), this);
                    this._lang.on('change', this._onLangChange, this);
                    this._style.on('change', this._onStyleChange, this);
                    this._style.findBlockInside('menu').on('itemHovered', throttle(this._onStyleItemHover, 200, false, this), this);

                    if (this.code != '')
                    {
                        this._onSourceChange();
                    }
                }
            },

            lang: {
                '*': function() {
                    this._codeContainer
                        .addClass(this.lang);

                    hljs.highlightBlock(this._codeContainer.get(0));
                    this._generateImage();
                }
            }
        },

        _generateImage: function() {
            var button = this._saveButton;
            button.setMod('disabled');
            h2c(this._codeContainer.get(0), {
                onrendered: function(canvas) {
                    button.domElem.attr('href', canvas.toDataURL());
                    button.domElem.attr('download', 'src2img.png');
                    button.delMod('disabled');
                }
            });
        },

        _onSourceChange: function() {
            this.code = this._source.getVal();
            this._codeContainer
                .text(this.code);

            if (!this.lang) {
                this.lang = hljs.highlightAuto(this.code).language;
            }

            if (this.lang === this.getMod('lang')) {
                hljs.highlightBlock(this._codeContainer.get(0));
                this._generateImage();
                return;
            }
            this._lang.setVal(this.lang);
        },

        _onLangChange: function() {
            this.lang = this._lang.getVal();
            this._codeContainer
                .text(this.code);
            this
                .setMod('lang', this.lang);
        },

        _onStyleItemHover: function(e, item) {
            this._changeStyleLink(item.data.params.val);
        },

        _onStyleChange: function() {
            this._changeStyleLink(this._style.getVal());
        },

        _changeStyleLink: function(val) {
            var url = ['_/hljs/', val, '.css'].join('');
            if (val === this.style) {
                return;
            }
            this.style = val;
            this._codeStyle.attr('href', url);
            this._generateImage();
        }

    });

    provide(BEMDOM);

});
