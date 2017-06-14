({
    block: 'page',
    title: 'SRC to PNG converter',
    favicon: '/favicon.ico',
    head: [
        { elem: 'meta', attrs: { name: 'description', content: 'Generate PNG image from your source code. No backend needed. Highlight source code and generate image for presentation.' } },
        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },
        { elem: 'css', url: 'index.min.css' }
    ],
    scripts: [
        { elem: 'js', url: 'index.min.js' },
        {
            elem: 'js',
            content: [
                '(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter27075833 = new Ya.Metrika({ id:27075833, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:": "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");'
            ]
        },
        {
            elem: 'js',
            content: [
                "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-56788088-1', 'auto');ga('send', 'pageview');"
            ]
        }
    ],
    mods: { theme: 'islands' },
    content: [
        {
            block: 'logo',
            content: [
                {
                    elem: 'inner'
                }
            ]
        },

        {
            block: 'canvas-renderer',
            js: true,
            content: [
                {
                    block: 'textarea',
                    mix: [
                        { block: 'canvas-renderer', elem: 'source' },
                        { block: 'source-area', js: true }
                    ],
                    val: '',
                    mods: { theme: 'islands', size: 'm' },
                    placeholder: 'Paste your source code here'
                },

                {
                    block: 'select',
                    mix: { block: 'canvas-renderer', elem: 'lang' },
                    directions: ['bottom-left'],
                    mods: { mode: 'radio', theme: 'islands', size: 'xl', type: 'lang'},
                    name: 'lang',
                    optionsMaxHeight: 500,
                    options: [{val: 0, text: 'Language', checked: true}]
                },

                {
                    block: 'select',
                    mix: { block: 'canvas-renderer', elem: 'style' },
                    directions: ['bottom-left'],
                    mods: { mode: 'radio', theme: 'islands', size: 'xl', type: 'style'},
                    name: 'style',
                    optionsMaxHeight: 500,
                    options: [
                        { val: 1, text: 'Default' }
                    ]
                },

                {
                    block: 'button',
                    mix: { block: 'canvas-renderer', elem: 'get-image' },
                    text: 'Generate and download PNG',
                    mods: { theme: 'islands', size: 'xl', type: 'link' }
                },

                {
                    elem: 'preview',
                    text: ''
                },

                {
                    block: 'github-fork-ribbon',
                    url: 'https://github.com/team411/src2img',
                    content: 'Fork me on Github'
                },

                {
                    tag: 'noscript',
                    content: [
                        {
                            block: '',
                            content: [
                                {
                                    tag: 'img',
                                    attrs: {
                                        src: '//mc.yandex.ru/watch/27075833',
                                        style: 'position:absolute; left:-9999px;',
                                        alt: ''
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})
