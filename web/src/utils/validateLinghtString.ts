export function validateLinghtString(name: string ,charactersNumber: number) {
  if (name.length > (charactersNumber)) {
     const filterName = name.substring(0, (charactersNumber - 3));

     return `${filterName}...`;
  } else {
     return name;
  }
}