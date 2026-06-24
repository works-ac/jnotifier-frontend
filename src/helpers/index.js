export function getInitials(name = "") {
  if (!name) return null;

  const firstWord = name.split(" ").at(0);
  const lastWord = name.split(" ").at(-1);

  return `${firstWord.at(0)}${lastWord.at(0)}`;
}
