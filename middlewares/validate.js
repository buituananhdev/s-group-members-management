// const unidecode = require('unidecode');
// function validate(req, res, next){
//     if(req.body.fullname.length == 0) {
//         return res.status(400).json("Ten khong rong!");
//     }
//     let str = req.body.fullname;
//     str = unidecode(str);
//     for(let i = 0;i < str.length;i++){
//         if(str[i] == ' ') continue;
//         const ascii = str.charCodeAt(i);
//         if((ascii < 65 || ascii > 90) && (ascii < 97 || ascii > 122)){
//             return res.status(400).json('Ten khong duoc chua ki tu so va ki tu dac biet!');
//         }
//     }
//     if (req.body.age <= 0) {
//         return res.status(400).json('Tuoi phai lon hon 0!');
//     }
//     next();
// }

function validate(req, res, next) {
    const regex = /^[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9 ]+$/;
    if (!regex.test(req.body.fullname)) {
        return res.status(400).json('Full name cannot contain numbers and special characters!');
    }
    if (req.body.age <= 0) {
        return res.status(400).json('Age must be greater than 0!');
    }
    next();
}

module.exports = validate;