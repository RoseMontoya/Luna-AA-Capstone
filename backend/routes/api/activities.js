const express = require("express");
const { check } = require("express-validator");
const {
  requireAuth,
  authorization,
  notFound,
  handleValidationErrors,
} = require("../../utils");
const { Activity, User } = require("../../db/models");

const router = express.Router();

// Validation for editing and creating an activity
const validateActivity = [
  // Activity name validations
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please name this activity.")
    .isLength({ min: 2, max: 30 })
    .withMessage("Activity name must be between 2-30 characters."),
  check("name").custom(async (value, req) => {
    // Check if there is already an activity with the same name
    if (value) {
      const activity = await Activity.findOne({
        where: {
          name: value,
          userId: req.req.user.id,
        },
      });
      if (
        (req.req.method === "POST" && activity) ||
        (req.req.method === "PUT" && activity?.id !== req.req.body?.id)
      ) {
        if (activity) {
          throw new Error("Activity with this name already exists.");
        }
      }
    }
    return true;
  }),
  // Icon id validations
  check("iconId")
    .exists({ checkFalsy: true })
    .withMessage("Please choose an icon to represent this activity."),
  handleValidationErrors,
];

// Get all Activities by User Id
router.get("/", requireAuth, async (req, res, next) => {
  const { user } = req;

  // Check if there is a user
  if (!user) return next(notFound('User'))

  const activities = await Activity.findAll({
    where: {
      userId: user.id,
    },
  });

  // Check if there are no activities found
  if (!activities) return next(notFound("Activities"));

  return res.json(activities);
});

// Create a new activity
router.post("/", requireAuth, validateActivity, async (req, res, next) => {
  const { name, iconId } = req.body;
  const user = await User.findByPk(req.user.id);
  if (!user) return next(notFound("User"))
  const activity = await user.createActivity({ userId: user.id, name, iconId });
  return res.status(201).json(activity);
});

//  Edit an activity by activity Id
router.put(
  "/:activityId",
  requireAuth,
  validateActivity,
  async (req, res, next) => {
    const { name, iconId, id } = req.body;

    const act = await Activity.findByPk(id);

    // Check if no activity
    if (!act) return next(notFound("Activity"));
    // Check that entry belongs to user
    if (act.userId !== req.user.id) return next(authorization(req, act.userId));

    await act.update({ name, iconId });

    return res.json(act);
  }
);

// Delete an activity by activity id
router.delete("/:activityId", requireAuth, async (req, res, next) => {
  const { activityId } = req.params;

  const act = await Activity.findByPk(activityId);

  // Check if no activity
  if (!act) return next(notFound("Activity"));
  // Check taht entry belongs to user
  if (act.userId !== req.user.id) return next(authorization(req, act.userId));

  await act.destroy();

  return res.json({ message: "Successful" });
});

module.exports = router;
