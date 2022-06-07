const profile = require('express').Router()
const getProfileByUserId = require('../../controller/profile/getProfileByUserId')
const { isAuthenticated, roleAuthorization } = require('../../middleware')

profile.use(isAuthenticated)
profile.get('/:id', getProfileByUserId)

module.exports = profile
