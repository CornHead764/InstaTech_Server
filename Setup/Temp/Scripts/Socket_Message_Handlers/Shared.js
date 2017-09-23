﻿function handleSessionEnded(e) {
    if (InstaTech.Socket_Main.readyState == 1) {
        window.setTimeout(function () {
            handleSessionEnded(e);
        }, 500);
        return;
    }
    var message = "Your session has ended.";
    if (e.Details) {
        message += "<br/><br/>" + e.Details;
    }
    showDialog("Session Ended", message);
}

function handleTechMainLogin(e) {
    if (e.Status == "new required") {
        $("#inputTechMainConfirmNewPassword, #inputTechMainNewPassword").attr("required", true);
        $("#inputTechMainConfirmNewPassword, #inputTechMainNewPassword").parent("td").parent("tr").show();
        return;
    }
    else if (e.Status == "ok") {
        clearCachedCreds();
        InstaTech.Context = "Technician";
        InstaTech.UserID = $("#inputTechMainUserID").val();
        InstaTech.AuthenticationToken = e.AuthenticationToken;
        InstaTech.LoggedIn = true;
        if (document.getElementById("inputTechMainRememberMe").checked) {
            localStorage["RememberMe"] = true;
            localStorage["UserID"] = InstaTech.UserID;
            localStorage["AuthenticationToken"] = InstaTech.AuthenticationToken;
        }
        if ($("#inputTechMainNewPassword").is(":visible")) {
            $("#inputTechMainConfirmNewPassword, #inputTechMainNewPassword").removeAttr("required");
            $("#inputTechMainConfirmNewPassword, #inputTechMainNewPassword").parent("td").parent("tr").hide();
        }
        $("#divMainTechLoginForm").slideUp();
        setMainLoginFrame();
        $("#divTechPortal .portal-button-frame").show();
        $("#divTechLoginNotice").remove();
        if (e.Access != "Admin")
        {
            $(".portal-option-button[opens='#divAccountCenter']").remove();
            $(".portal-option-button[opens='#divConfiguration']").remove();
        }
    }
    else if (e.Status == "invalid") {
        clearCachedCreds();
        showDialog("Incorrect Credentials", "The user ID or password is incorrect.  Please try again.");
        return;
    }
    else if (e.Status == "expired") {
        clearCachedCreds();
        $("#spanMainLoginStatus").html("<small>Not logged in.</small>");
        $("#inputTechMainPassword").val("");
        $("#aMainTechLogOut").hide();
        $("#aMainTechLogIn").show();
        showDialog("Token Expired", "Your login token has expired, likely due from logging in on another browser.  Please log in again.");
        return;
    }
    else if (e.Status == "locked") {
        clearCachedCreds();
        showDialog("Account Locked", "Your account as been locked due to failed login attempts.  It will unlock automatically after 10 minutes.  Please try again later.");
        return;
    }
    else if (e.Status == "temp ban") {
        clearCachedCreds();
        showDialog("Temporary Ban", "Due to failed login attempts, you must refresh your browser to try again.");
        return;
    }
    else if (e.Status == "password mismatch") {
        showDialog("Password Mismatch", "The passwords you entered don't match.  Please retype them.");
        return;
    }
    else if (e.Status == "password length") {
        showDialog("Password Length", "Your new password must be between 8 and 20 characters long.");
        return;
    }
}
function handleForgotPassword(e) {
    if (e.Status == "invalid") {
        showDialog("Invalid User ID", "The user ID couldn't be found.");
    }
    else if (e.Status == "noemail") {
        showDialog("No Email", "There is no email address on file for this account.  Please contact your system administrator.");
    }
    else if (e.Status == "error") {
        showDialog("Error Sending Email", "There was an error sending the email.  Please contact your system administrator.");
    }
    else if (e.Status == "ok") {
        showDialog("Password Reset Successful", "A temporary password has been sent to your email.  Please check your inbox.");
    }
}
function handleGetSupportCategories(e) {
    $('#' + e.ElementID).html("");
    for (var i = 0; i < e.Categories.length; i++) {
        var category = e.Categories[i];
        var option = document.createElement("option");
        option.value = category;
        option.innerHTML = category;
        $('#' + e.ElementID)[0].options.add(option);
    }
    $('#' + e.ElementID)[0].selectedIndex = -1;
    if ($('#' + e.ElementID + "-button").length > 0) {
        $('#' + e.ElementID).selectmenu("refresh");
        $('#' + e.ElementID + "-button").find(".ui-selectmenu-text").html("");
    }
}
function handleGetSupportTypes(e) {
    $('#' + e.ElementID).html("");
    for (var i = 0; i < e.Types.length; i++) {
        var type = e.Types[i];
        var option = document.createElement("option");
        option.value = type;
        option.innerHTML = type;
        $('#' + e.ElementID)[0].options.add(option);
    }
    $('#' + e.ElementID)[0].selectedIndex = -1;
    if ($('#' + e.ElementID + "-button").length > 0) {
        $('#' + e.ElementID).selectmenu("refresh");
        $('#' + e.ElementID + "-button").find(".ui-selectmenu-text").html("");
    }
}
function handleGetSupportQueue(e) {
    $('#' + e.ElementID).val(e.SupportQueue);
}
function handleGetAllComputerGroups(e) {
    if (e.Status == "ok") {
        InstaTech.ComputerGroups = e.ComputerGroups;
    }
}
function handleNewLogin(e) {
    clearCachedCreds();
    showDialog("Logged Out", "You have been logged out due to a login from another browser.");
}