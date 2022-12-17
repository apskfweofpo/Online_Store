const payMethods = ["cash", "card"]
const phoneMasks = ["+37529", "+37533"]
class OrderValidator{
    validateOrderParams(params) {
        const {name, telephone_number, address, description, type_Payment, amount_Payment} = params
        
        return (this.validatePhone(telephone_number) && this.validatePaymentType(type_Payment)
            && this.validateStringLength(address) && this.validateStringLength(description)
            && this.validateIsNotEmpty({name, type_Payment, address, description})
            && this.validatePrice(amount_Payment)) ? true : false
    }

    validatePhone(phone){//
        let counter = 0

        for(let mask in phoneMasks){
            console.log("\n\n=========================MAsk=============\n\n", mask);
            if((phone.indexOf(phoneMasks[mask])) > -1){
                console.log("\n\n=====================LOG====================\n\n",phone.indexOf(phoneMasks[mask]))
                counter++
            }
        }

        return counter > 0 && phone.length === 13 ? true : false
    }

    validatePaymentType(type){//
        return (type.toLowerCase() === payMethods[1] || type.toLowerCase() === payMethods[0]) ? true : false
    }

    validateStringLength(text){//
        return text.length >= 20 ? true : false
    }

    validateIsNotEmpty({...fields}){//
        let counter = 0
        for(let prop in fields){
            if(fields[prop] !== "" && fields[prop].toString().length > 0) counter++
        }
        return counter === Object.keys(fields).length ? true : false
    }
    validatePrice(price){
        console.log("\n\n===============PRICE============\n\n", price, typeof(price));
        return (price > 0 && price.toString().length > 0)
    }
}

module.exports = OrderValidator
