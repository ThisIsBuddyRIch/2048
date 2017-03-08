/**
 * Created by ДНС on 02.03.2017.
 */
$(document).ready(function () {
    var $playfield = $('#playfield');
    var mousedown = false;
    var player = Player.getPlayer();
    chips[0] = new Chip(1);
    chips[0].init();
    var poof  =  function (arr, reversFlag, lastPosition, direction) {
        var skip = false;
        var move = false;
        if(reversFlag){
            arr.reverse();
        }
        //Схлопывание

        arr = arr.filter(function (item, index, self) {
            if(index == 0 || skip)
            {
                skip = false;
                return true;
            }
            var pref = arr[index - 1];
            if(pref.weight == item.weight)
            {
                var scoreItem = +(utills.score.text());
                scoreItem += item.weight * 2;
                utills.score.text(scoreItem);
                pref.transform();
                item.remove();
                chips.splice(chips.indexOf(item), 1);
                skip = true;
                move = true;
                return false;
            }
            return true;
        })
        //Смещение
        console.log(arr);
        arr.forEach(function (item, index, self) {
            console.log(self);
            if(index == 0)
            {
                if(item.reDraw(lastPosition)){
                    move = true;
                }
            }
            else {
                if(direction == utills._DIR._NORTH){
                    if(item.reDraw(self[index - 1].position + 1)){
                        move= true;
                    }
                } else if(direction == utills._DIR._SOUTH){
                    if(item.reDraw(self[index - 1].position - 1)){
                        move= true;
                    }
                } else if ( direction == utills._DIR._WEST){
                    if(item.reDraw(self[index -1].position + 4)){
                        move = true;
                    }
                } else if(direction == utills._DIR._EAST) {
                    if(item.reDraw(self[index-1].position - 4)){
                        move = true;
                    }
                }
            }
        })
        return move;
    }


    $playfield.unbind('mousedown').mousedown(function (e) {
        player.downX = e.pageX;
        player.downY = e.pageY;
    });
    $playfield.unbind('mouseup').mouseup(function (e) {
        var addNewChip = false;
       player.changeDirection(e.pageX, e.pageY);


        if(player.direction == utills._DIR._NORTH)
        {
            console.log(chips.vertical());
            var arr = chips.vertical();
            arr.forEach(function (item, index) {
               if(poof(item,false, index * 4+ 1, utills._DIR._NORTH)){
                   addNewChip = true;
               }
            })
        }
        else if(player.direction == utills._DIR._SOUTH){
            var arr = chips.vertical();
            arr.forEach(function (item, index) {
                if(poof(item, true, index * 4 + 4, utills._DIR._SOUTH)){
                    addNewChip = true;
                }
            })
        }
        else if(player.direction == utills._DIR._WEST){
            var arr = chips.gorisontal();
            arr.forEach(function (item, index) {
                if(poof(item, false, index + 1, utills._DIR._WEST)){
                    addNewChip = true;
                }
            })

        }
        else if(player.direction == utills._DIR._EAST){
            var arr = chips.gorisontal();
            arr.forEach(function (item, index) {
                if(poof(item, true, index + 13, utills._DIR._EAST)){
                    addNewChip = true;
                }
            })
        }

        // add new
        if(addNewChip) {
            var vacantPosition = chips.generateVacantPositions();
            var newPosition = vacantPosition[utills.randomInt(0, vacantPosition.length - 1)];
            var chip = new Chip(newPosition);
            chip.init();
            chips.push(chip);
        }
    });




});