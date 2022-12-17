const DeviceValidator = require('../Validators/deviceValidator')
const deviceValidator = new DeviceValidator()

const correctData =
    {"id":1,
        "name":"цйуйцу",
        "price":123123,
        "rating":0,
        "img":"6bb2c1d5-2a92-4d08-bde4-1ee24f265776.jpg",
        "createdAt":"2022-12-15T20:20:44.511Z",
        "updatedAt":"2022-12-15T20:20:44.511Z",
        "typeId":1,
        "brandId":1,
        "info":[{"id":1,"title":"123","description":"312","createdAt":"2022-12-15T20:20:44.588Z","updatedAt":"2022-12-15T20:20:44.588Z",
        "deviceId":1}]}

const incorrectData =  {"id":1,
    "name":"1",
    "price":-52,
    "rating":-6,
    "img":"img",
    "createdAt":"2022-12-15T20:20:44.511Z",
    "updatedAt":"2022-12-15T20:20:44.511Z",
    "typeId":5,
    "brandId":6,
    "info":[{"id":1,"title":"123","description":"312","createdAt":"2022-12-15T20:20:44.588Z","updatedAt":"2022-12-15T20:20:44.588Z",
        "deviceId":1}]}

describe("All params validation", () => {
    test("ValidateDeviceParams goodParams test", async () => {
        const validate =  deviceValidator.validateDeviceParams(correctData)
        expect(validate).toBeTruthy()
    })

    test("ValidateDeviceParams badParams test", async () => {
        const validate =  deviceValidator.validateDeviceParams(incorrectData)
        expect(validate).toBeFalsy()
    })

})