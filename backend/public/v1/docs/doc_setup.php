<?php
/**
* @OA\Info(
*     title="API",
*     description="Flight API",
*     version="1.0",
*     @OA\Contact(
*         email="dinbajric@gmail.com",
*         name="Skyfly"
*     )
* )
*/
/**
* @OA\Server(
*     url= "http://localhost/airtrack/backend/rest",
*     description="API server"
* )
*/
/**
* @OA\SecurityScheme(
*     securityScheme="ApiKey",
*     type="apiKey",
*     in="header",
*     name="Authentication"
* )
*/
