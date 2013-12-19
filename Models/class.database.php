<?php
class Database{
    protected static $instance=null;
    protected $dbh;
    public static function getInstance()
    {
        $username='root';
        $password='';
        $host='localhost';
        $dbname='test';
       /* $username='interb1w_root';
        $password='Rockst@r';
        $host='localhost';
        $dbname='interb1w_isra';*/
        if(self::$instance===NULL)
        {
            self::$instance = new self($username,$password,$host,$dbname);

        }
        return self::$instance;

    }
    private function  __construct($username,$password,$host,$database) {
        $this->dbh=new PDO("mysql:host=$host;dbname=$database", $username, $password);
    }
    public function getDbh()
    {
        return $this->dbh;
    }
    public function  __destruct() {
        $this->dbh=NULL;
    }


 }
    //put your code here


