<?php
session_start();
setcookie('name', $_COOKIE['name'], 1, '/');
unset($_SESSION['name']);
session_destroy();
header('Location: /index.php');