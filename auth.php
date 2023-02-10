<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/Data/Crud.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/User/Validation.php';

use \Core\Data\Crud as Crud;
use \Core\User\Validation as Validation;

try {
    
    $readUser = new Crud($_POST['authLogin'], $_POST['authPassword']);

    if ($readUser->read()) {
        session_start();

        if (isset($_COOKIE['name'])) {
            setcookie('name', $_COOKIE['name'], time() + 60 * 60 * 24 * 30, '/');
            $_SESSION['name'] = 'Hello ' . $_COOKIE['name'];
        } else {
            $username = $readUser->getUserName();
            setcookie('name', $username, time() + 60 * 60 * 24 * 30, '/');
            $_SESSION['name'] = 'Hello ' . $username;
        }
    }
    
    echo json_encode([
        "status" => true,
        "message" => '',
    ]);

} catch (Exception $exception) {

    echo json_encode([
        "status" => false,
        "message" => $exception->getMessage()
    ]);
}