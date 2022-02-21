<?php 

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");
$result=array();
if(isset($_POST['sn']))
{
    


    $data=$_POST['sn'];
    if($data=='')
    $data=1;
    

       $result=array();

       $q=array();
      $x=mysqli_query($con,"select * from users where sn like '%".$data."%' or first_name like '%".$data."%' or last_name like '%".$data."%'");
      if(mysqli_num_rows($x)>0)
      {
         while( $row=mysqli_fetch_array($x))
         {
             $q['id']=$row['id'];
             $q['sn']=$row['sn'];
             $q['first_name']=$row['first_name'];
             $q['last_name']=$row['last_name'];
             $q['phone']=$row['phone'];
             $q['image']=$row['profile_image'];
             $q['token']=$row['user_token'];


             $result[]=$q;



         }
         $res=[
            "message"=>"search by secret number  retrived successfully ",
            "status"=>200,  
            "data"=>$result
        ];
       
      }

      else{
        $res=[
            "message"=>"search by secret number  retrived failed ",
            "status"=>200,  
            "data"=>[]
        ];
      }

   
       
   

  
   

    echo (json_encode($res));
}
else{
    $res=[
        "message"=>"no number recived",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($res));
}

?>