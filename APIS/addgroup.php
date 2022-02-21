<?php 

$con=mysqli_connect("localhost","memo_messenger","memo2022","memo_chat") or die("Couldn't connect'");
$mydata=array();
if(isset($_POST['user_id']) 
 && isset($_POST['users_id']) )
 {
    $d=date("YmdHis");
    $image=isset($_POST['image'])?$_POST['image']:'';
    $name=isset($_POST['name'])?$_POST['name']:'';


    $imagename='';
    if($image != '')
{
    $imagename=$name.$_POST['user_id'].$d.".jpg";
    $decodedimage=base64_decode("$image");
    $fullpath="http://192.168.1.9:8080/yawar_chat/uploads/groups/";

    file_put_contents("../uploads/groups/$imagename",$decodedimage);
}
$q1=mysqli_query($con,"insert into groups(name,image,owner)
values(
    '".$name."',
    '".$imagename."',
    '".$_POST['user_id']."'
)");


if(isset($q1))
{
    $id=mysqli_insert_id($con);
           
    $mygroup=mysqli_query($con,"select * from groups where id='$id'");
   $gr= mysqli_fetch_array($mygroup);
   $mydata['group']=$gr;

   $others=json_decode($_POST['users_id']);
   foreach($others as $user)
   {
    $q2=mysqli_query($con,"insert into group_user(group_id,user_id)
    values(
        '".$id."',
        '".$user."'
    )");
   }
   $users=array();
   $q3=mysqli_query($con,"select * from group_user where group_id='$id'");
   $alluser=mysqli_fetch_array($q3);
   foreach($alluser as $p)
   {
$users[]=$p;
   }

   $mydata['users']=$users;
}

$data=[
    "message"=>"all data ",
    "status"=>200
    
];
echo (json_encode($data));
 }

 else{
    $data=[
        "message"=>"all data required",
        "status"=>404
    ];
    echo (json_encode($data));
 }

?>







<!DOCTYPE html>
<html>
<head>
	<title>Yawar</title>
	<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/all.css"/>
<!--Floating WhatsApp css-->




<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet"> 





<link rel="stylesheet" href="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/floating-wpp.min.css">
<!--Floating WhatsApp javascript-->
	  <meta charset="utf-8">
	  <meta  lang="en">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="author" content="CitizenShips">
  <meta name="description" content=" What are you waiting for? Join us and Get new citizenships fast,easy and very safly">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:locale" content="en_US">
<meta property="og:type" content="website">
<meta property="og:title" content="What are you waiting for?">
<meta property="og:description" content="Join us and Get new citizenships fast,easy and very safly">
<meta property="og:url" content="https://www.citizenships.ae/">
<meta property="og:site_name" content="citizenships">

<meta name="keywords" content="dominica passport visa free countries,
dominica visa free countries,
visa free countries for dominica,
st kitts passport visa free countries,
st kitts and nevis passport visa free countries list,
st kitts and nevis passport visa free countries,
commonwealth dominica passport,
dominica commonwealth passport,
st kitts visa free countries,
visa requierments for dominica citizens,
st kitts and nevis citizenship benefits,
saint kitts and nevis passport visa free countries,
dominica visa free,
dominica citizenship program,
saudi arabia dual citizenships,
invest citizenship,
dominica citizenship,
citizen by invest program,
citizen by investment program,
citizenship by investment program,
citizenship by invest dominica,
dominica citizenship by invest,
business caribbean,
businesses in the caribbean,
passport by investment,
golden visa,
second citizenship,
business immigration consultant,
passport application consultant,
work permits consultant,
child immigration consultant,
family immigration consultant,
visa consultant,
citizenship/naturalization consultant,
global immigration consultant,
immigration appeal consultant,
second citizenship by investment,
second citizenship programs,
immigration consultants,
citizenship by investment,
investment immigration,
citizenship by investment program." />

<style type="text/css">

  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100&display=swap');

	html {
  scroll-behavior: smooth;
}

	*{
		margin: 0;
		padding: 0;
	}


	body{
		margin-right: 0;
		margin-left: 0;
		margin-top: 0;
		margin-bottom: 0;
    font-family: 'Open Sans', sans-serif;
	}

	.top-bar{
		width: 100%;
		  background-color:rgba(39,54,80,0.8);
		height: 40px;
		padding: 3px;
		color: #F5D227;
		
		
		z-index: 99;
		

	}
	.social1{
		float: left;
		padding: 5px;
		list-style-type: none;
	}
.social1 li {
		float: left;
		margin-right: 8px;
	}
	.social{
		float: right;
		padding: 5px;
		list-style-type: none;
	}
	.social li {
		float: left;
		margin-right: 8px;
	}

	.mynav{
		background-color:rgba(39,54,80,0.4);
		width: 100%;
		

	
	}

	.mynav nav{
		width: 100%;
	}
.a:hover{
	color: red;
}
.x:hover{
	background-color: rgb(214,155,37);


}

.x:focus{
	background-color: rgb(214,155,37);
}

.about{
	width: 100%;
	height: 300px;
	margin-top: 10px;
	display: block;
}


.image-container {
    position: relative;
    width: 100%;
    
}
.image-container .after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
   background-color:rgba(10,54,108,0.8);
    color: #FFF;
}

.c{
	box-shadow: 0px 0px 3px 3px #cecece;
}
.c:hover{
	box-shadow: 0px 0px 4px 4px #D69B25;
	margin-top: -5px;
	transition: .4s ease;
}

.img-thumbnail{
	width: 190px;
	height: 140px;
}

.vv{
	background-color:rgba(255,255,255,0.8);border-radius: 10px;padding: 10px;height: 190px;word-wrap: break-word;border:1px solid #F5D227; overflow: hidden;
	width: 31%;
	margin-right: 5px;
}

@media only screen and (max-width: 600px) {

  .vx .row div:nth-child(1){
		
  	width: 100%;
  	margin-bottom: 200px;
}



  .vx .row div:nth-child(1):hover{
		
  	width: 100%;
  	margin-bottom: 200px;
  	padding: 10px;
  	margin-top: -10px;
  	margin-left: 5px;
  
  	transition: 0.6s ease;

}



  .vx div:nth-child(2){
		
  	width: 100%;
  	margin-bottom: 200px;
}


 .vx div:nth-child(2):hover{
		
  width: 100%;
  	margin-bottom: 200px;
  	padding: 2px;
  	margin-top: -10px;
  	margin-left: 5px;
  	box-shadow: 0px 0px 2px 5px #ccc;
  	transition: 0.6s ease;
}
.vx div:nth-child(3){
		
  	width: 100%;
  	margin-bottom: 200px;
}


 .vx div:nth-child(3):hover{
		
  	width: 100%;
  	margin-bottom: 200px;
  	padding: 2px;
  	margin-top: -10px;
  	margin-left: 5px;
  	box-shadow: 0px 0px 2px 5px #ccc;
  	transition: 0.6s ease;
}

.about{
	margin-top: 380px;
}

 
}


#mypage{
	width: 100%;
	padding: 0px;
}


