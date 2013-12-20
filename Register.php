<?php
session_start();
require_once('Models/class.registertable.php');

$view = new stdClass();
$view->validationErrors = '';
$view->bannerTitle = 'common';
$view->headerTitle = 'common';

if (isset($_POST['submit'])) {

    if (trim($_POST['firstname']) == '') {
        $view->validationErrors.='Firstname Required!<br />';
    }
    if (trim($_POST['lastname']) == '') {
        $view->validationErrors.='Lastname Required!<br />';
    }
    if (trim($_POST['emailid']) == '') {
        $view->validationErrors.='Email Required!<br/>';
    }

    if ($view->validationErrors == '') {
         $preferred_countries='';
        if(!isEmpty($_POST['preferredCountry0']))
        {
             $preferred_countries .= $_POST['preferredCountry0'].',';
        }
         if(!isEmpty($_POST['preferredCountry1']))
        {
             $preferred_countries .= $_POST['preferredCountry1'].',';
        }
         if(!isEmpty($_POST['preferredCountry2']))
        {
             $preferred_countries .= $_POST['preferredCountry2'].',';
        }
        if(!isEmpty($_POST['preferredCountry3']))
        {
             $preferred_countries .= $_POST['preferredCountry3'].',';
        }
        if(!isEmpty($_POST['preferredCountry4']))
        {
             $preferred_countries .= $_POST['preferredCountry4'];
        }
        $database = new RegisterTable();
        $database->Register($_POST, $preferred_countries);
    }
}

function isEmpty($selectedCountry)
{
    return $selectedCountry=='';   
}
include_once 'Views/scripts/Register.phtml';