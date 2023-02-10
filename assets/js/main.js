$(document).ready(function(){
    var regForm = $('form#register');
    var authForm = $('form#authorize');
    var main = $('form.main');
    var session = $('#session');

    authForm.hide();
    main.hide();

    $('a.reg').click(function(event) {
        event.preventDefault();
        authForm.hide();
        regForm.show();
    });

    $('a.auth').click(function(event) {
        event.preventDefault();
        authForm.show();
        regForm.hide();
    });

    regForm.on("submit", function(event) {
        
        
        event.preventDefault();


        let login = $('input#login').val();
        let password = $('input#password').val();
        let passConfirm = $('input#passconfirm').val();
        let email = $('input#email').val();
        let name = $('input#name').val();

        if(loginValidate(login)){
            $('input#login').css("border", "2px solid green");
            $('label[for="login"]').html("<label for='login'></label>");
        }else{
            $('input#login').css("border", "2px solid red");
            $('label[for="login"]').html("<label for='login'>Логин должен состоять минимум из 6 символов</label>");
        }

        if(passValidate(password)){
            $('input#password').css("border", "2px solid green");
            $('label[for="password"]').html("<label for='password'></label>");
        }else{
            $('input#password').css("border", "2px solid red");
            $('label[for="password"]').html("<label for='password'>Пароль должен содержать цифры, строчные и прописные буквы, минимум 6 символов</label>");
        }

        if(passConfirmValidate(password, passConfirm)){
            $('input#passconfirm').css("border", "2px solid green");
            $('label[for="passconfirm"]').html("<label for='passwordConfirm'></label>");
        }else{
            $('input#passconfirm').css("border", "2px solid red");
            $('label[for="passconfirm"]').html("<label for='passwordConfirm'>Пароли не совпадают</label>");
        }

        if(emailValidate(email)){
            $('input#email').css("border", "2px solid green");
            $('label[for="email"]').html("<label for='email'></label>");
        }else{
            $('input#email').css("border", "2px solid red");
            $('label[for="email"]').html("<label for='email'>Неверный тип email</label>");
        }

        if(nameValidate(name)){
            $('input#name').css("border", "2px solid green");
            $('label[for="name"]').html("<label for='name'></label>");
        }else{
            $('input#name').css("border", "2px solid red");
            $('label[for="name"]').html("<label for='name'>Имя должно быть минимум 2 символа, только буквы</label>");
        }

        if(loginValidate(login) && passValidate(password) && passConfirmValidate(password, passConfirm) && emailValidate(email) & nameValidate(name)) {

            let regData = regForm.serialize();
            
            $.ajax({
                url: '/reg.php',
                method: 'post',
                dataType: 'html',
                data: regData,
                success: function(data){
                    let rdata = JSON.parse(data);

                    if (rdata.status === true) {
                        regForm.hide();
                        authForm.hide();
                        main.show();
                    } else if (rdata.status === false) {
                        if (rdata.message == "User login exists"){
                            $('input#login').css("border", "2px solid red");
                            $('label[for="login"]').html("<label for='login'>Пользователь с таким логином уже существует</label>");
                        } else if (rdata.message == 'User email exists'){
                            $('input#email').css("border", "2px solid red");
                            $('label[for="email"]').html("<label for='email'>Пользователь с таким email уже существует</label>");
                        } else {
                            $('label#error').html("<label id='error'>Неверно введены данные</label>")

                        }
                    };
                }
            });
        } 
    });

    authForm.on("submit", function(event) {

        event.preventDefault();

        let authLogin = $('input[name="authLogin"]').val();
        let authPassword = $('input[name="authPassword"]').val();

        

        let authData = authForm.serialize();


        $.ajax({
            url: '/auth.php',
            method: 'post',
            dataType: 'html',
            data: authData,
            success: function(data){

                let rdata = JSON.parse(data);

                if(rdata.status === true){
                    regForm.hide();
                    authForm.hide();
                    main.show();
                }else{
                    if(rdata.message === 'Wrong login'){
                        $('input#authLogin').css("border", "2px solid red");
                        $('label[for="authLogin"]').html("<label for='authLogin'>Неверный логин</label>");
                    }else if(rdata.message === 'Wrong password'){
                        $('input#authPassword').css("border", "2px solid red");
                        $('label[for="authPassword"]').html("<label for='authPassword'>Неверный пароль</label>");
                    }
                }
            }
        });

    });
    
});

function emailValidate(email){
    
    var echeck = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

    return(echeck.test(email));
}

function nameValidate(name){

    var nameCheck = /^[а-яА-ЯёЁa-zA-Z]+$/

    return(nameCheck.test(name) && name.length >= 2);
}

function loginValidate(login){

    return(login.length >= 6);
}

function passValidate(password){

    var passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/

    return(passCheck.test(password) && password.length >= 6);
}

function passConfirmValidate(password, passconfirm){
    
    return(password === passconfirm);
}



