<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config
{
    private static function env($key, $default = null)
    {
        return isset($_ENV[$key]) && $_ENV[$key] !== ''
            ? $_ENV[$key]
            : $default;
    }

    public static function DB_NAME()
    {
        return self::env('DB_NAME', 'skyfly');
    }

    public static function DB_PORT()
    {
        return self::env('DB_PORT', 3306);
    }

    public static function DB_USER()
    {
        return self::env('DB_USER', 'root');
    }

    public static function DB_PASSWORD()
    {
        return self::env('DB_PASSWORD', 'root');
    }

    public static function DB_HOST()
    {
        return self::env('DB_HOST', '127.0.0.1');
    }

    public static function JWT_SECRET()
    {
        return self::env('JWT_SECRET', '8f3K!qPzA9$L2xM@YvW7dC0R#EJmS^hN6B');
    }
}
