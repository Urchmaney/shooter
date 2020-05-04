import Bullet from '../bullet';

test('bullet moves in y coordinate', () => {
  const bullet = new Bullet();
  expect(bullet.getPosition().y).toBe(0);
  bullet.move();
  expect(bullet.getPosition().y).toBe(5);
  bullet.move();
  expect(bullet.getPosition().y).toBe(10);
});
