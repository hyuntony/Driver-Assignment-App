import models from '../models/index.js';

const createDrivers = async () => {
  const user1 = new models.Driver({
    fullname: 'Unassigned Orders'
  });

  const user2 = new models.Driver({
    fullname: 'Steve Williams'
  });

  const user3 = new models.Driver({
    fullname: 'Chris Horton'
  });

  const user4 = new models.Driver({
    fullname: 'Alex Novak'
  });

  const order1 = new models.Order({
    description: 'Construction Material',
    revenue: 4200.00,
    cost: 100.00,
    driver: user2
  });

  const order2 = new models.Order({
    description: 'Construction Material',
    revenue: 3948.45,
    cost: 71.38,
    driver: user2
  });

  const order3 = new models.Order({
    description: 'Wood and Lumber',
    revenue: 1950.52,
    cost: 263.88,
    driver: user2
  });

  const order4 = new models.Order({
    description: 'Wood and Lumber',
    revenue: 4991.45,
    cost: 116.98,
    driver: user2
  });

  const order5 = new models.Order({
    description: 'Meat',
    revenue: 6739.72,
    cost: 279.17,
    driver: user3
  });

  const order6 = new models.Order({
    description: 'Meat',
    revenue: 3618.08,
    cost: 537.91,
    driver: user3
  });

  const order7 = new models.Order({
    description: 'Fresh Produce',
    revenue: 5345.91,
    cost: 420.69,
    driver: user3
  });

  const order8 = new models.Order({
    description: 'Farm Supplies',
    revenue: 7429.78,
    cost: 171.13,
    driver: user3
  });

  const order9 = new models.Order({
    description: 'Cheetos',
    revenue: 7231.98,
    cost: 310.38,
    driver: user3
  });

  const order10 = new models.Order({
    description: 'Rose Rocket Swag Shirts',
    revenue: 5404.24,
    cost: 350.79,
    driver: user4
  });

  await user1.save();
  await user2.save();
  await user3.save();
  await user4.save();

  await order1.save();
  await order2.save();
  await order3.save();
  await order4.save();
  await order5.save();
  await order6.save();
  await order7.save();
  await order8.save();
  await order9.save();
  await order10.save();
}

export { createDrivers };