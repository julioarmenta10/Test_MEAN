"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWeightCategory = exports.calculateIdealWeight = exports.calculateBirthdate = void 0;
const calculateBirthdate = (curp) => {
    const year = curp.substring(4, 6);
    const month = parseInt(curp.substring(6, 8)) - 1;
    const day = curp.substring(8, 10);
    return new Date(parseInt(year) >= 0 && parseInt(year) <= 22 ? parseInt('20' + year.toString()) : parseInt(year), month, parseInt(day));
};
exports.calculateBirthdate = calculateBirthdate;
const calculateIdealWeight = (tall, gender) => {
    if (gender == 'Masculino') {
        return 50 + 0.555 * ((tall * 100) - 152.4);
    }
    else {
        return 45.5 + 0.535 * ((tall * 100) - 152.4);
    }
};
exports.calculateIdealWeight = calculateIdealWeight;
const calculateWeightCategory = (tall, weight) => {
    const imc = weight / (tall * tall);
    let weightCategory = '';
    if (imc < 18.5)
        weightCategory = 'BAJO PESO';
    else if (imc >= 18.5 && imc <= 24.9)
        weightCategory = 'PESO NORMAL';
    else if (imc >= 25 && imc <= 29.5)
        weightCategory = 'SOBREPESO';
    else if (imc >= 30)
        weightCategory = 'OBESIDAD';
    return weightCategory;
};
exports.calculateWeightCategory = calculateWeightCategory;
//# sourceMappingURL=person.js.map