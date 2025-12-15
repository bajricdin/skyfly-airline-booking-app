<?php
require_once __DIR__ . '/../../data/Roles.php';

/**
* @OA\Get(path="/payments", tags={"payments"}, summary="Get all payments",
*     @OA\Response(response=200, description="Array of payments")
* )
*/
Flight::route('GET /payments', function() {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::paymentService()->getAll());
});

/**
* @OA\Get(path="/payments/{id}", tags={"payments"}, summary="Get payment by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=200, description="Payment details")
* )
*/
Flight::route('GET /payments/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::paymentService()->getById($id));
});

/**
* @OA\Post(path="/payments", tags={"payments"}, summary="Create a new payment",
*     @OA\RequestBody(required=true, @OA\JsonContent(
*         required={"booking_id","amount"},
*         @OA\Property(property="booking_id", type="integer", example=1),
*         @OA\Property(property="amount", type="number", format="float", example=150.50),
*         @OA\Property(property="method", type="string", example="Credit Card")
*     )),
*     @OA\Response(response=201, description="Payment created")
* )
*/
Flight::route('POST /payments', function() {
    Flight::auth_middleware()->authorizeRoles([Roles::USER, Roles::ADMIN]);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::paymentService()->create($data));
});

/**
* @OA\Put(path="/payments/{id}", tags={"payments"}, summary="Update payment by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\RequestBody(@OA\JsonContent(
*         @OA\Property(property="booking_id", type="integer"),
*         @OA\Property(property="amount", type="number", format="float"),
*         @OA\Property(property="method", type="string")
*     )),
*     @OA\Response(response=200, description="Payment updated")
* )
*/
Flight::route('PUT /payments/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::paymentService()->update($id, $data));
});

/**
* @OA\Delete(path="/payments/{id}", tags={"payments"}, summary="Delete payment by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=204, description="Payment deleted")
* )
*/
Flight::route('DELETE /payments/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(["deleted" => Flight::paymentService()->delete($id)]);
});

/**
 * @OA\Patch(
 *     path="/payments/{id}",
 *     tags={"payments"},
 *     summary="Partially update a payment",
 *     @OA\Parameter(name="id", in="path", required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="booking_id", type="integer", example=2),
 *             @OA\Property(property="amount", type="number", format="float", example=200.50),
 *             @OA\Property(property="method", type="string", example="PayPal")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Payment partially updated")
 * )
 */
Flight::route('PATCH /payments/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::paymentService()->update($id, $data));
});


?>
