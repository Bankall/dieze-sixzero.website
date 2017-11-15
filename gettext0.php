<?php

require_once(PROJECT_DIR . 'gettext.inc');

$supported_locales = array('en_US', 'fr_FR');
$encoding = 'UTF-8';
$locale = $_COOKIE["locale"];
if(@!$locale) $locale = DEFAULT_LOCALE;

// gettext setup
T_setlocale(LC_MESSAGES, $locale);

$domain = 'messages';
T_bindtextdomain($domain, LOCALE_DIR);
T_bind_textdomain_codeset($domain, $encoding);
T_textdomain($domain);


?>
