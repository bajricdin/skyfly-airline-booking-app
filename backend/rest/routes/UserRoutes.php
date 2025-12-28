<?php
require_once __DIR__ . '/../../data/Roles.php';

/**
* @OA\Get(
*     path="/users",
*     tags={"users"},
*     summary="Get all users",
*     @OA\Response(response=200, description="Array of all users")
* )
*/
Flight::route('GET /users', function() {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::userService()->getAll());
});

/**
* @OA\Get(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Get user by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=200, description="User details")
* )
*/
Flight::route('GET /users/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::userService()->getById($id));
});

/**
* @OA\Post(
*     path="/users",
*     tags={"users"},
*     summary="Create a new user",
*     @OA\RequestBody(required=true, @OA\JsonContent(
*         required={"name","email","password"},
*         @OA\Property(property="name", type="string", example="John Doe"),
*         @OA\Property(property="email", type="string", example="john@example.com"),
*         @OA\Property(property="password", type="string", example="secret123")
*     )),
*     @OA\Response(response=201, description="User created")
* )
*/
Flight::route('POST /users', function() {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->create($data));
});

/**
* @OA\Put(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Update user by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\RequestBody(@OA\JsonContent(
*         @OA\Property(property="name", type="string"),
*         @OA\Property(property="email", type="string"),
*         @OA\Property(property="password", type="string")
*     )),
*     @OA\Response(response=200, description="User updated")
* )
*/
Flight::route('PUT /users/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->update($id, $data));
});

/**
* @OA\Delete(
*     path="/users/{id}",
*     tags={"users"},
*     summary="Delete user by ID",
*     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer", example=1)),
*     @OA\Response(response=204, description="User deleted")
* )
*/
Flight::route('DELETE /users/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(["deleted" => Flight::userService()->delete($id)]);
});

/**
 * @OA\Patch(
 *     path="/users/{id}",
 *     tags={"users"},
 *     summary="Partially update a user",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string", example="Updated Name"),
 *             @OA\Property(property="email", type="string", example="updated@example.com"),
 *             @OA\Property(property="password", type="string", example="newpassword123")
 *         )
 *     ),
 *     @OA\Response(response=200, description="User partially updated")
 * )
 */
Flight::route('PATCH /users/@id', function($id) {
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->update($id, $data));
});

?>
