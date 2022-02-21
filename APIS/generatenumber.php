<?php 
$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");

$i=1;
while($i<51)
{
    $num=random_int(1000000000,2000000000);
    $r=mysqli_query($con,"select * from secretnumbers where sn='$num'");
    if(mysqli_num_rows($r)>0)
    {

    }
    else{
        $r1=mysqli_query($con,"insert into secretnumbers (sn) values('$num')");
        $i++;
    }
}




?>