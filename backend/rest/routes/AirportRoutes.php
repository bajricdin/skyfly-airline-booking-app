<?php
/**
* @OA\Get(path="/airports", tags={"airports"}, summary="Get all airports",
*     @OA\Response(response=200, description="Array of airports")
* )
*/
Flight::route('GET /airports', function() {
    Flight::json(Flight::airportService()->getAll());
});

/**
* @OA\Get(path="/airports/{id}", tags={"airports"}, summary="Get airport by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=200, description="Airport details")
* )
*/
Flight::route('GET /airports/@id', function($id) {
    Flight::json(Flight::airportService()->getById($id));
});

/**
* @OA\Post(path="/airports", tags={"airports"}, summary="Create a new airport",
*     @OA\RequestBody(required=true, @OA\JsonContent(
*         required={"name","city","code"},
*         @OA\Property(property="name", type="string", example="Sarajevo Airport"),
*         @OA\Property(property="city", type="string", example="Sarajevo"),
*         @OA\Property(property="code", type="string", example="SJJ")
*     )),
*     @OA\Response(response=201, description="Airport created")
* )
*/
Flight::route('POST /airports', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::airportService()->create($data));
});

/**
* @OA\Put(path="/airports/{id}", tags={"airports"}, summary="Update airport by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\RequestBody(@OA\JsonContent(
*         @OA\Property(property="name", type="string"),
*         @OA\Property(property="city", type="string"),
*         @OA\Property(property="code", type="string")
*     )),
*     @OA\Response(response=200, description="Airport updated")
* )
*/
Flight::route('PUT /airports/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::airportService()->update($id, $data));
});

/**
* @OA\Delete(path="/airports/{id}", tags={"airports"}, summary="Delete airport by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=204, description="Airport deleted")
* )
*/
Flight::route('DELETE /airports/@id', function($id) {
    Flight::json(["deleted" => Flight::airportService()->delete($id)]);
});

/**
 * @OA\Patch(
 *     path="/airports/{id}",
 *     tags={"airports"},
 *     summary="Partially update an airport",
 *     @OA\Parameter(name="id", in="path", required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string", example="Updated Airport Name"),
 *             @OA\Property(property="city", type="string", example="Updated City"),
 *             @OA\Property(property="code", type="string", example="XYZ")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Airport partially updated")
 * )
 */
Flight::route('PATCH /airports/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::airportService()->update($id, $data));
});


?>
