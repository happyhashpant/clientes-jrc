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
  table = document.getElementById("userTable");
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

function validate(value, msg) {
  if (value == "") {
    $(msg).css("visibility", "visible");
    setTimeout(function () {
      $(msg).css("visibility", "hidden");
    }, 3000);
  }
}

function validateNumber(value, msg) {
  if (value == "") {
    $(msg).css("visibility", "visible");
    setTimeout(function () {
      $(msg).css("visibility", "hidden");
    }, 3000);
  }
}
function validateTIV(value, msg, msg2) {
  if (value == "" || value.length < 2) {
    $(msg).css("color", "red");
    $(msg2).css("visibility", "visible");
  } else {
    $(msg).css("color", "white");
    $(msg2).css("visibility", "hidden");
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

  //Clone contactNameInput
  $("#contactRow" + j + " #inputContactName1").attr(
    "id",
    "inputContactName" + j
  );
  $("#inputContactName" + j + " #contactName1").attr("id", "contactName" + j);
  $("#inputContactName" + j + " #contactNameTool1").attr(
    "id",
    "contactNameTool" + j
  );
  $("#contactName" + j).attr(
    "onfocus",
    "validate(value, '#contactNameTool" + j + "')"
  );
  $("#contactName" + j).attr(
    "onkeyup",
    "validate(value, '#contactNameTool" + j + "')"
  );
  $("#inputContactName" + j + " #contactNameTool1").attr(
    "id",
    "inputContactName" + j
  );

  //Clone contactPhoneInput
  $("#contactRow" + j + " #inputContactPhone1").attr(
    "id",
    "inputContactPhone" + j
  );
  $("#inputContactPhone" + j + " #contactPhone1").attr(
    "id",
    "contactPhone" + j
  );
  $("#inputContactPhone" + j + " #contactPhoneTool1").attr(
    "id",
    "contactPhoneTool" + j
  );
  $("#contactPhone" + j).attr(
    "onfocus",
    "validate(value, '#contactPhoneTool" + j + "')"
  );
  $("#contactPhone" + j).attr(
    "onkeyup",
    "validate(value, '#contactPhoneTool" + j + "')"
  );
  $("#inputContactPhone" + j + " #contactPhoneTool1").attr(
    "id",
    "inputContactPhone" + j
  );

  //Clone contactEmailInput
  $("#contactRow" + j + " #inputContactEmail1").attr(
    "id",
    "inputContactEmail" + j
  );
  $("#inputContactEmail" + j + " #contactEmail1").attr(
    "id",
    "contactEmail" + j
  );
  $("#inputContactEmail" + j + " #contactEmailTool1").attr(
    "id",
    "contactEmailTool" + j
  );
  $("#contactEmail" + j).attr(
    "onfocus",
    "validate(value, '#contactEmailTool" + j + "')"
  );
  $("#contactEmail" + j).attr(
    "onkeyup",
    "validate(value, '#contactEmailTool" + j + "')"
  );
  $("#inputContactEmail" + j + " #contactEmailTool1").attr(
    "id",
    "inputContactEmail" + j
  );
  //Add contact delete button
  $("#contactDIV" + j + " #contactSecRow1").attr("id", "contactSecRow" + j);
  $("#contactSecRow" + j + " #contactDeleteButtonInput1").attr(
    "id",
    "contactDeleteButtonInput" + j
  );
  1;
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

  //Clone ownerNameInput
  $("#ownerRow" + i + " #ownerNameInput1").attr("id", "ownerNameInput" + i);
  $("#ownerNameInput" + i + " #businessOwnerName1").attr(
    "id",
    "businessOwnerName" + i
  );
  $("#ownerNameInput" + i + " #ownerNameTool1").attr("id", "ownerNameTool" + i);
  $("#businessOwnerName" + i).attr(
    "onfocus",
    "validate(value, '#ownerNameTool" + i + "')"
  );
  $("#businessOwnerName" + i).attr(
    "onkeyup",
    "validate(value, '#ownerNameTool" + i + "')"
  );
  $("#ownerNameInput" + i + " #ownerNameTool1").attr(
    "id",
    "ownerNameInput" + i
  );

  //Clone ownerIDInput
  $("#ownerRow" + i + " #ownerIDInput1").attr("id", "ownerIDInput" + i);
  $("#ownerIDInput" + i + " #businessOwnerID1").attr(
    "id",
    "businessOwnerID" + i
  );
  $("#ownerIDInput" + i + " #ownerIDTool1").attr("id", "ownerIDTool" + i);
  $("#businessOwnerID" + i).attr(
    "onfocus",
    "validateNumber(value, '#ownerIDTool" + i + "')"
  );
  $("#businessOwnerID" + i).attr(
    "onkeyup",
    "validateNumber(value, '#ownerIDTool" + i + "')"
  );

  //Clone ownerIDExpDateInput
  $("#ownerRow" + i + " #ownerIDExpDateInput1").attr(
    "id",
    "ownerIDExpDateInput" + i
  );
  $("#ownerIDExpDateInput" + i + " #ownerIDExpDate1").attr(
    "id",
    "ownerIDExpDate" + i
  );
  $("#ownerIDExpDateInput" + i + " #expDateTool1").attr(
    "id",
    "expDateTool" + i
  );
  $("#ownerIDExpDate" + i).attr(
    "onfocus",
    "validate(value, '#expDateTool" + i + "')"
  );
  $("#ownerIDExpDate" + i).attr(
    "onkeyup",
    "validate(value, '#expDateTool" + i + "')"
  );

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
  $("#ownerBirDateToolInput" + i + " #birDateTool1").attr(
    "id",
    "birDateTool" + i
  );
  $("#ownerBirDate" + i).attr(
    "onfocus",
    "validate(value, '#birDateTool" + i + "')"
  );
  $("#ownerBirDate" + i).attr(
    "onkeyup",
    "validate(value, '#birDateTool" + i + "')"
  );

  //Clone ownerAddressInput
  $("#ownerSecRow" + i + " #ownerAddressInput1").attr(
    "id",
    "ownerAddressInput" + i
  );
  $("#ownerAddressInput" + i + " #ownerAddress1").attr(
    "id",
    "ownerAddress" + i
  );
  $("#ownerAddressInput" + i + " #addressTool1").attr("id", "addressTool" + i);
  $("#ownerAddress" + i).attr(
    "onfocus",
    "validate(value, '#addressTool" + i + "')"
  );
  $("#ownerAddress" + i).attr(
    "onkeyup",
    "validate(value, '#addressTool" + i + "')"
  );

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
