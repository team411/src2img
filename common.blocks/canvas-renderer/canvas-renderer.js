modules.define('canvas-renderer', ['highlight', 'i-bem__dom'], function(provide, hljs, BEMDOM) {

    BEMDOM.decl(this.name, {
        
        onSetMod: {
            'js': {
                'inited': function() {
                    console.log('renderer inited!')
                }
            }
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
