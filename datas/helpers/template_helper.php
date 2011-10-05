<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 
 /**
  * Template Engine Helper (inspired from Django's Template Inheritance)
	* http://www.djangoproject.com/documentation/templates/#template-inheritance
	*
	*/
	
	
$GLOBALS['EXTENDED_VIEW'] = '';


	/**
	 * Gather output from extended templates
	 *
	 * array('blockname' => 'blockContent', ...)
	 */
$GLOBALS['VIEW_DATA'] = array();
	
	
	
	/**
	* keep the name of the last marker
	*/
$GLOBALS['CURRENT_BLOCK'] = '';


	/**
	 * Called to extend some parts of the base template $view with content from this file
	 *
	 * @param string $view - filename of the base template
	 */
if ( ! function_exists('extends_view'))
{
	function extends_view($view)
	{
		$GLOBALS['EXTENDED_VIEW'] = $view;
	}
}


	/**
	 * End the extension process for this file. Needs to be called after all blocks
	 * have been set.
	 *
	 */
if ( ! function_exists('end_extend'))
{
	function end_extend()
	{
		$CI =& get_instance();
		$CI->load->view($GLOBALS['EXTENDED_VIEW']);
	}
}


	/**
	 * Start a top-level block. Its contents can be replaced from within child templates.
	 *
	 * @param string $blockname
	 */
if ( ! function_exists('mark_block'))
{
	function mark_block($blockname)
	{
		// remember block name for end_block_marker()
		$GLOBALS['CURRENT_BLOCK'] = $blockname;
		// start caching this blocks output
		ob_start();
	}
}


	/**
	 * End a top-level block. Its contents can be replaced from within child templates.
	 *
	 */
if ( ! function_exists('end_mark_block'))
{
	function end_mark_block()
	{
		if($GLOBALS['CURRENT_BLOCK'] != '')
		{
      // get block content
			$block_data = ob_get_clean();

      // check if we got data for this block from child templates
			if(! array_key_exists($GLOBALS['CURRENT_BLOCK'], $GLOBALS['VIEW_DATA']))
			{
				echo $block_data;
			}
			else
			{
				echo $GLOBALS['VIEW_DATA'][$GLOBALS['CURRENT_BLOCK']];
			}
				
			$GLOBALS['CURRENT_BLOCK'] = '';
		}
	}
}


	/**
	 * Mark the start of a block as content to be embedded into the base template.
	 *
	 * @param string $blockname
	 */
if ( ! function_exists('start_block'))
{
	function start_block($blockname)
	{
		// remember block name for endblock()
		$GLOBALS['CURRENT_BLOCK'] = $blockname;
		// start caching this blocks output
		ob_start();
	}
}


	/**
	 * Mark the end of a block as content to be embedded into the base template.
	 */
if ( ! function_exists('end_block'))
{
	function end_block()
	{
		
		if($GLOBALS['CURRENT_BLOCK'] != '')
		{

			// get block content
			$block_data = ob_get_clean();
			
			// save this blocks content for use in templates higher up in the hierarchy
			$GLOBALS['VIEW_DATA'][$GLOBALS['CURRENT_BLOCK']] = $block_data;
			$GLOBALS['CURRENT_BLOCK'] = '';
		}
	}
}

	/**
	 * Check if this block's contents will be needed.
	 * True if no child did override this block or a child needs this block's content
	 *
	 * @return bool
	 */
if ( ! function_exists('block_unused'))
{
	function block_not_used()
	{
		// check if no child did override this block
		if(array_key_exists($GLOBALS['CURRENT_BLOCK'], $GLOBALS['VIEW_DATA']))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}


/* End of file template_helper.php */
/* Location: ./system/application/helpers/template_helper.php */
