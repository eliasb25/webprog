export class Card {
    #front;
    #back;
    #imageLink;

    constructor(front, back) {
        this.front = front;
        this.back = back;
    }

    setFront(changedFront) {
        this.front = changedFront;
    }

    setBack(changedBack){
        this.back = changedBack;
    }

    getFront(){
        return this.front;
    }

    getBack(){
        return this.back;
    }
}