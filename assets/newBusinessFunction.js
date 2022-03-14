window.addEventListener("load", (event) => {
  $("#navBar").load("/navbar");
});

(function () {
  "use strict";

  var businessForm = document.querySelectorAll("#businessForm");

  Array.prototype.slice.call(businessForm).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  //----------------------------------------------- new Owner Form handling
  var addOwnerForm = document.querySelectorAll("#addOwnerForm");
  Array.prototype.slice.call(addOwnerForm).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#addOwnerForm").serializeArray());
          formData = JSON.parse(formData);
          $("#ownerDIVModal")
            .clone()
            .attr("id", "newOwners")
            .appendTo("#addOwner");
          $("#ownerDIVModal #ownerRow #ownerNameInput #businessOwnerName").val(
            ""
          );
          $("#ownerDIVModal #ownerRow #ownerIDInput #businessOwnerID").val("");
          $(
            "#ownerDIVModal #ownerRow #ownerIDExpDateInput #ownerIDExpDate"
          ).val("");
          $(
            "#ownerDIVModal #ownerSecRow #ownerBirthDateInput #ownerBirthDate"
          ).val("");
          $("#ownerDIVModal #ownerSecRow #ownerAddressInput #ownerAddress").val(
            ""
          );

          $("#newOwners #ownerRow #ownerNameInput #businessOwnerName").val(
            formData[0].value
          );

          $("#newOwners #deleteContactButtonDiv #deleteContactButton").attr(
            "class",
            "button"
          );
          $("#newOwners #deleteContactButtonDiv #deleteContactButton").attr(
            "onclick",
            `removeBusinessDIV('owner',${formData[1].value})`
          );
          //Clone ownerIDInput
          $("#newOwners #ownerRow #ownerIDInput #businessOwnerID").val(
            formData[1].value
          );

          //Clone ownerIDExpDateInput
          $("#newOwners #ownerRow #ownerIDExpDateInput #ownerIDExpDate").val(
            formData[2].value
          );

          //Clone ownerBirDateToolInput
          $(
            "#newOwners #ownerSecRow #ownerBirthDateToolInput #ownerBirthDate"
          ).val(formData[3].value);

          //Clone ownerAddressInput
          $("#newOwners #ownerSecRow #ownerAddressInput #ownerAddress").val(
            formData[4].value
          );
          $("#newOwners").attr("class", `ownerDIV${formData[1].value}`);
          $("#newOwners").attr("id", "ownerDIV");
          $("#ownerFormModal").modal("hide");
          $("#addOwnerForm").attr("class", "needs-validation");
          event.preventDefault();
          event.stopPropagation();
        }
      },
      false
    );
  });
  //----------------------------------------------- new Activity Form handling
  var activityData = $("#newActivityForm");
  Array.prototype.slice.call(activityData).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#newActivityForm").serializeArray());
          formData = JSON.parse(formData);

          $("#activityDIVModal")
            .clone()
            .attr("id", "activityNewDIV")
            .appendTo("#addActivity");

          $(
            "#activityNewDIV #deleteActivityButtonDiv #deleteActivityButton"
          ).attr("class", "button");
          $(
            "#activityNewDIV #deleteActivityButtonDiv #deleteActivityButton"
          ).attr(
            "onclick",
            `removeBusinessDIV('activity',${formData[0].value})`
          );

          $("#activityNewDIV  #businessActivity").attr("disabled", true);
          $("#activityNewDIV  #businessActivity").val(`${formData[0].value}`);
          $("#activityNewDIV").attr("class", `activityDIV${formData[0].value}`);
          $("#activityNewDIV").attr("id", "activityDIV");
          $("#activityFormModal").modal("hide");
          event.preventDefault();
          event.stopPropagation();
        }
      },
      false
    );
  });
  //----------------------------------------------- new Contact Form handling
  var newContactData = $("#newContactForm");
  Array.prototype.slice.call(newContactData).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#newContactForm").serializeArray());
          formData = JSON.parse(formData);
          $("#contactDIVModal")
            .clone()
            .attr("id", "contactNewDIV")
            .appendTo("#addContact");

          $("#contactDIVModal #contactRow #contactName").val("");
          $("#contactDIVModal #contactRow #contactPhone").val("");
          $("#contactDIVModal #contactRow #contactEmail").val("");

          $("#contactNewDIV #deleteContactButtonDiv #deleteContactButton").attr(
            "class",
            "button"
          );
          $("#contactNewDIV #deleteContactButtonDiv #deleteContactButton").attr(
            "onclick",
            `removeBusinessDIV('contact',${formData[1].value})`
          );

          $("#contactNewDIV").attr("class", `contactDIV${formData[1].value}`);

          $("#contactNewDIV #contactRow #contactName").val(formData[0].value);
          $("#contactNewDIV #contactRow #contactPhone").val(formData[1].value);
          $("#contactNewDIV #contactRow #contactEmail").val(formData[2].value);
          $("#contactNewDIV").attr("id", "contactDIV");
          $("#newContactForm").modal("hide");
          event.preventDefault();
          event.stopPropagation();
        }

        event.preventDefault();
      },
      false
    );
  });
})();

function removeBusinessDIV(action, id) {
  switch (action) {
    case "owner":
      $(`.ownerDIV${id}`).remove();
      break;
    case "activity":
      $(`.activityDIV${id}`).remove();
      break;
    case "contact":
      $(`.contactDIV${id}`).remove();
      break;
  }
}

function validateBusinessID(value) {
  if (value) {
    $.ajax({
      type: "POST",
      url: "/validateOwner",
      data: {
        value: value,
      },
      success: function (data, status) {
        if (data == 0) {
          $("#businessID").attr("class", "form-control is-valid");
        } else {
          $("#businessID").attr("class", "form-control is-invalid");
        }
      },
    });
  }
}
