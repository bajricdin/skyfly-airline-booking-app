<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config {
   public static function DB_NAME() {
       return Config::get_env("railway", "skyfly");
   }
   public static function DB_PORT() {
       return Config::get_env("3306", 3306);
   }
   public static function DB_USER() {
       return Config::get_env("root", 'root');
   }
   public static function DB_PASSWORD() {
       return Config::get_env("ucfyMVFTqxKKjTzzBZwnacIxhIgqholY", 'root');
   }
   public static function DB_HOST() {
       return Config::get_env("mysql.railway.internal", '127.0.0.1');
   }
   public static function JWT_SECRET() {
       return Config::get_env("JWT_SECRET", ',dpPL,Se%fM-UVQBwf/X0T&B!DF6%}');
   }
   public static function get_env($name, $default){
       return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
   }
}
