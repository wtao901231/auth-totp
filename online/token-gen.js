    function dec2hex(s) {
        return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
    }

    function hex2dec(s) {
        return parseInt(s, 16);
    }

    function base32tohex(base32) {
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";

        for (var i = 0; i < base32.length; i++) {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += leftpad(val.toString(2), 5, '0');
        }

        for (var i = 0; i + 4 <= bits.length; i += 4) {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16);
        }
        return hex;

    }

    function leftpad(str, len, pad) {
        if (len + 1 >= str.length) {
            str = Array(len + 1 - str.length).join(pad) + str;
        }
        return str;
    }

    function updatePKey(pin, token, input) {
        var shaObj = new jsSHA("SHA-1", "TEXT");
        shaObj.update(pin + token);
        var hash = shaObj.getHash("HEX").toUpperCase();
        $('#pkey').text(hash);
    }

    function updateOtp() {
        var pin = $('#secret').val();
        var key = base32tohex('6MVDbGu64d24oUNqJtz8EY9xtw8UovkX');
        var epoch = Math.round(new Date().getTime() / 1000.0);
        var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, '0');

        // updated for jsSHA v2.0.0 - http://caligatio.github.io/jsSHA/
        var shaObj = new jsSHA("SHA-1", "HEX");
        shaObj.setHMACKey(key, "HEX");
        shaObj.update(time);
        var hmac = shaObj.getHMAC("HEX");

        var offset = hex2dec(hmac.substring(hmac.length - 1));
        var part1 = hmac.substr(0, offset * 2);
        var part2 = hmac.substr(offset * 2, 8);
        var part3 = hmac.substr(offset * 2 + 8, hmac.length - offset);

        var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
        otp = (otp).substr(otp.length - 6, 6);
        $('#otp').text(otp);
        updatePKey(pin, otp, '123456')
    }

    function timer() {
        var epoch = Math.round(new Date().getTime() / 1000.0);
        var countDown = 30 - (epoch % 30);
        if (epoch % 30 == 0) updateOtp();
        $('#updatingIn').text(countDown);

    }

    $(function() {
        updateOtp();
        timer();

        $('#update').click(function(event) {
            updateOtp();
            event.preventDefault();
        });

        $('#secret').keyup(function() {
            updateOtp();
        });

        setInterval(timer, 1000);
    });