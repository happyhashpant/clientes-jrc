var accent_map = {
  á: "A",
  é: "e",
  è: "e",
  í: "I",
  ó: "O",
  ú: "U",
  Á: "A",
  É: "E",
  è: "E",
  Í: "I",
  Ó: "O",
  Ú: "U",
};

// Function to remove special character
function accent_fold(s) {
  if (!s) {
    return "";
  }
  var ret = "";
  for (var i = 0; i < s.length; i++) {
    ret += accent_map[s.charAt(i)] || s.charAt(i);
  }
  return ret;
}

// Function to search on table
function searchTable() {
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById("inputSearch");
  filter = input.value.toUpperCase();
  filter = accent_fold(filter);
  console.log(filter);
  table = document.getElementById("table");
  compare = "";
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      compare = accent_fold(td[j]);

      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = "";
      found = false;
    } else {
      tr[i].style.display = "none";
    }
  }
}

function limit(event, value, maxLength) {
  if (value != undefined && value.toString().length >= maxLength) {
    event.preventDefault();
  }
}

// --------------------------------------------------------------------------------------

function editOneUser() {
  $("#inputUserName").attr("readonly", false);
  $("#inputUserEmail").attr("readonly", false);
  $("#inputPhone").attr("readonly", false);
  var saveUserButton = document.createElement("button");
  saveUserButton.setAttribute("class", "btn btn btn-light col-md-12");
  saveUserButton.textContent = "Guardar Usuario";
  $("#editUser").after(saveUserButton);
  $("#editUser").remove();
}

function removeContact(id) {
  $("#" + id).remove();
  j--;
  newContactCount--;
}

function loadUser(user) {
  window.location.replace("/loadUser?userID=" + user);
}
function loadUser2(user) {
  window.location.replace("/loadUser?userID=" + user);
}

// --------------------------------------------------------------------------------------

function loadBusiness(business) {
  window.location.replace("/loadBusiness?businessID=" + business);
}
function loadBusiness2(business) {
  window.location.replace("/loadBusiness?businessID=" + business);
}

// --------------------------------------Edit business functionality

function editGeneralDataDiv() {
  $("#businessName").attr("readonly", false);
  $("#editGeneralData").css("display", "none");
  $("#saveGeneralData").css("display", "inline-flex");
}

function editOwnerData() {
  $(".businessOwnerName").attr("readonly", false);
  $(".ownerIDExpDate").attr("readonly", false);
  $(".ownerBirDate").attr("readonly", false);
  $(".ownerAddress").attr("readonly", false);
  $(".divDeleteButtonOwner").css("display", "block");
  $("#editOwner").css("display", "none");
  $("#saveOwnerDataButton").css("display", "inline-flex");
  $("#addOwnerButton").css("display", "inline-flex");
}

function editAccountsData() {
  $("#atvUser").attr("readonly", false);
  $("#atvPassword").attr("readonly", false);
  $("#billSystem").attr("readonly", false);
  $("#billSystemUser").attr("readonly", false);
  $("#billSystemPassword").attr("readonly", false);
  $("#billEmail").attr("readonly", false);
  $("#billEmailPassword").attr("readonly", false);
  $("#traviUser").attr("readonly", false);
  $("#traviPassword").attr("readonly", false);
  $("#ccssUser").attr("readonly", false);
  $("#ccssPassword").attr("readonly", false);
  $("#insUser").attr("readonly", false);
  $("#insPassword").attr("readonly", false);
  $("#userCharge").prop("disabled", false);
  $("#editAccountData").css("display", "none");
  $("#saveAccountData").css("display", "inline-flex");
}

function editBusinessActivity() {
  $(".divDeleteButton").css("display", "inline-flex");
  $("#addActivity").css("display", "block");
  $(".businessNewActivities").attr("readonly", false);
  $("#saveActivityData").css("display", "inline-flex");
  $("#addActivityButton").css("display", "inline-flex");
  $("#editActivity").css("display", "none");
}

function saveBusinessActivity() {
  $(".divDeleteButton").css("display", "none");
  $(".businessActivities").attr("readonly", true);
  $("#saveActivityData").css("display", "none");
  $("#addActivityButton").css("display", "none");
  $("#editActivity").css("display", "inline-flex");
}

