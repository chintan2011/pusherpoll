const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '859615',
    key: 'e8a0376ff1f5e80b5770',
    secret: '0632d0e21fce216bc6ba',
    cluster: 'us2',
    encrypted: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true, votes: votes}));
}); 

router.post('/', (req, res) => {

    const newVote = {
        activity: req.body.activity,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('activity-poll', 'activity-vote', {
            points: parseInt(vote.points),
            activity: vote.activity
        });
    });

    return res.json({success: true, message: 'Thank you for voting'});
});

module.exports = router;

