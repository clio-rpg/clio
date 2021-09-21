import { hashSync } from 'bcrypt';

export const hashPasswordTransform = {
  to: (password: string) => {
    return hashSync(password, 10);
  },
  from: (hash: string) => {
    return hash;
  },
};
