export function validateLinghtString(name: string) {
  if (name.length > 20) {
     const filterName = name.substring(0, 17);

     return `${filterName}...`;
  } else {
     return name;
  }
}