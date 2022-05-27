const axios = require('axios')
exports.message = async (req, res) => {
    console.log("req",req.body)
    var num = req.body.numbers.join(",");
    console.log("numvers",num)
    try {
        var postData = {

            "route" : "v3",
            "sender_id" : "FTWSMS",
            "message" : req.body.message,
            "language" : "english",
            "flash" : 0,
            // "numbers" : "+919953026461,+917565890296,+918009191936",
            numbers : num
            };
          
          let axiosConfig = {
            headers: {

                "authorization":"xMwXaCO2kKzhIS4l9gbu3mQPHeq5sv7f8n1URDGAjEtJVo0WrdBIHj57NglmZkJQEVGA2wqpXvOMDKWt",
                "Content-Type":"application/json"
                }
                
                
          };

        axios.post('https://www.fast2sms.com/dev/bulkV2', postData, axiosConfig)
            .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            return res.status(200).json({
                success: true,
                message: "sent successfully"
              });
            })
            .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            return res.status(200).json({
                success: true,
                message: "not sent successfully"
              });
            })
      
    } catch (err) {
      console.log("Request failed", err);
    }
  };
  