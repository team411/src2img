const DEV_ENV = 'development';
const PROD_ENV = 'production';
const ENV = process.env.YENV || DEV_ENV;

var techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),

        // css
        cssStylus: require('enb-stylus/techs/css-stylus'),
        cssAutoprefixer: require('enb-autoprefixer/techs/css-autoprefixer'),

        // js
        browserJs: require('enb-diverse-js/techs/browser-js'),
        prependYm: require('enb-modules/techs/prepend-modules'),

        // bemtree
        // bemtree: require('enb-bemxjst/techs/bemtree-old'),

        // bemhtml
        bemhtml: require('enb-bemxjst/techs/bemhtml-old'),
        htmlFromBemjson: require('enb-bemxjst/techs/html-from-bemjson')
    },
    enbBemTechs = require('enb-bem-techs'),
    levels = [
        { path: 'libs/bem-core/common.blocks' },
        { path: 'libs/bem-core/desktop.blocks' },
        { path: 'libs/bem-components/common.blocks' },
        { path: 'libs/bem-components/desktop.blocks' },
        { path: 'libs/bem-components/design/common.blocks' },
        { path: 'libs/bem-components/design/desktop.blocks' },
        'common.blocks',
        'desktop.blocks'
    ];

module.exports = function(config) {
    config.nodes('*.bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: levels }],
            [techs.fileProvider, { target: '?.bemjson.js' }],
            [enbBemTechs.bemjsonToBemdecl],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            // css
            [techs.cssStylus, { target: '?.noprefix.css' }],
            [techs.cssAutoprefixer, {
                sourceTarget: '?.noprefix.css',
                destTarget: '?.css',
                browserSupport: ['last 2 versions', 'ie 10', 'opera 12.16']
            }],

            // bemtree
            // [tech.bemtree, { devMode: process.env.BEMTREE_ENV === 'development' }],

            // bemhtml
            [techs.bemhtml, { devMode: process.env.BEMHTML_ENV === DEV_ENV }],
            [techs.htmlFromBemjson, { target: '?.pre.html' }],

            // client bemhtml
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [enbBemTechs.deps, {
                target: '?.bemhtml.deps.js',
                bemdeclFile: '?.bemhtml.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [techs.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                devMode: process.env.BEMHTML_ENV === DEV_ENV
            }],

            // js
            [techs.browserJs],
            [techs.fileMerge, {
                target: '?.pre.js',
                sources: ['?.browser.bemhtml.js', '?.browser.js']
            }],
            [techs.prependYm, { source: '?.pre.js' }]
        ]);


        if (ENV === PROD_ENV) {
            nodeConfig.addTech([
                require('enb-borschik/techs/borschik'), {
                    sourceTarget: '?.css',
                    destTarget: '?.min.css',
                    minify: true,
                    freeze: true,
                    tech: 'css'
                }
            ]);

            nodeConfig.addTech([
                require('enb-borschik/techs/borschik'), {
                    sourceTarget: '?.js',
                    destTarget: '?.min.js',
                    minify: true,
                    freeze: true,
                    tech: 'js'
                }
            ]);

            nodeConfig.addTech([
                require('./techs/borschik-extended'), {
                    sourceTarget: '?.pre.html',
                    requiredTargets: ['?.min.js', '?.min.css'],
                    destTarget: '?.html',
                    minify: true,
                    freeze: true,
                    tech: 'html'
                }
            ]);
        } else {
            nodeConfig.addTechs([
                [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '?.min.css' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '?.min.js' } ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.pre.html', destTarget: '?.html' } ]
            ]);
        }

        nodeConfig.addTargets([/* '?.bemtree.js', */ '?.html', '?.min.css', '?.min.js']);
    });
};
