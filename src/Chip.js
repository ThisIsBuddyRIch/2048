/**
 * Created by ДНС on 05.03.2017.
 */
import $ from '../node_modules/jquery'
import utills from './/utills'

   export default class Chip {
       constructor(position){
           this.position = position
           this.weight = utills.generateSpoce() ? 4 : 2;
       }

       init() {
           this.dom = $('<div></div>').appendTo('#playfield')
           this.dom.removeClass().addClass("thing t" + this.weight).addClass("position"+this.position).fadeIn(3000);
       }

       transform() {
           this.weight *= 2;
           this.dom.removeClass().addClass("thing t" + this.weight).addClass("position" + this.position);
       }

       remove() {
           this.dom.remove();
       }
       reDraw(newPosition){
           if(this.position == newPosition){
               return false;
           }
           this.dom.removeClass("position"+ this.position).addClass("position" + newPosition);
           this.position = newPosition;
           return true;
       }
    }

    
