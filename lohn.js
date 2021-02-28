// ANIMATONS

//Darken background image on scroll
let lastPosition = 0;
let ticking = false;
function darken(scrollPos) {
    if (document.getElementsByClassName("background-image")[0]) {
        if (scrollPos <= 200) {
            document.getElementsByClassName("background-image")[0].style.opacity = 1;
        } else {
            document.getElementsByClassName("background-image")[0].style.opacity = 0;
        }
    }

}
window.addEventListener('scroll', function (e) {
    lastPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(function () {
            darken(lastPosition);
            ticking = false;
        });

        ticking = true;
    }
});

function hide(x) {
    x.style.visibility = "hidden";
    x.style.overflow = "hidden";
    x.style.border = "none";
    x.style.width = "0px";
    x.style.height = "0px";
}

function openLanguages(x) {
    x.classList.toggle("languagebtn-pressed");
    document.getElementsByClassName("hamburger")[0].classList.remove("change");
    document.getElementsByClassName("hideable-link-wrapper")[0].classList.toggle("show");
    document.getElementsByClassName("hideable-link-wrapper")[1].classList.remove("show");
    console.log("openLanguages called");
}

function openHamburger(x) {
    x.classList.toggle("change");
    document.getElementsByClassName("languageIconWrapper")[0].classList.remove("languagebtn-pressed");
    document.getElementsByClassName("hideable-link-wrapper")[1].classList.toggle("show");
    document.getElementsByClassName("hideable-link-wrapper")[0].classList.remove("show");
    console.log("openHamburger called");
}

function closeHamburger() {
    document.getElementsByClassName("hamburger")[0].classList.remove("change");
    document.getElementsByClassName("languageIconWrapper")[0].classList.remove("languagebtn-pressed");
    document.getElementsByClassName("hideable-link-wrapper")[1].classList.remove("show");
    document.getElementsByClassName("hideable-link-wrapper")[0].classList.remove("show");
    console.log("closeHamburger called");

}

function closeLanguages() {
    document.getElementsByClassName("languageIconWrapper")[0].classList.remove("languagebtn-pressed");
    document.getElementsByClassName("hamburger")[0].classList.remove("change");
    document.getElementsByClassName("hideable-link-wrapper")[0].classList.remove("show");
    document.getElementsByClassName("hideable-link-wrapper")[1].classList.remove("show");
    console.log("closeLanguages called");

}

