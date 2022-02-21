<?php 

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");

if(isset($_POST['id']))
{

    $id=$_POST['id'];
    $st=isset($_POST['status'])?$_POST['status']:'';
    $email=isset($_POST['email'])?$_POST['email']:'';
    $first_name=isset($_POST['first_name'])?$_POST['first_name']:'';
    $last_name=isset($_POST['last_name'])?$_POST['last_name']:'';
    $is_active=1;
    $is_reported=0;
    $is_blocked=0;
    $createdat=date("Y-m-d H:i:s");
    $updatedat=date("Y-m-d H:i:s");
   $d=date("YmdHis");
   $image='';
   if(isset($_POST['picture']))
    $image=$_POST['picture'];

    $imagename='';
    if($image != '')
{
    $imagename=$id.$d.".jpg";
    $decodedimage=base64_decode("$image");
    $fullpath="http://192.168.1.11:8080/yawar_chat/uploads/profile/";

    file_put_contents("../uploads/profile/$imagename",$decodedimage);
}
  
else{
    $user1=mysqli_query($con,"select * from users where id='$id'");
    $udata1= mysqli_fetch_array($user1);

    $imagename=$udata1['profile_image'];
}

    $res=mysqli_query($con,"update users
     set email='$email',first_name='$first_name',
     last_name='$last_name',
     profile_image='$imagename',status='$st' where id='$id'
    ");

    


        if($res==true)
        {
            
            
            $user=mysqli_query($con,"select * from users where id='$id'");
           $udata= mysqli_fetch_array($user);

            $data=[
                "message"=>"update data successfully" ,
                "status"=>200,
                "data"=>$udata
            ];
            header('Content-Type: application/json');
           echo(json_encode($data)) ;
        }
        else{
            $data=[
                "message"=>"failed to update data ",
                "status"=>404,
                "data"=>[]
            ];
            echo (json_encode($data, JSON_PRETTY_PRINT));
        }
 
}
else{
    $data=[
        "message"=>"id  is required",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($data, JSON_PRETTY_PRINT));
}
exit();
?>