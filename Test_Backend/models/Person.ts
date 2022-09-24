import mongoose, { Document, Schema } from "mongoose";

export interface IPerson {
    name: string;
    lastname: string;
    curp: string;
    weight: number;
    tall: number;
    gender: string;
    zone: string;
    birthdate: Date;
    weightCategory: number;
}

export interface IPersonModel extends IPerson, Document {

}

const PersonSchema: Schema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    curp: { type: String, required: true },
    weight: { type: Number, required: true },
    tall: { type: Number, required: true },
    gender: { type: String, required: true },
    zone: { type: String, required: true },
    birthdate: { type: Date, required: true },
    idealWeight: { type: Number, required: true },
    weightCategory: { type: String, required: true }

},
    {
        versionKey: false
    });

export default mongoose.model<IPersonModel>('Person', PersonSchema)