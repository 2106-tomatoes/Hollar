"use strict";

const {
  db,
  models: { User, Event, Message },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      firstName: "Cody",
      lastName: "Pug",
      email: "codyPug@pug.com",
      phoneNumber: "123-456-7891",
      zipCode: 12341,
      city: "pugville",
      state: "puppy",
    }),
    User.create({
      username: "murphy",
      password: "123",
      firstName: "Murphy",
      lastName: "Golden",
      email: "murphyGold@gold.com",
      phoneNumber: "123-456-7891",
      zipCode: 12341,
      city: "goldentown",
      state: "doge",
    }),

    User.create({
      username: "drew",
      password: "123",
      firstName: "drew",
      lastName: "yeet",
      email: "drew@pug.com",
      phoneNumber: "123-456-7891",
      zipCode: 12341,
      city: "pugville",
      state: "puppy",
    }),
    User.create({
      username: "Ray",
      password: "123",
      firstName: "Ray",
      lastName: "Golden",
      email: "ray@gold.com",
      phoneNumber: "123-456-7891",
      zipCode: 12341,
      city: "goldentown",
      state: "doge",
    }),

    User.create({
      username: "benLee",
      password: "123",
      firstName: "Ben",
      lastName: "Lee",
      email: "ben@ben.com",
      phoneNumber: "456-123-7891",
      zipCode: 54321,
      city: "Richmond",
      state: "Virginia",
    }),
    User.create({
      username: "jai",
      password: "123",
      firstName: "Jai",
      lastName: "Tejpal",
      email: "jai@jai.com",
      phoneNumber: "123-456-7891",
      zipCode: 12341,
      city: "Miami",
      state: "Florida",
    }),
  ]);

  //Creating Events
  const events = await Promise.all([
    Event.create({
      name: "frisbee golf",
      location: "2 15th St NW, Washington, DC 20024",
      maxAttendees: 5,
      description: "Let's play frisbee golf",
      eventObjectType: "event",
      latitude: 38.8895,
      longitude: -77.0353,
      attendanceDate: "2021-08-30",
      hostId: 1,
    }),
    Event.create({
      name: "tennis",
      maxAttendees: 2,
      location: "600 h st ne, washington, dc 20002, usa",
      description: "play a game with me",
      eventObjectType: "group",
      latitude: 38.9002,
      longitude: -76.9975,
      attendanceDate: "2021-09-27",
      hostId: 2
    }),
    Event.create({
      name: "actual golf",
      maxAttendees: 25,
      location: "2 Lincoln Memorial Cir NW Washington, DC 20037",
      description: "windmills are not allowed",
      eventObjectType: "group",
      latitude: 38.904237,
      longitude: -77.052129,
      attendanceDate: "2021-09-28",
      hostId: 3
    }),
    Event.create({
      name: "hockey",
      location: "Central Park, New York, NY",
      maxAttendees: 10,
      description: "Let's play hockey",
      eventObjectType: "event",
      latitude: 40.7812,
      longitude: -73.9665,
      attendanceDate: "2021-09-28",
      hostId: 4
    }),
    Event.create({
      name: "eating",
      location: "700 L'Enfant Plaza SW, Washington DC, DC 20024",
      maxAttendees: 10,
      description: "Let's play eating",
      eventObjectType: "event",
      latitude: 38.883896,
      longitude: -77.02535,
      attendanceDate: "2021-09-29",
      hostId: 5
    }),
    Event.create({
      name: "You can't see me",
      location: "2 15th St NW, Washington, DC 20024",
      maxAttendees: 5,
      description: "Already Happened",
      eventObjectType: "event",
      latitude: 38.8895,
      longitude: -77.0353,
      attendanceDate: "2021-08-24",
      hostId: 6
    }),
  ]);
  // Create Message
  const messages = await Promise.all([
    Message.create({
      userId: 1,
      eventId: 1,
      messageContent: "Hello world",
    }),
    Message.create({
      userId: 2,
      eventId: 1,
      messageContent: "H",
    }),
    Message.create({
      userId: 1,
      eventId: 1,
      messageContent: "Hello world",
    }),
    Message.create({
      userId: 5,
      eventId: 3,
      messageContent: "Anyone free?",
    }),
    Message.create({
      userId: 4,
      eventId: 3,
      messageContent: "What's up?",
    }),
    Message.create({
      userId: 3,
      eventId: 3,
      messageContent: "Let's do it",
    }),
  ]);
  
  //Set Attendees
  const user1 = await User.findByPk(1)
  const user2 = await User.findByPk(2)
  const user3 = await User.findByPk(3)
  const user4 = await User.findByPk(4)
  const user5 = await User.findByPk(5)
  const user6 = await User.findByPk(6)
  
  await user1.addEvents([2,3])
  await user2.addEvents([1,2])
  await user3.addEvents([3,4])
  await user4.addEvents([2,4])
  await user5.addEvents([2,3])
  await user6.addEvents([1,4])

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${events.length} events`);
  console.log(`seeded ${messages.length} messages`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    events: {
      frisbee: events[0],
      tennis: events[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;