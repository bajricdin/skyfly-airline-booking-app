<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/PaymentDao.php';

class PaymentService extends BaseService {

    public function __construct() {
        parent::__construct(new PaymentDao());
    }
}
