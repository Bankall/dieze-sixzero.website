<?
	require("init.php");
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		
		<title>SIXZERO - Johan Sophie</title>

		<meta name="description" content="" />
		<meta name="author" content="Christian Sulecki" />

		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="shortcut icon" href="favicon.png" />
		<link rel="apple-touch-icon" href="favicon.png" />

		<link rel="stylesheet" type="text/css" href="css/reset.css" />
		<link rel="stylesheet" type="text/css" href="css/main.css" />
		<link rel="stylesheet" type="text/css" href="css/main.tablet.css" />
		<link rel="stylesheet" type="text/css" href="css/main.mobile.css" />

		<script src="js/bootstrap.js"></script>
	</head>

	<body class="desktop">
		<div id="intro" class="">
			<div id="label"> </div>
		</div>
		<section id="main" class="transition-quick">
			<!--<a class="awards" href="http://www.bestcss.in/[project-url]" style="width:106px;height:92px;position:fixed;top:0px;left:0px;z-index:9;text-indent:-9999px;background: url(http://www.bestcss.in/ribbons/gray-left.png) no-repeat;" target="_blank">Best CSS Web Gallery</a>
			<a class="awards" href="http://www.csslight.com/[project-url]" title="CSS Light" style="width:84px;height:29px;position:fixed;top:130px;left:0px;z-index:9;text-indent:-9999px;background: url(http://www.csslight.com/ribbons/small-csslight-ribbon-left.png) no-repeat;" target="_blank">CSS Light Web Gallery</a>
			<div class="csswinner awards"><a href="http://csswinner.com/details/yoursitename" target="_blank">Dieze Sixzero</a></div>-->
			<div id="awwwards"><a href="http://www.awwwards.com/best-websites/dieze-sixzero" target="_blank"></a></div>
			<div id="onepagelove"><a href="http://onepagelove.com/sixzero" target="_blank"></a></div>
			<nav>
				<ul>
					<li class="item1">
						<div class="content">
							<div class="text three-line">
								<?= T_("Salut<br/> moi c'est <b>Johan</b><br/>et vous ?"); ?>
							</div>
						</div>
					</li>
					<li class="item2">
						<div class="content">
							<div class="text three-line">
								<?= T_("Je suis<br/><b>Directeur Artistique</b><br/>web à Paris"); ?>
							</div>
						</div>
					</li>
					<li class="item3">
						<div class="content">
							<div class="text">
								<?= T_("<b>Bienvenue</b> sur le<br/>portfolio sixzero"); ?>
							</div>
						</div>
					</li>
					<li class="item4">
						<div class="content">
							<div class="text">
								<?= T_("Mon age?<br/><b>04.10.1986</b> alors?!"); ?>
							</div>
						</div>
					</li>
					<li class="item5">
						<div class="content">
							<div class="text three-line">
								<?= T_("Mes passions?<br/>le <b>sport, voyager</b> et <br/><b>l’art</b> en générale"); ?>
							</div>
						</div>
					</li>
				</ul>
				<div id="mobile_description" class="transition">
					<?= T_("Salut c'est <b>Johan</b>! j'habite <b>Paris</b><br/>et je suis <b>Directeur Artistique web</b>.<br/>Bienvenue sur la version mobile<br/>de mon portfolio! Bonne visite et a bientôt!"); ?>
				</div>
			</nav>
			<div id="locales_selector">
				<span id="fr_FR" class="locale">fr</span>
			</div>
			<div id="logo">
				<img src="images/svgs/logo-fullsize.svg" width="457px" height="430px" alt="Logo" />
			</div>

			<div id="goto_project" class="goto_button"> </div>
			<div class="navigation_guide first"> </div>
			<section id="projects">
				<div class="spacer"> </div>
				<div class="arrow arrow-left"> </div>
				<div class="project_anchor anchor"> </div>
				<div class="arrow arrow-right"> </div>
				<div class="breadcrumb"> </div>
				<div id="project_holder" class="transition">
					<div class="project" id="smart_like">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="ibis">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="ripolin">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="lacoste">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="cymbeline">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="jti">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="free">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="cilgere">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="jacques_vabre">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
					<div class="project" id="graphic_obession">
						<div class="meta-wrapper strong-transition">
							<div class="tag"> </div>
							<div class="description"> </div>
						</div>
					</div>
				</div>
			
				<div id="goto_contact" class="goto_button"> </div>
				<div id="project_content" class="transition1s"> </div>
			</section>
			<div class="navigation_guide second"> </div>
		</section>
			
		<footer>
			<div class="contact_anchor anchor hidden"> </div>
			<div id="social">
				<div id="instagram" class="logo">
					<a href="http://instagram.com/diezesixzero" target="_blank"> </a>
				</div>
				<div id="pinterest" class="logo">
					<a href="http://www.pinterest.com/diezesixzero/" target="_blank"> </a>
				</div>
				<div id="resume" class="logo">
					<a href="CV.pdf" target="_blank"> </a>
				</div>
				<div id="twitter" class="logo">
					<a href="https://twitter.com/diezesixzero" target="_blank"> </a>
				</div>
				<div id="facebook" class="logo">
					<a href="https://www.facebook.com/Blackunltd" target="_blank"> </a>
				</div>
			</div>
			
			<a href="#main">
				<div id="logo_bottom"> </div>	
			</a>
		</footer>
		<script>
			(function(i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] ||
				function() {
					(i[r].q = i[r].q || []).push(arguments);
				}, i[r].l = 1 * new Date();
				
				a = s.createElement(o), 
				m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m);
			})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

			ga('create', 'UA-46300226-1', 'dieze-sixzero.com');
			ga('send', 'pageview');

		</script>
	</body>
</html>
