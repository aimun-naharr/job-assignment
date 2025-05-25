function mojoMutkiExchange( totalMojos ) {
    let mojos = totalMojos;
    let mutkis = totalMojos;
    while ( mutkis > 3 ) {
        const newMojos = Math.floor( mutkis / 3 );
        mojos += newMojos;
        mutkisleft = Math.floor( mojos % 3 );
        mutkis = newMojos + mutkisleft;

    }
    console.log( `${mojos} mojos consumed` )
    return mojos;
}

mojoMutkiExchange( 10 )

class Inventory {
    constructor( quantity ) {
        this.quantity = quantity;
    }
}