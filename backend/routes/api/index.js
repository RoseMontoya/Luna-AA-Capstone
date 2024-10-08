const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const iconsRouter = require("./icons.js");
const entriesRouter = require("./entries.js");
const activitiesRouter = require("./activities.js");
const levelsRouter = require("./levels.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/icons", iconsRouter);
router.use("/entries", entriesRouter);
router.use("/activities", activitiesRouter);
router.use("/levels", levelsRouter);

module.exports = router;
