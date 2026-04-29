export const getImage = (url: string) => {
  const base = (process.env.NEXT_PUBLIC_IMAGE_URL ?? "").replace("0.0.0.0", "localhost");
  return `${base}${url}`;
};
