<?php
session_start();
setcookie('name', $_COOKIE['name'], -1, '/');
unset($_SESSION['name']);
header('Location: /index.php');