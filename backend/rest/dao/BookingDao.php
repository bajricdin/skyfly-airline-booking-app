<?php
require_once 'BaseDao.php';

class BookingDao extends BaseDao {
    public function __construct() {
        parent::__construct("bookings", "booking_id");
    }

    public function getByUserId($user_id) {
        $stmt = $this->connection->prepare("SELECT * FROM bookings WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
?>
