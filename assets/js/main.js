$(document).ready(function(){
    $('form#register').hide();
    $('form#authorize').hide();
    $('form.main').hide();
    var regForm = $('form#register');
    var authForm = $('form#authorize');
    var main = $('form.main');
    var selector = document.querySelector('#session').innerHTML;


    
    if (selector !== 'Hello '){
        regForm.hide();
        authForm.hide();
        main.show();
    } else {
        regForm.hide();
        authForm.show();
        main.hide();
    }

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
            $('label[for="login"]').html("<label for='login' class='redErr'>Логин должен состоять минимум из 6 символов</label>");
        }

        if(passValidate(password)){
            $('input#password').css("border", "2px solid green");
            $('label[for="password"]').html("<label for='password'></label>");
        }else{
            $('input#password').css("border", "2px solid red");
            $('label[for="password"]').html("<label for='password' class='redErr'>Пароль должен содержать цифры, строчные и прописные буквы, минимум 6 символов</label>");
        }

        if(passConfirmValidate(password, passConfirm)){
            $('input#passconfirm').css("border", "2px solid green");
            $('label[for="passconfirm"]').html("<label for='passwordConfirm'></label>");
        }else{
            $('input#passconfirm').css("border", "2px solid red");
            $('label[for="passconfirm"]').html("<label for='passwordConfirm' class='redErr'>Пароли не совпадают</label>");
        }

        if(emailValidate(email)){
            $('input#email').css("border", "2px solid green");
            $('label[for="email"]').html("<label for='email'></label>");
        }else{
            $('input#email').css("border", "2px solid red");
            $('label[for="email"]').html("<label for='email' class='redErr'>Неверный тип email</label>");
        }

        if(nameValidate(name)){
            $('input#name').css("border", "2px solid green");
            $('label[for="name"]').html("<label for='name'></label>");
        }else{
            $('input#name').css("border", "2px solid red");
            $('label[for="name"]').html("<label for='name' class='redErr'>Имя должно быть минимум 2 символа, только буквы</label>");
        }

        if(loginValidate(login) && passValidate(password) && passConfirmValidate(password, passConfirm) && emailValidate(email) & nameValidate(name)) {

            let regData = regForm.serialize();
            
            $.ajax({
                url: '/reg.php',
                method: 'post',
                dataType: 'html',
                data: regData,
                success: function(data){
                    let cdata = JSON.parse(data);

                    if (cdata.status === true) {
                        regForm.hide();
                        authForm.hide();
                        main.show();
                        $('#session').html("<h1 style='margin: 10%;' id='session'>Hello <span id='session'>" + cdata.message + "</span></h1>");
                    } else if (cdata.status === false) {
                        if (cdata.message == "User login exists"){
                            $('input#login').css("border", "2px solid red");
                            $('label[for="login"]').html("<label for='login' class='redErr'>Пользователь с таким логином уже существует</label>");
                        } else if (cdata.message == 'User email exists'){
                            $('input#email').css("border", "2px solid red");
                            $('label[for="email"]').html("<label for='email' class='redErr'>Пользователь с таким email уже существует</label>");
                        } else {
                            $('label#error').html("<label id='error' class='redErr'>Неверно введены данные</label>")

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
                    $('#session').html("<h1 style='margin: 10%;' id='session'>Hello <span id='session'>" + rdata.message + "</span></h1>");
                }else{
                    if(rdata.message === 'Wrong login'){
                        $('input#authLogin').css("border", "2px solid red");
                        $('label[for="authLogin"]').html("<label for='authLogin' class='redErr'>Неверный логин</label>");
                    }else if(rdata.message === 'Wrong password'){
                        $('input#authPassword').css("border", "2px solid red");
                        $('label[for="authPassword"]').html("<label for='authPassword' class='redErr'>Неверный пароль</label>");
                    }
                }
            }
        });

    });
    
});

function emailValidate(email){
    
    var echeck = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    return(echeck.test(email));
}

function nameValidate(name){

    var nameCheck = /^[\wа-яА-я]{2,}$/;

    return(nameCheck.test(name));
}

function loginValidate(login){

    var loginCheck = /^[\w\d_]{6,}$/;

    return(loginCheck.test(login));
}

function passValidate(password){

    var passCheck = /^[\w\d]{6,}$/;

    return(passCheck.test(password));
}

function passConfirmValidate(password, passconfirm){
    
    return(password === passconfirm);
}



