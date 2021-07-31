const { Destinatario } = require("../models/destinatario");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { validateInputDestinatario } = require("../validator");
const formidable = require("formidable");



exports.create = (req, res) => {
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
            telefono,
            banco_destino,
            tipo_cuenta,
            numero_cuenta
        } = fields;

        if (
            !nombre ||
            !rut ||
            !email ||
            !telefono ||
            !banco_destino ||
            !tipo_cuenta ||
            !numero_cuenta
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const errors = validateInputDestinatario(req,res,fields);
        if (errors.length>0) {
            return res.status(400).json({error: errors});
        }
        fields.user = {
            _id: req.profile._id,
            name: req.profile.name,
            email: req.profile.email
        }
        
        let destinatario = new Destinatario(fields);

        destinatario.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.read = (req, res) => {
    
    return res.json(req.destinatario);
};

exports.destinatarioById = (req, res, next, id) => {
    Destinatario.findById(id)
    .exec((err, destinatario) => {
        if (err || !destinatario) {
            return res.status(400).json({
                error: "Destinatario not found"
            });
        }
        req.destinatario = destinatario;
        next();
    });
};

exports.listDestinatarios = (req, res) => {
    Destinatario.find({user: req.profile._id})
        .populate("user", "_id name email")
        .sort("-created")
        .exec((err, destinatarios) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(destinatarios);
        });
};


