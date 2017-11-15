<?php

//error_reporting(E_ALL | E_STRICT);

function getXmlObjFromXpath($xpath, $xmlRessource) {
    $xmlObj = $xmlRessource->xpath($xpath);
    if ($xmlObj) {
        $xmlObj = $xmlObj[0];
        return $xmlObj;
    }
    return FALSE;
}

// define constants
@define('PROJECT_DIR', realpath($_SERVER['DOCUMENT_ROOT'].'/'));
@define('LOCALE_DIR', PROJECT_DIR .'/locale');
@define('DEFAULT_LOCALE', 'fr_FR');

require_once($_SERVER['DOCUMENT_ROOT'] . '/gettext.inc');

$supported_locales = array('en_US', 'fr_FR');
$encoding = 'UTF-8';

if(isset($_COOKIE["locale"])) $locale = $_COOKIE["locale"];
if(@!$locale) $locale = getLanguage(DEFAULT_LOCALE);

// gettext setup
T_setlocale(LC_MESSAGES, $locale);
// Set the text domain as 'messages'
$domain = 'messages';
T_bindtextdomain($domain, LOCALE_DIR);
// bind_textdomain_codeset is supported only in PHP 4.2.0+
//if (function_exists('bind_textdomain_codeset')) 
 T_bind_textdomain_codeset($domain, $encoding);
T_textdomain($domain);

?>
