const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

let order_id_var;
const razorpay = new Razorpay({
  key_id: "rzp_test_kdtuY3iNHf6UL3",
  key_secret: "Ze5VBLORMvLgVjHooanX1uho",
});

app.get("/", (req, res) => {
  res.render("payment");
});

app.post("/order", (req, res) => {
  console.log(req.body);
  let options = {
    amount: 30000,
    currency: "INR",
  };
  razorpay.orders.create(options, function (err, order) {
    order_id_var = order.id;
    console.log(order);
    res.json(order);
  });
});
app.post("/is-order-complete", function (req, res) {
  razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentdoc) => {
    if (paymentdoc.status == "captured") {
      res.render("sucessfull");
    }
  });
});
app.listen(PORT, () => {
  console.log(`server is listening on Port ${PORT}`);
});
