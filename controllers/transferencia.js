const { Transferencia } = require("../models/transferencia");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { validateInputTransferencia } = require("../validator");
const formidable = require("formidable");



exports.create = (req, res) => {
    console.log(req.profile);
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "error in form fields"
            });
        }
        // check for all fields
        const {
            nombre,
            rut,
            email,
            banco_destino,
            tipo_cuenta,
            numero_cuenta,
            monto
        } = fields;

        if (
            !nombre ||
            !rut ||
            !email ||
            !banco_destino ||
            !tipo_cuenta ||
            !numero_cuenta ||
            !monto
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const errors = validateInputTransferencia(req,res,fields);
        if (errors.length>0) {
            return res.status(400).json({error: errors});
        }

        fields.user = {
            _id: req.profile._id,
            name: req.profile.name,
            email: req.profile.email
        }
        let transferencia = new Transferencia(fields);

        transferencia.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.listTransferencias = (req, res) => {
    
    Transferencia.find({user: req.profile._id})
        .populate("user", "_id name email")
        .sort("-created")
        .exec((err, transferencias) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(transferencias);
        });
};


