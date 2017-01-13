<?php
require_once 'vendor/autoload.php';


$loader = new Twig_Loader_Filesystem('view');
$twig = new Twig_Environment($loader, array(
  'debug' => true,
));
$twig->addExtension(new Twig_Extension_Debug());

if( isset($_GET['p']) ) {
  $page = $_GET['p'];
} else {
  $page = 'index';
}

$jsonData = '
{
    "count": 12,
    "results": [
        {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": "Tatooine",
            "films": [
                "http://swapi.co/api/films/6/",
                "http://swapi.co/api/films/3/",
                "http://swapi.co/api/films/2/",
                "http://swapi.co/api/films/1/",
                "http://swapi.co/api/films/7/"
            ],
            "species": [
                "Human"
            ],
            "vehicles": [
                "Snowspeeder",
                "Imperial Speeder Bike"
            ],
            "starships": [
                "X-wing",
                "Imperial shuttle"
            ],
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-20T21:17:56.891000Z",
            "url": "http://swapi.co/api/people/1/",
            "img": "/img/luke.jpg"
        }
    ]
}
';

$arrData = json_decode($jsonData, true);



echo $twig->render('layout/'.$page.'.html.twig', array('name' => 'Fabien', 'data' => $arrData));


?>
