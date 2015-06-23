<?php
ini_set('display_errors', 1);
set_include_path(PATH_SEPARATOR . 'D:/inetpub/wwwroot/classes/Fossil/1.0'
                .PATH_SEPARATOR . 'D:/inetpub/wwwroot/classes/Zend/1.11.0'
                .PATH_SEPARATOR . get_include_path());
                              
require_once 'Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->registerNamespace(array(
// namespaces
  'Fossil'
));

$parsed_url = parse_url("http://www.fossil.com/en_US/shop/women/watches/boyfriend_watches/riley_white_silicone_multifunction_watch-es2344p.html?departmentCategoryId=30000&N=0&Va=254&Ns=p_wsc0|0||p_weight|0&rec=20&pn=c&imagePath=ES2344");
$start = strripos($parsed_url['path'], '/')+1;
$end = strripos($parsed_url['path'], '-');

$length = $end-$start;

$product = ucwords(
  str_replace('_', ' ', 
    substr($parsed_url['path'], strripos($parsed_url['path'], '/')+1, $length)
  )
);



Fossil_Debug::debug($product);