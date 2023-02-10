<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/Data/Crud.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/User/Validation.php';

use \Core\Data\Crud as Crud;
use \Core\User\Validation as Validation;

try {
    
    $createUser = new Crud($_POST['login'], $_POST['password'],$_POST['passconfirm'],$_POST['email'], $_POST['name']);
    $createUser->create();
    session_start();
    setcookie('name', $_POST['name'], time() + 60 * 60 * 24 * 30, '/');
    $_SESSION['name'] = $_POST['name'];

    echo json_encode([
        "status" => true,
        "message" => $_POST['name'],
    ]);

} catch (Exception $exeption) {

    echo json_encode([
        "status" => false,
        "message" => $exeption->getMessage()
    ]);
}
