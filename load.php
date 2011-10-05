<?php
	
	/**
	 * This file loads javascript files or CSS files.
	 */
	
	$js = $_GET['js'];
	
	// js files
	$js_libs = array(
				'jq'	=>	'jquery',				
				'pr'	=>	'proto', 
				'sc'	=>	'scripta', 
				'yu'	=>	'yui');
				
	$js_addons = array(
				'ft'	=>	array(
								'require'	=> 'jquery', 
								'path'		=> 'plugins/fileTree.js',
								'desc'		=> 'load the file tree script'
							),
				'hl'	=>	array(
								'require' 	=> 'jquery',
								'path' 		=> 'plugins/highlighter.js',
								'desc' 		=> ''
							),
				'ui'	=> array(
								'require' 	=> 'jquery',
								'path' 		=> 'ui/ui.core.js',
								'desc' 		=> 'load the jquery UI core'
							),
				'rz'	=> array(
								'require' 	=> 'jquery',
								'path' 		=> 'ui/ui.resizable.js',
								'desc' 		=> 'load the jquery UI resizable script'
							),
				'dr' 	=> array(
								'require' 	=> 'jquery',
								'path' 		=> 'ui/ui.draggable.js',
								'desc' 		=> ''
							),
				'di' 	=> array(
								'require' 	=> 'jquery',
								'path' 		=> 'ui/ui.dialog.js',
								'desc' 		=> ''
							)
				);
	$js_files = explode(',', $js);
	$output = '';

	foreach($js_files as $file)
	{
		if ( array_key_exists($file, $js_libs) )
		{
			$file_name = '../../../tools/js/frameworks/'.$js_libs[$file].'/'.$js_libs[$file].'.js';
			$output .= "\n" . file_get_contents($file_name);
		}
		else if ( array_key_exists($file, $js_addons))
		{
			$file_name = '../../../tools/js/frameworks/'.$js_addons[$file]['require'].'/'.$js_addons[$file]['path'];
			$output .= "\n" . file_get_contents($file_name);
		}
	}
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// css files
	$css = $_GET['css'];
	$css_files = explode(',', $css);
	$css_array = array(
					'ft' => './css/workspace.css',
					'cs' => './css/custom.css',
					'ui' => '../../../tools/js/frameworks/jquery/ui/css/ui-lightness/jquery-ui-1.7.2.custom.css'
 				);
	foreach($css_files as $file)
	{
		if ( array_key_exists($file, $css_array))
		{
			$file_name = $css_array[$file];
			$output .= "\n" . file_get_contents($file_name, false);
		}
	}
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// output
	if ( !empty($output))
	{
		if ( isset($js) )
		{
			header("Content-type: text/javascript; charset: UTF-8");
		}
		else if ( isset($css)){
			header("Content-type: text/css; charset: UTF-8");
		}

		echo $output;
	}
	else
	{
		echo 'please choose a valid Javascript/CSS library';
	}

?>