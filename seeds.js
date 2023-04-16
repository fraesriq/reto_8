import { Users } from "./models/Users.model.js";

const users = [
  { name: "Francisco", email: "fraesri@gmail.com", password: '1234' },
  { name: "Pedro", email: "pedro@gmail.com", password: '1234' },
  { name: "Carlos", email: "carlos@gmail.com", password: '4678' },
  { name: "Juan", email: "juan@gmail.com", password: '9123' }
];

const chargeUsers = async () => {

  console.log('|--------------------------------------------|');
  console.log('|---------------AGREGO SEMILLAS--------------|');
  console.log('|--------------------------------------------|');
  
  for (let index = 0; index < users.length; index++) {
    const [user, created] = await Users.findOrCreate({
      where: { name: users[index].name },
      defaults: {
        name    : users[index].name,
        email   : users[index].email,
        password: users[index].password
      }
    });
  }
}

export const chargeSeeds = () => {
  chargeUsers();
}