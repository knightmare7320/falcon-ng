const jwt = require("jsonwebtoken");


exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // TODO: lookup actual username and password from db/somewhere
  //       and obviously having the username/pw plaintext here is really bad
  //       but this is just sample dev stub
  if (username === "test@test.com" && password === "demo123$") {
    jwt.sign(
      { user_id: 1, full_name: 'Demo User' }, process.env.JWT_SECRET, { expiresIn: '1h' }, 
      (err, token) => {
        if (err) {
            console.err(`Login error - ${username}`);
          res.status(500).json({ message: "Login error."});           
        }
        console.log(`Login success - ${username}`);
        res.status(200).json({ user_id: 1, full_name: 'Demo User', expires_in: '1h', token });
      }
    );
  } else {
    res.status(401).json({message: 'Invalid Login.'}); 
    console.log(`Invalid login - ${username}`);
  }
};

exports.verifyToken = (req, res) => {
  // don't need this right now, but keeping for when it goes back into its own container
  const token = req.params.token;

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.status(401).json({ message: "Invalid token." });
    }
    return res.status(200).json({ message: "Success", uid: decoded.uid});
  });
};

exports.logout = (req, res) => {
  const username = req.body.username;
  // TODO: record logout in db/logs, remove session info etc etc
  return res.status(200).send();
};
