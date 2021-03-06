<?php
	require("../init.php");
?>

{
	"projects_name" : [
		"smart_like", 
		"ibis", 
		"ripolin", 
		"lacoste", 
		"cymbeline", 
		"jti", 
		"free", 
		"cilgere", 
		"jacques_vabre", 
		"graphic_obession"
	],
	"projects" : {
		"smart_like" : {
			"tag" : ["mobile"],
			"description" : <?= T_('"Conception, création : logo,<br/>charte graphique,<br/>application<br/>mobile"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg",
				"03.jpg",
				"gotop",
				"04.jpg",
				"05.jpg",
				"gotop",
				"06.jpg",
				"07.jpg"
				]
		},
		"ibis" : {
			"tag" : ["desktop"],
			"description" : <?= T_('"Création pages, design<br/>éléments graphique"'); ?>,
			"content" : [
				"01.jpg",
				"gotop",
				"02.jpg"
				]
		},
		"ripolin" : {
			"tag" : ["mobile"],
			"description" : <?= T_('"Conception, création :<br/>application mobile"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg",
				"gotop",
				"03.jpg"
				]
		},
		"lacoste" : {
			"tag" : ["responsive"],
			"description" : <?= T_('"Habillage publicitaire<br/>(sites&vidéos)<br/>création look book"'); ?>,
			"content" : [
				{
					"placeholder" : "01.jpg",
					"video" : "Brune.flv"
				},
				{
					"placeholder" : "02.jpg",
					"video" : "Blonde.flv"
				},
				"03.jpg",
				"04.jpg",
				"gotop",
				"05.jpg",
				"gotop",
				"06.jpg"
				]
		},
		"cymbeline" : {
			"tag" : ["responsive"],
			"description" : <?= T_('"Conception et création :<br/>site web, site mobile"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg"
				]
		},
		"jti" : {
			"tag" : ["responsive"],
			"description" : <?= T_('"Création conception : logo JTI Media monitoring,<br/>et blog"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg",
				"gotop",
				"03.jpg"
				]
		},
		"free" : {
			"tag" : ["desktop"],
			"description" : <?= T_('"Proposition refonte : site, charte graphique,<br/>logo"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg",
				"03.jpg",
				"gotop",
				"04.jpg"
				]
		},
		"cilgere" : {
			"tag" : ["desktop"],
			"description" : <?= T_('"Conception et création :<br/>logo, site web, charte graphique"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg",
				"03.jpg",
				"gotop",
				"04.jpg",
				"gotop",
				"05.jpg"
				]
		},
		"jacques_vabre" : {
			"tag" : ["desktop"],
			"description" : <?= T_('"Création pages, design<br/>éléments graphique"'); ?>,
			"content" : [
				"01.jpg",
				"gotop",
				"02.jpg"
				]
		},
		"graphic_obession" : {
			"tag" : ["desktop"],
			"description" : <?= T_('"Proposition refonte : logo, charte graphique<br/>emailing GO"'); ?>,
			"content" : [
				"01.jpg",
				"02.jpg",
				"03.jpg",
				"gotop",
				"04.jpg",
				"05.jpg"
				]
		}
	}
}
