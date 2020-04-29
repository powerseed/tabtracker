const joi = require('joi')

export default function (credentials) {
  const schema = joi.object({
    email: joi.string().email(),
    password: joi.string().regex(new RegExp(/^[a-zA-Z0-9]{8,32}$/))
  })

  const { error, value } = schema.validate(credentials);

  if(error){
    if(error.details[0].context.key == 'email'){
      return {
        errorNumber: 400,
        message: 'Please provide a valid email address. '
      };
    }
    else if(error.details[0].context.key == 'password'){
      return {
        errorNumber: 400,
        message: 'The password must contain: <br>' +
            '1. Characters from a-z and A-Z. <br>' +
          '2. Numbers from 0-9. <br>' +
          '3. 8 to 32 characters. '
      };
    }
  }
  else{
    return null;
  }
}
