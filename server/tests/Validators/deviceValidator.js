const {Cart, Type, Brand} = require("../../models/models");

class DeviceValidator{

    rangePriceMask
    constructor(){
        this.rangePriceMask = [1, 10000000]
    }
     validateDeviceParams(params) {
        try {
            const {price, name, brandId, typeId} = params
            return (
                this.validatePriceRange(price)
                && this.validateNameLength(name)
             //   && await this.validateTypeId(brandId)
              //  && await this.validateBrandId(typeId)
            ) ? true : false
        } catch (e) {
            console.log(e)
        }

    }
    validatePriceRange(value){
        return value > this.rangePriceMask[0] && value < this.rangePriceMask[1] ? true:false
    }
    validateNameLength(name){
        return name.toString().length>=1 && name.toString().length<=50? true: false
    }

    async validateTypeId(typeId) {
        try {
            const type = await Type.findOne(
                {
                    where: {id: typeId},
                },
            )
            console.log(type)
            if(type)
                return true
            else
                return false
        }catch (e) {
            console.log(e)
        }

    }

     async validateBrandId(typeId) {
         const brand = await Brand.findOne(
             {
                 where: {id: typeId},
             },
         )
         console.log(brand)
         if(brand)
             return true
         else
             return false
    }
}
module.exports = DeviceValidator