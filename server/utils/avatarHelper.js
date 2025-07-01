const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * 100) + 1;
  return `https://res.cloudinary.com/datadgjo1/image/upload/avatars/avatar${randomIndex}.png`;
};

module.exports = getRandomAvatar;
