<pre>
<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/Data/Crud.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/User/Validation.php';

use \Core\Data\Crud as Crud;
use \Core\User\Validation as Validation;

try {
    
    $createUser = new Crud($_POST['authLogin'], $_POST['authPassword']);
    $readUser->read();
    session_start();
    setcookie('name', $_POST['name'], time() + 60 * 60 * 24 * 30, '/');
    $_SESSION['name'] = 'Hello ' . $_POST['name'];
    

    echo json_encode([
        "status" => true,
        "message" => '',
    ]);

} catch (Exception $exeption) {

    echo json_encode([
        "status" => false,
        "message" => $exeption->getMessage()
    ]);
}
?>
</pre>