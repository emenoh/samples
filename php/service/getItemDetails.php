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

$sku = $_REQUEST['sku'];

// set header to be json
if ($_REQUEST['req'] == 'json') {
  header('Content-type: application/json');
} else {
  //header("Content-type: text/xml");
}

// we pass a unique identifier to the start() method
$identifier = $sku + '_' . $_REQUEST['req'];
if(!$cache->start($identifier)) {
  $catalog = new Fossil_Catalog();
  $items = $catalog->getItemDetails($sku);
  
  if ($_REQUEST['req'] == 'json') {
    echo json_encode($items);
  } else {
    /*  
    echo '<?xml version="1.0" encoding="utf-8" ?>';
    echo '<items>';
    foreach ($items as $item) {
      echo '<item>';
      foreach ($item as $key => $value) {
        
      }
      echo '</item>';
    }
    echo '</items>';
    */
  }
  
  $cache->end(); // the output is saved and sent to the browser
}