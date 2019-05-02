var nodemailer = require('nodemailer');
const jade = require('jade');
const sensitiveDataHelper = require('./SensitiveDataHelper.js');

let mailHelper = {};

mailHelper.sendInviteMail = async function(toEmail , inviteCode , inviterUser ){

    console.log("sender user : " , inviterUser )

    const htmlBody = jade.renderFile(__dirname + '/mail.jade' , {
        senderUser : inviterUser ,
        inviteCode : inviteCode
    });
    const subject = "Tebrikler! CodeMastersPub için davet aldın!" 
    await mailHelper.sendMail( toEmail , subject , htmlBody );
}

mailHelper.sendMail = async function( toEmail , subject , body ){
    var transporter = nodemailer.createTransport( sensitiveDataHelper.mailCredits );
    var mailOptions = {
        from: '"The Admin of CodeMastersPub" <admin@codemasterspub.com>',
        to: toEmail,
        subject: subject ,
        // text: 'Selam.',
        html : body
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = mailHelper;