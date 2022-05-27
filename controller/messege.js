const axios = require('axios')
const FROM_NUMBER = '+13203445614';
const TO_NUMBER = '+917007311580';
// const AUTH_TOKEN = '4ba8601de0c48ffbed5203f3e94e77f6';
const AUTH_TOKEN = 'b6f1ec2f707d58dba73fb85d23ef76c0'
// const ACCOUNT_SID = 'AC18348285d51ff8b11ebaec848cfc88c4';
const ACCOUNT_SID ='AC6f4d6ab7f5be28e959986652d1f6539e'
const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
exports.message = async (req, res) => {
    console.log("req",req.body)
    var num = req.body.numbers.join(",");
    console.log("numvers",num)
    try {
        client.messages
    .create({
      body: req.body.message,
      from: FROM_NUMBER,
      to: TO_NUMBER
      // to : req.body.number
    })
    .then(message => {
      console.log(message);
      return res.status(200).json({
                    success: true,
                    message: message
                  });
    }).catch((error) => {
      console.log(error)
      return res.status(200).json({
        success: false,
        message: "not sent message"
      });
    });
    //     var postData = {

    //         "route" : "v3",
    //         "sender_id" : "FTWSMS",
    //         "message" : req.body.message,
    //         "language" : "english",
    //         "flash" : 0,
    //         // "numbers" : "+919953026461,+917565890296,+918009191936",
    //         numbers : num
    //         };
          
    //       let axiosConfig = {
    //         headers: {

    //             "authorization":"xMwXaCO2kKzhIS4l9gbu3mQPHeq5sv7f8n1URDGAjEtJVo0WrdBIHj57NglmZkJQEVGA2wqpXvOMDKWt",
    //             "Content-Type":"application/json"
    //             }
                
                
    //       };

    //     axios.post('https://www.fast2sms.com/dev/bulkV2', postData, axiosConfig)
    //         .then((res) => {
    //         console.log("RESPONSE RECEIVED: ", res);
    //         return res.status(200).json({
    //             success: true,
    //             message: "sent successfully"
    //           });
    //         })
    //         .catch((err) => {
    //         console.log("AXIOS ERROR: ", err);
    //         return res.status(200).json({
    //             success: true,
    //             message: "not sent successfully"
    //           });
    //         })
      
    } catch (err) {
      console.log("Request failed", err);
    }
  };
  