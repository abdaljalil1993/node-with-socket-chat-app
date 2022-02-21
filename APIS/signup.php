<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");
if(isset($_POST['phone']))
{

    $phone=$_POST['phone'];
    $email='';
    $first_name='';
    $last_name='';
    $is_active=1;
    $is_reported=0;
    $is_blocked=0;
    $createdat=date("Y-m-d H:i:s");
    $updatedat=date("Y-m-d H:i:s");
    $d=date("YmdHis");
   ## $image=isset($_POST['picture'])?$_POST['picture']:'';
    $imagename="";
    ##$decodedimage=base64_decode("$image");


$q1=mysqli_query($con,"select * from users where phone='$phone'");
if(mysqli_num_rows($q1) > 0)
{
$userdata=mysqli_fetch_array($q1);
$numbers=mysqli_query($con,"select * from secretnumbers where state='0' limit 50");
          
$allnumber=array();
while($num= mysqli_fetch_array($numbers))
{
    $allnumber[]=$num['sn'];
}


$data1=array();
$data1['user']=$userdata;
$data1['numbers']=$allnumber;



 $data=[
     "message"=>"retrive data successfully" ,
     "status"=>200,
     "data"=>$data1
     
 ];
 header('Content-Type: application/json');
echo(json_encode($data)) ;

}
else{
    $res=mysqli_query($con,"insert into users
    (phone,email,first_name,last_name,is_active,is_reported,is_blocked,profile_image,sn,status) 
   values ('".$phone."',
   '".$email."',
   '".$first_name."',
   '".$last_name."',
   '".$is_active."',
   '".$is_reported."',
   '".$is_blocked."',
 
   '".$imagename."',
   '',
   'hello im using memo')
   ");



       if($res==true)
       {
           $id=mysqli_insert_id($con);
           
           $user=mysqli_query($con,"select * from users where id='$id'");
          $udata= mysqli_fetch_array($user);

          $numbers=mysqli_query($con,"select * from secretnumbers where state='0' limit 50");
          
          $allnumber=array();
          while($num= mysqli_fetch_array($numbers))
          {
              $allnumber[]=$num['sn'];
          }


$data1=array();
$data1['user']=$udata;
$data1['numbers']=$allnumber;



           $data=[
               "message"=>"insert data successfully" ,
               "status"=>200,
               "data"=>$data1
               
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


    
 
}
else{
    $data=[
        "message"=>"phone   are required",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($data, JSON_PRETTY_PRINT));
}
exit();
?>