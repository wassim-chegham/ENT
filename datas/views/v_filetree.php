<?php 
$workspace = $this->config->item('workspace');
$dir = $this->input->post('d'); // directory
$onlyDirs = $this->input->post('f'); // show folders only

echo '<ul class="filetree" style="display: none;">';

if (file_exists($workspace.$dir))
{
    $files = scandir($workspace.$dir);
    natcasesort($files);
    
    if (count($files) > 2)
    { // The 2 accounts for . and .. 
    
        if ($onlyDirs == 'true' && $dir == '/')
        {
            foreach ($files as $file)
            {
            	$rel = ($file == '.') ? './' : htmlentities($dir.$file).'/';
				$text = ($file == '.') ? '/' : htmlentities($file);
				
                if (file_exists($workspace.$dir.$file) && $file == '.' && is_dir($workspace.$dir.$file))
                {
                    echo '<li class="directory collapsed"><a href="#" rel="address:'.$rel.'/" path="'.$rel.'" >'.$text.'</a></li>';
                } 
            } 
        } 
        else
        {
        
            // All dirs 
            foreach ($files as $file)
            {
            
                if (file_exists($workspace.$dir.$file) && $file != '..' && $file != '.' && is_dir($workspace.$dir.$file))
                {
                
                    echo '<li class="directory collapsed"><a href="#" rel="address:'.htmlentities($dir.$file).'/" path="'.htmlentities($dir.$file).'/" >'.htmlentities($file).'</a></li>';
                } 
            }
            
            
            // All files 
            if ($onlyDirs == 'false')
            {
                foreach ($files as $file)
                {
                    if (file_exists($workspace.$dir.$file) && $file != '.' && $file != '..' && !is_dir($workspace.$dir.$file))
                    {
                        $file_name = htmlentities($file);
                        $ext = end(explode('.', $file));
                        echo '<li class="file ext_'.strtolower($ext).'"><a href="#" rel="address:'.htmlentities($dir.$file).'/" path="'.htmlentities($dir.$file).'" title="'.$file_name.'" >'.$file_name.'</a></li>';
                    } 
                } 
            }
            
        }
        
        
    } 
}

echo '</ul>';

?>
