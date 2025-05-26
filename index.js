function mojoMutkiExchange(totalMojos) {
    let mojos = totalMojos;
    let mutkis = totalMojos;
    while (mutkis > 3) {
        const newMojos = Math.floor(mutkis / 3);
        mojos += newMojos;
        mutkisleft = Math.floor(mojos % 3);
        mutkis = newMojos + mutkisleft;

    }
    console.log(`${mojos} mojos consumed`)
    return mojos;
}

mojoMutkiExchange(10)

class Inventory {
    constructor(stock) {
        this.stock = stock;
        this.units = {
            tons: 1000000000,
            kilograms: 1000000,
            grams: 1000,
            milligrams: 1
        }
    }
    toMilligrams(quantity) {
        let totalMilligrams = 0;
        for (const unit in quantity) {
            totalMilligrams += quantity[unit] * this.units[unit];
        }
        return totalMilligrams;
    }
    fromMilligrams(totalMG) {
        const result = {};
        for (const unit of Object.keys(this.units)) {
            const unitValue = this.units[unit];
            result[unit] = Math.floor(totalMG / unitValue);
            totalMG = totalMG % unitValue;
        }
        return result;
    }
    update(qty, type) {
        const currentStockInMG = this.toMilligrams(this.stock);
        const newQuantityInMG = this.toMilligrams(qty);

        let updatedMG;
        if (type === "purchase") {
            updatedMG = currentStockInMG + newQuantityInMG;
        } else if (type === "sell") {
            updatedMG = currentStockInMG - newQuantityInMG;
            if (updatedMG < 0) throw new Error("Stock cannot go negative.");
        } else {
            throw new Error("Invalid transaction type. Use 'purchase' or 'sell'.");
        }

        this.stock = this.fromMilligrams(updatedMG);
        return this.stock;
    }

    getStock() {
        return this.stock;
    }
}

const inventory = new Inventory({ tons: 1, kilograms: 2, grams: 0, milligrams: 0 });

const afterSale = inventory.update({ tons: 0, kilograms: 0, grams: 1, milligrams: 0 }, "sell");
console.log("Sale:", afterSale);


const afterPurchase = inventory.update({ tons: 0, kilograms: 0, grams: 1001, milligrams: 0 }, "purchase");
console.log("Purchase:", afterPurchase);