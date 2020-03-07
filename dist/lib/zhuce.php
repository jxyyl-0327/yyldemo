<?php
    header("Content-type: text/html; charset=utf-8");
        $username = $_POST['username'];
        $password = $_POST['password'];
        $repassword = $_POST['repassword'];
        $telphone = $_POST['telphone'];
        if ($username == ''){
            // echo '<script>alert("请输入用户名！");history.go(-1);</script>';
            echo "请输入用户名";
            exit(0);
        }
        if ($password == ''){
            echo "请输入密码";
            exit(0);
        }
        if ($password != $repassword){
            // echo '<script>alert("密码与确认密码应该一致");history.go(-1);</script>';
            echo "密码不一致";
            exit(0);
        }
        if($password == $repassword){
            $conn = new mysqli('localhost','root','root','test');
            if ($conn->connect_error){
                echo '数据库连接失败！';
                exit(0);
            }else {
                $sql = "select username from `login` where username = '$_POST[username]'";
                $result = $conn->query($sql);
                $number = mysqli_num_rows($result);
                if ($number) {
                    // echo '<script>alert("用户名已经存在");history.go(-1);</script>';
                    echo "用户名已经存在";
                } else {
                    $sql_insert = "insert into `login` (username,password) values('$_POST[username]','$_POST[password]')";
                    $res_insert = $conn->query($sql_insert);
                    if ($res_insert) {
                        // echo '<script>window.location="index.html";</script>';
                    } else {
                        echo "<script>alert('系统繁忙，请稍候！');</script>";
                    }
                }
            }
        }else{
            echo "<script>alert('提交未成功！'); history.go(-1);</script>";
        }
?>