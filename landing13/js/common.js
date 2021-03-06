$(document).ready(function () {
    // getCapcha();
    // getParaMKT();
});


$("#refesh").click(function () {
    getCapcha();
});

function getCapcha() {
    $.ajax({
        type: "GET",
        url: "https://public.consodep.club/captcha",
        success: function (result) {
            var data = $.parseJSON(result);
            $("#idcapcha").val(data.id);
            var linkimg = "data:image/png;base64," + data.img;
            $("#capcha").attr("src", linkimg);
        }
    });
}

function getParaMKT() {
    $("#utmcampain").val(getParameterByName("utm_campaign"));
    $("#utmmedium").val(getParameterByName("utm_medium"));
    $("#utmsource").val(getParameterByName("utm_source"));
}

//validate form
$("#btn_reg").click(function () {
    var arrayDauSo = ["032", "033", "034", "035", "036", "037", "038", "039", "096", "097", "098", "086", "090", "093", "089", "070", "079", "077", "076", "078", "094", "091", "083", "084", "085", "081", "082", "088", "092", "056", "058", "052", "059", "099"];
    var regex = /^[0-9]+$/;
    var checkSpecial = /[A-Za-z0-9_.][*@!#%&()^~{}]+/;
    var dauSdt = $("#username").val().substring(0, 3);
    if ($("#username").val() == "") {
        $("#error").html("Số điện thoại không được để trống!!!");
        $("#username").focus();
    } else if ($("#username").val().length < 10 || $("#username").val().length > 10) {
        $("#error").html("Số điện thoại chỉ bao gồm 10 kí tự!!!");
        $("#username").focus();
    } else if (!regex.test($("#username").val())) {
        $("#error").html("Số điện thoại chỉ bao gồm số!!!");
        $("#username").focus();
    } else if (arrayDauSo.indexOf(dauSdt) < 0) {
        $("#error").html("Bạn nhập đầu số điện thoại không đúng!!!");
        $("#username").focus();
    } else {
        $("#error").html("");
        register();
    }
});

$("#btn_update").click(function () {
    var regex = /^[A-Za-z0-9_.]+$/;

    if ($("#nickname").val() == "") {
        $("#errorNickname").html("Nickname không được để trống");
        $("#nickname").focus();
    } else if ($("#nickname").val().length < 6 || $("#username").val().length > 16) {
        $("#errorNickname").html("Tên tài khoản chứa từ 6 - 16 kí tự");
        $("#nickname").focus();
    } else if (!regex.test($("#nickname").val())) {
        $("#errorNickname").html("Tên tài khoản chỉ gồm chữ cái hoặc số");
        $("#nickname").focus();
    } else {
        $("#errorNickname").html("");
        updateNickname();
    }
});

function updateNickname() {
    $.ajax({
        type: "GET",
        url: "https://public.consodep.club/nickname?",
        data: {
            u: $("#username").val(),
            p: ($("#password").val()),
            n: $("#nickname").val()
        },
        success: function (result) {
            console.log(result);
            console
            var data = $.parseJSON(result);
            if (data.e === 1) {
                $("#errorNickname").html("Lỗi hệ thống");
            }
            if (data.e === 12) {
                $("#errorNickname").html("Lỗi không xác định");
            }
            if (data.e === 46) {
                $("#errorNickname").html("Hệ thống đang bảo trì");
            }
            if (data.e === 3) {
                $("#errorNickname").html("Nickname đã tồn tại");
            }
            if (data.e === 4) {
                $("#errorNickname").html("Tên đăng nhập không tồn tại");
            }
            if (data.e === 5) {
                $("#errorNickname").html("Password không đúng");
            }
            if (data.e === 73) {
                $("#errorNickname").html("Tên đăng nhập không hợp lệ");
            }
            if (data.e === 0) {
                window.localStorage.setItem('User_Current_Info_Login', result);
                setTimeout(function () {
                    window.location = "http://consodep.club"
                }, 1)
            }
        }
    });
}


function register() {
    $.ajax({
        type: "GET",
        url: "http://public.thecao.club/addmobile?",
        data: {
            mobile: $("#username").val(),
        },
        success: function (result) {
            console.log(result);
            var data = $.parseJSON(result);
            if (data.e === 1) {
                $("#error").html("System error !!!");
            }
            if (data.e === 12) {
                $("#error").html("Lỗi tham số !!!");

            }
            if (data.e === 93) {
                $("#error").html("Số điện thoại không đúng !!!");
            }
            if (data.e === 26) {
                $("#error").html("Số điện thoại đã được sử dụng !!!");
            }
            if (data.e === 0) {
                $("#username").val("")
                modal()
            }
        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkmobile() {

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        Windows_Phone: function () {
            return navigator.userAgent.match(/Windows Phone/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // if(isMobile.iOS() ){
    //     setTimeout(function(){location.href="https://consodep.club/download"} , 1);
    // }
    // else if(isMobile.Android() ){
    //     setTimeout(function(){location.href="http://consodep.club"} , 1);
    // }
    // else{
    //     setTimeout(function(){location.href="http://consodep.club?a="+Base64.encode($("#username").val())+"&b="+Base64.encode(md5($("#password").val()))} , 1);
    // }

    setTimeout(function () {
        location.href = "http://consodep.club"
    }, 1);
}

function modal() {
    var modal = document.getElementById("myModal");

// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
    modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}