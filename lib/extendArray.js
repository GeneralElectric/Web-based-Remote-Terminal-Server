exports.extendModule = function(constructor){
    // Return the difference between two arrays
    constructor.prototype.diff = function (a) {
        return this.filter(function (i) {return a.indexOf(i) < 0;});
    };


    // Return boolean if array contains search key
    constructor.prototype.contains = function (key) {
        for (i in this) {
            if (this[i] == key) return true;
        }
        return false;
    };
}