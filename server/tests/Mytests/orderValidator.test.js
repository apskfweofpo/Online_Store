
const OrderValidator = require('../Validators/orderValidator')

const orderValidator = new OrderValidator();

const goodOrderParams = {
    name: "Ivan",
    telephone_number: "+375331234567",
    address: "Минск, улица Максима Богдановича, дом 46",
    description: "{Название: NVidia GeForce RTX 3060Ti, Цена: 5000}",
    amount_Payment: 5000,
    type_Payment: "card",
}

const badOrderParams = {
    name: "Noname",
    telephone_number: "+98989898",
    address: "????",
    description: "",
    amount_Payment: -1,
    type_Payment: "fake",
}

describe("All order params validation", () => {
    test("Validate goodOrderParams test", () => {
        expect(orderValidator.validateOrderParams(goodOrderParams)).toBeTruthy()
    })

    test("Validate badOrderParams test", () => {
        expect(orderValidator.validateOrderParams(badOrderParams)).toBeFalsy()
    })

})

describe("Testing order params string length validator", () => {
    test("Testing bad order description", () => {
        expect(orderValidator.validateStringLength(badOrderParams.description)).toBeFalsy()
    })

    test("Testing good order description", () => {
        expect(orderValidator.validateStringLength(goodOrderParams.description)).toBeTruthy()
    })

    test("Testing bad order address", () => {
        expect(orderValidator.validateStringLength(badOrderParams.address)).toBeFalsy()
    })

    test("Testing good order address", () => {
        expect(orderValidator.validateStringLength(goodOrderParams.address)).toBeTruthy()
    })
})

describe("Testing isNotEmpty order validator", () => {
    test("Testing order params with empty fields", () => {
        expect(orderValidator.validateIsNotEmpty(badOrderParams)).toBeFalsy()
    })

    test("Testing fullfilled order params", () => {
        expect(orderValidator.validateIsNotEmpty(goodOrderParams)).toBeTruthy()
    })
})

describe("Testing order pay methods", () => {
    test("Testing bad lowercase pay method", () => {
        expect(orderValidator.validatePaymentType(badOrderParams.type_Payment)).toBeFalsy()
    })

    test("Testing bad uppercase pay method", () => {
        expect(orderValidator.validatePaymentType(badOrderParams.type_Payment.toUpperCase())).toBeFalsy()
    })

    test("Testing good lowercase pay method", () => {
        expect(orderValidator.validatePaymentType(goodOrderParams.type_Payment)).toBeTruthy()
    })

    test("Testing good uppercase pay method", () => {
        expect(orderValidator.validatePaymentType(goodOrderParams.type_Payment.toUpperCase())).toBeTruthy()
    })
})

describe("Testing order phones mask validator", () => {
    test("Testing phone string with mess", () => {
        expect(orderValidator.validatePhone("https://hello-world")).toBeFalsy()
    })

    test("Testing phone string with unknown mask", () => {
        expect(orderValidator.validatePhone("+712312322")).toBeFalsy()
    })

    test("Testing phone string with +37529 mask", () => {
        expect(orderValidator.validatePhone("+375291234567")).toBeTruthy()
    })

    test("Testing phone string with +37533 mask", () => {
        expect(orderValidator.validatePhone("+375331234567")).toBeTruthy()
    })
})

describe("Validate price", () => {
    test("Testing good price", () => {
        expect(orderValidator.validatePrice(goodOrderParams.amount_Payment)).toBeTruthy()
    })

    test("Testing bad price", () => {
        expect(orderValidator.validatePrice(badOrderParams.amount_Payment)).toBeFalsy()
    })
})