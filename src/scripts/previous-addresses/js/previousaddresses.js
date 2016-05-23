require(['jquery', 'underscore', 'bluebird'], ($, _, Promise) => {
  //grab data for previous adresses of current student sql
  var pa_student = fetch('/ws/schema/query/org.irondistrict.pa.queries.student', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        curstudid: curstudid
      })
    })
    .then(response => response.json())
    .catch(function(ex) {
      console.log('parsing error', ex)
    })
    //----------------

  //grabs html template
  var pa_table = fetch('/scripts/previous-addresses/html/pa-table.html')
    .then(function(response) {
      return response.text()
    })
    //----------------

  function toQueryParam(object) {
    return Object.keys(object).map((key, index) => {
      var joinChar = index === 0 ? '?' : '&';
      return joinChar + key + '=' + object[key];
    }).join("");
  }

  /*function disableSubmit() {
    $('#btnSubmit').prop('disabled', 'true');
  }

  function enableSubmit() {
    $('#btnSubmit').removeAttr('disabled');
  }*/

  function filldate() {
    var cdate = $.trim($('#move_date').val());
    if (cdate === '') {
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var output = (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day + '/' + d.getFullYear();
      $('#move_date').val(output);
    }
  }

  function checkform() {
    var ctype = $.trim($('#previous_address_type').val());
    var cstreet = $.trim($('#previous_street').val());
    var ccity = $.trim($('#previous_city').val());
    var cstate = $.trim($('#previous_state').val());
    var czip = $.trim($('#previous_zip').val());
    if (cstreet === '') {
      $('#blank_fields_alert').show();
      disableSubmit();
    } else if (ccity === '') {
      $('#blank_fields_alert').show();
      disableSubmit();
    } else if (cstate === '') {
      $('#blank_fields_alert').show();
      disableSubmit();
    } else if (czip === '') {
      $('#blank_fields_alert').show();
      disableSubmit();
    } else if (ctype === '') {
      $('#blank_fields_alert').show();
      disableSubmit();
    } else {
      $('#blank_fields_alert').hide();
      enableSubmit();
    }
  }

  function checkDelete() {
    if ($('#delete_test').val() === '') {
      $('#deleteconfirmed').remove();
    }
  }

  $(document).ready(function() {

    Promise.all([pa_student, pa_table]).then(function(results) {
      var toParam = results[0].record.map(record => {
        record.queryString = toQueryParam(record);
        return record;
      });
      var renderTemplate = _.template(results[1]);
      var renderedRecord = renderTemplate({record: results[0].record, toQueryParam: toQueryParam});
      $('.box-round > table:first').after(renderedRecord);

      var frn = '001' + results[0].record.dcid;
      $('.button-row').prepend('<a href="/admin/previousaddresses/address_add.html?frn=' + frn + '&no-store-lp" class="button">Add Previous Address</a>');
      $('#previous_delete').remove();
      $('#pa_test').remove();
    })

    $('form').change(function() {
      checkform();
    });
    /*$('#deleteaddress').click(function() {
      $(this).hide();
      $('#deleteaddresscancel').show();
      $('#deleteaddressconfirm').show();
    });*/

    $('#deleteaddress').click(function() {
      $('#delete_alert').show();
      $('#deleteaddresscancel').show();
      $('#deleteaddressconfirm').hide();
      $('#delete_test').val('DELETE');
      $('#form_save_alert').remove();
      $('#move_date').removeAttr('name');
      $('#previous_address_type').removeAttr('name');
      $('#previous_street').removeAttr('name');
      $('#previous_city').removeAttr('name');
      $('#previous_state').removeAttr('name');
      $('#previous_zip').removeAttr('name');
      //enableSubmit();
    });

    //Working
    $('#copy_home').click(function() {
      $('#previous_street').val($('#homestreet').val());
      $('#previous_city').val($('#homecity').val());
      $('#previous_state').val($('#homestate').val());
      $('#previous_zip').val($('#homezip').val());
      $('#previous_address_type').val('Home');
      $('#blank_fields_alert').hide();
      checkform();
    });
    $('#copy_mailing').click(function() {
      $('#previous_street').val($('#mailingstreet').val());
      $('#previous_city').val($('#mailingcity').val());
      $('#previous_state').val($('#mailingstate').val());
      $('#previous_zip').val($('#mailingzip').val());
      $('#previous_address_type').val('Mailing');
      $('#blank_fields_alert').hide();
      checkform();
    });
    filldate();
    //disableSubmit();
  });
});
