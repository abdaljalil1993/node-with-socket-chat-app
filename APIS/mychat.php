<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");

if(isset($_GET['user_id']))
{


    $user_id=$_GET['user_id'];
    $data=array();
    $archive=false;
    $allchat=mysqli_query($con,"select * from chat_room where (sender_id='$user_id' or reciver_id='$user_id')");
    $ch=mysqli_query($con,"select * from chat_room where (sender_id='$user_id' or reciver_id='$user_id') and (state=1)");  
   if(mysqli_num_rows($ch)>0)
   $archive=true;
    
   foreach($allchat as $chat)
    { 
      $chat['image']='';
                if($user_id==$chat['reciver_id'])
                {
                    $senderdata=mysqli_query($con,"select * from users where id='".$chat['sender_id']."'");
                    $row=  mysqli_fetch_array($senderdata);
                
                    $chat['image']=isset($row['profile_image'])?$row['profile_image']:'';
                    $chat['username']=isset($row['first_name'])?$row['first_name']:'';
                    
                    $chat['other_id']=isset($chat['sender_id'])?$chat['sender_id']:'';
                    $chat['user_token']=isset($row['user_token'])?$row['user_token']:'';
                    $ff=$chat['other_id'];
                    $notseenmessage=mysqli_query($con,"select * from messages where (reciver_id='$user_id' and sender_id='$ff') and (state='1' or state='2')");


                    if(mysqli_num_rows($notseenmessage)>0)
                    {
                     $chat['num_msg']=mysqli_num_rows($notseenmessage);
                    }
                    else{
                     $chat['num_msg']=0;
                    }
                    
                    
                
                }
                    else{
                        $senderdata1=mysqli_query($con,"select * from users where id='".$chat['reciver_id']."'");
                    $row11=  mysqli_fetch_array($senderdata1);
                    
                    $chat['image']=isset($row11['profile_image'])?$row11['profile_image']:'';
                        $chat['username']=isset($row11['first_name'])?$row11['first_name']:'';
                        $chat['other_id']=isset($chat['reciver_id'])?$chat['reciver_id']:'';
                        $chat['user_token']=isset($row11['user_token'])?$row11['user_token']:'';
                        $ff=$chat['other_id'];
                        $notseenmessage=mysqli_query($con,"select * from messages where (reciver_id='$user_id' and sender_id='$ff') and (state='1' or state='2')");


                        if(mysqli_num_rows($notseenmessage)>0)
                        {
                         $chat['num_msg']=mysqli_num_rows($notseenmessage);
                        }
                        else{
                         $chat['num_msg']=0;
                        }
                        

                            
                        }/* end of if */
        /* end of else */

        $lastmessage=mysqli_query($con,"select * from messages where (sender_id='".$chat['sender_id']."' and reciver_id='".$chat['reciver_id']."') or ( sender_id='".$chat['reciver_id']."' and reciver_id='".$chat['sender_id']."') order by id desc limit 1");
        if(mysqli_num_rows($lastmessage)>0)
       {
        $row1=  mysqli_fetch_array($lastmessage);

       
        $chat['last_message']=$row1['message'];
        $chat['created_at']=isset($row1['created_at'])?$row1['created_at']:'';
       }
       else{
        $chat['last_message']="";
       }
    
       
       
            $chat['archive']=$archive;
                $data[]=$chat;
 

    }
   
    $data1=[
        "message"=>"chat retrived successfully ",
        "status"=>200,  
        "data"=>$data
    ];

    echo (json_encode($data1));
}
else
{
    $data1=[
        "message"=>"no user id",
        "status"=>404,
        "data"=>[]
    ];
    echo (json_encode($data1));
}

?>