function editBusinessTivData() {
  $("#a").attr("readonly", false);
  $("#b").attr("readonly", false);
  $("#c").attr("readonly", false);
  $("#d").attr("readonly", false);
  $("#e").attr("readonly", false);
  $("#f").attr("readonly", false);
  $("#g").attr("readonly", false);
  $("#h").attr("readonly", false);
  $("#i").attr("readonly", false);
  $("#j").attr("readonly", false);
  $("#k").attr("readonly", false);
  $("#l").attr("readonly", false);
  $("#m").attr("readonly", false);
  $("#n").attr("readonly", false);
  $("#o").attr("readonly", false);

  $("#editTIVButton").css("display", "none");
  $("#saveTIVDataButton").css("display", "inline-flex");
}

function editContactData() {
  $(".contactName").attr("readonly", false);
  $(".contactPhone").attr("readonly", false);
  $(".contactEmail").attr("readonly", false);
  $("#editContactsData").css("display", "none");
  $("#saveContactDataButton").css("display", "inline-flex");
  $(".deleteButtonContact").css("display", "inline-flex");
  $("#addContactButton").css("display", "inline-flex");
}

function editBusinessLogo() {
  $("#businessPicture").prop("disabled", false);
  $("#editBusinessPicture").css("display", "none");
  $("#saveBusinessPicture").css("display", "inline-flex");
  $(".deleteButtonPictures").css("display", "inline-flex");
}

function editBusinessContract() {
  $("#businessContact").prop("disabled", false);
  $("#editBusinessContract").css("display", "none");
  $("#saveBusinessContract").css("display", "inline-flex");
  $(".deleteButtonContract").css("display", "inline-flex");
}

function deleteBusinessFunction(action, businessID, actionID, contactAction) {
  switch (action) {
    case "deleteOwner": {
      $.ajax({
        type: "POST",
        url: "/deleteOwner",
        data: {
          businessID: businessID,
          actionID: actionID,
        },
        success: function (data, status) {
          $("." + actionID).remove();
          $("#businessModal").modal("show");
          $("#businessModalMessage").text(
            "Has eliminado unx representante legal"
          );
        },
      });
      break;
    }
    case "deleteActivity": {
      $.ajax({
        type: "POST",
        url: "/deleteActivity",
        data: {
          businessID: businessID,
          actionID: actionID,
        },
        actionID: actionID,
        success: function (data, status) {
          $(".activity" + actionID).remove();
          $("#businessModal").modal("show");
          $("#businessModalMessage").text("Has eliminado una actividad");
        },
      });
      break;
    }
    case "deletePicture": {
      $.ajax({
        type: "POST",
        url: "/deletePicture",
        data: {
          businessID: businessID,
          actionID: actionID,
        },
        success: function (data, status) {
          $("#picture" + actionID).remove();
          $("#businessModal").modal("show");
          $("#businessModalMessage").text("Has eliminado un logo");
        },
      });
      break;
    }
    case "deleteContract": {
      $.ajax({
        type: "POST",
        url: "/deleteContract",
        data: {
          businessID: businessID,
          actionID: actionID,
        },
        success: function (data, status) {
          $("#contract" + actionID).remove();
          $("#businessModal").modal("show");
          $("#businessModalMessage").text("Has eliminado una cotización");
        },
      });
      break;
    }
    case "deleteContact": {
      $.ajax({
        type: "POST",
        url: "/deleteContact",
        data: {
          businessID: businessID,
          actionID: actionID,
          contactAction: contactAction,
        },
        success: function (data, status) {
          $(".contact" + actionID).remove();
          $("#businessModal").modal("show");
          $("#businessModalMessage").text("Has eliminado un contacto");
        },
      });
      break;
    }
  }
}

function validateNewActivity(activity) {
  $.ajax({
    type: "POST",
    url: "/validateActivity",
    data: {
      activity: activity,
    },
    success: function (data, status) {
      $("#businessModal").modal("show");
      $("#businessModalMessage").text("Has Eliminado una actividad");
    },
  });
}

function validateNewOwner(ownerID) {
  $.ajax({
    type: "GET",
    url: "/validateOwner",
    data: {
      ownerID: ownerID,
    },
    success: function (data, status) {
      $("#businessModal").modal("show");
      $("#businessModalMessage").text("Has Eliminado una actividad");
    },
  });
}
