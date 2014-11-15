/** @module menu */
modules.define(
    'menu',
    function(provide, menuItem) {
        provide(menuItem.decl({
            _onItemHover : function(item) {
                this.__base.apply(this, arguments);
                this.emit('itemHovered', {data: item});
            }
        },{}));
    }
);
