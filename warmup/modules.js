// WORKING WITH REQUIRE
// OPTION 1
// const peopleModule = require("./people");
// // RUNS the required module
// // THEN stores the data to "peopleModule" if there's any `module.exports` data from the recently required module

// // console.log("peopleModule: " + peopleModule);

// // const formattedPeople = peopleModule.map((people) => `People: ${people}`);
// // console.log(formattedPeople.join("\n"));

// console.log(peopleModule.people);
// console.log(peopleModule.ages);

// OPTION 2

// gets only what is declared
// const { people, ages } = require("./people");

// console.log(people);
// console.log(people.people); // undefined
// console.log(people.ages); // undefined
// console.log(ages);

const os = require("os");
// console.log(os);
console.log(os.platform());
console.log(os.homedir());
