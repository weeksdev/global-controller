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
    for (var hashMap in me.hashes) {
        crossroads.addRoute(hashMap, me.hashes[hashMap]);
    }
    var parseHash = function (newHash, oldHash) {
        crossroads.parse(newHash);
    };
    hasher.prependHash = '!';
    hasher.initialized.add(parseHash);
    hasher.changed.add(parseHash);
    hasher.init();
    controllers.push(me);
};