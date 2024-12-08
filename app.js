const mongoose = require("mongoose")
const ejs = require('ejs')
const express = require('express');
const path = require('path');
const bloodCollection = require('./model/model');

const app = express();

app.use(express.urlencoded({ extended: false }))

const tempPath = path.join(__dirname,'views')
console.log(tempPath);

app.set('view engine', 'ejs');
app.set('views', tempPath);

require('./db/congif');


app.get('/', (req, resp) => {
    resp.render('index');
});

app.get('/register',(req,resp) => {
    resp.render('register')
});

const userDetails = bloodCollection.find()
// console.log(userDetails);

app.post('/done', async (req, resp) => {
    try {
        const name = req.body.name;
        const age = req.body.age;
        const blood = req.body.blood;
        const phone = req.body.phone;
        const district = req.body.district;
        const address = req.body.address;



        const userdata = new bloodCollection({
            name: name,

            age: age,

            blood: blood,

            phone: phone,

            district: district,

            address: address
        });
        await userdata.save();

        resp.render('done')


        // userDetails.exec(function(errors, data) {
        //     if (errors) {
        //         console.log(errors);
        //     }

        //     resp.render('home',{ record : data });
        // })



        // const bloodGrp =req.body.blood_groupkhjkhhh
        // console.log(bloodGrp);
        
    } catch (error) {
        resp.status(401).send(error)
    }

})



const database = require('./mongodb')


app.get('/view_doner', async (req,resp)=>{

    let bloodGrp = req.query.blood_group;
    let Dis = req.query.districtName;
    let enterBlood ={blood : bloodGrp}
    // console.log(bloodGrp);
    // console.log(enterBlood);
    if (bloodGrp == "all" ) {
         enterBlood = ({})
        console.log(enterBlood);
    }
        
    
    let enterDis ={district : Dis, blood : bloodGrp}
    // console.log(Dis);
    // console.log(enterDis);

    let data = await database();
    // console.log(data);
    
    let datafind = await data.find(enterDis).toArray()
    

    // console.log(datafind)
    resp.render('view_doner',{datafind})
})



app.listen(5678)