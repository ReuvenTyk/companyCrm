const database = require("./database");
const joi = require("joi");

module.exports = {
  getCustomersList: async function (req, res, next) {
    const sql = `SELECT * FROM customers`;

    try {
      const result = await database.query(sql);
      res.json(result[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  addCustomers: async function (req, res, next) {
    const reqBody = req.body;

    const schema = joi.object({
      first_name: joi.string().required().min(2).max(50),
      last_name: joi.string().required().min(2).max(50),
      phone: joi
        .string()
        .required()
        .min(9)
        .max(200)
        .regex(/^[0-9]+(\.?[0-9]+)?$/),
      email: joi
        .string()
        .required()
        .regex(/^[^@]+@[^@]+$/),
    });

    const { error, value } = schema.validate(reqBody);

    if (error) {
      res.status(400).send(`data invalid. add failed: ${error}`);
      return;
    }

    const sql =
      "INSERT INTO customers(first_name,last_name,phone,email) VALUES(?,?,?,?)";

    try {
      const result = await database.query(sql, [
        value.first_name,
        value.last_name,
        value.phone,
        value.email,
      ]);
      value.id = result[0].insertId;
      res.json(value);
    } catch (err) {
      res.status(400).send(`data invalid. add failed: ${error}`);
    }
  },

  updateCustomers: async function (req, res, next) {
    const param = req.body;

    const schema = joi.object({
      first_name: joi.string().required().min(2).max(50),
      last_name: joi.string().required().min(2).max(50),
      phone: joi.number().required().min(6).max(200),
      email: joi
        .string()
        .required()
        .regex(/^[^@]+@[^@]+$/),
    });

    const { error, value } = schema.validate(param);

    if (error) {
      res.status(400).send(`data invalid. add failed: ${error}`);
      return;
    }

    const sql = `UPDATE customers SET first_name=${first_name},last_name=${last_name},phone=${phone},email=${email} WHERE id=${id}`;

    try {
      const result = await database.query(sql);
      res.status(200).jason(result[0]);
    } catch (err) {
      res.status(400).send(`data invalid. add failed: ${error}`);
    }
  },

  deleteCustomer: async function (req, res, next) {
    const param = req.query;
    console.log(param);
    const sql = `DELETE FROM customers WHERE id=${param.id}`;

    try {
      const result = await database.query(sql, param);
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
