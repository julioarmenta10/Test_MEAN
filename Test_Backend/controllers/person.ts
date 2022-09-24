import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import Person from "../models/Person"
import { calculateBirthdate, calculateIdealWeight, calculateWeightCategory } from '../services/person'

const createPerson = async (req: Request, res: Response, next: NextFunction) => {

    const { name, lastname, curp, weight, tall, gender, zone } = req.body;
    const birthdate = calculateBirthdate(curp);
    const idealWeight = calculateIdealWeight(tall, gender);
    const weightCategory = calculateWeightCategory(tall, weight);
    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name, lastname, curp, weight, tall, gender, zone, birthdate, idealWeight, weightCategory
    });
    return await person.save()
        .then((person) => res.status(201).json({ person }))
        .catch((error) => res.status(500).json({ error }))
}

const readPerson = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.id;

    return Person.findById(personId)
        .then((person) => (person ? res.status(200).json({ person }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Person.find()
        .then((persons) => res.status(200).json({ persons }))
        .catch((error) => res.status(500).json({ error }));
};

const updatePerson = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.id;

    return Person.findById(personId)
        .then((person) => {
            if (person) {
                const birthdate = calculateBirthdate(req.body.curp);
                const idealWeight = calculateIdealWeight(req.body.tall, req.body.gender);
                const weightCategory = calculateWeightCategory(req.body.tall, req.body.weight);
                person.set({ ...req.body, birthdate, idealWeight, weightCategory });

                return person
                    .save()
                    .then((person) => res.status(201).json({ person }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deletePerson = (req: Request, res: Response, next: NextFunction) => {
    const personId = req.params.id;

    return Person.findByIdAndDelete(personId)
        .then((person) => (person ? res.status(201).json({ person, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createPerson, readPerson, readAll, updatePerson, deletePerson };