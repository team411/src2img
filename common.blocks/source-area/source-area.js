/**
 * Блок-микс source-area для textarea, добавляющий фишки редактирования кода:
 *   * Перевод строки с сохранением отступа по Enter,
 *   * Вставка отступа по Tab,
 *   * Уменьшение отступа по Shift+Tab
 *
 * В качестве параметра принимает indent - количество пробелов на отступ. По умолчанию 2.
 */
modules.define('source-area', ['i-bem__dom'], function(provide, BEMDOM) {
    provide(BEMDOM.decl('source-area', {
        onSetMod: {
            js: {
                inited: function() {
                    this._setEol();
                    this._setKeyHandlers();

                    this._indent = this.params.indent || 2;

                    this._textarea = this.domElem;
                    this.bindTo('keydown', this._onType);
                }
            }
        },

        /**
         * Извлечь текст
         * @returns {String}
         */
        getVal: function() {
            return this._textarea.val();
        },

        /**
         * Записать текст
         * @param {String} val
         * @returns {Object} source-area
         */
        setVal: function(val) {
            this._textarea.val(val);
            return this;
        },

        /**
         * Вставить подстроку str на позицию pos
         * @param {String} str
         * @param {Number} pos
         * @returns {Object} source-area
         */
        insertVal: function(str, pos) {
            var val = this.getVal();
            return this.setVal(val.slice(0, pos) + str + val.slice(pos));
        },

        /**
         * Извлечь позицию каретки в поле ввода
         * @returns {Number}
         */
        getCaretPos: function() {
            return this._textarea.prop('selectionStart') || 0;
        },

        /**
         * Установить позицию каретки
         * @param {Number} pos
         * @returns {Object} source-area
         */
        setCaretPos: function(pos) {
            this._textarea.prop('selectionStart', pos);
            this._textarea.prop('selectionEnd', pos);
            return this;
        },

        /**
         * Извлечь линию, на которой установлена каретка
         * @returns {Number} Номер линии, начиная с 0
         */
        getCaretLine: function() {
            var line = 0,
                val = this.getVal(),
                eolPos = val.lastIndexOf(this._eol, this.getCaretPos() - 1);

            while (eolPos > 0) {
                line++;
                eolPos = val.lastIndexOf(this._eol, eolPos - 1);
            }
            if (eolPos === 0) {
                line++;
            }

            return line;
        },

        /**
         * Установить каретку в начало линии line
         * @param {Number} line
         * @returns {Object} source-area
         */
        setCaretLine: function(line) {
            var val = this.getVal(),
                linePos = 0;

            for (var i = 0; i < line; i++) {
                var eolPos = val.indexOf(this._eol, linePos);
                if (eolPos < 0) break;
                linePos = eolPos + 1;
            }

            this.setCaretPos(linePos);
            return this;
        },

        /**
         * Извлечь отступ для линии line
         * @param {Number} line
         * @returns {Number} Количество отступов (не пробелов)
         */
        getLineIndent: function(line) {
            var originalPos = this.getCaretPos();

            this.setCaretLine(line);
            var pos = this.getCaretPos(),
                val = this.getVal(),
                spaces = 0;

            while (val[pos++] === ' ') {
                spaces++;
            }
            var indentsCount = Math.floor(spaces / this._getIndentLength());

            this.setCaretPos(originalPos);
            return indentsCount;
        },

        /**
         * Установить отступ линии в количестве отступов
         * @param {Number} line
         * @param {Number} indentsCount
         * @returns {Object} source-area
         */
        setLineIndent: function(line, indentsCount) {
            indentsCount = Math.max(0, indentsCount);
            var originalPos = this.getCaretPos();

            this.setCaretLine(line);
            var val = this.getVal(),
                pos = this.getCaretPos();

            val = val.slice(0, pos) +
                  this._createIndent(indentsCount) +
                  val.slice(pos).replace(/^[ ]+/, '');
            this.setVal(val);

            return this.setCaretPos(originalPos);
        },

        // Определить и установить EOL для конкретной платформы
        _setEol: function() {
            var container = document.createElement('div');
            container.innerHTML = '<textarea>1\n2</textarea>';

            this._eol = container.firstChild.innerHTML.indexOf('\r\n') > -1 ? '\r\n' : '\n';
            this._eolLength = this._eol.length;
        },

        // Установить обработчики клавиш
        _setKeyHandlers: function() {
            this.keyHandlers = {
                9: this._onTabPressed,
                13: this._onEnterPressed
            };
        },

        _onType: function(e) {
            var handler = this.keyHandlers[e.keyCode];
            if (handler) {
                return handler.call(this, e);
            }
        },

        _onTabPressed: function(e) {
            e.shiftKey ?
                this._decLineIndent() :
                this._incLineIndent();
            return false;
        },

        _incLineIndent: function() {
            var pos = this.getCaretPos(),
                indent = this._createIndent();

            this.insertVal(indent, pos)
                .setCaretPos(pos + indent.length);
        },

        _createIndent: function(count) {
            var indentStr = '';
            for (var i = 0; i < this._getIndentLength(count); i++) {
                indentStr += ' ';
            }
            return indentStr;
        },

        _getIndentLength: function(count) {
            count = count === undefined ? 1 : count;
            return count * this._indent;
        },

        _decLineIndent: function() {
            var val = this.getVal(),
                pos = this.getCaretPos(),
                indentLength = this._getIndentLength();

            val.slice(pos - indentLength, pos).match(/^\s+$/) ?
                this._subIndentInPlace(val, pos, indentLength) :
                this._subAllLineIndent(pos, indentLength);
        },

        _subIndentInPlace: function(val, pos, indentLength) {
            this.setVal(val.slice(0, pos - indentLength) + val.slice(pos))
                .setCaretPos(pos - indentLength);
        },

        _subAllLineIndent: function(pos, indentLength) {
            var line = this.getCaretLine(),
                curIndent = this.getLineIndent(line),
                indentsCount = curIndent - 1;

            this.setLineIndent(line, indentsCount);
            if (indentsCount >= 0) {
                this.setCaretPos(pos - indentLength);
            }
        },

        _onEnterPressed: function() {
            var pos = this.getCaretPos(),
                line = this.getCaretLine(),
                indentsCount = this.getLineIndent(line);

            this.insertVal(this._eol, pos)
                .setLineIndent(line + 1, indentsCount)
                .setCaretPos(pos + this._eolLength + this._getIndentLength(indentsCount));

            return false;
        }
    }));
});
