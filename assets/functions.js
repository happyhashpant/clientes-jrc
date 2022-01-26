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

function addContactFields() {
  console.log(j);

  var container = document.getElementById("addContact");

  var div = document.createElement("div");
  div.setAttribute("class", "row");
  div.id = "contactName" + j;

  var div2 = document.createElement("div");
  div2.setAttribute("class", "col-md-4");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "col-md-4");

  var div4 = document.createElement("div");
  div4.setAttribute("class", "col-md-4");

  var div5 = document.createElement("div");
  div5.setAttribute("class", "col-md-4");

  var inputContactName = document.createElement("input");

  inputContactName.type = "text";
  inputContactName.name = "contactName" + j;

  inputContactName.setAttribute("class", "form-control");
  inputContactName.setAttribute("placeHolder", "Nombre");
  inputContactName.setAttribute(
    "onfocus",
    "validate(value, '#spanContactName" + j + "')"
  );
  inputContactName.setAttribute(
    "onkeyup",
    "validate(value, '#spanContactName" + j + "')"
  );

  var spanContactName = document.createElement("span");
  spanContactName.className = "tooltipText";
  spanContactName.id = "spanContactName" + j;
  spanContactName.textContent = "Requerido";

  var inputContactPhone = document.createElement("input");

  inputContactPhone.type = "number";
  inputContactPhone.name = "Número Telefónico" + j;

  inputContactPhone.setAttribute("class", "form-control");
  inputContactPhone.setAttribute("placeHolder", "Numero Telefonico");
  inputContactPhone.setAttribute(
    "onfocus",
    "validate(value, '#spanContactPhone" + j + "')"
  );
  inputContactPhone.setAttribute(
    "onkeyup",
    "validate(value, '#spanContactPhone" + j + "')"
  );
  var spanContactPhone = document.createElement("span");
  spanContactPhone.className = "tooltipText";
  spanContactPhone.id = "spanContactPhone" + j;
  spanContactPhone.textContent = "Requerido";

  var inputContactEmail = document.createElement("input");

  inputContactEmail.type = "email";
  inputContactEmail.name = "contactEmail" + j;

  inputContactEmail.setAttribute("class", "form-control");
  inputContactEmail.setAttribute("placeHolder", "Correo Electrónico");

  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn btn-light deleteButton");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("onclick", "removeContact('contactName" + j + "')");
  deleteButton.textContent = "Eliminar";

  div2.appendChild(inputContactName);
  div2.appendChild(spanContactName);
  div3.appendChild(inputContactPhone);
  div3.appendChild(spanContactPhone);
  div4.appendChild(inputContactEmail);
  div5.appendChild(deleteButton);
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  div.appendChild(div5);

  container.appendChild(div);
  j++;
}
function cloneContact() {
  $("#addContactDIV")
    .clone()
    .attr("id", "addContactDIV" + i)
    .append("#addContactDIV");
}

function removeContact(id) {
  var input = document.getElementById(id);
  input.remove();
}
function removeOwner(id) {
  $("#" + id).remove();
  i--;
  newOwnerCount--;
  oldOwnerCount--;
}

function loadUser(user) {
  window.location.replace("/loadUser?userID=" + user);
}
function loadUser2(user) {
  window.location.replace("/loadUser?userID=" + user);
}
function loadBusiness(business) {
  window.location.replace("/loadBusiness?businessID=" + business);
}
function loadBusiness2(business) {
  window.location.replace("/loadBusiness?businessID=" + business);
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

function clonOwner() {
  newOwnerCount++;
  $("#ownerDIV1")
    .clone()
    .attr("id", "ownerDIV" + newOwnerCount)
    .insertAfter("#ownerDIV1");

  i++;
  // console.log(i);

  $("#ownerDIV" + i + " #ownerRow1").attr("id", "ownerRow" + i);

  //Clone ownerNameInput
  $("#ownerRow" + i + " #ownerNameInput1").attr("id", "ownerNameInput" + i);
  $("#ownerNameInput" + i + " #businessOwnerName1").attr(
    "id",
    "businessOwnerName" + i
  );
  $("#ownerNameInput" + i + " #ownerNameTool1").attr("id", "ownerNameTool" + i);
  $("#businessOwnerName" + i).attr("name", "businessOwnerName" + i);
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
  $("#ownerIDInput" + i + " #businessOwnerID1").attr(
    "name",
    "businessOwnerID" + i
  );
  $("#ownerIDInput" + i + " #ownerIDTool1").attr("id", "ownerIDTool" + i);
  $("#businessOwnerID" + i).attr("name", "businessOwnerID" + i);
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
  $("#ownerIDExpDate" + i).attr("name", "ownerIDExpDate" + i);
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
  $("#ownerBirDate" + i).attr("name", "ownerBirDate" + i);
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
  $("#ownerAddress" + i).attr("name", "ownerAddressInput" + i);
  $("#ownerAddress" + i).attr(
    "onkeyup",
    "validate(value, '#addressTool" + i + "')"
  );

  $("#ownerDIV" + i + " #ownerThrRow").attr("id", "ownerThrRow" + i);

  //Add delete button
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
  oldOwnerCount++;
}


