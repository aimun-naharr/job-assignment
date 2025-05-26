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
    constructor( stock ) {
        this.stock = stock;
        this.units = {
            tons: 1000000000,
            kilograms: 1000000,
            grams: 1000,
            milligrams: 1
        }
    }
    toMilligrams( quantity ) {
        let totalMilligrams = 0;
        for ( const unit in quantity ) {
            totalMilligrams += quantity[unit] * this.units[unit];
        }
        return totalMilligrams;
    }
    fromMilligrams( totalMG ) {
        const result = {};
        for ( const unit of Object.keys( this.units ) ) {
            const unitValue = this.units[unit];
            result[unit] = Math.floor( totalMG / unitValue );
            totalMG = totalMG % unitValue;
        }
        return result;
    }
    update( qty, type ) {
        const currentStockInMG = this.toMilligrams( this.stock );
        const newQuantityInMG = this.toMilligrams( qty );

        let updatedMG;
        if ( type === "purchase" ) {
            updatedMG = currentStockInMG + newQuantityInMG;
        } else if ( type === "sell" ) {
            updatedMG = currentStockInMG - newQuantityInMG;
            if ( updatedMG < 0 ) throw new Error( "No stock left" );
        } else {
            throw new Error( "Try using 'purchase' or 'sell'." );
        }

        this.stock = this.fromMilligrams( updatedMG );
        return this.stock;
    }

    getStock() {
        return this.stock;
    }
}

const inventory = new Inventory( { "tons": 1, "kilograms": 0, "grams": 0, "milligrams": 0 }
);

const afterSale = inventory.update( { "tons": 0, "kilograms": 0, "grams": 1, "milligrams": 0 }, "sell" );
console.log( "Sale:", afterSale );


const afterPurchase = inventory.update( { "tons": 0, "kilograms": 0, "grams": 1001, "milligrams": 0 }, "purchase" );
console.log( "Purchase:", afterPurchase );




class Payment {
    constructor( id, amount, status ) {
        this.id = id;
        this.amount = amount;
        this.time = Date.now();
        this.status = status;
    }
}
class PaymentsQueue {
    constructor() {
        this.payments = [];
        this.failedPayments = {};
    }
    generateRandomTransaction() {
        const id = Math.floor( Math.random() * 10 );
        const amount = Math.floor( Math.random() * ( 1000 - 10 + 1 ) ) + 10;
        const payment = new Payment( id, amount, null )
        return payment;
    }
    addPayments() {
        const payment = this.generateRandomTransaction();
        this.payments.push( payment )
    }
    processPayment( payment ) {
        if ( payment.status && payment.status === 'success' ) return;
        const randomId = Math.floor( Math.random() * 1000 );

        if ( payment.id === randomId ) {
            payment.status = 'success';
            return 'Your Payment has been processed successfully';
        } else {
            payment.status = 'failed';
            const key = payment.id;
            let delay = 0;
            let count = 0;
            if ( this.hasFailedPayments() && this.failedPayments[key] ) {
                count = this.failedPayments[key]++
            } else {
                count = 1;
                this.failedPayments[key] = 1;
            }
            delay = this.getRetryDelay( count )
            console.log( 'failed', this.failedPayments )
            console.log( `Retrying payment ${payment.id} in ${delay / 1000}s` );
            setTimeout( () => {
                this.processPayment( payment )
            }, delay )
        }
    }
    hasFailedPayments() {
        return Object.keys( this.failedPayments ).length !== 0;
    }

    getRetryDelay( failureCount ) {
        if ( failureCount <= 0 ) return 0;
        const delayConstants = {
            1: 2,
            2: 5,
            3: 10,
            4: 20,
            5: 30,
            6: 60
        }
        const delayMinutes = delayConstants[failureCount] || 60;
        return delayMinutes * 60 * 1000;
    }
    processAllPayments() {
        this.payments.forEach( ( payment ) => {
            this.processPayment( payment );
        } );
    }
}

const queue = new PaymentsQueue();



for ( let i = 0; i < 10; i++ ) {
    queue.addPayments();
}

queue.processAllPayments();
