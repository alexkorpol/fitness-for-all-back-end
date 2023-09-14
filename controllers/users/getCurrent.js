const getCurrent = async (req, res) => {
  const { email, subscription} = req.user;
  res.status(200).json({
      email,
      subscription    
  });
};

module.exports = getCurrent; 




























// const { User } = require('../../models');

// const getCurrent = async (req, res) => {
//   const { name, email } = req.user;
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       user: {
//         name,
//         email,
//       },
//     },
//   });
// };

// module.exports = getCurrent;
