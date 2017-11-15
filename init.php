<?php

header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache"); 
header('Content-Type: text/html; charset=UTF-8');

ini_set('session.use_trans_sid', 0);
ini_set('session.use_only_cookies', 1);

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

@define('PROJECT_DIR', $_SERVER['DOCUMENT_ROOT'] . '/localhost/diez-sixzero.com/');
@define('LOCALE_DIR', PROJECT_DIR .'/locale');
@define('DEFAULT_LOCALE', "fr_FR");

if(!isset($_COOKIE['locale'])) {
	$_COOKIE['locale'] = "fr_FR";
	setcookie("locale", "fr_FR", time()+31536000);
}

include "gettext0.php";

?>