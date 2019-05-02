const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 8;
const hashHelper = {};

hashHelper.hashString = async function( string ){
    const bounds = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    console.log( " b: " , bounds );
    console.log( "str:" , string )
    return await bcrypt.hash(string, bounds );
}

hashHelper.compareHashedStrings = async function( string1 , string2 ){
    return await bcrypt.compare( string1, string2 );
}

module.exports = hashHelper;