<?php

namespace Core\User;

use Exception;

class Validation
{
    public array $user = [];
    public string $passconfirm = '';
    public string $salt = 'fhjd7395hg7';

    public function __construct(string $login, string $password, string $passconfirm = '', string $email = '', string $userName = '')
    {
        $this->user['login'] = $login;
        $this->user['password'] = $password;
        $this->passconfirm = $passconfirm;
        $this->user['email'] = $email;
        $this->user['userName'] = $userName;
    }

    private function validateLogin(): bool
    {
        return (mb_strlen($this->user['login']) >= 6);
    }

    private function checkLoginExists($loginArray): bool
    {
        $statement = false;
        if ($this->validateLogin()) {
            return (in_array($this->user['login'], $loginArray));
        } else {
            return $statement;
        }
    }

    private function validatePassword(): bool
    {
        return (bool)preg_match('/^[\w\d]{6,}$/', $this->user['password']);
    }

    private function validatePasswordConfirm(): bool
    {
        $a = false;
        if ($this->validatePassword()) {
            $a = ($this->passconfirm === $this->user['password']);
            return $a;
        } else {
            return $a;
        }
    }

    private function validateEmail(): bool
    {
        return preg_match('/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/', $this->user['email']);
    }

    private function checkEmailExists($emailArray): bool
    {
        $statement = false;
        if ($this->validateEmail()) {
            return (in_array($this->user['email'], $emailArray));
        } else {
            return $statement;
        }
    }

    private function validateUserName(): bool
    {
        return mb_strlen($this->user['userName']) >= 2;
    }


    private function regValidate()
    {
        return ($this->validateLogin() && $this->validatePassWordConfirm() && $this->validateEmail() && $this->validateUserName());
    }

    private function authValidate(): bool
    {
        return ($this->validateLogin() && $this->validatePassword());
    }

    public function prepareForCreate(array $userLogins, array $userEmails): array
    {
        if (!$this->regValidate()) {

            throw new Exception('Wrong data');

        } elseif ($this->checkLoginExists($userLogins)) {

            throw new Exception('User login exists');

        } elseif ($this->checkEmailExists($userEmails)) {

            throw new Exception('User email exists');

        } else {

            $this->user['password'] = md5($this->user['password'] . $this->salt);
            return $this->user;

        }
        
    }

    public function prepareForRead(array $userLogins, array $userPasswords): bool
    {
        if ($this->checkLoginExists($userLogins)) {
            $lkey = array_search($this->user['login'], $userLogins);
            $md5password = md5($this->user['password'] . $this->salt);
            $passValidation = ($userPasswords[$lkey] === $md5password);

            if ($passValidation) {
                return $passValidation;
            } else {
                throw new Exception('Wrong password');
            }
            
        }

        throw new Exception('Wrong login');
    }
}