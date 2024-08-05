const express = require('express');
// const { protect } = require('../middleware/authmiddleware');
const router = express.Router();
const notesController=require("../controllers/noteControllers")
const {protect}=require("../middleware/authmiddleware")


router.get('/:id',protect,notesController.getNotes),
router.post('/create',protect,notesController.CreateNote),
router.route('/get/:noteid')
  .get( protect,notesController.getNoteById)
  .put( protect,notesController.UpdateNote)
router.route('/delete/:noteid/:userid').delete(protect,notesController.DeleteNote)
module.exports=router