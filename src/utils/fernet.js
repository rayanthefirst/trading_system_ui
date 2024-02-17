import fernet from 'fernet';

export const fernet_encrypt = (str) => {
    var secret = new fernet.Secret(`${process.env.REACT_APP_KEY}`);
    var token = new fernet.Token({secret: secret, ttl:0});
    return token.encode(str);
}

module.exports = {
  // ... your existing config
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      // include other polyfills as needed
    },
  },
  // ... any other config you have
};
