({
    block : 'page',
    title : 'SRC to PNG converter',
    favicon : '/favicon.ico',
    head : [
        { elem : 'meta', attrs : { name : 'description', content : '' } },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : 'index.min.css' }
    ],
    scripts: [{ elem : 'js', url : 'index.min.js' }],
    mods : { theme : 'islands' },
    content : [
        {
            block: 'logo',
            content: [
                {
                    elem: 'inner',
                    content: [
                        { tag: 'h1', content: 'SRC2IMG – BIG BEAUTIFUL LOGO' }
                    ]
                }
            ]
        },

        {
            block: 'canvas-renderer',
            js: true,
            content: [
                {
                    block: 'textarea',
                    mix: { block: 'canvas-renderer', elem: 'source' },
                    val: '',
                    mods: { theme: 'islands', size: 'm' },
                    placeholder: 'Paste your source code here'
                },

                {
                    block : 'select',
                    mix: { block: 'canvas-renderer', elem: 'lang' },
                    directions : ['bottom-left'],
                    mods : { mode : 'radio', theme : 'islands', size : 'xl', type: 'lang'},
                    name : 'lang',
                    options : [{val : 0, text : 'Language', checked: true}]
                },

                {
                    block : 'select',
                    mix: { block: 'canvas-renderer', elem: 'style' },
                    directions : ['bottom-left'],
                    mods : { mode : 'radio', theme : 'islands', size : 'xl', type: 'style'},
                    name : 'style',
                    options : [
                        { val : 1, text : 'Default' }
                    ]
                },

                {
                    elem: 'preview',
                    text: 'Preview here'
                },

                {
                    block : 'button',
                    mix: { block: 'canvas-renderer', elem: 'get-image' },
                    text : 'Get PNG',
                    mods : { theme : 'islands', size : 'xl', type: 'link' }
                }
            ]
        }
    ]
})
