export const slugify = {
  create: () => {
    return (Math.random() + 1).toString(36).substring(7);
  },
};
