const getEnv = (key: string): string => {
  const variable = process.env[key];
  if (variable) return variable;
  return '';
};

export default getEnv;
