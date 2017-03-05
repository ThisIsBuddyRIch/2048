/**
 * Created by ДНС on 05.03.2017.
 */
var Chip = (function () {
   var exports =  function Chip(position) {
        var self = this;
        self.position = position
        self.weight = generateSpoce() ? 4 : 2;
    }
    Chip.prototype.init = function () {
        $("#" + this.position).removeClass().addClass("thing t" + this.weight);
    }

    Chip.prototype.transform = function () {
        this.weight *= 2;
        this.init();
    }

    Chip.prototype.remove = function () {
        $('#' + this.position).removeClass().addClass("back");
    }
    Chip.prototype.reDraw = function (newPosition) {
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