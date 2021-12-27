export function fetchCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * 
 * @param {String} name 
 * @param {String} value 
 * @param {String} days Optional
 */
export function addCookie(name, value, days) {
    console.log("cookie added", value)
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


export function removeCookie(name) {
    addCookie(name, '', -1000000);
    document.cookie = name + "=;expires=" + -10000000 + "; path=/;domain=goflex.ng";
    return window.location = '/';
}