const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const auth =  require('./config/secrets');
const port = process.env.PORT || 8081;

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// View engine setup
app.set('view engine', 'ejs');
// Static folder
app.use(express.static(__dirname + '/public'));

// MAIN ROUTE
app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
      host: 'box5667.bluehost.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: auth.emailUser,
          pass: auth.emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer" <dan@thedankoe.com>', // sender address
      to: 'thedankoe@gmail.com', // list of receivers
      subject: 'New Inquiry', // Subject line
      text: output, // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    
      if (error) {
          return console.log(error);
      } else {
        console.log(req.body);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('index');
      }

  });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started");
});

// server.listen(port, process.env.IP, () => {
//   console.log('Server started on http://localhost:' + port);
// })
