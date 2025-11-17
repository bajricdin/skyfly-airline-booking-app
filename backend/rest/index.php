<?php
require '../vendor/autoload.php';

require_once __DIR__ . '/services/UserService.php';
require_once __DIR__ . '../services/AirportService.php';
require_once __DIR__ . '../services/FlightService.php';
require_once __DIR__ . '../services/BookingService.php';
require_once __DIR__ . '../services/PaymentService.php';

Flight::register('userService', 'UserService');
Flight::register('airportService', 'AirportService');
Flight::register('flightService', 'FlightService');
Flight::register('bookingService', 'BookingService');
Flight::register('paymentService', 'PaymentService');

require_once __DIR__ . '/routes/UserRoutes.php';
require_once __DIR__ . '../routes/AirportRoutes.php';
require_once __DIR__ . '../routes/FlightRoutes.php';
require_once __DIR__ . '../routes/BookingRoutes.php';
require_once __DIR__ . '../routes/PaymentRoutes.php';

Flight::route('GET /', function(){
    Flight::json([
        "status" => "✅ SkyFly API Running",
        "version" => "1.0.0",
        "developer" => "Din Bajrić"
    ]);
});

Flight::start();
