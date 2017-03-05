/**
 * Created by ДНС on 02.03.2017.
 */
$(document).ready(function () {
    var $playfield = $('#playfield');
    var mousedown = false;
    var player = {};
    var chips = [new Chip(1)];
    var score = $("#score").text(0);
    chips.vertical = function () {
        var result = [];
        result.push(chips.filter(function (item) {
            return item.position <=4
        }));
        result.push(chips.filter(function (item) {
            return item.position <=8 && item.position > 4;
        }));
        result.push(chips.filter(function (item) {
            return item.position <=12 && item.position > 8;
        }))
        result.push(chips.filter(function (item) {
            return item.position <=16 && item.position > 12;
        }))

        result = result.map(function (item) {
            return item.sort(function (a, b) {
                return a.position - b.position;
            })
        })
        return result;
    }

    chips.gorisontal = function () {
        var result = [];
        result.push(chips.filter(function (item) {
            return item.position % 4 == 1;
        }));
        result.push(chips.filter(function (item) {
            return item.position % 4 == 2;
        }));
        result.push(chips.filter(function (item) {
            return item.position % 4 == 3
        }))
        result.push(chips.filter(function (item) {
            return item.position % 4 == 0;
        }));
        result = result.map(function (item) {
            return item.sort(function (a, b) {
                return a.position - b.position;
            })
        });
        return result;
    }

    chips.generateVacantPositions = function () {
        var src = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

        chips.forEach(function (item) {
            src.splice(src.indexOf(item.position), 1);
        })

        return src;
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    function generateSpoce() {
        return randomInt(0, 9) > 8
    }

    

    chips[0].init();
    Chip.poof = function (arr, reversFlag, lastPosition, direction) {
        var skip = false;
        var move = false;
        if(reversFlag){
            arr.reverse();
        }
        //Схлопывание
        arr.forEach(function (item, index) {
            if(index == 0 || skip)
            {
                skip = false;
                return;
            }
            var pref = arr[index - 1];

            if(pref.weight == item.weight)
            {
                var scoreItem = +(score.text());
                scoreItem += item.weight * 2;
                score.text(scoreItem);
                pref.transform();
                item.remove();
                arr.splice(index, 1);
                chips.splice(chips.indexOf(item), 1);
                skip = true;
                move = true;
            }
        })
        //Смещение
        arr.forEach(function (item, index) {
            if(index == 0)
            {
                if(item.reDraw(lastPosition)){
                    move = true;
                }
            }
            else {
                if(direction == _DIR._NORTH){
                    if(item.reDraw(arr[index - 1].position + 1)){
                        move= true;
                    }
                } else if(direction == _DIR._SOUTH){
                   if(item.reDraw(arr[index - 1].position - 1)){
                       move= true;
                   }
                } else if ( direction == _DIR._WEST){
                    if(item.reDraw(arr[index -1].position + 4)){
                        move = true;
                    }
                } else if(direction == _DIR._EAST) {
                    if(item.reDraw(arr[index-1].position - 4)){
                        move = true;
                    }
                }
            }
        })
        return move;
    }

    var _DIR = {
        _NORTH : 'north',
        _SOUTH: 'south',
        _WEST : 'west',
        _EAST : 'east'
    }


    $playfield.unbind('mousedown').mousedown(function (e) {
        player.downX = e.pageX;
        player.downY = e.pageY;
    });
    $playfield.unbind('mouseup').mouseup(function (e) {
        var addNewChip = false;
        var x = player.downX - e.pageX;
        var y = player.downY - e.pageY;
        var atan = Math.atan2(y, x)*(180/Math.PI);
        console.log(atan);
        if(atan >= -45 && atan < 45){
            console.log('west');
            player.direction = _DIR._WEST;
        } else if( atan >=  45 && atan < 130){
            player.direction = _DIR._NORTH;
            console.log('north');
        } else if(atan > -180 && atan <= -130 || atan <= 180 && atan > 130)
        {   player.direction = _DIR._EAST;
            console.log('east');
        }
        else if( atan <= -45 && atan > -130)
        {
            player.direction = _DIR._SOUTH;
            console.log('south');
        }


        if(player.direction == _DIR._NORTH)
        {
            console.log(chips.vertical());
            var arr = chips.vertical();
            arr.forEach(function (item, index) {
               if(Chip.poof(item,false, index * 4+ 1, _DIR._NORTH)){
                   addNewChip = true;
               }
            })
        }
        else if(player.direction == _DIR._SOUTH){
            var arr = chips.vertical();
            arr.forEach(function (item, index) {
                if(Chip.poof(item, true, index * 4 + 4, _DIR._SOUTH)){
                    addNewChip = true;
                }
            })
        }
        else if(player.direction == _DIR._WEST){
            var arr = chips.gorisontal();
            arr.forEach(function (item, index) {
                if(Chip.poof(item, false, index + 1, _DIR._WEST)){
                    addNewChip = true;
                }
            })

        }
        else if(player.direction == _DIR._EAST){
            var arr = chips.gorisontal();
            arr.forEach(function (item, index) {
                if(Chip.poof(item, true, index + 13, _DIR._EAST)){
                    addNewChip = true;
                }
            })
        }




        // add new
        if(addNewChip) {
            var vacantPosition = chips.generateVacantPositions();
            var newPosition = vacantPosition[randomInt(0, vacantPosition.length - 1)];
            var chip = new Chip(newPosition);
            chip.init();
            chips.push(chip);
        }
    });




});