import utills from './/utills'
import Chip from './/Chip'

export default class Kernel {
    constructor(chips){
        this.chips = chips;
        this.move = false;
    }
    poof(arr, reversFlag, lastPosition, direction){
        var $this = this;
        var skip = false;
        if(reversFlag){
            arr.reverse();
        }
        //Схлопывание
        arr = arr.filter(function (item, index, self) {
            if (index == 0 || skip) {

                skip = false;
            } else {
                var pref = self[index - 1];
                if (pref.weight == item.weight) {
                    var scoreItem = +(utills.score.text());
                    scoreItem += item.weight * 2;
                    utills.score.text(scoreItem);
                    pref.transform();
                    item.remove();

                    $this.chips.splice($this.chips.indexOf(item), 1);
                    skip = true;
                    $this.move = true;
                    return false;
                }
            }
            return true;
        })
        //Смещение
        arr.forEach(function (item, index, self) {
            console.log(self);
            if(index == 0)
            {
                if(item.reDraw(lastPosition)){
                    $this.move = true;
                }
            }
            else {
                if(direction == utills._DIR._NORTH){
                    if(item.reDraw(self[index - 1].position + 1)){
                        $this.move= true;
                    }
                } else if(direction == utills._DIR._SOUTH){
                    if(item.reDraw(self[index - 1].position - 1)){
                        $this.move= true;
                    }
                } else if ( direction == utills._DIR._WEST){
                    if(item.reDraw(self[index -1].position + 4)){
                        $this.move = true;
                    }
                } else if(direction == utills._DIR._EAST) {
                    if(item.reDraw(self[index-1].position - 4)){
                        $this.move = true;
                    }
                }
            }
        })
    }

    addNewChip(){
        if(this.move) {
            this.move = false;
            var vacantPosition = this.chips.generateVacantPositions();
            var newPosition = vacantPosition[utills.randomInt(0, vacantPosition.length - 1)];
            var chip = new Chip(newPosition);
            chip.init();
            this.chips.push(chip);
        }
    }
}




