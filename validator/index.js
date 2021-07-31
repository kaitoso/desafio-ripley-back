
const expregCorreo = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
const expregRut = new RegExp("^[0-9]+-[0-9kK]{1}$");

exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.validateInputTransferencia = (req,res,fields) =>{
    
    let errors = [];

    if (fields.monto<=0) {
        errors.push("Debe ingresar un Monto mayor a 0")
    }
    if (!expregCorreo.test(fields.email)) {
     errors.push("Debe ingresar un correo electronico válido")
    }
    
    if (!expregRut.test(fields.rut)) {
        errors.push("El rut debe ser ingresado sin puntos y con guion")
    }else{
        
         if(!validaRut(fields.rut)){
            errors.push("rut No Valido");
         }
       
    }

        return errors;

};
exports.validateInputDestinatario = (req,res,fields) =>{
    
    let errors = [];

    if (!expregCorreo.test(fields.email)) {
     errors.push("Debe ingresar un correo electronico válido")
    }
    
    if (!expregRut.test(fields.rut)) {
        errors.push("El rut debe ser ingresado sin puntos y con guion")
    }else{
        
         if(!validaRut(fields.rut)){
            errors.push("rut No Valido");
         }
    }
        return errors;
};

const validaRut = (incomingRut)=>{
    
    rutCompleto = incomingRut;   
    let tmp     = rutCompleto.split('-');
    let digv    = tmp[1];
    let rut     = tmp[0];
    if ( digv == 'K' ) digv = 'k' ;

    return (dv(rut) == digv);
};

const dv = (T) => {
    let M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
};