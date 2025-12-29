<<<<<<< HEAD
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Config {

    private static function env($key, $default = null) {
        // Railway-safe environment variable access
        if (getenv($key) !== false) {
            return getenv($key);
        }

        if (isset($_SERVER[$key])) {
            return $_SERVER[$key];
        }

        return $default;
    }

    public static function DB_NAME() {
        return self::env('MYSQLDATABASE', 'skyfly');
    }

    public static function DB_PORT() {
        return self::env('MYSQLPORT', 3306);
    }

    public static function DB_USER() {
        return self::env('MYSQLUSER', 'root');
    }

    public static function DB_PASSWORD() {
        return self::env('MYSQLPASSWORD', 'root');
    }

    public static function DB_HOST() {
        return self::env('MYSQLHOST', '127.0.0.1');
    }

    public static function JWT_SECRET() {
        return self::env('JWT_SECRET', 'dev_secret');
    }
}
=======
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
>>>>>>> origin/main
