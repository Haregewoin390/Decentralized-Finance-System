import { generateMnemonic, mnemonicToSeed } from 'ethereum-cryptography/bip39';
import { sha256 } from 'ethereum-cryptography/sha256';
import { HDKey } from 'ethereum-cryptography/hdkey';
import { hexToBytes, toHex } from 'ethereum-cryptography/utils';
import { wordlist } from 'ethereum-cryptography/bip39/wordlists/english';
import { UserLoginInfo } from 'utils/types/userType';

const publicKeyToAddress = require('ethereum-public-key-to-address');

export function generatePassPhrase(): string[] {
  const m = generateMnemonic(wordlist);
  const mnemonicArray = m.split(' ');
  return mnemonicArray;
}

export async function generateSeed(memonic: string): Promise<string> {
  const seed = await mnemonicToSeed(memonic);
  const seedString = toHex(sha256(seed));
  return seedString;
}

export async function createWallet(
  memonic: string[],
  extraWord?: string
): Promise<UserLoginInfo> {
  const memonicString = memonic.join(' ');
  const seed = await mnemonicToSeed(memonicString, extraWord);
  const hdkey1 = HDKey.fromMasterSeed(seed);
  let privateKeyString = '';

  if (hdkey1.privateKey) {
    privateKeyString = toHex(sha256(hdkey1.privateKey));
  }

  const account1 = hdkey1.derive("m/44'/60'/0'/0/0");

  let priv = '',
    pubkey = '',
    pubad;

  if (account1.privateKey) priv = '0x' + toHex(account1.privateKey);
  if (account1.publicKey) pubkey = '0x' + toHex(account1.publicKey);
  if (account1.publicKey) pubad = publicKeyToAddress(toHex(account1.publicKey));

  return {
    hdPriv: hdkey1.privateExtendedKey, //important //BIP32 Root Key
    priv: priv,
    pubad: pubad,
    pubkey: pubkey,
  };
}
