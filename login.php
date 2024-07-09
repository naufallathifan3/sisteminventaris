<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hardcoded username and password
    $admin_username = "admin";
    $admin_password = "admin";

    if ($username == $admin_username && $password == $admin_password) {
        $_SESSION['admin'] = $username;
        header("Location: index.html");
        exit();
    } else {
        echo "Invalid username or password.";
    }
}
?>
