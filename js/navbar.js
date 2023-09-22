




let hiddenNavWidth = $("nav .hiddenNav").outerWidth(true);
$("nav").css("left" ,-hiddenNavWidth)

 function openMenu() {
    if ($("nav").css("left") == "0px") {
        closeMenu();
    }

    else {
        $("nav").animate({ left: 0 }, 600)
        $(".toggel-icon").removeClass("fa-align-justify ")
        $(".toggel-icon").addClass("fa-xmark")
    }
}


function closeMenu() {


    $("nav").animate({ left: -hiddenNavWidth }, 600)
    $(".toggel-icon").removeClass("fa-xmark")
    $(".toggel-icon").addClass("fa-align-justify")
}



$("nav .toggel-icon").click(() => {
    openMenu();
})