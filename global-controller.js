/* outputPath: dist */
/* global $ */
/* global hasher */
/* global crossroads */
var controllers = [];
var Controller = function (name, config) {
    //console.log('Initializing New Controller', name);
    config.init();
    var me = this;
    me.name = name;
    me.listeners = config.listeners;
    for (var item in me.listeners) {
        for (var event in config.listeners[item]) {
            $(document).on(event, item, config.listeners[item][event]);
        }
    }
    for (var func in config) {
        if (func !== 'listeners') {
            me[func] = config[func];
        }
    }
    if (me.hashes !== undefined && me.hashes.length > 0) {
        for (var hashMap in me.hashes) {
            crossroads.addRoute(hashMap, me.hashes[hashMap].bind(me));
        }
        var parseHash = function (newHash, oldHash) {
            crossroads.parse(newHash);
        };
        if (config.prependHash !== undefined) {
            hasher.prependHash = config.prependHash;
        } else {
            hasher.prependHash = '!';
        }
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        if (config.hasherInit !== false) {
            hasher.init();
        }
    }
    controllers.push(me);
};