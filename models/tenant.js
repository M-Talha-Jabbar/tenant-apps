const mongoose = require('mongoose');

const tenantSchema=mongoose.Schema({
    CNIC:{
        type:String,
        required:true
    },
    favorites:{
        type:[String],
        unique: true
    }
});

const tenant=mongoose.model("tenant",tenantSchema);

module.exports=tenant;