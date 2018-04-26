const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render("index");
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
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'thedankoe@gmail.com', 
        pass: 'Prometheus88'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <thedankoe@gmail.com>', // sender address
      to: 'thedankoe@gmail.com', // list of receivers
      subject: 'New Inquiry', // Subject line
      text: 'Hello World?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Email sent');
      console.log(info);
      res.render('index');
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started");
});

// app.listen(3000, () => {
//   console.log("server started");
// });
