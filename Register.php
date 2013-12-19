<?php

require_once('Models/class.registertable.php');

$view = new stdClass();
$view->validationErrors = '';
$view->bannerTitle = 'common';
$view->headerTitle = 'common';
if (isset($_POST['submit'])) {
    $database = new RegisterTable();
    $database->Register($_POST);
}
include_once 'Views/scripts/Register.phtml';