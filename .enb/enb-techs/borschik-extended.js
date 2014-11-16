var inherit = require('inherit');


module.exports = inherit(require('enb-borschik/techs/borschik'), {
    getName: function() {
        return 'borschik-extended';
    },

    configure: function() {
        this._requiredTargets = this.getRequiredOption('requiredTargets');
        this.__base();
    },

    build: function() {
        var base = this.__base;

        return this.node.requireSources(this._requiredTargets).then(function() {
            return base.apply(this);
        }.bind(this));
    }
});
