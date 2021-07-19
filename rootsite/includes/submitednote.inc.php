<?php

require_once 'dbh.inc.php'; // moved into includes - require_once 'includes/dbh.inc.php'; 
session_start();

$userId = $_SESSION['userid'];
$phpGlobalSelectedDate = $_POST['AJAXDateTransfer'];
$commentText = $_POST['AJAXNoteTransfer'];

$commentDate = new DateTime($phpGlobalSelectedDate[2] . '-' . $phpGlobalSelectedDate[1] . '-' . $phpGlobalSelectedDate[0]);
$commentDate =  $commentDate->format('Y-m-d');


$sql = "INSERT INTO notes (userId, commentDate, commentText) VALUES (?, ?, ?)";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $sql)) {
  header("location: ../index.php?error=stmtfailed");
  exit();
}
mysqli_stmt_bind_param($stmt, "iss", $userId, $commentDate, $commentText);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

//header("location: ../index.php?error=none");


//
// refresh notes (necessary due to the need to be able to delete the new notes without refreshing the page)
//

$userId = $_SESSION['userid'];
$SelectedDateFormated = new DateTime($phpGlobalSelectedDate[2] . '-' . $phpGlobalSelectedDate[1] . '-' . $phpGlobalSelectedDate[0]);
$SelectedDateFormated =  $SelectedDateFormated->format('Y-m-d');

$SQLNotes = "SELECT * FROM notes 
            WHERE userId = '$userId' AND 
                  commentDate = '$SelectedDateFormated'
            ORDER BY commentId DESC";

$result = mysqli_query($conn, $SQLNotes);


if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      echo '<div class="note">' . $row["commentText"] . '<img src="imagini/trash.png" class="trash" id=' .  $row["commentId"] . '> </div>';
      //echo $row["commentText"];
     // echo '<img src="imagini/trash.png" class="trash" id=' .  $row["commentId"] . '>';
      //echo '</div>';
    }
}

exit();