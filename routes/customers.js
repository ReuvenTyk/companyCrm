const express = require("express");
const router = express.Router();
const cm = require("../controllers/customers");

router.get("/", cm.getCustomersList);
router.post("/", cm.addCustomers);
router.put("/", cm.updateCustomer);
router.delete("/", cm.deleteCustomer);

module.exports = router;
