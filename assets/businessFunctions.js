var i = 1;
var j = 1;
var z = 1;
var newOwnerCount = 1;
var newContactCount = 1;
var newActivityCount = 1;
window.addEventListener("load", (event) => {
  $("#navBar").load("/assets/navbar.html");
});

(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var ownerDataValidation = $("#ownerData");

  // Loop over them and prevent submission
  Array.prototype.slice.call(ownerDataValidation).forEach(function (form) {
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
            url: "/saveBusinessOwner",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $(".businessOwnerName").attr("readonly", true);
              $(".businessOwnerID").attr("readonly", true);
              $(".ownerIDExpDate").attr("readonly", true);
              $(".ownerBirDate").attr("readonly", true);
              $(".ownerAddress").attr("readonly", true);
              $(".newBusinessOwnerName").attr("readonly", true);
              $(".newBusinessOwnerID").attr("readonly", true);
              $(".newOwnerIDExpDate").attr("readonly", true);
              $(".newOwnerBirDate").attr("readonly", true);
              $(".newOwnerAddress").attr("readonly", true);
              setTimeout(() => {
                $(".newBusinessOwnerName").attr(
                  "name",
                  "currentBusinessOwnerName"
                );
                $(".newBusinessOwnerName").attr(
                  "class",
                  "form-control businessOwnerName"
                );
                $(".newBusinessOwnerID").attr("name", "currentBusinessOwnerID");
                $(".newBusinessOwnerID").attr(
                  "class",
                  "form-control businessOwnerID"
                );
                $(".newOwnerIDExpDate").attr("name", "currentOwnerIDExpDate");
                $(".newOwnerIDExpDate").attr(
                  "class",
                  "form-control ownerIDExpDate"
                );
                $(".newOwnerBirDate").attr("name", "currentOwnerBirDate");
                $(".newOwnerBirDate").attr(
                  "class",
                  "form-control ownerBirDate"
                );
                $(".newOwnerAddress").attr("name", "currentOwnerAddress");
                $(".newOwnerAddress").attr(
                  "class",
                  "form-control ownerAddress"
                );
              }, 300);
              console.log(formData);
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

  var newOwner = $("#newOwnerForm");

  // Loop over them and prevent submission
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
            url: "/saveNewOwner",
            data: {
              formData: formData,
            },
            sendData: {
              formData: formData,
            },
            success: function (data, status) {
              console.log(this.sendData.formData[1].value);
              $("#ownerDIV")
                .clone()
                .attr("id", "newOwners")
                .appendTo("#addOwner");

              //Clone ownerNameInput
              $("#newOwners #divDeleteButtonOwner #deleteButtonOwner").attr(
                "onclick",
                "deleteOwnerAjx('" +
                  this.sendData.formData[0].value +
                  "','" +
                  this.sendData.formData[2].value +
                  "')"
              );
              $("#newOwners #ownerRow #ownerNameInput #businessOwnerName").val(
                this.sendData.formData[1].value
              );

              //Clone ownerIDInput
              $("#newOwners #ownerRow #ownerIDInput #businessOwnerID").val(
                this.sendData.formData[2].value
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
              $("#newOwners #ownerSecRow #ownerAddressInput #ownerAddress").val(
                this.sendData.formData[5].value
              );
              $("#newOwners").attr(
                "class",
                `${this.sendData.formData[2].value}`
              );
              $("#newOwners").attr("id", "ownerDIV");
              $("#newOwnerForm")[0].reset();
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });

  var businessActivity = $("#businessActivity");

  // Loop over them and prevent submission
  Array.prototype.slice.call(businessActivity).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity()) {
          var formData = JSON.stringify(
            $("#businessActivity").serializeArray()
          );
          formData = JSON.parse(formData);
          $.ajax({
            type: "POST",
            url: "/saveBusinessActivity",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $(".divDeleteButton").css("display", "none");
              $(".currentActivity").prop("disabled", true);
              $("#saveActivityData").css("display", "none");
              $("#addActivityButton").css("display", "none");
              $("#editActivity").css("display", "inline-flex");
              $(".deleteButton").css("display", "none");
              $(".businessNewActivities").attr("readonly", true);
              $(".businessNewActivities").attr(
                "name",
                "businessCurrentActivities"
              );
              $(".businessNewActivities").attr(
                "class",
                "form-control  currentActivity"
              );
              $("#newActivity3").attr("id", "newActivity4");
              $("#businessModal").modal("show");
              $("#businessModalMessage").text("Actividades guardadas");
            },
          });
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      false
    );
  });

  var generalData = $("#generalData");

  // Loop over them and prevent submission
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
            url: "/saveGeneralData",
            data: {
              formData: formData,
            },
            success: function (data, status) {
              $("#businessName").attr("readonly", true);
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

  var accountData = $("#accountData");

  // Loop over them and prevent submission
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
            url: "/saveAccountsData",
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
              $("#traviPassword").attr("readonly", true);
              $("#ccssUser").attr("readonly", true);
              $("#ccssPassword").attr("readonly", true);
              $("#insUser").attr("readonly", true);
              $("#insPassword").attr("readonly", true);
              $("#userCharge").prop("disabled", true);
              $("#editAccountData").css("display", "inline-flex");
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

  // var businessPictureData = $("#businessPictureForm");

  // // Loop over them and prevent submission
  // Array.prototype.slice.call(businessPictureData).forEach(function (form) {
  //   form.addEventListener(
  //     "submit",
  //     function (event) {
  //       if (!form.checkValidity()) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //       }
  //       if (form.checkValidity()) {
  //         var formData = JSON.stringify(
  //           $("#businessPictureForm").serializeArray()
  //         );
  //         formData = JSON.parse(formData);
  //         console.log(formData);
  //         $.ajax({
  //           type: "POST",
  //           url: "/saveBusinessPicture",
  //           data: {
  //             formData: formData,
  //           },
  //           success: function (data, status) {
  //             $("#businessModal").modal("show");
  //             $("#businessModalMessage").text("Logo Guardado");
  //           },
  //         });
  //       }
  //       form.classList.add("was-validated");
  //       event.preventDefault();
  //     },
  //     false
  //   );
  // });
})();