#myBtn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 199;
  font-size: 18px;
  border: none;
  outline: dotted;
  background-color:rgba(108,113,131,0.7);
  color: white;
  cursor: pointer;
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  text-align: center;
}

#myBtn:hover {
  background-color: rgba(0,0,0,0.8);
}




@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;500&display=swap');


.sp{
  position: fixed;
  top: 30px;
  right: 0px;
  background-color: rgba(10,54,108,0.9);
  border:1px solid gold;
  color: white;

padding:10px;
  border-radius: 10px;
  z-index:99;
  display: none;

}

.sp:hover{
    position: fixed;
  top: 30px;
  right: 0px;
  background-color: rgba(10,54,108,0.9);
  border:1px solid gold;
  color: white;

padding:14px;
  border-radius: 10px;
  z-index:99;
  transition: 0.2s ease;
}

.sidenav {
  height: 100%; /* 100% Full-height */
  width: 0px; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 100; /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  color: gold;
  background-color: rgba(10,54,108,0.9); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px;
   /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */


/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

</style>

</head>
<body>
	<div id="mypage">


<div class="container-fluid top-bar" >
		<span style="margin-left: 10px"> <i style="color:#F5D227;font-size: 16px; " class=" fab fa-whatsapp"></i>+964 751 786 3790</span> | <span style="margin-left: 10px"> <i style="color:#F5D227;font-size: 16px; " class=" fa fa-phone"></i>+964 751 786 3790</span>

		<ul class="social">

			<li><a href="https://www.facebook.com/Citizenships-104622184526249"><i style="color:#F5D227;font-size: 16px; " class=" fab fa-facebook"></i></a></li>
			<li><a href="https://www.twitter.com/Citizenshipsae"><i style="color:#F5D227;font-size: 16px; " class=" fab fa-twitter"></i></a></li>
			
			<li><a href="https://www.instagram.com/Citizenships.ae"><i style="color:#F5D227;font-size: 16px; " class=" fab fa-instagram"></i></a></li>
		</ul>
		
	</div>











 <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
 <ul class="navbar-nav mr-auto">
      <li class="nav-item active x" >
        <a class="nav-link a" style="color: #F5D227; font-size: 17px; margin-left: 30px;" href="index.php">Home <span class="sr-only">(current)</span></a>
      </li>
  
      <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227;margin-left: 30px; font-size: 17px;" href="#pro">Programs</a>
      </li>
        <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227;margin-left: 30px; font-size: 17px;" href="#about">About Us</a>
      </li>
        <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227;margin-left: 30px; font-size: 17px;" href="#part">Partner</a>
      </li>

        <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227;margin-left: 30px; font-size: 17px;" href="#test">Testimonials</a>
      </li>
      <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227;margin-left: 30px; font-size: 17px;" href="blog.php">Blog</a>
      </li>

      <li>   <a class=" nav-item x " style="color: #F5D227;margin-left: 0px; font-size: 17px;" href="#book">Book Consultation</a>
</li>

<li>         <a class=" nav-item x " style="color: #F5D227;margin-left: 0px; font-size: 17px;" href="#contact">Contact Us</a>
</li>
    </ul>

</div>

<!-- Use any element to open the sidenav -->
<span id="sp" onclick="openNav()" class="sp">Menu</span>











<div style="background-color: #080F2C; height: 600px; ">
<div style="background-color:rgba(10,54,108,0.4);width: 100%;height: 600px; ">
	<div class="mynav">
	<nav class="navbar navbar-expand-lg navbar-light " id="navbar">
  <a class="navbar-brand text-uppercase" id="nn" href="#" style="color: #F5D227; font-size: 23px;" >  CitizenShips</a>
  <button style="border-color: #E7E7E8;" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" ></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active x" >
        <a class="nav-link a" style="color: #F5D227; font-size: 17px;" href="index.php">Home <span class="sr-only">(current)</span></a>
      </li>
  
      <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227; font-size: 17px;" href="#pro">Programs</a>
      </li>
        <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227; font-size: 17px;" href="#about">About Us</a>
      </li>
        <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227; font-size: 17px;" href="#part">Partner</a>
      </li>

        <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227; font-size: 17px;" href="#test">Testimonials</a>
      </li>
      <li class="nav-item x">
        <a class="nav-link a" style="color: #F5D227; font-size: 17px;" href="blog.php">Blog</a>
      </li>
    </ul>
    <a class="btn btn-outline-warning my-2 my-sm-0 mr-2" href="#book">Book Consultation</a>
         <a class="btn btn-outline-warning my-2 my-sm-0" href="#contact">Contact Us</a>

  </div>
</nav>
</div>

<div style="height:160px;"></div>

<!-- <div class="row" style="width: 100%">
	<div class="col-md-2"></div>
	<div class="col-md-8">
		<div style="background-color: rgba(255,255,255,0.0);" id="carouselExampleCaptions" class="carousel slide carousel-fade" data-ride="carousel">

  <div class="carousel-inner" >
    <div class="carousel-item active">
      
     <div class="text-center" >
       <img class="img-responsive" alt="citizenships logo" src="images/logo1.png" style="max-width: 440px;max-height: 330px;">
       <br>
       
        <br>
        <br>
        <br>
      </div>
    </div>
    
  </div>
  
</div>
	</div>
	<div class="col-md-2"></div>
</div>
 -->
  <div class="col-12 text-center" style=" margin: 0px auto;z-index: 0">
     <h1 style="color: #F5D227;font-size: 90px;font-family: cursive;">Y A W A R  <span style="font-size: 21px;color: #e6Ac47">.CO</span></h1>
     <h4 style="font-family: 'Roboto Mono', monospace;color: #FFDF42; text-transform: capitalize;">best choise to Make You App <span style="font-size: 35px;" class="fa fa-mobile"></span> </h4>

     <h5 class="text-center"><hr style="width: 160px;border-color: #F5D227;margin: 8px  auto"></h5>
          <h5 class="text-center"><hr style="width: 160px;border-color: #F5D227;margin: 1px  auto"></h5>

  </div>

</div>
<!-- background-color:rgba(108,113,131,0.8); -->
</div>




<div style="height: 50px;"></div>
<div>
<div class="container vx" style="height: 150px;margin-top: 0px;margin-bottom: 20px;position: relative;display: block;">

	<div class="row">

			<div class="  vv  mb-3">
			<div style=" ">
				<i class="fa fa-book" style="color: #F5D227;font-size: 35px;"></i><br>
				<h3>Our Mision</h3>
				<p>Our mission is to achieve the best electronic applications with the best designs and modern technologies</p>

			</div>
		</div>
		<!-- sttart first item -->
		
		<!-- end first item -->
		<!-- sttart first item -->
	
		<!-- end first item -->


		<!-- sttart first item -->
		<div class="  vv mb-3">
			<div style=" ">
				<i class="fa fa-edit" style="color: #F5D227;font-size: 35px;"></i><br>
				<h3>Our Vision</h3>
				<p>Is To Create the best global applications and becoming a global company with our distinctive products and various services</p>

			</div>
		</div>
		<!-- end first item -->

		<div class=" vv mb-3">
			<div style=" ">
				<i class="fa fa-flag" style="color:#F5D227;font-size: 35px;"></i><br>
				<h3>Our Value</h3>
				<p>Set Us Apart from others operating in the same space. the standards by which we operate are based on the interests of our clients</p>

			</div>
		</div>
	</div>

</div>




<div style="height: 120px;"></div>

<div  class=" container-fluid about" id="about" style="background-image: url('images/about-bg.png');background-size: cover;background-repeat: no-repeat;">
	<br>

	<h1 class="text-center text-uppercase" style="color: #21537C;font-size: 30px;font-weight: bold;">About Us</h1>
<div class="container" >
	<div class="row">
	<div class="col-md-6">
			<p class="text-justify" style="font-size: 22px;">Our work aims to help customers get the best electronic applications (websites - smart phone applications - artificial intelligence systems - automation systems - systems analysis) with the best designs and the strongest possible performance, depending on the latest technologies used around the world
	</div>
	<div class="col-md-6">
			<p class="text-justify" style="font-size: 22px;">We are YAWAR Information Technology Company located in Iraq, we always aim to meet the desire of customers and manufacture their requirements in an ideal manner and appropriate to their standards
</p>
	</div>

	
</div>
</div>
</div>
<div style="height: 132px;"></div>
<div style="margin: 10px auto;height: 40px;text-align: center;">
	<a style=" font-weight: bold;" href="#contact" class="btn btn-outline-primary btn-lg">Contact  Us</a>
</div>


</div>

<div style="height: 100px;"></div>
<h1 class="text-center " style="color: #21537C;font-size: 30px;font-weight: bold;font-style: italic;"> Partners </h1>


<br>
<div class="container" id="part">
	<p class="text-justify " style="font-size: 20px;">We are always looking for ways to build relationships and partnerships with other businesses across the globe. If your clientele consists of high net worth individuals with a constant need to Make APPs for business , we can help you expand your offering to include All type of application . If you think we might be a good fit, please email us at <span style="color:#21537C;font-weight: bold; ">info@Yawar.com</span></p>
	<br>
	<div id="gallery" style="height: 200px;width: 100%" class="carousel slide" data-ride="carousel">

<ol class="carousel-indicators">
          <li style="color: red;background-color: #21537C" data-target="#gallery" data-slide-to="0" class="active"></li>
        
         
        </ol>


    <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="row">
                <div class="col" style="">
                    <img alt="partner image" class="img-fluid img-thumbnail" src="images/part.png" />
                </div>

                <div class="col">
                    <img alt="partner image"  class="img-fluid img-thumbnail" src="images/part.png" />
                </div>

                <div class="col">
                    <img alt="partner image"  class="img-fluid img-thumbnail" src="images/part.png"/>
                </div>

                <div class="col">
                    <img alt="partner image"  class="img-fluid img-thumbnail" src="images/part.png" alt="Image 4"/>
                </div>

             
            </div>
        </div>

       
    </div>

    
</div>
</div>

<div style="height: 134px;"></div>
<div class="container">
	
	<h1 class="text-center text-uppercase" id="pro" style="color: #21537C;font-weight: bold;font-size: 30px;">Programs</h1>
	<br>




<!-- <div id="demo" class="carousel slide" data-ride="carousel">

  <div class="carousel-inner" style="box-shadow: 0px 0px 16px 16px #cecece;background-color: rgb(255,255,255);padding: 12px;border-radius: 9px;border:1px solid gold">
    <div class="carousel-item active text-center" >
 
     	<img src="images/dom.png" style="width: 300px;height: 200px;">
     	<h1>Commonwealth of Dominica</h1>
     	<p class="text-justify">Dominica, island country of the Lesser Antilles in the eastern Caribbean Sea. It lies between the French islands of Guadeloupe and Marie-Galante to the north and Martinique to the south. Dominica has been nicknamed the "Nature Isle of the Caribbean" for its natural environment, and known for its luscious vegetation, stunning national parks and beautiful white sandy beaches, making it the epitome of a tropical paradise</p>
   
    </div>
   




<div class="carousel-item text-center" >
   
     	<img src="images/st.png" style="width: 300px;height: 200px;">
     	<h1>Saint Kitts and Nevis</h1>
     	<p class="text-justify">Saint Kitts and Nevis, 



 officially known as the Federation of Saint Christopher and Nevis is an island country in the West Indies. Located in the Leeward Islands chain of the Lesser Antilles, it is the smallest sovereign state in the Western Hemisphere, in both area and population.[1] The country is a Commonwealth realm, with Elizabeth II as Queen and head of state.It is the only federation in the Caribbean.
</p>
  
    </div>


  </div>


  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>

</div> -->


</div>




<!-- <div style="height: 300px;background-image: url('images/1.jpg');background-repeat: no-repeat;background-size: cover;">
	
</div> -->
<div style="height: 80px;"></div>
<div class="image-container" id="book">
    <img alt="book consultation image hero-bg" src="images/hero-bg.jpg" style="width: 100%;height: 340px;" />
    <div class="after">
    	<div class="container">
    		<div style="height: 80px;"></div>
    		<div class="row">
    			<div class="col-md-9">
    				<h2  class="text-warning">Book a Free Consultation</h2>
    				<p class="text-justify" style="font-size: 18px;">Set us apart from others operating in the same space. The standards by which we operate are based on the interests of our clients. They enable us to deliver what our brand promises.</p></div>
    			<div class="col-md-3">
    				<br>
    				<a  href="book.php" class="btn btn-outline-warning btn-lg btn-block" style="border-radius: 10px;">Book Now  </a>
    			</div>
    		</div>
    	</div>
    </div>
</div>


	<div style="height: 100px;"></div>
<h1 class="text-center " id="pr" style="color: #21537C;font-size: 30px;font-weight: bold;">Our Programs </h1>



<div style="height: 10px;" id="test"></div>
<div style="background-image: url('images/544.jpg');background-size: cover;background-attachment: fixed;background-repeat: no-repeat;">
	
<div style="width: 100%;  background-color:rgba(10,54,108,0.7);padding: 30px " >
		<div class="container-fluid">
			
		<div class="row">

			<div class="col-md-1"></div>
			<div class="col-md-10 col-sm-12" >
				<h1 class="text-center text-white" ><sup><i class="fa fa-quote-left text-warning"></i></sup> Testimonials</h1>






<div id="gallery" style="height: 180px;width: 100%" class="carousel slide" data-ride="carousel">




    <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="row text-center" style="padding: 10px;">
                <div class="col ml-2" style="background-color: rgba(200,200,200,0.5);border:1px solid gold;border-radius: 10px;padding: 10px;font-size: 18px;">
                   <span style="font-size: 20px;font-weight: bold;color: gold" >Fadi </span>
								
							
					<p class="text-justify text-dark text-center" style="font-size: 18px;"> Thanks For Greate service </p>
                </div>




                <div class="col ml-2 mr-2" style="background-color: rgba(200,200,200,0.5);border:1px solid gold;border-radius: 10px;padding: 10px;font-size: 18px;">
                  <span style="font-size: 20px;font-weight: bold;color: gold">Nadia</span>
								
							
							<p class="text-justify text-dark text-center" style="font-size: 18px;"> this company is the best </p>
                </div>

           


             
            </div>
        </div>

        <div class="carousel-item ">
            <div class="row text-center">
          
               

                <div class="col ml-4 mb-3" style="background-color: rgba(200,200,200,0.5);border:1px solid gold;border-radius: 10px;padding: 10px;font-size: 18px;">
                  <span style="font-size: 20px;font-weight: bold;color: gold">jony</span>
									
								
								<p class="text-justify text-dark text-center"style="font-size: 18px;" > the best service in the best company </p>
                </div>

                <div class="col ml-2 mr-4 mb-3" style="background-color: rgba(200,200,200,0.5);border:1px solid gold;border-radius: 10px;padding: 10px;font-size: 18px;">
                  <span style="font-size: 20px;font-weight: bold;color: gold">Adam </span>
								
							
							<p class="text-justify text-dark text-center" style="font-size: 18px;"> thansk..happy to work with your company </p>
                </div>

             
            </div>
        </div>

       
    </div>








				</div>
				
			
			</div>

			<div class="col-md-1"></div>
			
		</div>
	</div>
</div>
</div>




<div style="background-image: url('images/contact-bg.png');background-repeat: no-repeat;" id="contact">
	<div style="height: 40px"></div>
<div class="container">
	<h1 class="text-center" style="color: #21537C">Contact Us</h1>
	<div class="row">
		<div class="col-md-6">
			<i class="fa fa-map-marker-alt" style="font-size: 20px;color:#21537C "></i>
			<span style="font-size: 24px;color:#21537C;letter-spacing: 1px; ">&nbsp; IRAQ -ERBIL</span>
			<hr>

			<i class="fa fa-envelope" style="font-size: 20px;color:#21537C "></i> 
			<span style="font-size: 24px;color:#21537C;letter-spacing: 1px; ">&nbsp; info@yawar.ae</span>
			<hr>

				<i class="fa fa-phone" style="font-size: 20px;color:#21537C "></i> 
			<span style="font-size: 24px;color:#21537C;letter-spacing: 1px; ">&nbsp; +964 751 786 3790</span>
			<hr>


				<i class="fab fa-facebook" style="font-size: 20px;color:#21537C "></i> 
			<span style="font-size: 24px;color:#21537C;letter-spacing: 1px; "> <a style="color:#21537C " href="https://www.facebook.com/Citizenships-104622184526249" target="blank">&nbsp; YAWAR </a></span>
			<hr>
		</div>
		<div class="col-md-6">
			<form action="index.php" method="post">
						
						
			 <input type="text" placeholder="Your name  " class="form-control" name="n"><br>


			 <input type="text" placeholder="Email : email@example.com " class="form-control" name="e"><br>
		
			 <input type="text" placeholder="Subject of Message " class="form-control" name="s"><br>
					  <textarea class="form-control" name="msg" placeholder="your message "></textarea><br>

					  <input type="submit" name="btn" class="btn btn-primary" value="Send Message">

			</form>
		</div>
	</div>
</div>
</div>
<div style="height: 20px;"></div>

	<div style="width: 100%;height: 500px;">
    			<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d51534.364683628606!2d44.007813024267556!3d36.16904168878411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2siq!4v1639048179745!5m2!1sar!2siq" width="600" height="450" style="border:0;width: 100%;height: 100%;" allowfullscreen=""  loading="lazy"></iframe>
    			</div>







<div style="height: 0px;"></div>
<div style="background-image: url('images/544.jpg');background-size: cover;background-attachment: fixed;background-repeat: no-repeat;">
	
<div style="width: 100%;  background-color:rgba(10,54,108,0.7);" >
		<div class="container-fluid" style="padding-bottom:8px;">
    		<div style="height: 30px;"></div>
    		<div class="row">
    			
    			<div class="col-md-3 col-sm-12">
    				<h3 style="color: white;">Navigation</h3>
            <ul style="list-style-type: none;">
  <li ><i class="fa fa-angle-double-right text-warning"></i>
   <a style="color: white" class=" " href="index.php"> Home</a> </li>
  <li><i class="fa fa-angle-double-right text-warning"></i> <a href=""><a style="color: white;" href="index.php#about"> About Us</a></a></li>
  <li><i class="fa fa-angle-double-right text-warning"></i> <a style="color: white;" href="book.php"> Book Consultation</a></li>
  <li><i class="fa fa-angle-double-right text-warning"></i><a style="color: white;" href="index.php#pro"> Our Programs</a></li>
  <li><i class="fa fa-angle-double-right text-warning"></i>
    <a style="color: white;" href="index.php#contact"> Contact Us</a></li>

</ul>
    			</div>

    			<div class="col-md-3 col-sm-12" style="height: 240px;">
    								<h3 class="text-white">Programs</h3>
    				<ul style="list-style-type: none;">
	<li style="color: white;"><i class="fa fa-angle-double-right text-warning"></i> Bazar Iraq</li>
	<li style="color: white;"><i class="fa fa-angle-double-right text-warning"></i>Memo Chat</li>

</ul>
    			</div>

    		
    			<div class="col-md-3 col-sm-12" style="height: 240px;">
    						<h3 class="text-white">Contact Us </h3>
    				<p class="text-justify text-white">
    				
    				</p>
    				

    				<span><a href="#"  style="color: white"><i style="color:#D69B25;font-size: 20px; " class=" fa fa-phone"></i> +964 751 786 3790</a></span><br><br>

            <span style="color: white"> <i style="color:#D69B25;font-size: 20px; " class=" fab fa-whatsapp"></i> +964 751 786 3790</span><br>
            <br>

    					<span><a href="#"  style="color: white"><i style="color:#D69B25;font-size: 20px; " class=" fab fa-whatsapp"></i> +964 751 786 3790</a></span><br><br>
    					

    					<span style="color: white"> <i style="color:#D69B25;font-size: 20px; " class=" fa fa-envelope"></i> info@yawar.com</span>
    					<br>
    					<br>
    				
    						
    			</div>
    			

    			<div class="col-md-3 col-sm-12">
    				<ul class="social1">
    					<h3 class="text-white">Follow Us</h3>
			<li><a href="https://www.facebook.com/Citizenships-104622184526249" style="color: white"><i style="color:#D69B25;font-size: 28px; " class=" fab fa-facebook"></i>  info@yawar.com</a></li><br>
			<li><a href="https://www.twitter.com/Citizenshipsae"  style="color: white"><i style="color:#D69B25;font-size: 28px; " class=" fab fa-twitter"></i> info@yawar.com</a></li><br>
			
			<li><a href="https://www.instagram.com/Citizenships.ae"  style="color: white"><i style="color:#D69B25;font-size: 28px; " class=" fab fa-instagram"></i> Yawar</a></li><br>
			
	
		</ul>
    			</div>
    		
    		</div>
    	</div>
    </div>
</div>

<div style="height: 40px;background-color:#10305a;padding-top: 6px; ">
	<p class="text-center text-warning">All Right Reserved To CitizenShips <i class="fa fa-heart"></i> 2021</p>

</div>

 <div id="WAButton"></div>

<button onclick="topFunction()" id="myBtn" title="Go to top"><i class="fa fa-angle-double-up"></i></button>

 </div>

<script src="js/jquery.js"></script>
<script src="js/bootstrap.js"></script>
<script src="js/all.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>

<!--Floating WhatsApp javascript-->
<script type="text/javascript" src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/floating-wpp.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.js"></script>
<script type="text/javascript">
	$(function() {
  $('#WAButton').floatingWhatsApp({
    phone: '009647517863790', //WhatsApp Business phone number International format-
    //Get it with Toky at https://toky.co/en/features/whatsapp.
    headerTitle: 'Chat with us on WhatsApp!', //Popup Title
    popupMessage: 'Hello, how can we help you?', //Popup Message
    showPopup: true, //Enables popup display
    buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', //Button Image
    //headerColor: 'crimson', //Custom header color
    //backgroundColor: 'crimson', //Custom background button color
    position: "left"    
  });
});



	$(document).ready(function(){
		$("#bb").click(function(){
			$("#xx").slideToggle(1000);
		});
	});
</script>

<script>
//Get the button
var mybutton = document.getElementById("myBtn");
var sp = document.getElementById("sp");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
     sp.style.display = "block";
      document.getElementById("navbar").style.height = "auto";
    document.getElementById("logo").style.height = "69px";
     document.getElementById("logo").style.width = "95px";
     document.getElementById("nn").style.fontSize = "20px";
  } else {
    sp.style.display = "none";
  document.getElementById("navbar").style.height = "auto";

   document.getElementById("logo").style.height = "100px";
     document.getElementById("logo").style.width = "150px";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
} 
</script>


</body>
</html>


<?php
include'conn.php';

$name=isset($_POST['n'])?$_POST['n']:'';

$email=isset($_POST['e'])?$_POST['e']:'';
$sub=isset($_POST['s'])?$_POST['s']:'';
$msg=isset($_POST['msg'])?$_POST['msg']:'';
$dt=date("Y-m-d");
if(isset($_POST['btn']))
{
$to = "tech1@bacttraining.com,tr5@bacttraining.com,tr6@bacttraining.com,info@bacttraining.com";
$subject =$sub;
$txt = $msg;
$headers = "From:". $email . "\r\n" .
"CC: tr5@bacttraining.com";

mail($to,$subject,$txt,$headers);


$r=mysqli_query($con,"insert into msg(name,email,subject,message,dt)
  values('$name','$email','$sub','$msg','$dt')");


if(isset($r))
{
echo '<script type="text/javascript">toastr.success("Send Successfully <br> thanks for communication");</script>';

}
else{
  echo '<script type="text/javascript">toastr.error("Send failed...try again");</script>';

}
}

ob_end_flush();

?>

