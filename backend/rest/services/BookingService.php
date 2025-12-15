<?php
require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/BookingDao.php';

class BookingService extends BaseService {

    public function __construct() {
        parent::__construct(new BookingDao());
    }

    public function getByUserId($user_id) {
        return $this->dao->getByUserId($user_id);
    }

    public function getBookingsWithFlights($user_id = null) {
        return $this->dao->getBookingsWithFlights($user_id);
    }

}

