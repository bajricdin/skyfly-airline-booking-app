<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/AirportDao.php';

class AirportService extends BaseService {

    public function __construct() {
        parent::__construct(new AirportDao());
    }

    public function getByIataCode($code) {
        return $this->dao->getByIataCode($code);
    }
}
