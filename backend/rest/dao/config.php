<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config
{
    private static function env($key, $default = null)
    {
        $value = getenv($key);
        return $value !== false ? $value : $default;
    }


    public static function DB_HOST() {
        return getenv('MYSQLHOST');
    }

    public static function DB_PORT() {
        return getenv('MYSQLPORT');
    }

    public static function DB_NAME() {
        return getenv('MYSQLDATABASE');
    }

    public static function DB_USER() {
        return getenv('MYSQLUSER');
    }

    public static function DB_PASSWORD() {
        return getenv('MYSQLPASSWORD');
    }

    public static function JWT_SECRET()
    {
        return self::env('JWT_SECRET', '8f3K!qPzA9$L2xM@YvW7dC0R#EJmS^hN6B');
    }
}
