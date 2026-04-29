export const getImage = (url: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`;
};
