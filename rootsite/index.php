<?php
session_start();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="imagini/logo.ico">
    <title>Calendar PHP</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/final.css">
    <link rel="stylesheet" href="css/log-in.css">
    <link rel="stylesheet" href="css/basic.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@500&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Metrophobic&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Rosario:ital,wght@1,300&display=swap" rel="stylesheet">

</head>

<body>
    <!--COD CU PHP
    <div id="divrandom"></div>
    <button id="butontest">Click me!</button>-->
    <?php
    if (isset($_GET["error"])) {
        if ($_GET["error"] == "none") {
            echo '<div class="signup-succes flex" id="signup-removable-div">
            <div class="flex sign-up-close" id="signup-confirmation-x">X</div>
                            You have signed up, you can log in now!
                        </div>';
        }
    }
    ?>
    <div class="sign-up-pop-up-parent flex">
        <div class="sign-up-pop-up">
            <div class="flex sign-up-close">
                X
            </div>
            <div class="signup-case" style="display: none;">
                <div class="form-parent">
                    <form action="includes/signup.inc.php" method="POST">
                        <input type="text" name="name" placeholder="Full name">
                        <br>
                        <input type="text" name="email" placeholder="E-mail">
                        <br>
                        <input type="text" name="uid" placeholder="Username">
                        <br>
                        <input type="password" name="pwd" placeholder="Password">
                        <br>
                        <input type="password" name="pwdrepeat" placeholder="Repeat password">
                        <div class="flex">
                            <button type="submit" name="submit" class="btn blue-btn">Sign up</button>
                        </div>
                    </form>
                </div>
                <div class="change-login-div">
                    Already have an account? <span id="change-to-log-in">Log in</span>
                </div>
                <?php
                if (isset($_GET["error"])) {
                    if ($_GET["error"] == "emptyinputsign") {
                        echo '<div class="error flex">
                        <img src="imagini/error.png">
                        <p> <span>Eroare:</span> Fill in all fields!</p>
                    </div>';
                    } else if ($_GET["error"] == "invalidUid") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Choose a proper username!</p>
                        </div>';
                    } else if ($_GET["error"] == "invalidemail") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Choose a proper email!</p>
                        </div>';
                    } else if ($_GET["error"] == "passwordsdontmatch") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Passwords do not match!</p>
                        </div>';
                    } else if ($_GET["error"] == "stmtfailed") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Something went wrong, please try again!</p>
                        </div>';
                    } else if ($_GET["error"] == "usernametaken") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Username already taken!</p>
                        </div>';
                    }
                }
                ?>
            </div>
            <div class="login-case">
                <div class="form-parent">
                    <form action="includes/login.inc.php" method="POST">
                        <input type="text" name="uid" placeholder="Username/Email">
                        <br>
                        <input type="password" name="pwd" placeholder="Password">
                        <div class="flex">
                            <button type="submit" name="submit" class="btn blue-btn">Log in</button>
                        </div>
                    </form>
                </div>
                <div class="change-login-div">
                    Don't have an account? <span id="change-to-sign-up">Sign up</span>
                </div>
                <?php
                if (isset($_GET["error"])) {
                    if ($_GET["error"] == "emptyinputlog") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Fill in all fields!</p>
                        </div>';
                    } else if ($_GET["error"] == "wronglogin") {
                        echo '<div class="error flex">
                            <img src="imagini/error.png">
                            <p> <span>Eroare:</span> Incorrect username/password!</p>
                        </div>';
                    }
                }
                ?>
            </div>
        </div>
    </div>
    <div class="plus-date-pop-up-parent flex">
        <div class="plus-date-pop-up">
            <div class="pop-up-close flex">
                X
            </div>
            <div class="error flex none" id="error-1">
                <img src="imagini/error.png">
                <p> <span>Eroare:</span> Ați introdus o dată invalidă!</p>
            </div>
            <div class="error flex none" id="error-2">
                <img src="imagini/error.png">
                <p> <span>Eroare:</span> Nu ați introdus nicio notiță!</p>
            </div>
            <div class="pop-up-header">
                <p class="pop-up-title">
                    Go to...
                </p>
                <div class="pop-up-input-parent flex">
                    <div class="pop-up-input-child">
                        <p>Day</p>
                        <form action="">
                            <select name="day" id="form-select-day">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </form>
                    </div>
                    <div class="pop-up-input-child">
                        <p>Month</p>
                        <form action="">
                            <select name="month" id="form-select-month">
                                <option value="1">Ianuarie</option>
                                <option value="2">Februarie</option>
                                <option value="3">Martie</option>
                                <option value="4">Aprilie</option>
                                <option value="5">Mai</option>
                                <option value="6">Iunie</option>
                                <option value="7">Iulie</option>
                                <option value="8">August</option>
                                <option value="9">Sepetembrie</option>
                                <option value="10">Octombrie</option>
                                <option value="11">Noiembrie</option>
                                <option value="12">Decembrie</option>
                            </select>
                        </form>
                    </div>
                    <div class="pop-up-input-child">
                        <p>Year</p>
                        <form action="">
                            <select name="year" id="form-select-year"></select>
                        </form>
                    </div>
                </div>
            </div>
            <div class="pop-up-main flex">
                <textarea placeholder="Adăugați o activitate..."></textarea>
            </div>
            <div class="pop-up-submit-parent flex">
                <div class="pop-up-submit">Submit</div>
            </div>
        </div>
    </div>
    <div class="main">
        <header>
            <div id="help-for-hover">
                <div id="header">
                    <div><img src="imagini/logo.png" id="header-logo"></div>
                    <?php
                    if (isset($_SESSION["useruid"])) {
                        echo '<div class="header-name flex">' . $_SESSION["useruid"] . '</div>
                     <button class="btn blue-btn" id="log-out-button" onclick="location.href=`includes/logout.inc.php`;">Log out</button>';
                    } else {
                        echo '<div class="header-name flex">Neconectat</div>
                        <button class="btn blue-btn" id="log-in-button">Log in</button>';
                    }
                    ?>
                    <!--<div class="header-name flex">Neconectat</div>
                    <button class="sign-in" id="log-in-button">Log in</button>-->
                </div>
                <div id="extend-header">&#8657;</div>
            </div>
        </header>

        <div id="content">
            <div class="calendar-parent flex">
                <div class="calendar inline-div">
                    <div id="error-keyboard-input" style="display: none;">
                        Eroare, introdu o dată validă!
                    </div>
                    <div class="keyboard flex" title="Toggle keyboard input">
                        <img src="imagini/keyboard.png">
                    </div>
                    <div class="calendar-left inline-div">
                        <div class="calendar-events">
                            <div class="note-selected-date">

                            </div>
                            <div class="events-container">
                                <?php
                                if (isset($_SESSION["useruid"])) {
                                ?>
                                    <div class="input">
                                        <span class="flex">+</span>
                                        <input type="text" placeholder="Adăugați o activitate" id="input" name="submitednote">
                                        <button id="input-button">Adaugă</button>
                                    </div>
                                    <div class="for-scroll">
                                        <div class="submited-events-container">

                                        </div>
                                    </div><?php
                                        } else { ?>
                                    <p id="login-to-insert-notes" style="color: white;"> You need to log in to insert notes. </p>
                                <?php  }
                                ?>
                            </div>
                        </div>
                        <div class="calendar-triangle">
                        </div>
                    </div>
                    <div class="calendar-right">
                        <div class="right-up">
                            <div class="calendar-arrows inline-div">
                                <div class="left prev">
                                    &#11164;
                                </div>
                                <div class="right next">
                                    &#11166;
                                </div>
                            </div>
                            <div class="calendar-month-and-year flex">
                                <div class="month-and-year-border">
                                    <div class="month-and-year-final flex">
                                        <div class="month">
                                        </div>
                                        <div class="year">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="calendar-table">
                            <div class="weekdays flex">
                                <div class="day-name"> L </div>
                                <div class="day-name"> M </div>
                                <div class="day-name"> Mi </div>
                                <div class="day-name"> J </div>
                                <div class="day-name"> V </div>
                                <div class="day-name"> S </div>
                                <div class="day-name"> D</div>
                            </div>
                            <div class="days flex">

                            </div>
                        </div>

                        <div class="calendar-copyright flex">
                            <?php
                            if (isset($_SESSION["useruid"])) {
                                echo '<img src="imagini/plus.png" title="Add note">';
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="javascript/jquery-initialise.js"></script>
    <script src="javascript/jquery.js"></script>
    <script src="javascript/index.js"></script>
    <script src="javascript/log-in.js"></script>
    <script src="javascript/errors.js"></script>
    <script src="javascript/ajax.js"></script>


</body>

</html>