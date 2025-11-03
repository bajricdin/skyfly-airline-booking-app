<?php
require_once 'BaseDao.php';

class PaymentDao extends BaseDao {
    public function __construct() {
        parent::__construct("payments", "payment_id");
    }

    public function getByBookingId($booking_id) {
        $stmt = $this->connection->prepare("SELECT * FROM payments WHERE booking_id = :booking_id");
        $stmt->bindParam(':booking_id', $booking_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
?>
