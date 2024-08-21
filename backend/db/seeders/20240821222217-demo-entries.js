'use strict';

const { Entry } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoEntries = [
  {
    "datetime": "2024-08-13 09:12:45",
    "overallMood": 9,
    "iconId": 1,
    "userId": 1,
    "note": "Experimented with a new formula that worked perfectly!"
  },
  {
    "datetime": "2024-08-17 11:30:22",
    "overallMood": 7,
    "iconId": 2,
    "userId": 1,
    "note": "Had a productive morning but ran into a minor issue."
  },
  {
    "datetime": "2024-08-18 14:05:19",
    "overallMood": 8,
    "iconId": 2,
    "userId": 1,
    "note": "Solved the issue and got back on track with my work."
  },
  {
    "datetime": "2024-08-19 16:47:50",
    "overallMood": 10,
    "iconId": 1,
    "userId": 1,
    "note": "Finished all my tasks ahead of schedule! Feeling great!"
  },
  {
    "datetime": "2024-08-20 19:15:33",
    "overallMood": 6,
    "iconId": 3,
    "userId": 1,
    "note": "A bit tired after a long day but satisfied with my progress."
  },
  {
    "datetime": "2024-07-22 10:18:00",
    "overallMood": 8,
    "iconId": 2,
    "userId": 2,
    "note": "Had a fascinating discussion on ancient Tevinter magic."
  },
  {
    "datetime": "2024-07-28 14:45:33",
    "overallMood": 9,
    "iconId": 1,
    "userId": 2,
    "note": "Successfully demonstrated a new spell. Quite satisfying!"
  },
  {
    "datetime": "2024-08-13 18:20:40",
    "overallMood": 6,
    "iconId": 3,
    "userId": 2,
    "note": "Hit a roadblock in my research, feeling a bit frustrated."
  },
  {
    "datetime": "2024-08-20 09:55:50",
    "overallMood": 10,
    "iconId": 1,
    "userId": 2,
    "note": "Finally made a breakthrough! It was worth the effort."
  },
  {
    "datetime": "2024-08-01 08:45:30",
    "overallMood": 9,
    "iconId": 1,
    "userId": 3,
    "note": "Finished reading an entire book on ancient runes. Learned so much!"
  },
  {
    "datetime": "2024-08-10 14:15:22",
    "overallMood": 7,
    "iconId": 2,
    "userId": 3,
    "note": "Spent the day in the library researching a complex charm."
  },
  {
    "datetime": "2024-08-16 11:30:00",
    "overallMood": 6,
    "iconId": 3,
    "userId": 3,
    "note": "Had a difficult time with a particularly tricky potion."
  },
  {
    "datetime": "2024-08-20 19:10:45",
    "overallMood": 10,
    "iconId": 1,
    "userId": 3,
    "note": "Finally perfected that potion! It’s a relief to get it right."
  },
  {
    "datetime": "2024-08-01 07:00:00",
    "overallMood": 9,
    "iconId": 1,
    "userId": 4,
    "note": "Started the day with a delicious stack of waffles. Feeling energized!"
  },
  {
    "datetime": "2024-08-03 12:15:30",
    "overallMood": 10,
    "iconId": 1,
    "userId": 4,
    "note": "Held a successful community meeting. Everyone left inspired!"
  },
  {
    "datetime": "2024-08-05 18:45:22",
    "overallMood": 8,
    "iconId": 2,
    "userId": 4,
    "note": "Worked late organizing files, but made a lot of progress."
  },
  {
    "datetime": "2024-08-07 10:30:45",
    "overallMood": 7,
    "iconId": 2,
    "userId": 4,
    "note": "Had a few setbacks with a new project, but staying positive."
  },
  {
    "datetime": "2024-08-09 14:20:00",
    "overallMood": 10,
    "iconId": 1,
    "userId": 4,
    "note": "Received recognition for my hard work from the mayor. A great day!"
  },
  {
    "datetime": "2024-08-12 08:50:15",
    "overallMood": 6,
    "iconId": 3,
    "userId": 4,
    "note": "Had a tough morning, but a cup of coffee helped turn things around."
  },
  {
    "datetime": "2024-08-15 17:35:40",
    "overallMood": 7,
    "iconId": 2,
    "userId": 4,
    "note": "Organized a community event, turnout was good but could be better."
  },
  {
    "datetime": "2024-08-18 13:00:30",
    "overallMood": 8,
    "iconId": 2,
    "userId": 4,
    "note": "Met with a local business owner to discuss partnership opportunities."
  },
  {
    "datetime": "2024-08-20 11:45:50",
    "overallMood": 9,
    "iconId": 1,
    "userId": 4,
    "note": "Had an incredibly productive morning. Accomplished all my goals!"
  },
  {
    "datetime": "2024-08-20 19:10:25",
    "overallMood": 10,
    "iconId": 1,
    "userId": 4,
    "note": "Ended the day with a Pawnee town hall meeting. Everyone left happy!"
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Entry.bulkCreate(demoEntries, { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Entries';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [ 1, 2, 3, 4 ] }
    }, {});
  }
};