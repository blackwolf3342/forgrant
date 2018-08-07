const URL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

function minus_add() {
    $('.output').each(function (i, elem) {
        
        var str = $(elem).text();
        // console.log(str.charAt(0));

        if (str.charAt(0) == '-') {
            $(this).addClass('minus');
        } else {
            $(this).removeClass('minus');
        }
    });
}

function currency_char(currency) {
    switch (currency) {
        case 'USD': 
            return '$ ' 
            break;
        case 'EUR': 
            return '&euro; ' 
            break;
        case 'RUB': 
            return '&#x20bd; ' 
            break;
        case 'GBP': 
            return '&#163; '
    }
}

function currency_time(time, type, percent, char) {

    if (percent == true) {
        // return  time.type + currency_char(char);

        switch (type) {
            case 'hour':
                return time.changes.price.hour + currency_char(char);
                break;
            case 'day':
                return time.changes.price.day + currency_char(char);
                break;
            case 'week':
                return time.changes.price.week + currency_char(char);
                break;
            case 'month': 
                return time.changes.price.month + currency_char(char);
                break; 
        }
    } else {
        switch (type) {
            case 'hour':
                return time.changes.percent.hour + '%';
                break;
            case 'day':
                return time.changes.percent.day + '%';
                break;
            case 'week':
                return time.changes.percent.week + '%';
                break;
            case 'month': 
                return time.changes.percent.month + '%';
                break; 
        }
    }
}

function ajax_btc(currency) {
    $.ajax({
        type: 'GET',
        url: URL + 'BTC' + currency,
        dataType: 'json',
        success:function(result){ 
            $('#price-b').html(currency_char(currency) + result.ask);

            if($('#checkbox3').hasClass('percent-false')) {
                $('#b_h').html(currency_time(result, 'hour', true, currency));
                $('#b_d').html(currency_time(result, 'day', true, currency));
                $('#b_w').html(currency_time(result, 'week', true, currency));
                $('#b_m').html(currency_time(result, 'month', true, currency));
            } else {
                $('#b_h').html(currency_time(result, 'hour', false, currency));
                $('#b_d').html(currency_time(result, 'day', false, currency));
                $('#b_w').html(currency_time(result, 'week', false, currency));
                $('#b_m').html(currency_time(result, 'month', false, currency));
            }

            minus_add();

        }
    });
}

function ajax_eth(currency) {
    $.ajax({
        type: 'GET',
        url: URL + 'ETH' + currency,
        dataType: 'json',
        success:function(result){  
            $('#price-e').html(currency_char(currency) + result.ask);
            if($('#checkbox1').hasClass('percent-false')) {
                $('#e_h').html(currency_time(result, 'hour', true, currency));
                $('#e_d').html(currency_time(result, 'day', true, currency));
                $('#e_w').html(currency_time(result, 'week', true, currency));
                $('#e_m').html(currency_time(result, 'month', true, currency));
            } else {
                $('#e_h').html(currency_time(result, 'hour', false, currency));
                $('#e_d').html(currency_time(result, 'day', false, currency));
                $('#e_w').html(currency_time(result, 'week', false, currency));
                $('#e_m').html(currency_time(result, 'month', false, currency));
            }

            minus_add();

        }
    });
}

function ajax_ltc(currency) {
    $.ajax({
        type: 'GET',
        url: URL + 'LTC' + currency,
        dataType: 'json',
        success:function(result){   
            $('#price-l').html(currency_char(currency) + result.ask);
            if($('#checkbox2').hasClass('percent-false')) {
                $('#l_h').html(currency_time(result, 'hour', true, currency));
                $('#l_d').html(currency_time(result, 'day', true, currency));
                $('#l_w').html(currency_time(result, 'week', true, currency));
                $('#l_m').html(currency_time(result, 'month', true, currency));
            } else {
                $('#l_h').html(currency_time(result, 'hour', false, currency));
                $('#l_d').html(currency_time(result, 'day', false, currency));
                $('#l_w').html(currency_time(result, 'week', false, currency));
                $('#l_m').html(currency_time(result, 'month', false, currency));
            }
            minus_add();

        }


    }); 
}


function json_result(currency, place) {
    

    if ($(place).hasClass('e')) {
        ajax_eth(currency);
        console.log('e')
    }
    if ($(place).hasClass('l')){
        ajax_ltc(currency);
        console.log('l')
    }
    if ($(place).hasClass('b')) {
        ajax_btc(currency);


        console.log('b')
    } else {
        ajax_ltc(currency);
        ajax_eth(currency);
        ajax_btc(currency);
    }   

    
}

$(document).ready(function () {
    
    var temp = $('.select-selected').text();

    json_result(temp);

    $('.custom-select').on('click', function () {
        temp = $('.select-selected').text();
        json_result(temp, 'all');
    }) 

    $('input.ios-toggle').on('click', function (e) {
        $(this).toggleClass('percent-false');
        json_result(temp, this);

        console.log(this);
    });


    
});
