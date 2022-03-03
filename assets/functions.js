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

//Function to clone the contact input space
function cloneContact() {
  newContactCount++;
  console.log(j);
  $("#contactDIV1")
    .clone()
    .attr("id", "contactDIV" + newContactCount)
    .insertAfter("#contactDIV1");

  j++;
  console.log(j);
  $("#contactDIV" + j + " #contactRow1").attr("id", "contactRow" + j);
  $("#contactDIV" + j).attr(
    "style",
    "border-top-style: solid; border-color: white;"
  );

  //Clone contactNameInput
  $("#contactRow" + j + " #inputContactName1").attr(
    "id",
    "inputContactName" + j
  );

  $("#inputContactName" + j + " #contactName1").attr("id", "contactName" + j);
  $("#contactName" + j).val("");

  //Clone contactPhoneInput
  $("#contactRow" + j + " #inputContactPhone1").attr(
    "id",
    "inputContactPhone" + j
  );
  $("#inputContactPhone" + j + " #contactPhone1").attr(
    "id",
    "contactPhone" + j
  );
  $("#contactPhone" + j).val("");

  //Clone contactEmailInput
  $("#contactRow" + j + " #inputContactEmail1").attr(
    "id",
    "inputContactEmail" + j
  );
  $("#inputContactEmail" + j + " #contactEmail1").attr(
    "id",
    "contactEmail" + j
  );
  $("#contactEmail" + j).val("");
  //Add contact delete button
  $("#contactDIV" + j + " #contactSecRow1").attr("id", "contactSecRow" + j);
  $("#contactSecRow" + j + " #contactDeleteButtonInput1").attr(
    "id",
    "contactDeleteButtonInput" + j
  );
  $("#contactDeleteButtonInput" + j).append(
    "<button class='btn btn btn-light deleteButton' type='button' id='contactDeleteButton'>Eliminar</button>"
  );

  $("#contactDeleteButtonInput" + j + " #contactDeleteButton").attr(
    "id",
    "contactDeleteButton" + j
  );
  $("#contactDeleteButton" + j).attr(
    "onclick",
    "removeContact('contactDIV" + j + "')"
  );
}

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

