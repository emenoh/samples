<?php
ini_set('display_errors', 1);
set_include_path(PATH_SEPARATOR . '/usr/local/apache2/htdocs/classes/Fossil/1.0'
                .PATH_SEPARATOR . '/usr/local/apache2/htdocs/classes/Zend/1.11.0'
                .PATH_SEPARATOR . get_include_path());
                              
require_once 'Zend/Loader/Autoloader.php';
$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->registerNamespace(array(
  // namespaces
  'Fossil'
));


$frontendOptions = array(
   'lifetime' => 86400,                   // cache lifetime of 1 day
   'automatic_serialization' => false  // this is the default anyways
);

$backendOptions = array('cache_dir' => '/tmp');
$cache = Zend_Cache::factory('Output',
                             'File',
                             $frontendOptions,
                             $backendOptions);

$catalog = $_REQUEST['catalog'];
if (isset($_REQUEST['callback'])) {
	$callback = $_REQUEST['callback'];
	$callbackParam = '&callback=' . $callback;
} else {
	$callback = '';
}

// set header to be json
if ($_REQUEST['req'] == 'json') {
  header('Content-type: application/json');
} else {
  header("Content-type: text/xml");
}

// we pass a unique identifier to the start() method
$identifier = $catalog . '_' . $_REQUEST['req'] . '_callback_' . $callback;
if(!$cache->start($identifier)) {
  $catalog = new Fossil_Catalog($catalog);
  $pages = $catalog->getPages($_REQUEST['req'], $callback);
  
  echo $pages;
  
  $cache->end(); // the output is saved and sent to the browser
}