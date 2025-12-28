<?php
require_once 'BaseDao.php';

class FlightDao extends BaseDao {
    public function __construct() {
        parent::__construct("flights", "flight_id");
    }

    public function getByNumber($number) {
        $stmt = $this->connection->prepare("SELECT * FROM flights WHERE flight_number = :number");
        $stmt->bindParam(':number', $number);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function countByFlightId($flight_id) {
        $stmt = $this->connection->prepare(
            "SELECT COUNT(*) FROM bookings WHERE flight_id = :id"
        );
        $stmt->bindParam(":id", $flight_id);
        $stmt->execute();
        return $stmt->fetchColumn();
    }

}
?>
