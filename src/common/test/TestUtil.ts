import { User } from '../../auth/entities/user.entity';

export default class TestUtil {
  static giveMeAValidUser(): User {
    const user = new User();
    user.username = 'Test User';
    user.email = 'user@teste.com';
    user.id = '1';
    return user;
  }
}
