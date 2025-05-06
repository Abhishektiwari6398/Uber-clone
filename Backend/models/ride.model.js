const mongoose = require("mongoose");

const rideSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
  captain:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'captain',
  },
  pickup: {
    type: String,
    required: true,
  },
    destination: {
        type: String,
        required: true,
    },
    fare:{
        type:Number,
        required:true,  
    },
    status:{
        type:String,
        enum:['Pending','Accepted','Ongoing','Completed','Cancelled'],
        default:'Pending',
    },
    duration:{
        type:Number,
        // required:true,
    },
    distance:{
        type:Number,
        // required:true,
    },
    paymentID:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
        required:true,
    },
});

module.exports=mongoose.model('Ride',rideSchema);
