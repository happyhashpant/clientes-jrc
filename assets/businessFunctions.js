window.addEventListener("load", (event) => {
  $("#navBar").load("/navbar");
});
var ownerArray = [];
var activities = [];
var contactArray = [];
(function () {
  "use strict";
  //------------------------------------------------------------ owner form handling
  var ownerData = $("#ownerData");
  Array.prototype.slice.call(ownerData).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#ownerData").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/ownerData",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $(".businessOwnerName").attr("readonly", true);
              $(".businessOwnerID").attr("readonly", true);
              $(".ownerIDExpDate").attr("readonly", true);
              $(".ownerBirDate").attr("readonly", true);
              $(".ownerAddress").attr("readonly", true);
              $(".editOwner").css("display", "inline");
              $("#saveOwnerDataButton").css("display", "none");
              $("#addOwnerButton").css("display", "none");
              $("#editOwner").css("display", "inline-flex");
              $("#businessModal").modal("show");
              $(".divDeleteButtonOwner").css("display", "none");
              $("#businessModalMessage").text(
                "Representante(s) Legal Guardados"
              );
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });

  //----------------------------------------------- new Owner Form handling
  var newOwner = $("#newOwnerForm");
  Array.prototype.slice.call(newOwner).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          let formData = JSON.stringify($("#newOwnerForm").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/owner/validate",
            data: { formData: formData },
            success: () => {
              $.ajax({
                type: "POST",
                url: "/business/owner/new",
                data: {
                  formData: formData,
                },
                sendData: {
                  formData: formData,
                },
                success: function (data, status) {
                  $("#ownerDIV")
                    .clone()
                    .attr("id", "newOwners")
                    .appendTo("#addOwner");

                  //Clone ownerNameInput
                  $("#newOwners #divDeleteButtonOwner #deleteButtonOwner").attr(
                    "onclick",
                    `deleteBusinessFunction( 'deleteOwner',${this.sendData.formData[0].value},${this.sendData.formData[2].value})`
                  );
                  $("#newOwners #divDeleteButtonOwner #deleteButtonOwner").attr(
                    "class",
                    "button"
                  );
                  $(
                    "#newOwners #ownerRow #ownerNameInput #businessOwnerName"
                  ).val(this.sendData.formData[1].value);

                  //Clone ownerIDInput
                  $("#newOwners #ownerRow #ownerIDInput #businessOwnerID").val(
                    this.sendData.formData[2].value
                  );
                  $("#newOwners #ownerRow #ownerIDInput #businessOwnerID").attr(
                    "readonly",
                    true
                  );

                  //Clone ownerIDExpDateInput
                  $(
                    "#newOwners #ownerRow #ownerIDExpDateInput #ownerIDExpDate"
                  ).val(this.sendData.formData[3].value);

                  //Clone ownerBirDateToolInput
                  $(
                    "#newOwners #ownerSecRow #ownerBirDateToolInput #ownerBirDate"
                  ).val(this.sendData.formData[4].value);

                  //Clone ownerAddressInput
                  $(
                    "#newOwners #ownerSecRow #ownerAddressInput #ownerAddress"
                  ).val(this.sendData.formData[5].value);
                  $("#newOwners").attr(
                    "class",
                    `ownerDIV ${this.sendData.formData[2].value}`
                  );
                  $("#newOwners").attr("id", "ownerDIV");
                  $("#newOwnerForm")[0].reset();
                  $("#ownerFormModal").modal("hide");
                  $("#businessModal").modal("show");
                  $("#businessModalMessage").text(
                    "Has agregado unx representante legal"
                  );
                },
              });
            },
            error: () => {
              $("#ownerFormModal").modal("hide");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text(
                "Ya hay un representante con esa cedula"
              );
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });

  //----------------------------------------------- Save General Data Form handling
  var generalData = $("#generalData");
  Array.prototype.slice.call(generalData).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#generalData").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/generalData",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $("#businessName").attr("readonly", true);
              $("#businessStatus").prop("disabled", true);
              $("#editGeneralData").css("display", "inline-flex");
              $("#saveGeneralData").css("display", "none");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text("Datos Generales guardados");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });

  //----------------------------------------------- new Account Data Form handling
  var accountData = $("#accountData");
  Array.prototype.slice.call(accountData).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#accountData").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/accountData",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $("#atvUser").attr("readonly", true);
              $("#atvPassword").attr("readonly", true);
              $("#billSystem").attr("readonly", true);
              $("#billSystemUser").attr("readonly", true);
              $("#billSystemPassword").attr("readonly", true);
              $("#billEmail").attr("readonly", true);
              $("#billEmailPassword").attr("readonly", true);
              $("#traviUser").attr("readonly", true);
              $("#traviEmail").attr("readonly", true);
              $("#traviPassword").attr("readonly", true);
              $("#ccssUser").attr("readonly", true);
              $("#ccssEmail").attr("readonly", true);
              $("#ccssPassword").attr("readonly", true);
              $("#insUser").attr("readonly", true);
              $("#insEmail").attr("readonly", true);
              $("#insPassword").attr("readonly", true);
              $("#userCharge").prop("disabled", true);
              $("#businessRegimen").prop("disabled", true);
              $("#editAccountData").css("display", "inline-flex");
              $("#exportAccountDataPDF").css("display", "none");
              $("#saveAccountData").css("display", "none");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text("Datos Contables Guardados");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
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
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#newActivityForm").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/activity/new",
            data: {
              formData: formData,
            },
            sendData: { formData: formData },
            success: function (data, status) {
              $("#activityDIV")
                .clone()
                .attr("id", "activityNewDIV")
                .appendTo("#addActivity");

              $("#activityNewDIV #divDeleteButton").css("display", "inline");
              $("#activityNewDIV #divDeleteButton #deleteActivityButton").attr(
                "onclick",
                `deleteBusinessFunction('deleteActivity',${this.sendData.formData[0].value},${this.sendData.formData[1].value})`
              );
              $("#activityNewDIV #divDeleteButton #deleteActivityButton").attr(
                "class",
                "button"
              );
              $("#activityNewDIV  #businessActivity").attr("disabled", true);
              $("#activityNewDIV  #businessActivity").val(
                `${this.sendData.formData[1].value}`
              );
              $("#activityNewDIV").attr(
                "class",
                `activity${this.sendData.formData[1].value}`
              );
              $("#activityNewDIV").attr("id", "activityDIV");
            },
            error: () => {
              $("#activityFormModal").modal("hide");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text("Actividad no existe");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
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
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#newContactForm").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/contact/new",
            data: {
              formData: formData,
            },
            sendData: { formData: formData },
            success: function (data, status) {
              $("#contactDIV")
                .clone()
                .attr("id", "contactNewDIV")
                .appendTo("#contact");

              $("#contactNewDIV #currentContactPhone").val(formData[4].value);
              $("#contactNewDIV #currentContactEmail").val(formData[5].value);

              $(
                "#contactNewDIV #deleteContactButtonDiv #deleteContactButton"
              ).attr(
                "onclick",
                `deleteBusinessFunction('deleteContact','${formData[0].value}','${formData[4].value}','${formData[5].value}')`
              );
              $("#contactNewDIV").attr("class", `contact${formData[4].value}`);

              $("#contactNewDIV #contactRow #contactName").val(
                formData[3].value
              );
              $("#contactNewDIV #contactRow #contactPhone").val(
                formData[4].value
              );
              $("#contactNewDIV #contactRow #contactEmail").val(
                formData[5].value
              );
              $("#contactNewDIV").attr("id", "contactDIV");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });

  //----------------------------------------------- Save AllContact Form handling
  var saveContactData = $("#saveContactData");
  Array.prototype.slice.call(saveContactData).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#saveContactData").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/contactData",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $(".contactName").attr("readonly", true);
              $(".contactPhone").attr("readonly", true);
              $(".contactEmail").attr("readonly", true);
              $("#editContactsData").css("display", "inline-flex");
              $("#saveContactDataButton").css("display", "none");
              $(".deleteButtonContact").css("display", "none");
              $("#addContactButton").css("display", "none");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text("Contactos guardados");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });
  //----------------------------------------------- Save TIV Form handling
  var tivDataForm = $("#tivDataForm");
  Array.prototype.slice.call(tivDataForm).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify($("#tivDataForm").serializeArray());
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/business/TIV",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $("#a").attr("readonly", true);
              $("#b").attr("readonly", true);
              $("#c").attr("readonly", true);
              $("#d").attr("readonly", true);
              $("#e").attr("readonly", true);
              $("#f").attr("readonly", true);
              $("#g").attr("readonly", true);
              $("#h").attr("readonly", true);
              $("#i").attr("readonly", true);
              $("#j").attr("readonly", true);
              $("#k").attr("readonly", true);
              $("#l").attr("readonly", true);
              $("#m").attr("readonly", true);
              $("#n").attr("readonly", true);
              $("#o").attr("readonly", true);

              $("#editTIVButton").css("display", "inline-flex");
              $("#saveTIVDataButton").css("display", "none");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text("TIV guardada");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });
})();
