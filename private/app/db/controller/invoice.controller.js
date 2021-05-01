const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Invoice = db.invoiceDetail,
HeaderInvoice=db.headerInvoice,
sequelize=db.sequelize;

exports.getInvoicesByClientId=(req,res)=>{
	const sqlFindUser="SELECT distinct(order_code) AS order_code ,reef_user.email , invoice_detail.date_of_billing, "+
	" reef_user.username FROM invoice_detail "+
	" INNER JOIN reef_user ON reef_user.id=invoice_detail.client_restaurant where reef_user.id=" + req.params.id_client+ ";";
	sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
	.then(invoices => {
				res.send(invoices);     
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findProductsByOrderCode=(req,res)=>{
	const sqlFindByorder_code="SELECT header_invoice.id_header,header_invoice.total,header_invoice.product_name,header_invoice.product_id,header_invoice.product_quantity , invoice_detail.order_code,invoice_detail.date_of_billing "+
	" FROM header_invoice "+
	" INNER JOIN invoice_detail ON invoice_detail.header_invoice=header_invoice.id_header "+
	" INNER JOIN reef_user ON invoice_detail.client_restaurant=reef_user.id where invoice_detail.order_code='"+req.params.order_code +"' AND reef_user.username='"+req.params.username+"' AND reef_user.id="+req.params.id+";";
	sequelize.query(sqlFindByorder_code,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findAll = (req, res) => {
	Invoice.findAll().then(invoice => {
	  // Send all invoices
	  res.send(invoice);
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};
exports.createHeaderInvoice = (req, res) => {
        HeaderInvoice.create({
            id_header:req.body.headerInvoice.id_header,
            total:req.body.headerInvoice.total,
            product_id:req.body.headerInvoice.product_id,
            product_name:req.body.headerInvoice.product_name,
            product_quantity:req.body.headerInvoice.product_quantity
        }).then(headerInvoice => {		
            //Send created customer to client
            res.send(headerInvoice);
        }).catch(err => {
              console.log(err);
              res.status(500).json({msg: "error", details: err});
          });
}
exports.createInvoice=(req,res)=>{
    Invoice.create({
        id_invoice_detail:req.body.invoiceDetail.id_invoice_detail,
        client_restaurant:req.body.invoiceDetail.client_restaurant,
        header_invoice:req.body.invoiceDetail.header_invoice,
        order_code:req.body.invoiceDetail.order_code,
        date_of_billing:req.body.invoiceDetail.date_of_billing,
        paypal_id:req.body.invoiceDetail.paypal_id,
        paypal_payer_id:req.body.invoiceDetail.paypal_payer_id,
        paypal_token:req.body.invoiceDetail.paypal_token,
    })
    .then(invoice=>{
        res.send(invoice);
    }).catch(err => {
        res.status(500).json({msg: "error", details: err});
    });
}
exports.getLastInvoiceDetail=(req,res)=>{
    const sqlFindUser="SELECT * FROM invoice_detail ORDER BY header_invoice DESC LIMIT 1;";
    sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
    .then(invoiceDetail => {
                res.send(invoiceDetail);     
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
}
exports.getLastHeaderId=(req,res)=>{
    const sqlFindUser="SELECT MAX(id_header) AS id_header FROM header_invoice;";
    sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
    .then(headerId => {
                res.send(headerId);     
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
}
exports.getLastInvoiceDetailId=(req,res)=>{
    const sqlFindUser="SELECT MAX(id_invoice_detail) AS id_invoice_detail FROM invoice_detail;";
    sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
    .then(headerId => {
                res.send(headerId);     
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
}
exports.countDistincOrderCode=(req,res)=>{
    const sqlCountDistinctOrderCode="SELECT COUNT(DISTINCT order_code) AS maxOrderCode FROM invoice_detail;";
    sequelize.query(sqlCountDistinctOrderCode,{type:sequelize.QueryTypes.SELECT})
    .then(maxOrderCode=>{
        res.send(maxOrderCode)
    }).catch(err => {
        console.log(err);
        res.status(500).json({msg: "error", details: err});
    });
}