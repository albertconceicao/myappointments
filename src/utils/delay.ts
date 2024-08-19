export default function delay(milleseconds = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, milleseconds);
  });
}
