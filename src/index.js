/**
 * Created by ДНС on 02.03.2017.
 */
import Chip from './/Chip'
import Player from './/player'
import chips from './/Chips'
import utills from './/utills'
import kernel from './/kernel'
import $ from '../node_modules/jquery'

$(document).ready(function () {
    var $playfield = $('#playfield');
    var mousedown = false;
    var player = new Player();
    chips[0] = new Chip(1);
    chips[0].init();
    var kern = new kernel(chips);
    
    $playfield.unbind('mousedown').mousedown(function (e) {
        player.downX = e.pageX;
        player.downY = e.pageY;
        player.IsClick = true;
    });

    $(document).unbind('mouseup').mouseup(function (e) {
        if(!player.IsClick){
            return;
        }
        player.IsClick = false;
        var addNewChip = false;
        player.changeDirection(e.pageX, e.pageY);


        if(player.direction == utills._DIR._NORTH)
        {
            var arr = chips.vertical();
            arr.forEach(function (item, index) {
               kern.poof(item,false, index * 4+ 1, utills._DIR._NORTH)
            })
        }
        else if(player.direction == utills._DIR._SOUTH){
            var arr = chips.vertical();
            arr.forEach(function (item, index) {
                kern.poof(item, true, index * 4 + 4, utills._DIR._SOUTH)
            });
        }
        else if(player.direction == utills._DIR._WEST){
            var arr = chips.gorisontal();
            arr.forEach(function (item, index) {
                kern.poof(item, false, index + 1, utills._DIR._WEST)
            })

        }
        else if(player.direction == utills._DIR._EAST){
            var arr = chips.gorisontal();
            arr.forEach(function (item, index) {
              kern.poof(item, true, index + 13, utills._DIR._EAST)
            })
        }
        // add new

          kern.addNewChip()
    });




});