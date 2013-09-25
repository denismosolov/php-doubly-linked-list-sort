<?php

/**
 * @author denis
 */
// TODO: check include path
//ini_set('include_path', ini_get('include_path'));

define('TEST_PATH', __DIR__);
define('SOURCE_PATH', realpath(TEST_PATH . '/../prs0'));

// put your code here
function prs0_autoload($className)
{
    $className = ltrim($className, '\\');
    $fileName  = '';
    $namespace = '';
    $lastNsPos = strrpos($className, '\\');
    if ($lastNsPos) {
        $namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
    }
    $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';
    require_once $fileName;
}

spl_autoload_register('prs0_autoload');
set_include_path(get_include_path() . PATH_SEPARATOR . SOURCE_PATH);