function getConstructedURL(subPage) {
    switch (subPage) {
        case "home":
            if (window.localStorage.getItem("jsonLanguageCode").localeCompare("HU") !== 0) {
                return window.localStorage.getItem("jsonLanguageCode");
            }
            return "";
        case "team":
            return subPageURLs["team"][languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode"))];
        case "expertise":
            return subPageURLs["expertise"][languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode"))];
        case "contact":
            return subPageURLs["contact"][languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode"))];
        case "legal":
            return subPageURLs["legal"][languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode"))];
    }
    return subPage;
}

function modifyHistoryStack(state, title, url) {
    if (historyMode == "push") {
        history.pushState(state, title, url);
    } else {
        history.replaceState(state, title, url);
    }
}

function mouseOverTile(x) {
    x.classList.add("bigtile");
    x.childNodes[1].src = "expertise-photos/" + x.childNodes[1].id + ".jpg";
}

function mouseOut(x) {
    x.classList.remove("bigtile");
    x.childNodes[1].src = "expertise-photos/" + x.childNodes[1].id + "-bw.jpg";
}

function scrollToExpertise() {
    createAndInserTemplate("homepageContentTemplate", "main-content-section", dataObjectGlobal);
    document.getElementById("map").appendChild(googleMapsScript);
    document.getElementById("szakteruletek").scrollIntoView(true);
    document.getElementsByTagName("title")[0].innerHTML = dataObjectGlobal.generalData.expertiseButton + " | " + dataObjectGlobal.generalData.firmName;
    document.getElementsByClassName("background-image")[0].style.opacity = 0;
    let url = getConstructedURL("expertise");
    modifyHistoryStack(url, "", url);
    console.log("Pushed " + url);
    try {
        initMap();
    }
    catch (err) {
        console.log(err);
    }
}

function scrollToContacts() {
    createAndInserTemplate("homepageContentTemplate", "main-content-section", dataObjectGlobal);
    document.getElementById("map").appendChild(googleMapsScript);
    document.getElementById("contact-wrapper").scrollIntoView(true);
    document.getElementsByTagName("title")[0].innerHTML = dataObjectGlobal.generalData.footerContactsHeader + " | " + dataObjectGlobal.generalData.firmName;
    document.getElementsByClassName("background-image")[0].style.opacity = 0;
    let url = getConstructedURL("contact");
    modifyHistoryStack(url, "", url);
    console.log("Pushed " + url);
    try {
        initMap();
    }
    catch (err) {
        console.log(err);
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function showProfileDropdown(x, elementId) {
    document.getElementById(elementId).classList.toggle("card-expand");
    x.classList.toggle("card-img-thumbnail-pressed");

}


// GOOGLE MAPS

var googleMapsScript = document.createElement('script');
googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyATyvTDlUmR9o_1tVNqMSyx0stPzvJpjeg&v=weekly&callback=initMap&libraries=places&v=beta&map_ids=e4c80722b99a2313';
googleMapsScript.defer = true;

function initMap() {
    let myLatLng = {
        lat: 47.492094,
        lng: 19.057145
    };
    map = new google.maps.Map(document.getElementById("map"), {
        mapId: "e4c80722b99a2313",
        center: myLatLng,
        zoom: 16,
        disableDefaultUI: true
    });
    let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Lohn Ügyvédi Iroda',
        draggable: true,
        animation: google.maps.Animation.DROP,

    });
    marker.addListener('click', toggleBounce);
    
    function toggleBounce() {
        window.location.href = dataObjectGlobal.generalData.googleMapsLink;
    }
};


// HANDLEBARS IMPLEMENTATION

function createAndInserTemplate(templateId, destinationId, dataObject) {
    if (document.getElementById(destinationId) !== null &&
        document.getElementById(templateId) !== null) {
        var myRawTemplate = document.getElementById(templateId).innerHTML;
        var myCompiledTemplate = Handlebars.compile(myRawTemplate);
        var ourGeneratedHTML = myCompiledTemplate(dataObject);
        document.getElementById(destinationId).innerHTML = ourGeneratedHTML;
        updateLanguageAttribute();
    }
}


// DYNAMIC PAGE LOAD METHODS

// homepage

function loadHomepage(dataObject) {
    console.log("loadhomepage called");
    createAndInserTemplate("homepageContentTemplate", "main-content-section", dataObject);
    let url = getConstructedURL("home");
    modifyHistoryStack(url, "", "/" + url);
    console.log("Pushed " + url);
    closeHamburger();
    closeLanguages();
    document.getElementById("map").appendChild(googleMapsScript);
    document.getElementsByTagName("title")[0].innerHTML = dataObject.generalData.firmName + " " + dataObject.generalData.firmType;
    try {
        initMap();
    }
    catch (err) {
        console.log(err);
    }
}
function loadHomepageFromStoredObject() {
    loadHomepage(dataObjectGlobal);
    document.getElementById("main-content-section").scrollIntoView(true);
}

// team page

function loadTeamPage(dataObject) {
    createAndInserTemplate("myTeamTemplate", "main-content-section", dataObject);
    document.getElementsByTagName("title")[0].innerHTML = dataObject.generalData.teamButton + " | " + dataObject.generalData.firmName;
    let url = getConstructedURL("team");
    modifyHistoryStack(url, "", url);
    console.log("Pushed " + url);
    closeHamburger();
    closeLanguages();
}
function loadTeamPageFromStoredObject() {
    loadTeamPage(dataObjectGlobal);
    document.getElementById("main-content-section").scrollIntoView(true);
}

// field page

function loadFieldPage(dataObject, id) {
    createAndInserTemplate("singleExpertiseTemplate", "main-content-section", dataObject);

    for (i = 0; i < dataObject.expertiseData.length; i++) {
        if (dataObject.expertiseData[i].id == id) {
            document.getElementById("team-card-wrapper-" + dataObject.expertiseData[i].expertId1).classList.remove("hidden");
            document.getElementById("team-card-wrapper-" + dataObject.expertiseData[i].expertId2).classList.remove("hidden");
            document.getElementsByTagName("title")[0].innerHTML = dataObject.expertiseData[i].name + " | " + dataObject.generalData.firmName;
            break;
        }
    }
    document.getElementById(id).classList.remove("hidden");
    let url = getConstructedURL(id);
    modifyHistoryStack(url, "", url);
    console.log("Pushed " + url);
    closeHamburger();
    closeLanguages();

}
function loadFieldPageFromStoredObject(id) {
    loadFieldPage(dataObjectGlobal, id);
    document.getElementById("main-content-section").scrollIntoView(true);
}

// profile page
function loadProfilePage(dataObject, id) {
    for (i = 0; i < dataObject.teamData.length; i++) {
        if (dataObject.teamData[i].id == id) {
            document.getElementsByTagName("title")[0].innerHTML = dataObject.teamData[i].name + " | " + dataObject.generalData.firmName;
            createAndInserTemplate("profileTemplate", "main-content-section", dataObject.teamData[i]);
            break;
        }
    }
    let url = getConstructedURL(id);
    modifyHistoryStack(url, "", url);
    console.log("Pushed " + url);
    closeHamburger();
    closeLanguages();
}
function loadProfilePageFromStoredObject(id) {
    loadProfilePage(dataObjectGlobal, id);
    document.getElementById("main-content-section").scrollIntoView(true);
}

// legal notice page
function loadLegalNoticePage(dataObject) {
    createAndInserTemplate("legalNoticeTemplate", "main-content-section", dataObject.generalData);
    document.getElementsByTagName("title")[0].innerHTML = id + " | " + dataObject.generalData.legalButtonText;
    let url = getConstructedURL("home");
    modifyHistoryStack(url, "", url);
    console.log("Pushed " + url);
    closeHamburger();
    closeLanguages();
}
function loadLegalNoticePageFromStoredObject() {
    loadLegalNoticePage(dataObjectGlobal);
    document.getElementById("main-content-section").scrollIntoView(true);
}


// CUSTOM HISTORY NAVIGATION

var previousPopstateEvent = {
    state: ""
};

window.addEventListener('popstate', (event) => {
    console.log("window.addEventListener('popstate', (event)");
    historyMode = "replace";
    if (event.state == null) {
        console.log("window.history.back()");
        window.history.back();
    } else {
        checkPageToLoad(dataObjectGlobal, event.state, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode")))
    }
    historyMode = "push";
});

// LANGUAGE CHANGE 

function loadSecondaryLanguage(newLanguageCode) {
    window.localStorage.setItem("jsonLanguageCode", newLanguageCode);
    var subDirectoryName = window.location.href.split("/")[window.location.href.split("/").length - 1];
    console.log(window.localStorage.getItem("jsonLanguageCode"));
    if(newLanguageCode == "HU"){
        location.reload();
    } 
    if (subDirectoryName.localeCompare("") == 0) {
        loadPageByExtension(dataObjectGlobal, window.localStorage.getItem("jsonLanguageCode"), true, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode")));
    } else {
        loadPageByExtension(dataObjectGlobal, subDirectoryName, true, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode")));
    }
}

function updateLanguageAttribute() {
    // update lang attributes for all html elements conatining text 
    for (i = 0; i < document.getElementsByClassName("serif").length; i++) {
        document.getElementsByClassName("serif")[i].lang = dataObjectGlobal.generalData.mainLanguageCode;
    }
    for (i = 0; i < document.getElementsByClassName("sans-serif").length; i++) {
        document.getElementsByClassName("sans-serif")[i].lang = dataObjectGlobal.generalData.mainLanguageCode;
    }
    // keep names in Hungarian
    for (i = 0; i < document.getElementsByClassName("name").length; i++) {
        document.getElementsByClassName("name")[i].lang = "HU";
    }
    document.getElementById("languageCode").lang = "HU";
    // keep language labels with different lang attributes
    document.getElementById(dataObjectGlobal.generalData.languageCode1 + "-menuitem").lang = dataObjectGlobal.generalData.language1;
    document.getElementById(dataObjectGlobal.generalData.languageCode2 + "-menuitem").lang = dataObjectGlobal.generalData.language2;
    document.getElementById(dataObjectGlobal.generalData.languageCode3 + "-menuitem").lang = dataObjectGlobal.generalData.language3;
    document.getElementById(dataObjectGlobal.generalData.languageCode4 + "-menuitem").lang = dataObjectGlobal.generalData.language4;
}

function dataLoad(url, loadedFileName, jsonLanguageCode) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url + loadedFileName + jsonLanguageCode + ".json");
        console.log(url + loadedFileName + jsonLanguageCode + ".json");
        request.onload = function () {
            if (request.status === 200) {
                resolve(request.responseText);
            } else {
                reject(Error('Data didn\'t load successfully; error code:' + request.statusText));
            }
        };
        request.onerror = function () {
            reject(Error('There was a network error.'));
        };
        request.send();
    });
}

function parseJsonAndLoadData() {
    return Promise.all(
        jsonsToDownload.map(item => dataLoad(jsonUrl, item, window.localStorage.getItem("jsonLanguageCode")))
    ).then(results => {
        let resultObject = {};
        for (var i = 0; i < jsonsToDownload.length; i++) {
            resultObject[jsonsToDownload[i]] = JSON.parse(results[i]);
        }
        dataObjectGlobal = resultObject;
        return resultObject;
    });
}


// load http requested page

function loadNavAndFooter(dataObject) {
    createAndInserTemplate("navbarTemplate", "navbar", dataObject);
    console.log("navbar loaded");
    createAndInserTemplate("footerTemplate", "footer", dataObject);
    console.log("footer loaded");
}

function checkPageToLoad(dataObject, subPage, initialLanguageIndex) {
    console.log("checkPageToLoad()");
    var flag = checkIfSubPageAndLanguageMatch(dataObject, subPage, initialLanguageIndex);
    console.log(flag);
    if (flag) {
        console.log("first if fulfilled");
        loadPageByExtension(dataObject, subPage, false, initialLanguageIndex);
    } else {
        if (subPage.localeCompare("") == 0) {
            loadPageByExtension(dataObject, window.localStorage.getItem("jsonLanguageCode"), true, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode")));
        }
        for (let index = 0; index < languageCodes.length; index++) {
            var flag2 = checkIfSubPageAndLanguageMatch(dataObject, subPage, languageCodes[index]);
            var flag3 = checkIfSubPageAndLanguageMatch(dataObject, window.localStorage.getItem("jsonLanguageCode"), languageCodes[index]);
            if (flag2 || flag3) {
                window.localStorage.setItem("jsonLanguageCode", languageCodes[index]);
                if (subPage.localeCompare("") == 0) {
                    loadPageByExtension(dataObject, window.localStorage.getItem("jsonLanguageCode"), true, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode")));
                    return;
                }
                loadPageByExtension(dataObject, subPage, true, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode")));
                return;
            }
        }
    }

}

function checkIfSubPageAndLanguageMatch(dataObject, subPage, languageIndex) {
    console.log("checkIfSubPageAndLanguageMatch()");
    flag = false;
    if (
        (subPage.localeCompare("") == 0 && window.localStorage.getItem("jsonLanguageCode").localeCompare("HU") == 0)
        || subPage.localeCompare(window.localStorage.getItem("jsonLanguageCode")) == 0
        || subPage.localeCompare(subPageURLs["team"][languageIndex]) == 0
        || subPage.localeCompare(subPageURLs["expertise"][languageIndex]) == 0
        || subPage.localeCompare(subPageURLs["contact"][languageIndex]) == 0
        || subPage.localeCompare(subPageURLs["legal"][languageIndex]) == 0
    ) {
        flag = true;
    }
    dataObject.expertiseData.forEach(field => {
        if (subPage.localeCompare(field.id) == 0) {
            console.log(subPage);
            console.log(field.id);
            flag = true;
        }
    });
    dataObject.teamData.forEach(member => {
        if (subPage.localeCompare(member.id) == 0) {
            flag = true;
        }
    });
    return flag;
}

function loadPage(dataObject, isNewDataLoadNeeded, pageLoadFunction, additionalFunction) {
    console.log("loadPage()");
    if (isNewDataLoadNeeded) {
        parseJsonAndLoadData().then(resultObject => {
            loadNavAndFooter(resultObject);
            pageLoadFunction(resultObject);
            additionalFunction();
        });
    } else {
        pageLoadFunction(dataObject);
        additionalFunction();
    }

}

function loadPageByExtension(dataObject, subPage, isNewDataLoadNeeded, languageIndex) {
    console.log("loadPageByExtension()");
    console.log("subPage" + subPage);
    for (let index = 0; index < languageCodes.length; index++) {
        if (subPage.localeCompare(subPageURLs.team[index]) == 0) {
            subPage = subPageURLs.team[languageIndex];
        } else if (subPage.localeCompare(subPageURLs.expertise[index]) == 0) {
            subPage = subPageURLs.expertise[languageIndex];
        } else if (subPage.localeCompare(subPageURLs.contact[index]) == 0) {
            subPage = subPageURLs.contact[languageIndex];
        } else if (subPage.localeCompare(subPageURLs.legal[index]) == 0) {
            subPage = subPageURLs.legal[languageIndex];
        }

    }

    console.log("subPageTranslated" + subPage);
    loadNavAndFooter(dataObject);
    if (subPage.localeCompare("") == 0
        || subPage.localeCompare("EN") == 0
        || subPage.localeCompare("DE") == 0
        || subPage.localeCompare("RU") == 0) {
        loadPage(dataObject, isNewDataLoadNeeded, loadHomepage, scrollToTop);
        return;
    } else if (subPage.localeCompare(subPageURLs.team[languageIndex]) == 0) {
        loadPage(dataObject, isNewDataLoadNeeded, loadTeamPage, scrollToTop);
        return;
    } else if (subPage.localeCompare(subPageURLs.expertise[languageIndex]) == 0) {
        loadPage(dataObject, isNewDataLoadNeeded, loadHomepage, scrollToExpertise);
        return;
    } else if (subPage.localeCompare(subPageURLs.contact[languageIndex]) == 0) {
        loadPage(dataObject, isNewDataLoadNeeded, loadHomepage, scrollToContacts);
        return;
    } else if (subPage.localeCompare(subPageURLs.legal[languageIndex]) == 0) {
        loadPage(dataObject, isNewDataLoadNeeded, loadLegalNoticePage, scrollToTop);
        return;
    } else {
        console.log("Try individual pages");
        for (let index = 0; index < dataObject.expertiseData.length; index++) {
            if (subPage.localeCompare(dataObject.expertiseData[index].id) == 0) {
                if (isNewDataLoadNeeded) {
                    parseJsonAndLoadData().then(resultObject => {
                        loadNavAndFooter(resultObject);
                        loadFieldPage(resultObject, dataObject.expertiseData[index].id);
                        scrollToTop();
                        return;
                    });
                } else {
                    loadFieldPage(dataObject, dataObject.expertiseData[index].id);
                    scrollToTop();
                    return;
                }
            }
        }
        for (let index = 0; index < dataObject.teamData.length; index++) {
            if (subPage.localeCompare(dataObject.teamData[index].id) == 0) {
                if (isNewDataLoadNeeded) {
                    parseJsonAndLoadData().then(resultObject => {
                        loadNavAndFooter(resultObject);
                        loadProfilePage(resultObject, dataObject.teamData[index].id);
                        scrollToTop();
                        return;
                    });
                } else {
                    loadProfilePage(dataObject, dataObject.teamData[index].id);
                    scrollToTop();
                    return;
                }
            }
        }
    }
}



//DECLARE GLOBAL VARIABLES

//JSON files can be found at this location
const jsonUrl = "/data/"
var jsonsToDownload = ["generalData", "teamData", "expertiseData"];
//window.localStorage.setItem("jsonLanguageCode", "none");
var dataObjectGlobal;
var languageCodes = ["HU", "EN", "DE", "RU"];
var subPageURLs = {
    team: [
        "munkatarsak",
        "team",
        "experten",
        "team-ru"
    ],
    expertise: [
        "szakteruletek",
        "expertise",
        "sachverstand",
        "expertise-ru"
    ],
    contact: [
        "kapcsolat",
        "contact",
        "kontakt",
        "contact-ru"
    ],
    legal: [
        "jogi-nyilatkozat",
        "legal-statement",
        "rechtliche-aussage",
        "legal-statement-ru"
    ]
};

let historyMode = "push";

//GET USER COUNTRY AND LANGUAGE

function getUserCountryCode() {
    return new Promise(function (resolve, reject) {
        // Use this for testing: fetch('/data/countryCodeTest.json')
        fetch('https://extreme-ip-lookup.com/json/')
            .then(res => res.json())
            .then(response => resolve(response.countryCode))
            .catch((status) => reject(Error('User country request failed:' + status)))
    });
}

function getUserLanguage() {
    return new Promise(function (resolve, reject) {
        getUserCountryCode()
            .then(userCountryCode => {
                if (userCountryCode == "HU") {
                    resolve("HU");
                } else if (
                    userCountryCode == "DE"
                    || userCountryCode == "AT"
                    || userCountryCode == "BE"
                    || userCountryCode == "CH"
                    || userCountryCode == "LU"
                    || userCountryCode == "LI"
                ) {
                    resolve("DE");
                } else if (
                    userCountryCode == "RU"
                    || userCountryCode == "BY"
                    || userCountryCode == "KZ"
                    || userCountryCode == "KG"
                    || userCountryCode == "TJ"
                ) {
                    resolve("RU");
                } else {
                    resolve("EN");
                }
            })
            .catch(() => reject(Error('Language classification failed:')));
    });
}


//LOAD PAGE

window.onload = function () {
    getUserLanguage().then(userLanguage => {
        console.log(window.localStorage.getItem("jsonLanguageCode"));
        if (window.localStorage.getItem("jsonLanguageCode") == undefined) {
            window.localStorage.setItem("jsonLanguageCode", userLanguage);
        }
        console.log("userLanguage is " + userLanguage);
        var subDirectoryName = window.location.href.split("/")[window.location.href.split("/").length - 1];
        parseJsonAndLoadData().then(resultObject => checkPageToLoad(resultObject, subDirectoryName, languageCodes.indexOf(window.localStorage.getItem("jsonLanguageCode"))));
    });

}
