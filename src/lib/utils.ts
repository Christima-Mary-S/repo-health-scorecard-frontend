export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const parseRepoUrl = (
  input: string
): { owner: string; repo: string } | null => {
  const parts = input.trim().split("/");
  if (parts.length === 2 && parts[0] && parts[1]) {
    return { owner: parts[0], repo: parts[1] };
  }
  return null;
};
