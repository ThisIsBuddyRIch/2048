/**
 * Created by ДНС on 05.03.2017.
 */

    var chips = [];
    chips.vertical = function () {
        var result = [];
        result.push(this.filter(function (item) {
            return item.position <=4
        }));
        result.push(this.filter(function (item) {
            return item.position <=8 && item.position > 4;
        }));
        result.push(this.filter(function (item) {
            return item.position <=12 && item.position > 8;
        }))
        result.push(this.filter(function (item) {
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
        result.push(this.filter(function (item) {
            return item.position % 4 == 1;
        }));
        result.push(this.filter(function (item) {
            return item.position % 4 == 2;
        }));
        result.push(this.filter(function (item) {
            return item.position % 4 == 3
        }))
        result.push(this.filter(function (item) {
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

        this.forEach(function (item) {
            src.splice(src.indexOf(item.position), 1);
        })

        return src;
    }
 export default chips;
