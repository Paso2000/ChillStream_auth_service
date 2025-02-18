const express = require ("express");
const controller = require("../controller/profileController");

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(controller.listProfiles)
    .post(controller.createProfile);

router.route('/:profileId')
    .get(controller.getProfile)
    .put(controller.updateProfile)
    .delete(controller.deleteProfile);



module.exports = router;
