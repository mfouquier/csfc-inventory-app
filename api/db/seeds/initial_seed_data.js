/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const {faker} = require('@faker-js/faker');

const createFakeInventory = () => {
  fakeData = [];

  for(let i = 0; i <= 50; i++){
    const inventorySet = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      directorate: faker.helpers.arrayElement(['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J8']),
      position: faker.name.jobTitle(),
      laptop_sn: faker.random.alphaNumeric(6),
      laptop_name: faker.random.alphaNumeric(12), 
      router_sn: faker.random.alphaNumeric(8),
      boi: faker.helpers.arrayElement([true, false])
    }
    fakeData.push(inventorySet)
  }
  return fakeData;
}



exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory_ledger').del()
  await knex('inventory_ledger').insert(
    createFakeInventory()
  );
};

