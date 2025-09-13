const nodemailer = require('nodemailer');




const htmlBody = (password,studentId) => {

 return `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Dear BU Student with the following student-ID: <strong>${studentId}</strong></p>
        <p>We have received a request to recover your password. You can use the following password to log in:</p>
        <h3><strong>Student-ID : ${studentId}</strong></h3>
        <h3><strong>Password : ${password}</strong></h3>
        <p>If you didn't request a password reset, please ignore this email or contact IT support team if you have any concerns.</p>
        <p>Best regards,<br>Benadir University ICT Team</p>
       
    </div>
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Benadir University. All rights reserved.</p>
    </div>
</body>
`
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'no-reply@bu.edu.so', // Your Gmail address
    pass: 'ict@2024'   // Your Gmail password
  }
});


  const sendMailll = async (password,studentId,email) => {
    try {
      const mailOptions = {
        from: "no-reply@bu.edu.so",
        to: email,
        subject: "Benadir University - Password Reset Request",
        html: htmlBody(password,studentId)
      }
 
      // let emailTransporter = await createTransporter();
      // await emailTransporter.sendMail(mailOptions);
      const result  = await transporter.sendMail(mailOptions)
        if (result) {
          return  result;
        }
    }catch(error){
      console.log(error)
    }
   
      
    
  };
 


module.exports = {
    sendMailll
  };
  