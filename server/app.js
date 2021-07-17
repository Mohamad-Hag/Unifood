var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

const bodyParser = require('body-parser');
var indexRouter = require("./routes/index");
var signUpRouter = require("./routes/customer/signup");
var signInRouter = require("./routes/customer/signin");
var getNotificationsRouter = require("./routes/customer/getnotifications");
var getRestaurantsRouter = require("./routes/customer/getrestaurants");
var getCategoriesRouter = require("./routes/customer/getcategories");
var getRestaurantByNameRouter = require("./routes/customer/getrestaurantbyname");
var getProductsRouter = require("./routes/customer/getproducts");
var addRemoveFavorite = require("./routes/customer/addremovefavorite");
var cartCheckout = require("./routes/customer/cartcheckout");
var getProductById = require("./routes/customer/getproductbyid");
var getReviews = require("./routes/customer/getreviews");
var addReview = require("./routes/customer/addreview");
var getUser = require("./routes/customer/getuser");
var addReaction = require("./routes/customer/addreaction");
var editReview = require("./routes/customer/editreview");
var getRating = require("./routes/customer/getrating");
var addRating = require("./routes/customer/addrating");
var markAsRead = require("./routes/customer/markasread");
var uploadProfilePhoto = require("./routes/customer/uploadprofilephoto");
var getOrders = require("./routes/customer/getorders");
var changeInfo = require("./routes/customer/changeinfo");
var removeNotification = require("./routes/customer/removenotification");
var sendFeedback = require("./routes/customer/sendfeedback");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/customer/signup", signUpRouter);
app.use("/customer/signin", signInRouter);
app.use("/customer/getnotifications", getNotificationsRouter);
app.use("/customer/getrestaurants", getRestaurantsRouter);
app.use("/customer/getcategories", getCategoriesRouter);
app.use("/customer/getcategories", getCategoriesRouter);
app.use("/customer/getrestaurantbyname", getRestaurantByNameRouter);
app.use("/customer/getproducts", getProductsRouter);
app.use("/customer/addremovefavorite", addRemoveFavorite);
app.use("/customer/cartcheckout", cartCheckout);
app.use("/customer/getproductbyid", getProductById);
app.use("/customer/getreviews", getReviews);
app.use("/customer/addreview", addReview);
app.use("/customer/getuser", getUser);
app.use("/customer/addreaction", addReaction);
app.use("/customer/editReview", editReview);
app.use("/customer/getrating", getRating);
app.use("/customer/addrating", addRating);
app.use("/customer/markasread", markAsRead);
app.use("/customer/uploadprofilephoto", uploadProfilePhoto);
app.use("/customer/getorders", getOrders);
app.use("/customer/changeinfo", changeInfo);
app.use("/customer/removenotification", removeNotification);
app.use("/customer/sendfeedback", sendFeedback);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
