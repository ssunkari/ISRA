<?php
class Register {

    protected $Id, $title, $firstname, $lastname, $dob, $street, $state, $city, $email, $preferred_countries, $qualifications, $mobileno;

    public function __construct($dbrow) {
        $this->Id = $dbrow['Id'];
        $this->title = $dbrow['title'];
        $this->firstname = $dbrow['firstname'];
        $this->lastname = $dbrow['lastname'];
        $this->dob = $dbrow['dob'];
        $this->street = $dbrow['street'];
        $this->state = $dbrow['state'];
        $this->city = $dbrow['city'];
        $this->email = $dbrow['email'];
        $this->preferred_countries = $dbrow['preferred_countries'];
        $this->qualifications = $dbrow['qualifications'];
        $this->mobile = $dbrow['mobile'];
    }

    public function getId() {
        return $this->Id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function getFirstname() {
        return $this->firstname;
    }

    public function getLastname() {
        return $this->lastname;
    }

    public function getDob() {
        return $this->dob;
    }

    public function getStreet() {
        return $this->street;
    }

    public function getState() {
        return $this->state;
    }

    public function getCity() {
        return $this->city;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPreferredCountries() {
        return $this->preferred_countries;
    }

    public function getQualifications() {
        return $this->qualifications;
    }

    public function getMobileno() {
        return $this->mobileno;
    }

}