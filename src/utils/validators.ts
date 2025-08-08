export const validateRepoInput = (input: string): boolean => {
  const repoPattern = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;
  return repoPattern.test(input.trim());
};
