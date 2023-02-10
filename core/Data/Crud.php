<?php

namespace Core\Data;

use Exception;

class Crud
{
    public string $login = '';
    public string $password = '';
    public string $passconfirm = '';
    public string $email = '';
    public string $userName = '';

    public function __construct(string $login, string $password, string $passconfirm, string $email, string $userName)
    {
        $this->login = $login;
        $this->password = $password;
        $this->passconfirm = $passconfirm;
        $this->email = $email;
        $this->userName = $userName;
    }

    private function getUsers(): array
    {
        return (array) json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/assets/js/database.json'), true);
    }

    private function getUserInfo(): array
    {
        $users = $this->getUsers();
        if (!empty($users)) {
            $arInfo = [];
            foreach ($users as $key => $user) {
                foreach ($user as $category => $value) {
                    $arInfo[$category][$key] = $users[$key][$category];
                }
            }
            return $arInfo;
        } else {
            return $users;
        }
    }

    public function getUserName(): string
    {
        $userInfo = $this->getUserInfo();
        $userLogins = $userInfo['login'];
        $userNames = $userInfo['userName'];
        $lkey = array_search($this->login, $userInfo['login']);

        return $userInfo['userName'][$lkey];
    }

    public function create(): void
    {
        $users = $this->getUsers();
        $userInfo = $this->getUserInfo();

        $userLogins = $userInfo['login'];
        $userEmails = $userInfo['email'];

        $preparedUser = new \Core\User\Validation($this->login, $this->password, $this->passconfirm, $this->email, $this->userName);
        $readyUserArr = $preparedUser->prepareForCreate($userLogins, $userEmails);
        $users[] = $readyUserArr;

        file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/assets/js/database.json', json_encode($users));
        
        return;
    }

    public function read(): bool
    {
        $userInfo = $this->getUserInfo();

        $userLogins = $userInfo['login'];
        $userPasswords = $userInfo['password'];

        $preparedUser = new \Core\User\Validation($this->login, $this->password);
        
        return $preparedUser->prepareForRead($userLogins, $userPasswords);
    }
}