function clonOwner() {
  newOwnerCount++;
  $("#ownerDIV1")
    .clone()
    .attr("id", "ownerDIV" + newOwnerCount)
    .insertAfter("#ownerDIV1");

  i++;

  $("#ownerDIV" + i + " #ownerRow1").attr("id", "ownerRow" + i);
  $("#ownerDIV" + i).attr(
    "style",
    "border-top-style: solid; border-color: white;"
  );

  //Clone ownerNameInput
  $("#ownerRow" + i + " #ownerNameInput1").attr("id", "ownerNameInput" + i);
  $("#ownerNameInput" + i + " #businessOwnerName1").attr(
    "id",
    "businessOwnerName" + i
  );
  $("#businessOwnerName" + i).val("");

  //Clone ownerIDInput
  $("#ownerRow" + i + " #ownerIDInput1").attr("id", "ownerIDInput" + i);
  $("#ownerIDInput" + i + " #businessOwnerID1").attr(
    "id",
    "businessOwnerID" + i
  );
  $("#businessOwnerID" + i).val("");

  //Clone ownerIDExpDateInput
  $("#ownerRow" + i + " #ownerIDExpDateInput1").attr(
    "id",
    "ownerIDExpDateInput" + i
  );
  $("#ownerIDExpDateInput" + i + " #ownerIDExpDate1").attr(
    "id",
    "ownerIDExpDate" + i
  );
  $("#ownerIDExpDate" + i).val("");

  $("#ownerDIV" + i + " #ownerSecRow1").attr("id", "ownerSecRow" + i);

  //Clone ownerBirDateToolInput
  $("#ownerSecRow" + i + " #ownerBirDateToolInput1").attr(
    "id",
    "ownerBirDateToolInput" + i
  );
  $("#ownerBirDateToolInput" + i + " #ownerBirDate1").attr(
    "id",
    "ownerBirDate" + i
  );
  $("#ownerBirDate" + i).val("");

  //Clone ownerAddressInput
  $("#ownerSecRow" + i + " #ownerAddressInput1").attr(
    "id",
    "ownerAddressInput" + i
  );
  $("#ownerAddressInput" + i + " #ownerAddress1").attr(
    "id",
    "ownerAddress" + i
  );
  $("#ownerAddress" + i).val("");

  //Add delete button
  $("#ownerDIV" + i + " #ownerThrRow").attr("id", "ownerThrRow" + i);

  $("#ownerThrRow" + i + " #ownerDeleteButtonInput").attr(
    "id",
    "ownerDeleteButtonInput" + i
  );

  $("#ownerDeleteButtonInput" + i).append(
    "<button class='btn btn btn-light deleteButton' type='button' id='ownerDeleteButton'>Eliminar</button>"
  );

  $("#ownerDeleteButtonInput" + i + " #ownerDeleteButton").attr(
    "id",
    "ownerDeleteButton" + i
  );
  $("#ownerDeleteButton" + i).attr(
    "onclick",
    "removeOwner('ownerDIV" + i + "')"
  );
}
function clonOwner2() {
  newOwnerCount++;
  $("#ownerDIV1")
    .clone()
    .attr("id", "ownerDIV" + newOwnerCount)
    .appendTo("#addOwner");

  i++;

  $("#ownerDIV" + i + " #ownerRow")

  //Clone ownerNameInput
  $("#ownerRow" + i + " #ownerRow #ownerNameInput");
  $("#newbusinessOwnerName" + i).val("");
  $("#newbusinessOwnerName" + i).attr("name", "newBusinessOwner");
  $("#newbusinessOwnerName" + i).attr("class", "form-control newInput");

  //Clone ownerIDInput
  $("#ownerRow" + i + " #ownerIDInput").attr("id", "ownerIDInput" + i);
  $("#ownerIDInput" + i + " #businessOwnerID").attr(
    "id",
    "businessOwnerID" + i
  );
  $("#businessOwnerID" + i).val("");
  $("#businessOwnerID" + i).attr("name", "newBusinessOwnerID");
  $("#businessOwnerID" + i).attr("class", "form-control newBusinessOwnerID");

  //Clone ownerIDExpDateInput
  $("#ownerRow" + i + " #ownerIDExpDateInput").attr(
    "id",
    "ownerIDExpDateInput" + i
  );
  $("#ownerIDExpDateInput" + i + " #ownerIDExpDate").attr(
    "id",
    "ownerIDExpDate" + i
  );
  $("#ownerIDExpDate" + i).val("");
  $("#ownerIDExpDate" + i).attr("name", "newOwnerIDExpDate");

  $("#ownerDIV" + i + " #ownerSecRow").attr("id", "ownerSecRow" + i);

  //Clone ownerBirDateToolInput
  $("#ownerSecRow" + i + " #ownerBirDateToolInput").attr(
    "id",
    "ownerBirDateToolInput" + i
  );
  $("#ownerBirDateToolInput" + i + " #ownerBirDate").attr(
    "id",
    "ownerBirDate" + i
  );
  $("#ownerBirDate" + i).val("");
  $("#ownerBirDate" + i).attr("name", "newOwnerBirDate");

  //Clone ownerAddressInput
  $("#ownerSecRow" + i + " #ownerAddressInput").attr(
    "id",
    "ownerAddressInput" + i
  );
  $("#ownerAddressInput" + i + " #ownerAddress").attr("id", "ownerAddress" + i);
  $("#ownerAddress" + i).val("");
  $("#ownerAddress" + i).attr("name", "newOwnerAddress");

  //Add delete button
  $("#ownerDIV" + i + " #ownerThrRow").attr("id", "ownerThrRow" + i);

  $("#ownerThrRow" + i + " #ownerDeleteButtonInput").attr(
    "id",
    "ownerDeleteButtonInput" + i
  );

  $("#ownerDeleteButtonInput" + i).append(
    "<button class='btn btn btn-light deleteButtonOwner' type='button' id='ownerDeleteButton'>Eliminar</button>"
  );

  $("#ownerDeleteButtonInput" + i + " #ownerDeleteButton").attr(
    "id",
    "ownerDeleteButton" + i
  );
  $("#ownerDeleteButton" + i).attr(
    "onclick",
    "removeOwner('ownerDIV" + i + "')"
  );
}

