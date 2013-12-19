<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of class
 *
 * @author Srinivas Sunkari
 */
require_once 'Models/class.register.php';
require_once 'Models/class.database.php';

class RegisterTable {

    protected $dbh;
    protected $db;

    public function __construct() {
        $this->db = Database::getInstance();
        $this->dbh = $this->db->getDbh();
    }

    public function Register($data) {
        $sql = 'insert into isra_register (title,firstname,lastname,dob,street,state,city,email,preferred_countries,qualifications,mobile) 
            values(:title,:firstname,:lastname,:dob,:street,:state,:city,:email,:preferred_countries,:qualifications,:mobile)';
        $results = $this->dbh->prepare($sql);
        $results->execute(array(':title' => $data['title'],
            ':firstname' => $data['firstname'],
            ':lastname' => $data['lastname'],
            ':dob' => $data['dob'],
            ':street' => $data['street'],
            ':state' => $data['state'],
            ':city' => $data['city'],
            ':email' => $data['email'],
            ':preferred_countries' => $data['preferred_countries'],
            ':qualifications' => $data['qualifications'],
            ':mobile' => $data['mobile']
        ));       
        return "";
    }  
}