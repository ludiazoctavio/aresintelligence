$( document ).ready(function() {
    $(".spinner-grow").hide();
});

var dataPrint = function (data) { /* Imprimir resultados al cliente */
    if (data.data_sum.length == 0) {
    	setTimeout(function(){
	        $('.resul').html("No se encontraron resulatados para la potencia "+data.value);
	        $(".spinner-grow").hide();
        }, 500);
    }else{
        var html_result = "";
        var separateVal = function (value) {
            var res = '';
            $.each(value.toString().split(''), function(ind,val) {
                res += ' + ' + val + '<sup>'+data.value+'</sup>';
            });
            return res.slice(2);
        };
        $.each(data.data_sum, function( index, value ) {
          html_result += value + ' = ' +separateVal(value)+'<br>';
        });
        setTimeout(function(){
        	$('.resul').html(html_result);
        	$(".spinner-grow").hide();
    	}, 1000);
    }
};

var calculate = function () { /* Ajax para calcular la potencia seleccionada */
    var sel = document.getElementById('FormControlSelect1');
    $('.resul').html('');
    $.ajax({
        type: 'POST',
        url: '{% url 'calculate' %}',
        data: {
            'value': sel.value,
            csrfmiddlewaretoken: '{{ csrf_token }}'
        },
        success : function(data) {
            dataPrint(data);
        },
        error: function(xhr, errmsg, err) {
            console.log('Error en el servidor')
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
};

/* Ajax louding */

$(document).ajaxStart(function(){
  $(".spinner-grow").show();
});