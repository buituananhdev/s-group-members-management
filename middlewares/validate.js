const unidecode = require('unidecode');
function validate(req, res, next){
    let str = req.body.fullname;
    str = unidecode(str);
    console.log(str);
    for(let i = 0;i < str.length;i++){
        if(str[i] == ' ') continue;
        const ascii = str.charCodeAt(i);
        if((ascii < 65 || ascii > 90) && (ascii < 97 || ascii > 122)){
            return res.status(400).json('Ten khong duoc chua ki tu so va ki tu dac biet!');
        }
    }
    if (req.body.age < 0) {
        return res.status(400).json('Tuoi phai lon hon 0!');
    }
    console.log(req.body)
    next();
}

module.exports = validate;