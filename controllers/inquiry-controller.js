const dbConfigPool = require('../services/db-services');

const Inquiry = function(inquiry){
    this.va_number = inquiry.va_number;
    this.amount = inquiry.amount;
    this.cust_name = inquiryPayment.cust_name;
    this.signature = inquiryPayment.signature;
    this.expired_date = inquiryPayment.expired_date;
    this.status = inquiryPayment.status;
    this.payment_paid = inquiryPayment.payment_paid;
};

Inquiry.findByVASignature = (va_number, result) => {
    dbConfigPool.query('SELECT cp.nama AS cust_name, CONCAT(dpc.id, pb.va_customer_id) AS va_number, pb.mount AS amount, vc.signature AS signature, pb.tagihan_expired AS expired_date, pb.status_pembayaran AS status FROM dasarata_customer.payment_bills pb INNER JOIN dasarata_customer.customer_personals cp ON pb.customer_personal_id = cp.id INNER JOIN dasarata_customer.va_customers vc ON pb.va_customer_id = vc.id INNER JOIN dasarata_payment.channels dpc ON vc.chanel_id = dpc.id WHERE CONCAT(dpc.id, pb.va_customer_id) = ?', [va_number], (err, results) => {
        if(err){
            result(err, null);
            return;
        }

        if(results.length > 0){
            result(null, results[0]);
            return;
        }

        result({kind: "not_found"}, null);
    })
}

module.exports = Inquiry;