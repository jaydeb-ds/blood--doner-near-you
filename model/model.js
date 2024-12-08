const mongooses = require('mongoose');

const userSchema = new mongooses.Schema({
    name:{type:String, require :true},

    age:{type: String, require :true},
    
    blood:{type: String, require :true},

    phone:{type: String, require :true},

    district:{type: String, require :true},

    address:{type: String, require :true},

});
const bloodCollection = new mongooses.model("bloodCollection",userSchema);
module.exports=bloodCollection;