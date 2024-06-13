import Shooter from '../shooter';

test('shooter moves', () => {
  const shooter = new Shooter(1000);
  shooter.moveRight();
  expect(shooter.getPosition()).toBe(505);
  shooter.moveRight();
  expect(shooter.getPosition()).toBe(510);
  shooter.moveLeft();
  expect(shooter.getPosition()).toBe(505);
  shooter.moveLeft();
  expect(shooter.getPosition()).toBe(500);
});

test('shooter should not move at edge', () => {
  const shooter = new Shooter(100);
  shooter.moveRight();
  expect(shooter.getPosition()).toBe(50);
  shooter.moveLeft();
  expect(shooter.getPosition()).toBe(50);
});