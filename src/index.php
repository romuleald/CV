<?php
$lang = substr( $_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2 );
$page;
switch ( $lang ) {
	case "fr":
		$page = "./index-FR.html";
		break;
	case "en":
		$page = "./index-EN.html";
		break;
	default:
		$page = "./index-FR.html";
		break;
}
header( "Location: " . $page, true, 301 );
?>
