"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Person_1 = __importDefault(require("../models/Person"));
const person_1 = require("../services/person");
const createPerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, curp, weight, tall, gender, zone } = req.body;
    const birthdate = (0, person_1.calculateBirthdate)(curp);
    const idealWeight = (0, person_1.calculateIdealWeight)(tall, gender);
    const weightCategory = (0, person_1.calculateWeightCategory)(tall, weight);
    const person = new Person_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name, lastname, curp, weight, tall, gender, zone, birthdate, idealWeight, weightCategory
    });
    return yield person.save()
        .then((person) => res.status(201).json({ person }))
        .catch((error) => res.status(500).json({ error }));
});
const readPerson = (req, res, next) => {
    const personId = req.params.id;
    return Person_1.default.findById(personId)
        .then((person) => (person ? res.status(200).json({ person }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Person_1.default.find()
        .then((persons) => res.status(200).json({ persons }))
        .catch((error) => res.status(500).json({ error }));
};
const updatePerson = (req, res, next) => {
    const personId = req.params.id;
    return Person_1.default.findById(personId)
        .then((person) => {
        if (person) {
            const birthdate = (0, person_1.calculateBirthdate)(req.body.curp);
            const idealWeight = (0, person_1.calculateIdealWeight)(req.body.tall, req.body.gender);
            const weightCategory = (0, person_1.calculateWeightCategory)(req.body.tall, req.body.weight);
            person.set(Object.assign(Object.assign({}, req.body), { birthdate, idealWeight, weightCategory }));
            return person
                .save()
                .then((person) => res.status(201).json({ person }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deletePerson = (req, res, next) => {
    const personId = req.params.id;
    return Person_1.default.findByIdAndDelete(personId)
        .then((person) => (person ? res.status(201).json({ person, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createPerson, readPerson, readAll, updatePerson, deletePerson };
//# sourceMappingURL=person.js.map