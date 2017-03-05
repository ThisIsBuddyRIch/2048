/**
 * Created by ДНС on 05.03.2017.
 */
var Player = (function () {
    function player() {
        this.downX = 0;
        this.downY = 0;
        this.direction = "";
    }
    player.prototype.changeDirection = function (newX, newY) {
        var x = this.downX - newX;
        var y = this.downY - newY;
        var atan = Math.atan2(y, x)*(180/Math.PI);
        if(atan >= -45 && atan < 45){
            this.direction = utills._DIR._WEST;
        } else if( atan >=  45 && atan < 130){
            this.direction = utills._DIR._NORTH;
        } else if(atan > -180 && atan <= -130 || atan <= 180 && atan > 130)
        {   this.direction = utills._DIR._EAST;
        }
        else if( atan <= -45 && atan > -130)
        {
            this.direction = utills._DIR._SOUTH;
        }
    }
    var inst = new player();
    return {
        getPlayer : function () {
            return inst;
        }
    };
})();