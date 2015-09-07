angular.module('TwitterApp').factory('Storage', function() {
    return {
        type: sessionStorage,
        save: function(item, value) {
            this.type.setItem(item, value);
        },
        read: function(item) {
            return this.type.getItem(item);
        },
        remove: function(item) {
            this.type.removeItem(item);
        },
        hasItem: function(item) {
            return (this.read(item) !== null);
        },
        empty: function() {
            this.type.clear();
        },
        items: function() {
            return this.type.length;
        },
        saveAsJSON: function(item, value) {
            this.save(item, JSON.stringify(value));
        },
        readAsJSON: function(item) {
            var value = this.read(item);
            return JSON.parse(value);
        }
    };
});