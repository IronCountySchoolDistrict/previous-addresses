'use strict';
function disableSubmit() {
  $j('#btnSubmit').prop('disabled', 'true');
}

function enableSubmit() {
  $j('#btnSubmit').removeAttr('disabled');
}

function filldate() {
  var cdate = $j.trim($j('#move_date').val());
  if (cdate === '') {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day + '/' + d.getFullYear();
    $j('#move_date').val(output);
  }
}

function checkform() {
  var ctype = $j.trim($j('#previous_address_type').val());
  var cstreet = $j.trim($j('#previous_street').val());
  var ccity = $j.trim($j('#previous_city').val());
  var cstate = $j.trim($j('#previous_state').val());
  var czip = $j.trim($j('#previous_zip').val());
  if (cstreet === '') {
    $j('#blank_fields_alert').show();
    disableSubmit();
  } else if (ccity === '') {
    $j('#blank_fields_alert').show();
    disableSubmit();
  } else if (cstate === '') {
    $j('#blank_fields_alert').show();
    disableSubmit();
  } else if (czip === '') {
    $j('#blank_fields_alert').show();
    disableSubmit();
  } else if (ctype === '') {
    $j('#blank_fields_alert').show();
    disableSubmit();
  } else {
    $j('#blank_fields_alert').hide();
    enableSubmit();
  }
}

function checkDelete() {
  if ($j('#delete_test').val() === '') {
    $j('#deleteconfirmed').remove();
  }
}

$j(document).ready(function () {
  $j('form').change(function () {
    checkform();
  });
  $j('#deleteaddress').click(function () {
    $j(this).hide();
    $j('#deleteaddresscancel').show();
    $j('#deleteaddressconfirm').show();
  });
  $j('#deleteaddressconfirm').click(function () {
    $j('#delete_alert').show();
    $j('#deleteaddresscancel').show();
    $j('#deleteaddressconfirm').hide();
    $j('#delete_test').val('DELETE');
    $j('#form_save_alert').remove();
    $j('#move_date').removeAttr('name');
    $j('#previous_address_type').removeAttr('name');
    $j('#previous_street').removeAttr('name');
    $j('#previous_city').removeAttr('name');
    $j('#previous_state').removeAttr('name');
    $j('#previous_zip').removeAttr('name');
    enableSubmit();
  });
  $j('#copy_home').click(function () {
    $j('#previous_street').val($j('#homestreet').val());
    $j('#previous_city').val($j('#homecity').val());
    $j('#previous_state').val($j('#homestate').val());
    $j('#previous_zip').val($j('#homezip').val());
    $j('#previous_address_type').val('Home');
    $j('#blank_fields_alert').hide();
    checkform();
  });
  $j('#copy_mailing').click(function () {
    $j('#previous_street').val($j('#mailingstreet').val());
    $j('#previous_city').val($j('#mailingcity').val());
    $j('#previous_state').val($j('#mailingstate').val());
    $j('#previous_zip').val($j('#mailingzip').val());
    $j('#previous_address_type').val('Mailing');
    $j('#blank_fields_alert').hide();
    checkform();
  });
  filldate();
  disableSubmit();
});
