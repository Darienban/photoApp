const checkUsername = (username) => {
    let usernameChecker = /^\D\w{2,}$/
    return usernameChecker.test(username);
}

const checkEmail = (email) => {
    let emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailChecker.test(email);
}

const checkPassword = (password) => {
    let passwordChecker = /^(?=.*[0-9])(?=.*[!@#$.%^&*])[a-zA-Z0-9!@#$.%^&*]{7,15}$/
    return passwordChecker.test(password);
}

const registerValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let cPassword = req.body.cPassword;
    if(!checkUsername(username)){
        req.flash('error', 'Invalid Username')
        req.session.save( err => {
            res.redirect('/register');
          })
    }else if(!checkEmail(email)){
            req.flash('error', 'Invalid Email')
            req.session.save( err => {
                res.redirect('/register');
            })
    }else if(!checkPassword(password)){
        req.flash('error', 'Invalid Password')
        req.session.save( err => {
            res.redirect('/register');
          })
    }else if(cPassword != password){
        req.flash('error', 'Invalid Confirm Password')
        req.session.save( err => {
            res.redirect('/register');
            })   
    }else{
        next();
    }

    
    
}

const loginValidation = (req, res, next) => {

}

module.exports = {registerValidation, loginValidation}