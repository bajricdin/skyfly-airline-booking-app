<?php
require_once __DIR__ . '/../../data/Roles.php';

Flight::route('GET /bookings', function () {
    Flight::auth_middleware()->authorizeRoles([Roles::ADMIN, Roles::USER]);

    $user = Flight::get('user');

    Flight::json(Flight::bookingService()->getBookingsWithFlights($user->user_id));

});


/**
* @OA\Get(path="/bookings/{id}", tags={"bookings"}, summary="Get booking by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=200, description="Booking details")
* )
*/
Flight::route('GET /bookings/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::bookingService()->getById($id));
});


/**
* @OA\Post(path="/bookings", tags={"bookings"}, summary="Create a new booking",
*     @OA\RequestBody(required=true, @OA\JsonContent(
*         required={"user_id","flight_id"},
*         @OA\Property(property="user_id", type="integer", example=1),
*         @OA\Property(property="flight_id", type="integer", example=5),
*         @OA\Property(property="seat_number", type="string", example="12A")
*     )),
*     @OA\Response(response=201, description="Booking created")
* )
*/
Flight::route('POST /bookings', function () {

    Flight::auth_middleware()->authorizeRoles([Roles::USER, Roles::ADMIN]);

    $user = Flight::get('user');
    $data = Flight::request()->data->getData();

    $booking = [
        'user_id'   => $user->user_id,
        'flight_id' => $data['flight_id'],
        'status'    => 'Confirmed'
    ];

    Flight::json(Flight::bookingService()->create($booking));
});


/**
* @OA\Put(path="/bookings/{id}", tags={"bookings"}, summary="Update booking by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\RequestBody(@OA\JsonContent(
*         @OA\Property(property="seat_number", type="string")
*     )),
*     @OA\Response(response=200, description="Booking updated")
* )
*/
Flight::route('PUT /bookings/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookingService()->update($id, $data));
});

/**
* @OA\Delete(path="/bookings/{id}", tags={"bookings"}, summary="Delete booking by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=204, description="Booking deleted")
* )
*/
Flight::route('DELETE /bookings/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(["deleted" => Flight::bookingService()->delete($id)]);
});

/**
 * @OA\Patch(
 *     path="/bookings/{id}",
 *     tags={"bookings"},
 *     summary="Partially update a booking",
 *     @OA\Parameter(name="id", in="path", required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="seat_number", type="string", example="14C"),
 *             @OA\Property(property="flight_id", type="integer", example=3),
 *             @OA\Property(property="user_id", type="integer", example=2)
 *         )
 *     ),
 *     @OA\Response(response=200, description="Booking partially updated")
 * )
 */
Flight::route('PATCH /bookings/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::bookingService()->update($id, $data));
});

?>
