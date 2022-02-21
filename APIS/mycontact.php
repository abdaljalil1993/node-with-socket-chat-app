<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");
$result=array();
if(isset($_POST['data']))
{
    
$myid=$_POST['id'];


    $data=json_decode($_POST['data']);
    
    foreach($data as $user)
    { 
      
      $user->number=str_replace(" ","",$user->number);
       
      $x=mysqli_query($con,"select * from users where phone ='".$user->number."'");
      if(mysqli_num_rows($x)>0)
      {
          $row=mysqli_fetch_array($x);
        
        $user->image=$row['profile_image'];
        $user->state=true;
        $user->id=$row['id'];
        $user->user_token=$row['user_token'];

        $haschat=mysqli_query($con,"select * from chat_room where (sender_id ='".$user->id."' and  reciver_id='".$myid."') or (reciver_id='".$user->id."' and sender_id='".$myid."')");
        if(mysqli_num_rows($haschat)>0)
        {
          $row1=mysqli_fetch_array($haschat);
          $user->chat_id=$row1['id'];
        }
        else{
          $user->chat_id='';
        }
       
      }

      else{
     
        $user->image='';
        $user->state=false; 
        $user->id='';
        $user->chat_id='';
        $user->user_token='';
      
      }

      $result[]=$user;
       
    } 

  
    $res=[
        "message"=>"contact retrived successfully ",
        "status"=>200,  
        "data"=>$result
    ];

    echo (json_encode($res));
}
else{
    $res=[
        "message"=>"no contact",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($res));
}

?>