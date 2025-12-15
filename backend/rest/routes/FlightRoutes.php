<?php
require_once __DIR__ . '/../../data/Roles.php';

/**
* @OA\Get(path="/flights", tags={"flights"}, summary="Get all flights",
*     @OA\Response(response=200, description="Array of flights")
* )
*/
Flight::route('GET /flights', function() {
    Flight::auth_middleware()->authorizeRoles([Roles::USER, Roles::ADMIN]);
    Flight::json(Flight::flightService()->getAll());
});

/**
* @OA\Get(path="/flights/{id}", tags={"flights"}, summary="Get flight by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=200, description="Flight details")
* )
*/
Flight::route('GET /flights/@id', function($id) {
    Flight::auth_middleware()->authorizeRoles([Roles::USER, Roles::ADMIN]);
    Flight::json(Flight::flightService()->getById($id));
});

/**
* @OA\Post(path="/flights", tags={"flights"}, summary="Create a new flight",
*     @OA\RequestBody(required=true, @OA\JsonContent(
*         required={"origin","destination","departure_time","arrival_time"},
*         @OA\Property(property="origin", type="string", example="SJJ"),
*         @OA\Property(property="destination", type="string", example="ZAG"),
*         @OA\Property(property="departure_time", type="string", format="date-time", example="2025-11-20T14:30:00"),
*         @OA\Property(property="arrival_time", type="string", format="date-time", example="2025-11-20T16:00:00")
*     )),
*     @OA\Response(response=201, description="Flight created")
* )
*/
Flight::route('POST /flights', function() {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::flightService()->create($data));
});

/**
* @OA\Put(path="/flights/{id}", tags={"flights"}, summary="Update flight by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\RequestBody(@OA\JsonContent(
*         @OA\Property(property="origin", type="string"),
*         @OA\Property(property="destination", type="string"),
*         @OA\Property(property="departure_time", type="string", format="date-time"),
*         @OA\Property(property="arrival_time", type="string", format="date-time")
*     )),
*     @OA\Response(response=200, description="Flight updated")
* )
*/
Flight::route('PUT /flights/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::flightService()->update($id, $data));
});

/**
* @OA\Delete(path="/flights/{id}", tags={"flights"}, summary="Delete flight by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=204, description="Flight deleted")
* )
*/
Flight::route('DELETE /flights/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(["deleted" => Flight::flightService()->delete($id)]);
});

/**
 * @OA\Patch(
 *     path="/flights/{id}",
 *     tags={"flights"},
 *     summary="Partially update a flight",
 *     @OA\Parameter(name="id", in="path", required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="origin", type="string", example="SJJ"),
 *             @OA\Property(property="destination", type="string", example="ZAG"),
 *             @OA\Property(property="departure_time", type="string", format="date-time", example="2025-11-20T15:00:00"),
 *             @OA\Property(property="arrival_time", type="string", format="date-time", example="2025-11-20T16:30:00")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Flight partially updated")
 * )
 */
Flight::route('PATCH /flights/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::flightService()->update($id, $data));
});


?>
