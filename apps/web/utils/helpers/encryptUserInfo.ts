import { hashSync } from 'bcryptjs';
import { Cipher, Decipher } from 'crypto';
import jwt from 'jsonwebtoken';
import { UserType } from 'utils/types/userType';
export function encryptUserInfo(userInfo: UserType, password: string) {

  jwt.sign(userInfo, password);
}
