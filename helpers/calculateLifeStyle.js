const calculateLifeStyle = (data) => {
  const { height, desiredWeight, birthday, sex, levelActivity } = data;

  const coefficient = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
  const number = sex === "male" ? 5 : -161;
  const years = new Date().getFullYear() - new Date(birthday).getFullYear();

  const result = Math.round(
    (10 * desiredWeight + 6.25 * height - 5 * years + number) *
      coefficient[levelActivity]
  );
  return result;
};

module.exports = calculateLifeStyle;
