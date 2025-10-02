export class Folder {
    #name;
    #cards;

    constructor(name){
        this.#name = name;
    }

    addCard(card){
        this.#cards.push(card);
    }

    setCards(cards){
        this.#cards = cards;
    }
}