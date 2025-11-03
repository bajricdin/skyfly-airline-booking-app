<?php
require_once 'BaseDao.php';

class AirportDao extends BaseDao {
    public function __construct() {
        parent::__construct("airports", "airport_id");
    }

    public function getByIataCode($code) {
        $stmt = $this->connection->prepare("SELECT * FROM airports WHERE iata_code = :code");
        $stmt->bindParam(':code', $code);
        $stmt->execute();
        return $stmt->fetch();
    }
}
?>
