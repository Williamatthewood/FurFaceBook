const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/event', eventRoutes);

module.exports = router;
