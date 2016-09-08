const mongoose = require('mongoose')
const forkHandlers = require('../fork/fork.handlers')

const scoreSchema = mongoose.Schema({
  season: {
    type: mongoose.Schema.ObjectId,
    ref: 'season',
    required: [true, 'Season id required'],
  },
  match: {
    type: mongoose.Schema.ObjectId,
    ref: 'match',
    required: [true, 'Match id required'],
  },
  teamScorer: {
    type: mongoose.Schema.ObjectId,
    ref: 'team',
    required: [true, 'Team scorer id required'],
  },
  teamTaker: {
    type: mongoose.Schema.ObjectId,
    ref: 'team',
    required: [true, 'Team taker id required'],
  },
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'player',
    required: [true, 'Player id required'],
  },
})

scoreSchema.post('save', (score, done) => {
  return forkHandlers.playerScoreUpdate(score).then(() => {
    return done()
  }).catch((err) => {
    return done(err)
  })
})
scoreSchema.post('remove', (score, done) => {
  return forkHandlers.playerScoreUpdate(score).then(() => {
    return done()
  }).catch((err) => {
    return done(err)
  })
})

module.exports = mongoose.model('score', scoreSchema, 'scores')
