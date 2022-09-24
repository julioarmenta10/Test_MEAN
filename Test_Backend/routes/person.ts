import { Router } from "express";
import controller from "../controllers/person";
import { TokenValidation } from "../libs/verifyToken";

const router = Router();

router.get('/get/', controller.readAll);
router.get('/get/:id', controller.readPerson);
router.post('/create', controller.createPerson);
router.put('/update/:id', controller.updatePerson);
router.delete('/delete/:id', controller.deletePerson);

export default router;