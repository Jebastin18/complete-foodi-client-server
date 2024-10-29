const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
menuItemId: String,
name: {
type: String,
trim: true,
required: true,
minlength: 3,
},
recipe: String,
image: String,
price: Number,
quantity: Number,
email: {
type: String,
trim: true,
required: true,
}
});

const Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
name: {
type: String,
trim: true,
required: true,
minlength: 3,
},
recipe: String,
image: String,
category: String,
price: Number,
createdAt: {
type: Date,
default: Date.now
}
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;const mongoose = require('mongoose');
const { Schema } = mongoose;
const paymentSchema = new Schema ({
transitionId: String,
email: String,
price: Number,
quantity: Number,
status: String,
itemsName: Array,
cartItems: Array,
menuItems: Array,
createdAt: {
type: Date,
default: Date.now
}
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;const mongoose = require("mongoose");
const { Schema } = mongoose;

const Reservation = new mongoose.Schema({
table: {
type: mongoose.Schema.Types.ObjectId,
ref: "Table",
required: true,
},
reservedBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
timing: {
start: {
type: Date,
required: true,
},
end: {
type: Date,
required: true,
},
},
price: {
type: Number,
required: true,
},
});

const ReservationModel = mongoose.model("Reservation", Reservation);

module.exports = ReservationModel;const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemsSchema = new Schema({
name: {
type: String,
required: true,
},
price: {
type: Number,
required: true,
},
quantity: {
type: Number,
required: true,
},
});

const TimeSlotSchema = new Schema({
startTime: {
type: Date,
required: true,
},
endTime: {
type: Date,
required: true,
},
isAvailable: {
type: Boolean,
default: true,
},
reservedBy: {
type: Schema.Types.ObjectId,
ref: "User",
default: null,
},
});

const TableSchema = new Schema({
tableNo: {
type: Number,
required: true,
},
orders: {
type: [ItemsSchema],
default: [],
},
timeSlots: {
type: [TimeSlotSchema],
default: [],
},
isAvailable: {
type: Boolean,
default: true,
},
});

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
name: String,
email: {
type: String,
trim: true,
minlength: 3,
},
photoURL: String,
role: {
type: String,
enum: ['user', 'admin'],
default: 'user',
},
})

const User = mongoose.model('User', userSchema);

module.exports = User;
