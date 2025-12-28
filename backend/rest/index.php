<?php
require '../vendor/autoload.php';
require_once __DIR__ . '../../middleware/AuthMiddleware.php';
require_once __DIR__ . '/../data/Roles.php';

require_once __DIR__ . '/services/UserService.php';
require_once __DIR__ . '/services/AirportService.php';
require_once __DIR__ . '/services/FlightService.php';
require_once __DIR__ . '/services/BookingService.php';
require_once __DIR__ . '/services/PaymentService.php';
require_once __DIR__ . '/services/AuthService.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::register('userService', 'UserService');
Flight::register('airportService', 'AirportService');
Flight::register('flightService', 'FlightService');
Flight::register('bookingService', 'BookingService');
Flight::register('paymentService', 'PaymentService');
Flight::register('auth_service', "AuthService");
Flight::register('auth_middleware', 'AuthMiddleware');


Flight::before('start', function () {

   
    $url = Flight::request()->url;

    // Public routes
    if (
        strpos($url, '/auth/login') === 0 ||
        strpos($url, '/auth/register') === 0 ||
        strpos($url, 'docs') !== false
    ) {
        return;
    }

    $token = Flight::request()->getHeader('Authentication');

    Flight::auth_middleware()->verifyToken($token);
});

//Get info about logged in user
Flight::route('GET /me', function () {
    Flight::json(Flight::get('user'));
});

//Used this route to compare number of entries in main tables
Flight::route('GET /__compare', function () {
    $db = Database::connect();
    $users = $db->query("SELECT COUNT(*) c FROM users")->fetch();
    $airports = $db->query("SELECT COUNT(*) c FROM airports")->fetch();
    $flights = $db->query("SELECT COUNT(*) c FROM flights")->fetch();

    Flight::json([
        "users" => $users['c'],
        "airports" => $airports['c'],
        "flights" => $flights['c']
    ]);
});

require_once __DIR__ . '/routes/UserRoutes.php';
require_once __DIR__ . '/routes/AirportRoutes.php';
require_once __DIR__ . '/routes/FlightRoutes.php';
require_once __DIR__ . '/routes/BookingRoutes.php';
require_once __DIR__ . '/routes/PaymentRoutes.php';
require_once __DIR__ . '/routes/AuthRoutes.php';

Flight::start();
