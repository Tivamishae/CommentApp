<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$db = new PDO('sqlite:CommentApp_DB.db');

include './Components/commentHandling.php';
include './Components/userHandling.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode (file_get_contents('php://input'));
    $type = $data->type;

    switch ($type) {
        case 'loginRequest':
            $loginVariable = $data->loginVariable;
            $password = $data->password;
            checkIfLoginRequestValid($db, $loginVariable, $password);
            break;

        case 'logoutRequest':
            endSession();
            break;

        case 'insertComment':
            $comment = $data->value;
            $date = $data->date;
            $userID = $data->id;
            insertComment($db, $comment, $date, $userID);
            break;

        case 'createAccount':
            $username = $data->username;
            $email = $data->email;
            $password = $data->password;
            insertUser($db, $username, $password, $email);
            break;

        case 'changeUserUsername':
            $oldUsername = $data->oldUsername;
            $newUsername = $data->newUsername;
            changeUsername($db, $oldUsername, $newUsername);
            break;

        case 'changeUserEmail':
            $username = $data->username;
            $newEmail = $data->newEmail;
            changeEmail($db, $username, $newEmail);
            break;

        case 'changeUserPassword':
            $username = $data->username;
            $newPassword = $data->newPassword;
            changePassword($db, $username, $newPassword);
            break;

        case 'retrieveUserSpecificComments':
            $userID = $data->userID;
            retrieveUserSpecificComments($db, $userID);
            break;

    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo returnComments($db);

}