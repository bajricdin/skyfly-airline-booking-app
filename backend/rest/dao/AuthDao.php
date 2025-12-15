<?php
require_once __DIR__ . '/BaseDao.php';


class AuthDao extends BaseDao {
   protected $table_name;


   public function __construct() {
       $this->table_name = "users";
       parent::__construct('users', 'user_id');
   }


   public function get_user_by_email($email) {
       $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
       return $this->query_unique($query, ['email' => $email]);
   }
   
}
