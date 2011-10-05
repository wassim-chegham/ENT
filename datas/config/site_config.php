<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
|--------------------------------------------------------------------------
| Base Site URL
|--------------------------------------------------------------------------
|
| URL to your CodeIgniter root. Typically this will be your base URL,
| WITH a trailing slash:
|
|	http://example.com/
|
*/
$config['base_url']	= "http://ent.cheghamwassim.com";

/*
|--------------------------------------------------------------------------
| Index File
|--------------------------------------------------------------------------
|
| Typically this will be your index.php file, unless you've renamed it to
| something else. If you are using mod_rewrite to remove the page set this
| variable so that it is blank.
|
*/
$config['index_page'] = "";

/*
|--------------------------------------------------------------------------
| website title
|--------------------------------------------------------------------------
|
*/
$config['app_title'] = "ENT - Espace Num&eacute;rique de Travail";

/*
|--------------------------------------------------------------------------
| working space
|--------------------------------------------------------------------------
|
*/
//$_SESSION['WD'] = 'public'; // working dir inside the worspace, without trailling 
$config['workspace'] = "workspace/".( isset($_SESSION['WD'])?$_SESSION['WD']:'public' ); // without trailling 

/*
|--------------------------------------------------------------------------
| bin to stock removed files (instead of completely deleting them)
|--------------------------------------------------------------------------
|
*/
$config['bin'] = "workspace/bin"; // without trailling 

/*
|--------------------------------------------------------------------------
| cache dir to stock the highlighted source code
|--------------------------------------------------------------------------
|
*/
$config['cache'] = "workspace/cache"; // without trailling 

/*
|--------------------------------------------------------------------------
| bugs file to store reported bugs
|--------------------------------------------------------------------------
|
*/
$config['bug_file'] = "workspace/bugs/bugs.txt"; // without trailling 


/*
|--------------------------------------------------------------------------
| cache dir to stock the highlighted source code
|--------------------------------------------------------------------------
|
*/
$config['cache_time'] = 60*60; // in seconds 

/*
|--------------------------------------------------------------------------
| website description
|--------------------------------------------------------------------------
|
*/
$config['app_description'] = "";

/*
|--------------------------------------------------------------------------
| Google API key for Google Maps and Google translation
|--------------------------------------------------------------------------
|
*/
$config['google_API_key'] = "";

/* End of file site_config.php */
/* Location: ./system/application/config/site_config.php */
