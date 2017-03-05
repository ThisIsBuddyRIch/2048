/**
 * Created by ДНС on 05.03.2017.
 */
var utills = (function () {
    return {
      randomInt : function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        generateSpoce : function () {
            return utills.randomInt(0, 9) > 8
        },
        score :  $("#score").text(0),
        _DIR  :  {
            _NORTH : 'north',
            _SOUTH: 'south',
            _WEST : 'west',
            _EAST : 'east'
        },

    }
})();