//Remove Owner
function removeOwner(id) {
  $("#" + id).remove();
  i--;
  newOwnerCount--;
}

function loadBusiness(business) {
  window.location.replace("/loadBusiness?businessID=" + business);
}
function loadBusiness2(business) {
  window.location.replace("/loadBusiness?businessID=" + business);
}

function cloneActivity() {
  newActivityCount++;
  $("#activityDIV1")
    .clone()
    .attr("id", "activityDIV" + newActivityCount)
    .insertAfter("#activityDIV1");
  z++;
  $("#activityDIV" + z + " #activitySecRow").attr("id", "activitySecRow" + z);
  $("#activitySecRow" + z + " #activityDeleteButtonInput").attr(
    "id",
    "activityDeleteButtonInput" + z
  );
  $("#activityDIV" + z).attr(
    "style",
    "border-top-style: solid; border-color: white; padding-top: 5px; padding-bottom: 5px"
  );

  $("#activityDeleteButtonInput" + z).append(
    "<button class='btn btn btn-light deleteButton' type='button' id='activityDeleteButton'>Eliminar</button>"
  );

  $("#activityDeleteButtonInput" + z + " #activityDeleteButton").attr(
    "id",
    "activityDeleteButton" + z
  );
  $("#activityDeleteButton" + z).attr(
    "onclick",
    "removeActivity('activityDIV" + z + "')"
  );
}
function cloneActivity2() {
  newActivityCount++;
  $("#activityDIV1")
    .clone()
    .attr("id", "activityDIV" + newActivityCount)
    .appendTo("#addActivity");
  z++;
  $("#activityDIV" + z + " #activitySecRow").attr("id", "activitySecRow" + z);
  $("#activitySecRow" + z + " #activityDeleteButtonInput").attr(
    "id",
    "activityDeleteButtonInput" + z
  );

  $("#activityDIV" + z + " #activityFrRow1 #activityColum #newActivity").attr(
    "id",
    "newActivity2"
  );
  $("#newActivity2").attr("readonly", false);
  $("#newActivity2").attr("id", "newActivity3");
  $("#newActivity3").val("");
  $("#newActivity3").attr("class", "form-control businessNewActivities");
  $("#newActivity3").attr("name", "businessNewActivities");
  $("#newActivity3").attr("id", "newActivity4");

  $("#activityDIV" + z).attr(
    "style",
    "border-top-style: solid; border-color: white;"
  );

  $("#activityDeleteButtonInput" + z).append(
    "<button class='btn btn btn-light deleteButton' type='button' id='activityDeleteButton'>Eliminar</button>"
  );

  $("#activityDeleteButtonInput" + z + " #activityDeleteButton").attr(
    "id",
    "activityDeleteButton" + z
  );
  $("#activityDeleteButton" + z).attr(
    "onclick",
    "removeActivity('activityDIV" + z + "')"
  );
}
function removeActivity(id) {
  $("#" + id).remove();
  z--;
  newActivityCount--;
}

function editGeneralDataDiv() {
  $("#businessName").attr("readonly", false);
  $("#editGeneralData").after(
    "<button class='edit' form='generalData' id='editGeneralData'><i class='material-icons' style='font-size:36px'>sd_card</i></button>"
  );
  $("#editGeneralData").css("display", "none");
}

