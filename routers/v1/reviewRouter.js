const review = require('express').Router()
const { createReview } = require('../../controller/review')
const { isAuthenticated } = require('../../middleware')

review.use(isAuthenticated)
review.post('/', createReview)

module.exports = review
