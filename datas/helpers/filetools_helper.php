<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('unzip'))
{
	function unzip($fileSource)
	{
		$ext = end(explode('.', $fileSource));
		$dest = str_replace(array('.'.$ext), array(''), $fileSource);
		shell_exec ("unzip -ou ".$fileSource." -d ".$dest." && rm ".$fileSource);
	}
}



/* End of file filetools_helper.php */
/* Location: ./system/application/helpers/filetools_helper.php */
