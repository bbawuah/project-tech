const jwt = require('jsonwebtoken');

const myFunction = async () => {
  // Sign returns a token
  // Expects object and a string
  /*
    Object contains data that we want to ..
    */


  const token = jwt.sign({ _id: 'brianbawuah' } /* Unique identiefier! van object. (_id dus) */, 'projectTechIsLeuk', { expiresIn: '2 days' });
  console.log(token);
  /**
   * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJicmlhbmJhd3VhaCIsImlhdCI6MTU5MDc3MDU5Mn0.4wLvmgPKrfX4AFr4B-WOzCKplW9Oo1eoEpIfE746mhA
   *
   * 1ST PART
   * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
   * Base64 string contains meta data
   *
   * 2ND PART
   * eyJfaWQiOiJicmlhbmJhd3VhaCIsImlhdCI6MTU5MDc3MDU5Mn0. === {"_id":"brianbawuah","iat":1590770592}
   * The payload or body of jsonwebtoken. This contains data that I provide
   *
   * 3RD PART
   * 4wLvmgPKrfX4AFr4B-WOzCKplW9Oo1eoEpIfE746mhA
   * This is the signature to verify the token
   *
   *
   * The point of jsonwebtokens is not to hide the data..
   * The whole point is om een token te creeeren dat we kunnen verifieren met onze jwt secret
   *
   *
   */

  const data = jwt.verify(token, 'projectTechIsLeuk');
  console.log(data);
};

myFunction();
