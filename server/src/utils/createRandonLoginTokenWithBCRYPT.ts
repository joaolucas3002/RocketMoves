import bcrypt from 'bcrypt';

export function createRandonLoginTokenWithBCRYPT() {
   const salt = bcrypt.genSaltSync(10);

   const randomToken = (Math.random() * 10 ** 16).toString();

   const bcryptToken = bcrypt.hashSync(randomToken, salt);

   return { randomToken, bcryptToken };
}
