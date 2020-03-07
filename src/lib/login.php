<?php

$uname = $_POST['username'];
$upas = $_POST['password'];

$link = mysqli_connect('localhost','root','root'.'test');
$sql = "SELECT * FROM `login` WHERE `username` = '$uname' AND `password` = '$upas'";
$res = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
mysqli_close($link);


$arr = array(
    "message" => "登录成功",
    "username" => $uname,
    "code" => 1
);
if ($row){
    
}



?>