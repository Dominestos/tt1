<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация и регистрация</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
    <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
    <script src="/assets/js/main.js"></script>
</head>
<body>
    <form id="authorize" method="post" onsubmit="return false" style="display: none;">
        <h1>Вход</h1>
        <div class="input-form">
            <input type="text" id="authLogin" name="authLogin" placeholder="Логин" required>
            <label for="authLogin"></label>
        </div>
        <div class="input-form">
            <input type="password" id="authPassword" name="authPassword" placeholder="Пароль" required>
            <label for="authPassword"></label>
        </div>
        <div class="input-form">
            <input type="submit" class="auth-btn" value="Войти">
        </div>
        <a href="" class="reg">Зарегистрироваться</a>
    </form>

    <form id="register" method="post" onsubmit="return false" style="display: none;">
        <h1>Регистрация</h1>
        <div class="input-form">
            <input type="text" id="login" name="login" placeholder="Логин(уникальный)" required>
            <label for="login"></label>
        </div>
        <div class="input-form">
            <input type="password" id="password" name="password" placeholder="Пароль" required>
            <label for="password"></label>
        </div>
        <div class="input-form">
            <input type="password" id="passconfirm" name="passconfirm" placeholder="Подтверждение пароля" required>
            <label for="passconfirm"></label>
        </div>
        <div class="input-form">
            <input type="email" id="email" name="email" placeholder="Email(уникальный)" required>
            <label for="email"></label>
        </div>
        <div class="input-form">
            <input type="text" id="name" name="name" placeholder="Имя" required> 
            <label for="name"></label>
        </div>
        <div class="input-form">
            <label id="error"></label>
            <input type="submit" class="register-btn" value="Регистрация">
        </div>
        <a href="" class="auth">Авторизироваться</a>
    </form>

    <form class="main" style="display: none;">
        <h1 style="margin: 10%;" id="session">Hello <?=isset($_SESSION['name']) ? $_SESSION['name'] : ''?></h1>
        <a href="/exit.php" class="logout">Выход</a>
    </form>

</body>
</html>