<?php
require_once 'BaseDao.php';

class BookingDao extends BaseDao {
    public function __construct() {
        parent::__construct("bookings", "booking_id");
    }

    public function getByUserId($user_id) {
        $stmt = $this->connection->prepare("
            SELECT 
                b.booking_id,
                b.booking_date,
                b.status,
                f.flight_id,
                f.airline,
                f.flight_number,
                f.departure_time,
                f.arrival_time,
                f.price
            FROM bookings b
            JOIN flights f ON b.flight_id = f.flight_id
            WHERE b.user_id = :user_id
            ORDER BY b.booking_date DESC
        ");

        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll();
    }

     public function getBookingsWithFlights($user_id = null) {
    $sql = "
        SELECT 
            b.booking_id,
            b.booking_date,
            b.status,
            b.user_id,
            f.flight_id,
            f.airline,
            f.flight_number,
            f.departure_time,
            f.arrival_time,
            f.price
        FROM bookings b
        JOIN flights f ON b.flight_id = f.flight_id
    ";

    if ($user_id !== null) {
        $sql .= " WHERE b.user_id = :user_id";
    }

    $sql .= " ORDER BY b.booking_date DESC";

    $stmt = $this->connection->prepare($sql);

    if ($user_id !== null) {
        $stmt->bindParam(":user_id", $user_id);
    }

    $stmt->execute();
    return $stmt->fetchAll();
}



}
?>
