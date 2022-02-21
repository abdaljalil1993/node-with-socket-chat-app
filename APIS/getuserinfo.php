<?php 

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");
$result=array();
if(isset($_POST['id']))
{
    


    $data=$_POST['id'];
    
    

       $result=array();

       $q=array();
      $x=mysqli_query($con,"select * from users where id='$data'");
      if(mysqli_num_rows($x)>0)
      {
          $row=mysqli_fetch_array($x);
          $result=$row;
        
         $res=[
            "message"=>"user info  retrived successfully ",
            "status"=>200,  
            "data"=>$result
        ];
       
      }

      else{
        $res=[
            "message"=>"no data for this id",
            "status"=>200,  
            "data"=>[]
        ];
      }

   
       
   

  
   

    echo (json_encode($res));
}
else{
    $res=[
        "message"=>"id is required ",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($res));
}

?>