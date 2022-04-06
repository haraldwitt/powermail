import FormValidator from '@yaireo/validator'
import MoreStepForm from './MoreStepForm';

function PowermailForm() {
  'use strict';

  this.initialize = function () {
    // formValidationListener();
    moreStepFormListener();
    locationFieldListener();
  };

  let formValidationListener = function() {
    // todo

    var validator = new FormValidator();
    // select your "form" element from the DOM and attach an "onsubmit" event handler to it:
    document.forms[0].onsubmit = function (e) {
      var validatorResult = validator.checkAll(this); // "this" reffers to the currently submitetd form element

      return !!validatorResult.valid;
    };
  };

  let moreStepFormListener = function() {
    let moreStepForm = new MoreStepForm();
    moreStepForm.initialize();
  };

  let locationFieldListener = function() {
    if (document.querySelector('[data-powermail-location="prefill"]') !== null) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let base = document.querySelector('[data-powermail-eidurl]').getAttribute('data-powermail-eidurl');
        let url = base + '?eID=' + 'powermailEidGetLocation&lat=' + lat + '&lng=' + lng;

        fetch(url)
          .then((resp) => resp.text())
          .then(function(data) {
            let elements = document.querySelectorAll('[data-powermail-location="prefill"]');
            for (let i = 0; i < elements.length; i++) {
              elements[i].value = data;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  };
}

let powermailForm = new PowermailForm();
powermailForm.initialize();
