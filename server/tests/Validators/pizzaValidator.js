import { PizzaParams} from "./pizza.types"


class PizzaValidator{
    urlMask
    typesMask
    sizesMask

    constructor(){
        this.urlMask = 'https://dodopizza.azureedge.net/'
        this.sizesMask = [26, 30, 40]
        this.typesMask = [0, 1]
    }

     validatePizzaParams(params) {
        const {imageUrl, title, types, sizes, price, category, rating} = params

        return (
            this.validateIsNotEmpty(params)
            && this.validateImageUrl(imageUrl, this.urlMask)
            && this.validateTitleLength(title)
            && this.validatePizzasParamsArray(types, this.typesMask)
            && this.validatePizzasParamsArray(sizes, this.sizesMask)
            && this.validatePriceLength(price)
            && this.validateRange(category, 0, 5)
            && this.validateRange(rating, 1, 10)
        ) ? true : false
    }

     validateRange(category, start, finish){
        return category >= start && category <= finish ? true : false
    }

     validatePizzasParamsArray(array, maskArray){
        let counter = 0
        for(let value in array){
            if(maskArray.includes(+array[value])) counter++
        }

        return counter === array.length ? true : false
    }

     validateImageUrl(img, mask){
        return img.indexOf(mask) !== -1 ? true : false
    }

     validatePriceLength(value){
        return value.toString().length >= 3 && value.toString().length <= 4 ? true : false
    }

     validateIsNotEmpty({...fields}){
        let counter = 0
        for(let prop in fields){
            if(fields[prop] !== "" && fields[prop].toString().length > 0) counter++
        }
        return counter === Object.keys(fields).length ? true : false
    }
     validateTitleLength(title){
        return title.length >= 5 && title.length <= 30 ? true : false
    }
}

export default PizzaValidator