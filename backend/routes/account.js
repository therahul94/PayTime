const express = require('express');
const { getBalance, transfer } = require('../controller/account');
const { authMiddleware } = require('../middleware');
const router = express.Router();

router.get("/balance", authMiddleware, getBalance);
router.put("/transfer", authMiddleware, transfer);
// transfer({
//     userId: "66c7fcda7e05b9c05db1e200",
//     body: {
//         transferTo: "66c77c7a66703843f04bf34a",
//         amount: 100
//     }
//   })
  
//   transfer({
//     userId: "66c7fcda7e05b9c05db1e200",
//     body: {
//         transferTo: "66c77c7a66703843f04bf34a",
//         amount: 100
//     }
//   })
module.exports = router;