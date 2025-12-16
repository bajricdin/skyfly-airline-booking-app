<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/AuthDao.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService extends BaseService {

    private $auth_dao;

    public function __construct() {
        $this->auth_dao = new AuthDao();
        parent::__construct($this->auth_dao);
    }

    public function register($entity) {

        if (empty($entity['email']) || empty($entity['password'])) {
            return ['success' => false, 'error' => 'Email and password required'];
        }

        if ($this->auth_dao->get_user_by_email($entity['email'])) {
            return ['success' => false, 'error' => 'Email already exists'];
        }

        $entity['password_hash'] = password_hash($entity['password'], PASSWORD_BCRYPT);
        unset($entity['password']);

        $this->dao->insert($entity);

        return ['success' => true, 'data' => $entity];
    }

    public function login($entity) {

        if (empty($entity['email']) || empty($entity['password'])) {
            return ['success' => false, 'error' => 'Email and password required'];
        }

        $user = $this->auth_dao->get_user_by_email($entity['email']);

        if (!password_verify($entity['password'], $user['password_hash'])) {
    return ['success' => false, 'error' => 'Invalid username or password.'];
}


        unset($user['password_hash']);

        $payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => time() + 86400
        ];

        $token = JWT::encode($payload, Config::JWT_SECRET(), 'HS256');

        return ['success' => true, 'data' => array_merge($user, ['token' => $token])];
    }
}
