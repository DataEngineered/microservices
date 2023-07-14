const Inquiry = require('../controllers/inquiry-controller');

exports.getAmountSignatureByAmount = (req, res) => {
    const {va_number, signature} = req.params;
    const {type} = req.query;
    console.log(type);

    if(!signature){
        res.status(403).send({message: 'Forbidden', response_code: '01'});
        return;
    }else{
        Inquiry.findByVASignature(va_number, (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({ message: 'Virtual Account Not Found!', response_code: '01'});
                }else{
                    console.log(err)
                    res.status(500).send({ message: `Failed to retrieve the data`, response_code: '01' });
                }
            }else{
                if(type === "inquiry"){
                    const currentDate = new Date();
                    const expiredDate = new Date(data.expired_date);
                    const vaNumber = data.va_number;
                    const amount = data.amount;
                    const custName = data.cust_name;

                    if(currentDate > expiredDate){
                        res.status(403).send({ message: 'Expired Virtual Account!', response_code: '01'});
                        return;
                    }

                    const inquiryData = {
                        response: "VA Static Response",
                        va_number: vaNumber,
                        amount: amount,
                        cust_name: custName,
                        response_code: "00"
                    }

                    res.send(inquiryData);
                } else if(type === "payment") {
                    const {trx_uid, amount} = req.query;
                    const vaNumber = data.va_number;
                    const totalAmount = data.amount;
                    const custName = data.cust_name;

                    if(!trx_uid || !amount){
                        res.status(403).send({ message: 'Invalid Amount', response_code: '01'});
                        return;
                    }

                    if(amount < totalAmount){
                        res.status(403).send({ message: 'Invalid, Amount is less than expected', response_code: '01'});
                        return;
                    }

                    const inquiryData = {
                        response: "VA Static Response",
                        va_number: vaNumber,
                        amount: totalAmount,
                        cust_name: custName,
                        response_code: "00"
                    }

                    res.send(inquiryData);
                } else {
                    res.send({message: 'Could not determined which type of Inquiry', response_code: '01'})
                }
            }
        })
    }
}