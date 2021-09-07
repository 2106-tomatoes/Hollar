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
    //From The White House events (starting point)
    //Distance here is straight line from starting point to ending point
    // <= 1 mi 
    Event.create({ // 0.4 mi
      name: "frisbee golf",
      location: "1332 I St NW, Washington, DC 20005",
      maxAttendees: 5,
      description: "Let's play frisbee golf",
      eventObjectType: "event",
      latitude: 38.90188451272879, 
      longitude: -77.03105809545188,
      attendanceDate: "2021-08-30",
      hostId: 1,
    }),
    Event.create({ // 0.74 mi
      name: "Coffee and chat",
      location: "1301 Connecticut Ave NW, Washington, DC 20036",
      maxAttendees: 3,
      description: "coffee n chat",
      eventObjectType: "event",
      latitude: 38.90780705175437, 
      longitude: -77.04191910190258,
      attendanceDate: "2021-09-24",
      hostId: 6
    }),

    // <= 5 mi
    Event.create({ // 2.49 mim
      name: "You can't see me",
      location: "3421 Center St NW, Washington, DC 20010",
      maxAttendees: 5,
      description: "Already Happened",
      eventObjectType: "event",
      latitude: 38.93411017829687, 
      longitude: -77.03562323043623,
      attendanceDate: "2021-08-24",
      hostId: 2
    }),
    Event.create({ // 4.11 mi
      name: "popeyes",
      maxAttendees: 25,
      location: "4241 N Pershing Dr, Arlington, VA 22203",
      description: "windmills are not allowed",
      eventObjectType: "event",
      latitude: 38.87336556997618,  
      longitude: -77.10630477306725,
      attendanceDate: "2021-09-28",
      hostId: 3
    }),

    // <= 10 mi
    Event.create({ // 8.95 mi
      name: "meetup",
      location: "Walker Mill, MD",
      maxAttendees: 10,
      description: "today's meetup",
      eventObjectType: "event",
      latitude: 38.87573352605061, 
      longitude: -76.87252346465331,
      attendanceDate: "2021-09-29",
      hostId: 5
    }),
    Event.create({ // 6.59 mi
      name: "eat n chat",
      location: "61st St NE, Washington, DC 20019",
      maxAttendees: 10,
      description: "relax and eat",
      eventObjectType: "event",
      latitude: 38.89494166991933,  
      longitude: -76.91396895838082,
      attendanceDate: "2021-09-29",
      hostId: 5
    }),

    // <= 20 mi
    Event.create({ // 16.70 mi
      name: "golf",
      location: "3151 Presidential Golf Dr #8957, Upper Marlboro, MD 20774",
      maxAttendees: 10,
      description: "golf party",
      eventObjectType: "event",
      latitude: 38.84656062573335,  
      longitude: -76.73313442623434,
      attendanceDate: "2021-09-29",
      hostId: 4
    }),
    Event.create({ // 20.00 mi
      name: "weekend trip",
      location: "8566-8580 Foundry St, Savage, MD 20763",
      maxAttendees: 4,
      description: "meet here for trip",
      eventObjectType: "event",
      latitude: 39.135795049098654,  
      longitude: -76.82484451733113,
      attendanceDate: "2021-09-28",
      hostId: 1
    }),
    
    // <= 25 mi
    Event.create({ // 23.25 mi
      name: "meet and board games",
      maxAttendees: 5,
      location: "Town Center, Columbia, MD 21044",
      description: "board games",
      eventObjectType: "event",
      latitude: 39.212987732696554, 
      longitude: -76.88546244111267,
      attendanceDate: "2021-08-27",
      hostId: 2
    }),
    Event.create({ // 23.19 mi
      name: "spa day",
      maxAttendees: 2,
      location: "10705 Charter Dr Suite 330, Columbia, MD 21044",
      description: "spa",
      eventObjectType: "event",
      latitude: 39.21165580195858,
      longitude: -76.8838869422089,
      attendanceDate: "2021-09-27",
      hostId: 3
    }),
    
    // <= 50 mi
    Event.create({ // 25.60 mi
      name: "boat day",
      maxAttendees: 3,
      location: "10000 MD-108, Ellicott City, MD 21042",
      description: "boat in lake",
      eventObjectType: "event",
      latitude: 39.241542832034725, 
      longitude: -76.85873737725746,
      attendanceDate: "2021-09-26",
      hostId: 4
    }),
    Event.create({ // 35.95 mi
      name: "baltimore zooo",
      maxAttendees: 4,
      location: "1 Safari Pl, Baltimore, MD 21217",
      description: "zooo",
      eventObjectType: "event",
      latitude: 39.322677983613836,
      longitude: -76.64980404840776,
      attendanceDate: "2021-07-27",
      hostId: 2
    }),

    // > 50 mi
    Event.create({ // 62.78 mi
      name: "chick fil a",
      maxAttendees: 4,
      location: "1001 Beards Hill Rd, Aberdeen, MD 21001",
      description: "hungry?",
      eventObjectType: "event",
      latitude: 39.52254515164078,
      longitude: -76.18520087304923,
      attendanceDate: "2021-09-24",
      hostId: 6
    }),
    

    // // New York events
    // Event.create({
    //   name: "hockey",
    //   location: "Central Park, New York, NY",
    //   maxAttendees: 10,
    //   description: "Let's play hockey",
    //   eventObjectType: "event",
    //   latitude: 40.7812,
    //   longitude: -73.9665,
    //   attendanceDate: "2021-09-28",
    //   hostId: 4
    // }),
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
  
  await user1.addEvents([1,2,3,4,5,6,7,8,9,12])
  await user2.addEvents([1,2,5,7,8,9,10])
  await user3.addEvents([2,3,4,7,10,12])
  await user4.addEvents([4,6,7,8,11,12])
  await user5.addEvents([3,4,6,7,9,11,12])
  await user6.addEvents([1,4,5,6,9,7])

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