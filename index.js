const express = require('express');
const app = express();
// Require user route
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const key = 'my top secret key';


// app.post('/auth', (req, res) => {
//     const { username, password } = req.body;
//     for (let user of dbs) {
//         if (user.username === username && user.password === password) {
//             var token = jwt.sign({ username: username }, privateKey, {
//                 algorithm: 'RS256',
//                 expiresIn: '1d',
//                 issuer: 'TuanAnh',
//             });
//             return res.status(200).json({ access_token: token });
//         }
//     }
//     return res.status(400).json({
//         message: 'Invalid username or password',
//     });
// });

// console.log(publicKey);

// app.get('/data', (req, res) => {
//     const token = req.headers['authorization'].slice(7);
//     if (!token) {
//         return res.status(401).json({
//             message: 'Invalid token',
//         });
//     }
//     try {
//         const verify = jwt.verify(token, publicKey);
//         if (verify) {
//             return res.status(200).json(dbs);
//         }
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Invalid token',
//         });
//     }
// });

// app.get('/balance/:id', (req, res) => {
//     const token = req.headers['authorization'].slice(7);
//     if (!token) {
//         return res.status(401).json({
//             message: 'Invalid token',
//         });
//     }
//     try {
//         const verify = jwt.verify(token, publicKey);
//         if (verify && verify.username == req.params.id) {
//             const user = dbs.find((user) => user.username == req.params.id);
//             if (!user) {
//                 return res.status(400).json('User not found');
//             }
//             return res.status(200).json({ balance: user.balance });
//         } else {
//             return res.status(401).json({
//                 message: 'Invalid token',
//             });
//         }
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Invalid token',
//         });
//     }
// });


//const bcrypt = require('bcrypt')

// function hasWithSalt(input) {
//     const salt = crypto.randomBytes(16).toString('hex');
//     console.log(salt);
//     const hashPass = crypto
//         .pbkdf2Sync(input, salt, 1000, 64, 'sha512')
//         .toString('hex');
//     return hashPass;
// }

// quy luật: thêm secret vào cuối chuỗi -> đảo ngược chuỗi
// const secretKey = 'SALT'

// function encypt(input) {
//     input = input + secretKey;
//     let reversedStr = input.split("").reverse().join("");
//     return reversedStr;
// }

// function decrypt (input) {
//     let reversedStr = input.split("").reverse().join("").slice(0, -(secretKey.length));
//     return reversedStr;
// }
// const en = encypt('tuananh');
// console.log(en);
// const de = decrypt(en);
// console.log(de);
//console.log(hashPass);


// encrypt with public key
// function encyption(plainText) {
//     const cipherText = crypto.publicEncrypt(
//         {
//             key: publicKey,
//             oaepHash: 'sha256',
//             padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         },
//         Buffer.from(plainText)
//     );
//     return cipherText.toString('base64');
// }
// const keypass = encyption('123hdkf');
// console.log(keypass)
// console.log(decryption(keypass));
// //decrypt width private key
// function decryption(cipherText) {
//     const decryptedText = crypto.privateDecrypt(
//         {
//             key: privateKey,
//             oaepHash: 'sha256',
//             padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         },
//         Buffer.from(cipherText, 'base64')
//     );
//     return decryptedText.toString();
// }
// Dùng userRoute cho tất cả các route bắt đầu bằng '/users'
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
// ... Other routes

app.listen(8000, () => console.log('Server started on port 8000'));