function editOwnerData() {
  $(".businessOwnerName").attr("readonly", false);
  $(".businessOwnerID").attr("readonly", false);
  $(".ownerIDExpDate").attr("readonly", false);
  $(".ownerBirDate").attr("readonly", false);
  $(".ownerAddress").attr("readonly", false);
  $(".divDeleteButtonOwner").css("display", "block");
  $(".editOwner").after(
    "<button type='button' class='edit' form='generalData' id='addGeneralDataButton' onclick='clonOwner2()'><i class='material-icons' style='font-size:36px'>add</i></button>"
  );
  $(".editOwner").after(
    "<button class='edit' type='submit' form='ownerData' id='saveOwnerDataButton'><i class='material-icons'>sd_card</i></button>"
  );
  $(".editOwner").css("display", "none");
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
  $("#userCharge").attr("readonly", false);

  $(".editAccountData").after(
    "<button class='edit' form='accountData' id='editAccountData'><i class='material-icons'>sd_card</i></button>"
  );
  $(".editAccountData").remove();
}

function editBusinessActivity() {
  $(".divDeleteButton").css("display", "block");
  $("#addActivity").css("display", "block");
  $(".businessNewActivities").attr("readonly", false);
  $(".deleteButton").css("display", "block");
  $(".editActivity").after(
    "<button type='button' class='edit' form='generalData' id='editCloneActivity' onclick='cloneActivity2()'><i class='material-icons' style='font-size:36px'>add</i></button>"
  );
  $(".editActivity").after(
    "<button class='edit' type='submit' form='businessActivity' id='editSaveBusinessActivity'><i class='material-icons'>sd_card</i></button>"
  );
  $(".editActivity").css("display", "none");
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

  $(".editTIV").after(
    "<button class='edit' form='tivData' id='editTivData'><i class='material-icons'>sd_card</i></button>"
  );
  $(".editTIV").remove();
}

function editContactData() {
  $("#contactName").attr("readonly", false);
  $("#contactPhone").attr("readonly", false);
  $("#contactEmail").attr("readonly", false);
  $(".editContactsData").after(
    "<button type='button' class='edit' form='generalData' id='editGeneralData' onclick='editAddNewContact()'><i class='material-icons' style='font-size:36px'>add</i></button>"
  );
  $(".editContactsData").after(
    "<button class='edit' type='button' form='userData' id='editUserData' onclick=''><i class='material-icons'>sd_card</i></button>"
  );
  $(".editContactsData").remove();
}

function editAddNewOwner() {}

function editAddNewContact() {}

function deleteOwnerAjx(businessID, businesOwnerID) {
  $.ajax({
    type: "POST",
    url: "/deleteOwner",
    data: {
      businessID: businessID,
      businesOwnerID: businesOwnerID,
    },
    success: function (data, status) {
      $("." + businesOwnerID).remove();
      $("#businessModal").modal("show");
      $("#businessModalMessage").text("Has eliminado unx representante legal");
    },
  });
}
function deleteActivityAjx(businessID, businesActivityID, businessActivityID) {
  $.ajax({
    type: "POST",
    url: "/deleteActivity",
    data: {
      businessID: businessID,
      businessActivityID: businessActivityID,
      businesActivityID: businesActivityID,
    },
    success: function (data, status) {
      $("#" + businessActivityID).remove();
      $("#businessModal").modal("show");
      $("#businessModalMessage").text("Has eliminado una actividad");
    },
  });
}

function saveGeneralDataAjx() {
  var formData = JSON.stringify($("#businessActivity").serializeArray());
  formData = JSON.parse(formData);
  $.ajax({
    type: "POST",
    url: "/saveBusinessActivity",
    data: {
      formData: formData,
    },
    success: function (data, status) {
      window.location.reload;
      // $("#editCloneActivity").css("display", "none");
      // $("#editSaveBusinessActivity").css("display", "none");
      // $(".businessNewActivities").attr("readonly", true);
      // $(".divDeleteButton").css("display", "none");
      // $("#editActivity").css("display", "inline");
      // $("#businessModal").modal("show");
      // $("#businessModalMessage").text("Actividades guardadas");
    },
  });
}
