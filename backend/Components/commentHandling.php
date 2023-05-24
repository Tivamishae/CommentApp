<?php

function insertComment($db, $comment, $date, $userid) {
    $prepIns = $db->prepare("INSERT INTO Comments(Comment, Date, UserID) VALUES(:comment, :date, :userid)");
    $prepIns->bindParam(':comment', $comment);
    $prepIns->bindParam(':date', $date);
    $prepIns->bindParam(':userid', $userid);
    $prepIns->execute();

}

function returnComments($db) {
    $stmt = $db->prepare('SELECT * FROM Comments');
    $stmt->execute();
    $results = $stmt->fetchALL(PDO::FETCH_ASSOC);
    $response = json_encode($results);

    echo $response;
}

function retrieveUserSpecificComments($db, $userID) {
    $stmt = $db->query("SELECT * FROM Comments WHERE UserID = :userID");
    $stmt->bindParam(':userID', $userID);
    $stmt->execute();
    $results = $stmt->fetchALL(PDO::FETCH_ASSOC);
    $response = json_encode($results);

    echo $response;
}