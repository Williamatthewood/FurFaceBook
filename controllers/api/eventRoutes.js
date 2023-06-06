const router = require('express').Router();
const { Event } = require('../../models');

router.post('/', async (req, res) => {
    const newEventData = {
        title: req.body.title,
        description: req.body.description,
        date_on: req.body.date_on,
        user_id: req.session.user_id,
    };

    try {
        const eventData = await Event.create(newEventData);
    
        res.status(200).json(eventData);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        const eventData = await Event.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!eventData) {
            res.status(404).json({ message: 'No event found with this id!' });
            return;
        }
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;