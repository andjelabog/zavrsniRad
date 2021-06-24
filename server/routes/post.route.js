const express = require('express');

const PostCtrl = require('../controllers/post.controller');
const router = express.Router();
router.get('/', PostCtrl.list);
router.get('/:id', PostCtrl.get);
router.post('/', PostCtrl.create);
router.put('/:id', PostCtrl.update);
router.delete('/:id', PostCtrl.delete);
module.exports = router;