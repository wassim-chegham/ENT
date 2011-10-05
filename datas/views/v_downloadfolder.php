<?php 
$workspace = $this->config->item('workspace');
$cache_dir = $this->config->item('cache')."/";
$folder = $this->input->post('folder');
$path = $workspace.$folder;

if (file_exists($path))
{
	/*
	$arr = explode('/', str_replace($workspace.'/', '', $folder) );
	$this->zip->read_dir($path);
	$this->zip->download( 'ENT'.implode('-', $arr) );
	$this->zip->clear_data();
	*/
	
	$arr = explode('/', str_replace($workspace.'/', '', $folder) );
	function filter($var){
		return $var != '';
	}
	$arr = array_filter($arr, "filter");
	
	$name = 'ENT-'.implode('-', $arr);
	$cmd = "cd ".$path." && zip ".$name." -r * && cd - && mv ".$path.$name.".zip ".$cache_dir;
	
	if ( shell_exec($cmd) ) // execute command to zip folder
	{
		$data = file_get_contents($cache_dir.'/'.$name.'.zip'); // Read the file's contents
		force_download($name.'.zip', $data);
	}
	else {
		echo "Ooops! Try later.\ndebug: ".$cmd;
	}
}
else {
	echo "File doesnot exist!";
}

?>
