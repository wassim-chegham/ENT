<?php 
define('CACHE_FILE_TYPE', 'txt');
$file = $this->config->item('workspace').$this->input->post('file');
$mode = $this->input->post('mode');

$ext = end(explode('.', $file));
$images = $this->config->item('images_type');
$binaries = $this->config->item('binaries_type');
$viewable_media = $this->config->item('media_type');
$json = array('fileContent'=>'', 'fileType'=>$ext, 'fileStatus'=>'');


if (array_key_exists(strtolower($ext), $images))
{
	$imgInfos = getimagesize($file);
	
    $json['fileContent'] = '<img class="images" src="'.$file.'" alt="" title="" rel="{w:'.$imgInfos[0].',h:'.$imgInfos[1].'}"/>';
}
else if (array_key_exists($ext, $binaries))
{
    $json['fileContent'] = '<span class="binary-download-help" />';
}
else if (array_key_exists($ext, $viewable_media))
{
    $json['fileContent'] = '<a href="'.$file.'" title="" class="media" />';
}
else
{
    $cached_file = $this->config->item('cache').'/'.basename($file).'.'.CACHE_FILE_TYPE;
    $cache_time = $this->config->item('cache_time');
    
    // if the file exists in the cache dir, just read it 
    if (file_exists($cached_file) && (time() - $cache_time) <= filemtime($cached_file))
    {
        $json['fileContent'] = file_get_contents($cached_file);
    } 
    // if not, proceed highlighting 
    else
    {
        $source = utf8_encode(file_get_contents($file));
        //$source = file_get_contents($file);
        $language = end(explode('.', $file));
        // 
        // Include the GeSHi library 
        // 
        require_once '../../../tools/php/geshi/v1.0.8.4/geshi.php';
        $geshi = new GeSHi($source, $language);
        
        // 
        // Configure the GeSHi library 
        // 
        $geshi->enable_line_numbers(GESHI_FANCY_LINE_NUMBERS, 2);
        $geshi->set_line_style('background-color: #f8f8f8;', 'background: white;');
        // 
        // Highlight the source code 
        // 

        $code = $geshi->parse_code();
				$json['fileContent'] = $code;
        //var_dump($code);
        //exit();
				
        $highlighted_time = $geshi->get_time();
        $cached_time = date('d/m/Y G:i:s', time());
        // 
        // Get some usefull infos 
        // 
        $json['fileStatus'] = array('parsingTime'=>$highlighted_time, 'cachingTime'=>$cached_time);
        
        // 
        // Cache the new file for later use 
        // 
        $content = json_encode($json);
        if ( $content != null ) file_put_contents($cached_file, $content);

    }
    
}

// show content
if ($mode == 'print')
{
	$content = json_decode($json['fileContent'], true);
	
    echo '<!DOCTYPE html>
			<html>
				<head>
					<title>Impression de : '.$file.'</title>
					<style charset="utf-8">
					body {height:99%;width:99%}
					pre{font-size:11px;}
					img{padding:4px; border:1px solid #eee}
					</style>
				</head>
				
				<body>
					'.$content.'
				</body>
			</html>';
}
else
{
    header('Content-Type: application/json, charset=utf-8');

		//var_dump($json['fileContent']);
		//exit();
		echo json_encode($json);
}

?>
