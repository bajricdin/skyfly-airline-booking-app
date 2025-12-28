<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/FlightDao.php';

class FlightService extends BaseService {

    public function __construct() {
        parent::__construct(new FlightDao());
    }
}
