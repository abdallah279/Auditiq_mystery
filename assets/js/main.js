// loader js
$(window).on("load", function () {
  $(".loader-container").delay(300).fadeOut(1000);
});

// Active Link
$(".links .link").each(function () {
  if (window.location.href.includes($(this).attr("href"))) {
    $(this).addClass("active");
    if($(this).parents(".nav-collapse")){
      $(this).parents(".nav-collapse").addClass("active").find('.coll-open').addClass("active");
      $(this).parents(".collapse-content").slideDown();
    }
  }
});

// Show And Hide Search Navbar
$(".nav-search-ic").on("click", function () {
  $(".nav-search").toggleClass("open");
});

// SideBar
$(".side-open").on("click", function () {
  $(".sidebar-m").addClass("active");
  $(".overlay-m").fadeIn(600);
});

$(".side-user-open").on("click", function () {
  $(".sidebar").addClass("active");
  $(".overlay-m").fadeIn(600);
});

$(".close").on("click", function () {
  $(".links").removeClass("active");
  $(".overlay-m").fadeOut(500);
});

$(".overlay-m").on("click", function () {
  // $(".links").removeClass("active");
  $(".sidebar-m").removeClass("active");
  $(this).fadeOut(500);
});

// dropDown stopPropagation
$(".dropdown-menu").click(function (e) {
  e.stopPropagation();
});

// PassWord Show In Setting Page
const iconsPassSet = document.querySelectorAll(".pass-icon");

if (iconsPassSet) {
  iconsPassSet.forEach((ic) => {
    ic.addEventListener("click", function () {
      let input = ic.parentElement.querySelector("input");
      showPassword(input, ic);
    });
  });
}

// Function To Show And Hide Password
function showPassword(input, icon) {
  if (input.type == "password") {
    input.setAttribute("type", "text");
    // icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  } else {
    input.setAttribute("type", "password");
    // icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  }

  icon.classList.toggle("show");
}

let isRtl = $('html[lang="ar"]').length > 0;

// Normal Select To
$(".select").select2({
  dir: isRtl ? "rtl" : "ltr",
  minimumResultsForSearch: Infinity,
});

/************ Code Modal ***********/
$(document).ready(function () {
  let codes = document.querySelectorAll(".code");

  $(".code-container .code").first().focus();
  codes.forEach((code, idx) => {
    code.addEventListener("keydown", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        codes[idx].value = "";
        if ([idx + 1] < codes.length) {
          setTimeout(() => codes[idx + 1].focus(), 10);
        }
      } else if (e.key === "Backspace") {
        setTimeout(() => codes[idx - 1].focus(), 10);
      }
    });
  });
});

/************ tabs ***********/
$(".tabs-show").css("display", "none");
getProFromLocal();

$(".tabs-m").on("click", function (e) {
  e.preventDefault();

  // FadeOut All Content
  $(".tabs-show").fadeOut(0);
  let item = $(this).attr("data-show");

  // Show Current Content
  $(`.${item}`).fadeIn();

  // Active Class In Tabs
  $(".tabs-m").removeClass("active").parent().removeClass("active");
  $(this).addClass("active").parent().addClass("active");

  // Set Item
  addLocal(item);

  $(".overlay-m").click();
});

// Add activeTab To Local storage
function addLocal(tab) {
  sessionStorage.setItem("activeTab", JSON.stringify(tab));
}

// Remove activeTab To Local storage
function removeLocal() {
  sessionStorage.removeItem("activeTab");
}

// Get activeTab From Local Storage
function getProFromLocal() {
  let data = sessionStorage.getItem("activeTab");

  // Check if Theres activeTab In Local Storage
  if (data) {
    activeTab = JSON.parse(data);
    $(`.${activeTab}`).fadeIn();
    $(".tabs-m").removeClass("active").parent().removeClass("active");
    $(`[data-show=${activeTab}]`)
      .addClass("active")
      .parent()
      .addClass("active");
  } else {
    $(".show-form").fadeIn(0).addClass("active");
  }
}

// Fade Out Section
$(".close-services").on("click", function (e) {
  e.preventDefault();
  $(this).closest(".services-det-item").fadeOut();
  $(".tabs-m").removeClass("active").parent().removeClass("active");
  removeLocal();
});

$("[data-pass]").on("click", function () {
  let item = $(this).attr("data-pass");

  // Set Item
  addLocal(item);
});

// Show And Hide NavBar collapse
$(document).ready(function () {
  $(".coll-open").click(function (e) {
    e.preventDefault();
    if ($(this).parent(".nav-collapse").hasClass("active")) {
      $(this).removeClass("active");
      $(this).next(".collapse-content").slideUp();
      $(this).parent(".nav-collapse").removeClass("active");
    } else {
      $(".nav-collapse").removeClass("active");
      $(".collapse-content").slideUp();
      $(this).parent(".nav-collapse").addClass("active");
      $(".coll-open").removeClass("active");
      $(this).addClass("active");
      $(this).next(".collapse-content").slideDown();
    }
  });
});
