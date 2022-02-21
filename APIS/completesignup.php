<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");

if(isset($_POST['id']) && isset($_POST['sn']))
{

    $id=$_POST['id'];
    $sn=$_POST['sn'];
    $email=isset($_POST['email'])?$_POST['email']:'';
    $first_name=isset($_POST['first_name'])?$_POST['first_name']:'';
    $last_name=isset($_POST['last_name'])?$_POST['last_name']:'';
    $is_active=1;
    $is_reported=0;
    $is_blocked=0;
    $createdat=date("Y-m-d H:i:s");
    $updatedat=date("Y-m-d H:i:s");
   $d=date("YmdHis");
    $image=isset($_POST['picture'])?$_POST['picture']:'';

    $imagename='';
    if($image != '')
{
    $imagename=$sn.$d.".jpg";
    $decodedimage=base64_decode("$image");
    $fullpath="http://192.168.1.11:8080/yawar_chat/uploads/profile/";

    file_put_contents("../uploads/profile/$imagename",$decodedimage);
}
  

    $res=mysqli_query($con,"update users
     set email='$email',first_name='$first_name',
     last_name='$last_name',
     profile_image='$imagename',sn='$sn' where id='$id'
    ");

    $rr=mysqli_query($con,"update secretnumbers
    set state='1',user_id='$id' where sn='$sn'
   ");


        if($res==true)
        {
            ##get user data testtttttttttt
            $user=mysqli_query($con,"select * from users where id='$id'");
           $udata= mysqli_fetch_array($user);

            $data=[
                "message"=>"insert data successfully" ,
                "status"=>200,
                "data"=>$udata
            ];
            header('Content-Type: application/json');
           echo(json_encode($data)) ;
        }
        else{
            $data=[
                "message"=>"failed to insert data ",
                "status"=>404,
                "data"=>[]
            ];
            echo (json_encode($data, JSON_PRETTY_PRINT));
        }
 
}
else{
    $data=[
        "message"=>"id and secret number are required",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($data, JSON_PRETTY_PRINT));
}
exit();
?>