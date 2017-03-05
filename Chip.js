/**
 * Created by ДНС on 05.03.2017.
 */
var Chip = (function () {
   var exports =  function (position) {
        var self = this;
        self.position = position
        self.weight = utills.generateSpoce() ? 4 : 2;
    }
    exports.prototype.init = function () {
        $("#" + this.position).removeClass().addClass("thing t" + this.weight);
    }

    exports.prototype.transform = function () {
        this.weight *= 2;
        this.init();
    }

    exports.prototype.remove = function () {
        $('#' + this.position).removeClass().addClass("back");
    }
    exports.prototype.reDraw = function (newPosition) {
        if(this.position == newPosition){
            return false;
        }
        this.remove();
        this.position = newPosition;
        this.init();
        return true;
    }
    
    return exports;
})();