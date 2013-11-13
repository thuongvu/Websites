<?php
include('news.php'); 
$news = new GoogleNews(); 
$news->setSearchQuery('Phillipines OR Yolanda OR Haiayn OR typhoon');
$news->setNumberOfNews('4');
echo $news->getNews();
?>