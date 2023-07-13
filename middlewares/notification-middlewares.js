// const clientRosRest = require('../services/radius-services-local');
const clientRosRest = require('../services/radius-services');
const axios = require('axios');
const CustomerSub = require('../controllers/notification-controller');

exports.inputNotifs = (req, res, next) => {
    const {
        trx_id, merchant_id, merchant, payment_date, payment_status_desc, bill_no, payment_total, payment_status_code, bill_total,
        payment_channel_uid, payment_channel, signature
    } = req.body;
    inputIntoNotification = [trx_id, merchant_id, merchant, bill_no, payment_date, payment_status_code, payment_status_desc, bill_total, payment_total,
    payment_channel_uid, payment_channel, signature];

    CustomerSub.insertIntoNotification(inputIntoNotification, (err, result) => {
        if(err){
            console.log(err);
            res.send("Error: ", err);
        }else{
            if(payment_status_code === "2"){
                next();
            }else{
                res.send({
                    message: "Failed"
                })
            }
        }
    })
}

exports.updateStatusCustomer = (req, res, next) => {
    const {bill_no} = req.body;
    selectFromVA = [bill_no];
    CustomerSub.selectTagihanFromVa(selectFromVA, (err, data) => {
        if(err){
            res.send('Error: ', err);
            console.log(err);
        }else{
            const CurrDate = new Date();
            const personalId = data.personal_id;
            const subscribeExpired = data.subscribe_expired
            if (subscribeExpired === null) {
                const status = 'paid';
                const newSubCustomerPraWO = [status, personalId];
                CustomerSub.updateSubCustomerPraWO(newSubCustomerPraWO, (err, result) => {
                    if(err){
                        console.log(err);
                    }else{
                        next('route');
                    }
                });
            } else {
                if (subscribeExpired > CurrDate) {
                    const status = 'aktif berlangganan';
                    const newSubCustomerAktivated = [status, personalId];
                    CustomerSub.updateSubCustomerAktif(newSubCustomerAktivated, (err, result) => {
                        if(err){
                            console.log(err);
                        }else{
                            next();
                        }
                    })
                } else if (subscribeExpired <= CurrDate) {
                    const status = 'aktif berlangganan';
                    const newSubCustomerIsolired = [status, personalId];
                    CustomerSub.updateSubCustomerIsolir(newSubCustomerIsolired, (err, result) => {
                        if(err){
                            console.log(err);
                        }else{
                            next();
                        }
                    })
                }
            }
        }
    });
}

exports.updateStatusRadius = async (req, res, next) => {
    const {bill_no} = req.body
    CustomerSub.selectPaketUser(bill_no, async (err, result) => {
        if(err){
            res.send({err});
        }else{
            const namaLayanan = result.nama_layanan;
            const idLayanan = result.id_layanan;
            const personalId = result.personal_id;
            let query = '/user-manager/user';
            if(query){
                query += `/${personalId}`;
            }
            const updateToPaket = await clientRosRest.set(query, {
                group: idLayanan
            })

            const userSession = await clientRosRest.command('/user-manager/session/print', {
                '.proplist': '.id,user,active',
                '.query': [`user=${personalId}`]
            });

            for(let i = userSession.data.length - 1; i>=0; i--){
                const deleteSession = await clientRosRest.command('/user-manager/session/remove',{
                    '.id': `${userSession.data[i]['.id']}`
                })
            }
            next();
        }
    })
}

exports.insertAccounting = async (req, res) => {
    try {
        const {
            trx_id, merchant_id, merchant, payment_date, payment_status_desc, bill_no, payment_total, payment_status_code, bill_total,
            payment_channel_uid, payment_channel, signature
        } = req.body;
        CustomerSub.selectInsertIntoAccounting(bill_no, async (err, data) => {
            if(err){
                res.send({'Error': err});
            }else{
                const nama_cust = data.nama;
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbxCU0-4Zn0t7OePPA0_NomFl-dF3ezRTaRB3J-7yAp6tLK06-ssNDkvbBbZraUkoYx4/exec';
                const response = await axios.post(scriptUrl, {trx_id, merchant_id, merchant, bill_no, nama_cust, payment_total, payment_date});

                const responseData = {
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data,
                };

                res.json(responseData);
            }
        })

      } catch (error) {
        res.status(500).json({ Error: 'Internal server error' });
      }
}