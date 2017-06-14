block('select').mod('type', 'lang')(
    def().match(function() { return this._select })(function() {
        var langs = {
            '1c': '1C',
            'actionscript': 'ActionScript',
            'apache': 'Apache',
            'bash': 'Bash',
            'brainfuck': 'Brainfuck',
            'clojure': 'Clojure',
            'cmake': 'CMake',
            'coffeescript': 'CoffeeScript',
            'cs': 'C#',
            'css': 'CSS',
            'cpp': 'C++',
            'dart': 'Dart',
            'delphi': 'Delphi',
            'diff': 'Diff',
            'django': 'Django',
            'erb': 'ERB',
            'erlang': 'Erlang',
            'erlang-repl': 'Erlang-REPL',
            'go': 'Go',
            'haml': 'HAML',
            'haskell': 'Haskell',
            'http': 'HTTP',
            'ini': 'INI',
            'java': 'Java',
            'javascript': 'JavaScript',
            'json': 'JSON',
            'less': 'LESS',
            'lisp': 'LISP',
            'lua': 'Lua',
            'makefile': 'MAKEfile',
            'markdown': 'Markdown',
            'mathematica': 'Mathematica',
            'matlab': 'Matlab',
            'nginx': 'Nginx',
            'objectivec': 'Objective-C',
            'perl': 'Perl',
            'puppet': 'Puppet',
            'python': 'Python',
            'r': 'R',
            'ruby': 'Ruby',
            'rust': 'Rust',
            'scala': 'Scala',
            'scheme': 'Scheme',
            'scss': 'SCSS',
            'sql': 'SQL',
            'stylus': 'Stylus',
            'swift': 'Swift',
            'tex': 'Tex',
            'xml': 'XML'
        };

        this._select.options = Object.keys(langs).map(function(code) {
            return {
                val: code,
                text: langs[code]
            }
        });

        return applyNext({
            _select: this.ctx,
            _checkedOptions: this._checkedOptions,
            _firstOption: this._firstOption
        });
    })
)
