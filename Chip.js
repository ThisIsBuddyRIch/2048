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
        this.dom = $('<div></div>').appendTo('#playfield')
        this.dom.removeClass().addClass("thing t" + this.weight).addClass("position"+this.position).fadeIn(3000);;
    }

    exports.prototype.transform = function () {
        this.weight *= 2;
        this.dom.removeClass().addClass("thing t" + this.weight).addClass("position" + this.position);
    }

    exports.prototype.remove = function () {
       this.dom.remove();
    }
    exports.prototype.reDraw = function (newPosition) {
        if(this.position == newPosition){
            return false;
        }
        this.dom.removeClass("position"+ this.position).addClass("position" + newPosition);
        this.position = newPosition;
        return true;
    }

    
    return exports;
})();