const express = require('express');
const router = express.Router();
const membreController = require('../controllers/membreController');




router.get('/', membreController.getAllMembers);
router.get('/:id', membreController.getMemberById);
router.post('/login', membreController.signin);
router.post('/add-member', membreController.createMember);
router.put('/:id', membreController.updateMember);
router.delete('/:id', membreController.deleteMember);

module.exports = router;
