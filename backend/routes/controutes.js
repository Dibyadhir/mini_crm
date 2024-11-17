import express from 'express';
import { addcontactdata, viewContData } from '../controllers/contactdata.js';
const router = express.Router()

// route.get('/getcontactid',getcontactid)
// route.get('/getcontactdata',getcontactdata)

router.post('/addcontactdata', addcontactdata);
router.get('/viewcontactdata', viewContData);
// route.put('/edituser',edituser)


export default router;