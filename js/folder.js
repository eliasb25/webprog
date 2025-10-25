export class Folder {
    #name;
    #cards;

    constructor(name){
        this.name = name;
        this.cards = [];
    }

    addCard(card){
        this.cards.push(card);
    }

    setCards(cards){
        this.cards = cards;
    }

    getCards(){
        return this.cards;
    }

    getName(){
        return this.name;
    }
}