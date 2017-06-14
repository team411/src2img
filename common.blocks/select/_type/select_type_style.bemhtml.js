block('select').mod('type', 'style')(
    def().match(function() {return this._select})(function() {
        var styles = {
            'default': 'Default',
            'pojoaque': 'Pojoaque',
            'arta': 'Arta',
            'docco': 'Docco',
            'ascetic': 'Ascetic',
            'far': 'Far',
            'railscasts': 'Railscasts',
            'solarized_dark': 'Solarized Dark',
            'solarized_light': 'Solarized Light',
            'atelier-dune.dark': 'Atelier Dune dark',
            'atelier-dune.light': 'Atelier Dune light',
            'atelier-forest.dark': 'Atelier Forest dark',
            'atelier-forest.light': 'Atelier Forest light',
            'atelier-heath.dark': 'Atelier Heath dark',
            'atelier-heath.light': 'Atelier Heath light',
            'atelier-lakeside.dark': 'Atelier Lakeside dark',
            'atelier-lakeside.light': 'Atelier Lakeside light',
            'atelier-seaside.dark': 'Atelier Seaside dark',
            'atelier-seaside.light': 'Atelier Seaside light',
            'foundation': 'Foundation',
            'rainbow': 'Rainbow',
            'github': 'Github',
            'school_book': 'School Book',
            'googlecode': 'GoogleCode',
            'hybrid': 'Hybrid',
            'idea': 'Idea',
            'ir_black': 'IR Black',
            'sunburst': 'Sunburst',
            'tomorrow-night-blue': 'Tomorrow Night Blue',
            'kimbie.dark': 'Kimbie dark',
            'kimbie.light': 'Kimbie light',
            'magula': 'Magula',
            'tomorrow-night-eighties': 'Tomorrow Night Eighties',
            'mono-blue': 'Mono Blue',
            'tomorrow-night': 'Tomorrow Night',
            'brown_paper': 'Brown Paper',
            'monokai': 'Monokai',
            'monokai_sublime': 'Monokai Sublime',
            'tomorrow': 'Tomorrow',
            'vs': 'Vs',
            'codepen-embed': 'Codepen Embed',
            'obsidian': 'Obsidian',
            'xcode': 'xCode',
            'color-brewer': 'Color Brewer',
            'paraiso.dark': 'Paraiso dark',
            'paraiso.light': 'Paraiso light',
            'zenburn': 'Zenburn',
            'dark': 'Dark'
        };

        this._select.options = Object.keys(styles).sort().map(function(style) {
            return {
                val: style,
                text: styles[style]
            }
        });

        return applyNext({
            _select: this.ctx,
            _checkedOptions: this._checkedOptions,
            _firstOption: this._firstOption
        });
    })
)
