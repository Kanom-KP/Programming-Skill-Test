const fs = require("fs");

class Command {
  constructor(name, params) {
    this.name = name;
    this.params = params;
  }
}

function main() {
  const filename = "input.txt";
  const commands = getCommandsFromFileName(filename);

  commands.forEach((command) => {
    switch (command.name) {
      case "create_hotel":
        const [floor, roomPerFloor] = command.params;
        const hotel = { floor, roomPerFloor };
        console.log(
          `Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`
        );

        roomAvailable = []; // array of all room
        for (let i = 1; i <= hotel.floor; i++)
          for (let j = 1; j <= hotel.roomPerFloor; j++)
            roomAvailable.push(parseInt(i + "0" + j));

        keyCardNum = []; // array of keycard
        for (k = 1; k <= roomAvailable.length; k++) keyCardNum.push(k);

        guestList = []; // array of current guest

        return;

      // *****************************************************************

      case "book":
        const [roomNumber, name, age] = command.params;

        if (roomAvailable.includes(roomNumber)) {
          var roomIndex = roomAvailable.indexOf(roomNumber);
          roomBooked = roomAvailable.splice(roomIndex, 1);
          keycard = keyCardNum.shift();
          let newGuest = { roomNumber, name, age, keycard };

          guestList.push(newGuest);

          console.log(
            `Room ${roomNumber} is booked by ${name} with keycard number ${keycard}.`
          );

        } else {
          let checkRoom = guestList.find(
            (guest) => guest.roomNumber == roomNumber
          );
          console.log(
            `Cannot book room ${roomNumber} for ${name}, The room is corrently booked by ${checkRoom.name}.`
          );
        }

        return;

      // *****************************************************************

      case "list_available_rooms":
        console.log(`${roomAvailable}`);
        return;

      // *****************************************************************

      case "checkout":
        const [checkoutKeycard, checkoutName] = command.params;

        let checkout = guestList.find(
          (guest) =>
            guest.keycard == checkoutKeycard && guest.name == checkoutName
        );

        if (checkout != undefined) {
          keyCardNum.unshift(checkout.keycard);
          roomAvailable.push(checkout.roomNumber);
          console.log(`Room ${checkout.roomNumber} is checkout`);
          var guestIndex = guestList.indexOf(checkout);
          guestDelete = guestList.splice(guestIndex, 1);
        } else {
          let roomOwner = guestList.find(
            (guest) => guest.keycard == checkoutKeycard
          );
          console.log(
            `Only ${roomOwner.name} can checkout with keycard number ${checkoutKeycard}.`
          );
        }

        return;

      // *****************************************************************

      case "list_guest":
        let allGuest = "";
        for (let i = 0; i < guestList.length; i++) {
          if (i > 0) {
            allGuest += ", ";
          }
          allGuest += guestList[i].name;
        }
        console.log(allGuest);

        return;

      // *****************************************************************

      case "get_guest_in_room":
        const roomNumCheck = command.params;

        let roomOwner = guestList.find(
          (guest) => guest.roomNumber == roomNumCheck
        );
        console.log(roomOwner.name);
        return;

      // *****************************************************************

      case "list_guest_by_age":
        const [condition, checkAge] = command.params;

        var guestAgeBelow = [];
        var guestAgeMoreThan = [];

        if (condition === "<") {
          guestAgeBelow = guestList.filter((guest) => guest.age < checkAge);

          let guestlist = "";
          for (let i = 0; i < guestAgeBelow.length; i++) {
            if (i > 0) {
              guestlist += ", ";
            }
            guestlist += guestAgeBelow[i].name;
          }
          console.log(guestlist);
        } else if (condition === ">") {
          guestAgeMoreThan = guestList.filter((guest) => guest.age > checkAge);
          let guestlist = "";
          for (let i = 0; i < guestAgeMoreThan.length; i++) {
            if (i > 0) {
              guestlist += ", ";
            }
            guestlist += guestAgeMoreThan[i].name;
          }
          console.log(guestlist);
        }

        return;

      default:
        return;
    }
  });
}

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, "utf-8");

  return file
    .split("\n")
    .map((line) => line.split(" "))
    .map(
      ([commandName, ...params]) =>
        new Command(
          commandName,
          params.map((param) => {
            const parsedParam = parseInt(param, 10);

            return Number.isNaN(parsedParam) ? param : parsedParam;
          })
        )
    );
}

main();
