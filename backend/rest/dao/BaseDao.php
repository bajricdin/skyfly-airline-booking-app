<?php
require_once 'config.php';
require_once 'Database.php';

class BaseDao {
    protected $table;
    protected $primaryKey;
    protected $connection;

    public function __construct($table, $primaryKey) {
        $this->table = $table;
        $this->primaryKey = $primaryKey;
        $this->connection = Database::connect();
    }

    public function getAll() {
        $stmt = $this->connection->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function getById($id) {
        $stmt = $this->connection->prepare(
            "SELECT * FROM " . $this->table . " WHERE " . $this->primaryKey . " = :id"
        );
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function insert($data) {
        $columns = implode(", ", array_keys($data));
        $placeholders = ":" . implode(", :", array_keys($data));

        $sql = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";
        $stmt = $this->connection->prepare($sql);
        $stmt->execute($data);

        $id = $this->connection->lastInsertId();
        return $this->getById($id);
    }   


    public function update($id, $data) {
        $fields = [];
        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
        }

        $fields = implode(", ", $fields);
        $sql = "UPDATE {$this->table} SET $fields WHERE {$this->primaryKey} = :id";

        $stmt = $this->connection->prepare($sql);
        $data['id'] = $id;
        $stmt->execute($data);

        return $this->getById($id);
    }


    public function delete($id) {
        $stmt = $this->connection->prepare(
            "DELETE FROM " . $this->table . " WHERE " . $this->primaryKey . " = :id"
        );
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function query_unique($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt->fetch();
}   
}
?>
