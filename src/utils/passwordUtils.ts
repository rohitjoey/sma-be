import bcrypt from "bcrypt";

export const generatePassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const validatePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};


