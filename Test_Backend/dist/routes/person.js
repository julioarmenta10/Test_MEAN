"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_1 = __importDefault(require("../controllers/person"));
const router = (0, express_1.Router)();
router.get('/get/', person_1.default.readAll);
router.get('/get/:id', person_1.default.readPerson);
router.post('/create', person_1.default.createPerson);
router.put('/update/:id', person_1.default.updatePerson);
router.delete('/delete/:id', person_1.default.deletePerson);
exports.default = router;
//# sourceMappingURL=person.js.map