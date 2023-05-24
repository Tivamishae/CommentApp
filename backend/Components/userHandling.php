<?php

include 'userHandlingPreparations.php';
include './Components/session.php';

function checkIfLoginRequestValid($db, $loginVariable, $password) {
    if (retrieveUserInformationEmail($db, $loginVariable) == false) {
        if (retrieveUserInformationUsername($db, $loginVariable) == false) {
            echo "This account does not seem to exist.";
        }
        else {
            if (checkPassword(retrieveUserInformationUsername($db, $loginVariable), $password)) {
                $user = retrieveUserInformationUsername($db, $loginVariable);
                $username = $user['Username'];
                $userID = $user['id'];
                $userEmail = $user['Email'];
                startSessionFunction($username, $userID, $userEmail);
            } else {
                echo "Password is incorrect";
            }
        }
    } else {
        if (checkPassword(retrieveUserInformationEmail($db, $loginVariable), $password)) {
            $user = retrieveUserInformationEmail($db, $loginVariable);
            $username = $user['Username'];
            $userID = $user['id'];
            $userEmail = $user['Email'];
            startSessionFunction($username, $userID, $userEmail);
        } else {
            echo "Password is incorrect";
        }
    }
}

function insertUser($db, $username, $password, $email) {
    if (!checkIfDBContainsEmail($db, $email) && !checkIfDBContainsUsername($db, $username) && verifyAttemptCreateAccount($username, $email, $password)) {
        $hashedpassword = makeSaltHash($password);
        $prepIns = $db->prepare("INSERT INTO Users(Username, Password, Email) VALUES(:username, :password, :email)");
        $prepIns->bindParam(':username', $username);
        $prepIns->bindParam(':password', $hashedpassword);
        $prepIns->bindParam(':email', $email);
        $prepIns->execute();
        echo "Succesful account creation";
    }
    else {
    }
}

function changeUsername($db, $username, $newUsername) {
    if(!checkIfDBContainsUsername($db, $newUsername)) {
        $changePass = $db->prepare("UPDATE Users SET Username = :newUsername WHERE Username = :username");
        $changePass->bindParam('username', $username);
        $changePass->bindParam(':newUsername', $newUsername);
        $changePass->execute();
        echo "Username has been updated";
    }
}

function changeEmail($db, $username, $newEmail) {
    if (!checkIfDBContainsEmail($db, $newEmail)) {
        $changeEmail = $db->prepare("UPDATE Users SET Email = :newEmail WHERE Username = :username");
        $changeEmail->bindParam('username', $username);
        $changeEmail->bindParam(':newEmail', $newEmail);
        $changeEmail->execute();
        echo "Email has been updated";
    }
}

function changePassword($db, $username, $newPassword) {
    $newPasswordHashed = makeSaltHash($newPassword);
    $changePassword = $db->prepare("UPDATE Users SET Password = :newPassword WHERE Username = :username");
    $changePassword->bindParam('username', $username);
    $changePassword->bindParam(':newPassword', $newPasswordHashed);
    $changePassword->execute();
    echo "Password has been updated";
}

function checkUserExistance($db, $username) {

    $result = $db->query("SELECT * FROM Users WHERE username = '$username'");

    if ($result->fetchArray(SQLITE3_ASSOC)) {
        echo "The value '$username' was found in the table.";
    } else {
        echo "The value '$username' was not found in the table.";
    }

}