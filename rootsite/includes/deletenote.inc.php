<?php

require_once 'dbh.inc.php';
session_start();

$commentId = $_POST['AJAXCommentIdDelete'];


$sql = "DELETE FROM notes WHERE commentId = '$commentId'";
if ($conn->query($sql) !== TRUE) {
    echo "Error deleting record: " . $conn->error;
} else { // add back remaining notes 
$userId = $_SESSION['userid'];
$SelectedDate = $_POST['AJAXDateTransferDelete'];

$SelectedDateFormated = new DateTime($SelectedDate[2] . '-' . $SelectedDate[1] . '-' . $SelectedDate[0]);
$SelectedDateFormated =  $SelectedDateFormated->format('Y-m-d');

$SQLNotes = "SELECT * FROM notes 
            WHERE userId = '$userId' AND 
                  commentDate = '$SelectedDateFormated'
            ORDER BY commentId DESC";

$result = mysqli_query($conn, $SQLNotes);


if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo '<div class="note">';
        echo $row["commentText"];
        echo '<img src="imagini/trash.png" class="trash" id=' .  $row["commentId"] . '>';
        echo '</div>';
    }
}
}