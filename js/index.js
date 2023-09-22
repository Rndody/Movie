$(document).ready(() => {
    getMovies("trending/movie/day").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
scroll();
//* ------------------------------NAV BAR------------------------------------ 
// var lis = document.querySelectorAll("li");
// console.log(lis)
// for (var i = 0; i < lis; i++){
//     lis[i].addEventListener("click",function(e){
//         console.log(e);
//         var menuListValue=e.target.getAttribute("data-list")
// //    getMovies(menuListValue);
// console.log("hi")
//     })
// }
let hiddenNavWidth = $("nav .hiddenNav").outerWidth(true);
$("nav").css("left", -hiddenNavWidth)

function openMenu() {
    if ($("nav").css("left") == "0px") {
        closeMenu();
    }
    else {
        $("nav").animate({ left: 0 }, 600)
        $(".toggel-icon").removeClass("fa-align-justify ")
        $(".toggel-icon").addClass("fa-xmark")

        // $("nav ul").css("height","auto")
        for (let i = 0; i < 6; i++) {
            $(".hiddenNav ul li").eq(i).animate({ top: 0, opacity: 1 }, (i + 1.5) * 100)
        }

    }
}

function closeMenu() {
    $("nav").animate({ left: -hiddenNavWidth }, 600)
    $(".toggel-icon").removeClass("fa-xmark")
    $(".toggel-icon").addClass("fa-align-justify")

    // $(".hiddenNav ul li").animate({ top: 300 }, 600)



    for (let i = 5; i >= 0; i--) {
        $(".hiddenNav ul li").eq(i).animate({ top: 250, opacity: 0 }, (6 - i) * 100)
    }

}


$("nav .toggel-icon").click(() => {
    openMenu();
})


    //* ------------------------------ANIMATION------------------------------------ 

    $(".movieCard").mouseenter(function () {
        hover()
    });


$(".movieCard").mouseleave(function () {
    exitHover()
});

let title = $('[data-layer="title"]')
let discription = $('[data-layer="discription"]')
let date = $('[data-layer="date"]')
let vote = $('[data-layer="vote"]')
let stars = $('[data-layer="stars"]')

function hover() {
    title.addClass("animate__fadeInDown");
    discription.addClass("animate__flipInX ");
    date.addClass("animate__fadeInUp");
    vote.addClass("animate__fadeInUp");
    stars.addClass("animate__fadeInUp");

    title.removeClass("animate__slideOutLeft");
    discription.removeClass("animate__slideOutLeft");
    date.removeClass("animate__slideOutLeft");
    vote.removeClass("animate__slideOutLeft");
    stars.removeClass("animate__slideOutLeft");
}
function exitHover() {

    title.removeClass("animate__fadeInDown");
    discription.removeClass("animate__flipInX ");
    date.removeClass("animate__fadeInUp");
    vote.removeClass("animate__fadeInUp");
    stars.removeClass("animate__fadeInUp");

    title.addClass("animate__slideOutLeft");
    discription.addClass("animate__slideOutLeft");
    date.addClass("animate__slideOutLeft");
    vote.addClass("animate__slideOutLeft");
    stars.addClass("animate__slideOutLeft");



}

function scroll()
{
    $(window).scroll(backToTop);
    function backToTop()
    {
        if (window.pageYOffset > 100) {
            $('#back-to-top').addClass("active");
            } else {
            $('#back-to-top').removeClass("active");   
        }
    }
}
//* ------------------------------SEARCH------------------------------------ 
//  let searchValue=$("#search").val();
// console.log(searchValue);
async function search(term) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=755b61a9a3e9b20216dab1726122620a&language=en-US&include_adult=false`)
    response = await response.json();

    display(response.results);
    console.log(response.results);

}

//* ------------------------------CALCULATE STARS------------------------------------ 

function calcStars(avgNum) {
    let starsCartona = ``;
    switch (avgNum) {
        case (avgNum < 1):
            starsCartona += ` <i class="fa-regular fa-star"></i>`
            break;
        case 1:
            starsCartona += ` <i class="fa-solid fa-star"></i>`
            break;
        case (avgNum < 2):
            starsCartona += `<i class="fa-solid fa-star"></i> <i class="fa-solid fa-star-half-stroke"></i>`
            break;
        case 2:
            for (let i = 0; i <= 1; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            break;
        case (avgNum < 3):
            for (let i = 0; i <= 1; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            starsCartona += ` <i class="fa-solid fa-star-half-stroke"></i>`;
            break;
        case 3:
            for (let i = 0; i <= 2; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            break;
        case (avgNum < 4):
            for (let i = 0; i <= 2; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            starsCartona += ` <i class="fa-solid fa-star-half-stroke"></i>`;
            break;
        case 4:
            for (let i = 0; i <= 3; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            break;
        case (avgNum < 5):
            for (let i = 0; i <= 3; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            starsCartona += ` <i class="fa-solid fa-star-half-stroke"></i>`;
            break;
        case 5:
            for (let i = 0; i < 5; i++) {
                starsCartona += `<i class="fa-solid fa-star "></i>`;
            }
            break;
    }
    return starsCartona;
}
// console.log(calcStars(2.5));
//* ------------------------------DISPLAY MOVIES------------------------------------ 

function display(arr) {

    const imgPrefix = `https://image.tmdb.org/t/p/w500/`;
    let sora;

    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        let voteAvg = arr[i].vote_average / 2;
        let starsCartona = calcStars(voteAvg)
        // console.log(starsCartona)
        if (arr[i].poster_path == null) {
            sora = "sewar/default-movie.jpg"
        }
        else {
            sora = imgPrefix + arr[i].poster_path;
        }
        cartona += `
        <div class="col-lg-4 col-md-6 ">
                <div class="movieCard position-relative">

                    <img src="${sora} "class="img-fluid">

                    <div class="layer p-3 position-absolute">
                        <h1 class=" animate__animated text-center" data-layer="title">${arr[i].title.split(" ").slice(0, 4).join(" ") || arr[i].name}</h1>
                        <p class=" animate__animated  " data-layer="discription">${arr[i].overview.split(" ").slice(0, 35).join(" ") || ""}</p>
                        <p class=" animate__animated  " data-layer="date">Release Date: ${arr[i].release_date}  </p>
                        <h3 class=" animate__animated  " data-layer="stars">${starsCartona} </h3>
                        <h3 class="animate__animated  rounded-circle d-flex justify-content-center align-items-center "
                            data-layer="vote">${arr[i].vote_average.toFixed(1)}</h3>
                            
                    </div>
                </div>  
            </div>
           
        `
        // console.log(calcStars(voteAvg))
        $(".displayMovies").html(cartona);
        $(".movieCard").mouseenter(hover);
        $(".movieCard").mouseleave(exitHover);


    }
}

//* ------------------------------GET MOVIES------------------------------------ 

async function getMovies(term) {
    let response = await fetch(`https://api.themoviedb.org/3/${term}?api_key=755b61a9a3e9b20216dab1726122620a&language=en-US&include_adult=false`)
    response = await response.json();

    display(response.results);
    // console.log(response.results);

}
// getMovies("trending/all/day")





//* ------------------------------validation------------------------------------ 

submitBtn = document.getElementById("submitBtn")


document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})



let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}







