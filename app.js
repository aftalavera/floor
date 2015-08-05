/**
 * Created by aftalavera on 6/5/15.
 */

secret = {};

(function() {

	$('#dialog-form').dialog({
	    autoOpen: false,
	    modal: true,
	    width:375,
	    height:325,
	    title: "EXHIBITOR BOOTH",
	    buttons: [
	        {
	            text: "RESERVE",
	            id: "reserve-button",
	            click: function() {
	                $(this).dialog( "close" );
	            }
	        }
	    ]
	});

	$('#result-form').dialog({
	    autoOpen: false,
	    modal: true,
	    //width:375,
	    //height:375,
	    buttons: [
	        {
	            text: "Close",
	            click: function() {
	                $(this).dialog( "close" );
					location.reload();
	            }
	        }
	    ]
	});

	$.ajax({
	    url: '/floor/get.php',
	    type: 'get',
	    success: function(data) {
	    	console.log(JSON.parse(data));
			var reserved = JSON.parse(data); 
			map_it(reserved);
	    },
	    error: function(data) {
	        console.log("Ajax Error!");
	    }
	}); // end ajax call


	function map_it(reserved) {

        var booth = {
            A: {
                level:    "LEVEL: A",
                size :    "SIZE: 8' x 10'",
                price:    "PRICE: $1,800",
                combo:    "COMBO: 8' x 20' space for $2,700" },
            B: {
                level:    "LEVEL: B",
                size :    "SIZE: 8' x 10'",
                price:    "PRICE: $1,400",
                combo:    "COMBO: 8' x 20' space for $2,100" },
            C: {
                level:    "LEVEL: C",
                size :    "SIZE: 8' x 10'",
                price:    "PRICE: $1,000",
                combo:    "COMBO: 8' x 20' space for $1,500" },
            S: {
                level:    "LEVEL: POP-UP SHOPS",
                size :    "SIZE: 8' x 10'",
                price:    "PRICE: $500",
                combo:    "COMBO: 8' x 20' space for $950" },
			SPONSOR: {
				level:    "LEVEL: SPONSOR",
				size :    "SIZE: 8' x 10'",
				price:    "PRICE: $2,500 (Includes Sponsor Benefits)",
				combo:    "COMBO: 8' x 20' space for $4,800" }
        };


		reserved.forEach(function (el) {
			$("area[alt=" + el + "]")
		    	.data('maphilight', {alwaysOn: true, fillColor: '000000', fillOpacity: .5})
		        .trigger('alwaysOn.maphilight');
		});

		$("area").each(function () {
		    if (reserved.indexOf($(this).attr('alt')) < 0) {
		        $(this).click(function () {
		            $('p#number').text('NUMBER: ' + $(this).attr('alt'))
		                .attr('number', $(this).attr('alt'));

                    $('p#level').text(booth[$(this).attr('class')].level);
                    $('p#size').text(booth[$(this).attr('class')].size);
                    $('p#price').text(booth[$(this).attr('class')].price);
                    $('p#combo').text(booth[$(this).attr('class')].combo);

		            $('#dialog-form').dialog('open');
		        });
		    }
		});
	}

	function add_it(number) {
			$.ajax({
                url: '/floor/add.php',
                type: 'post',
                data: {booth: number},
                success: function(data) {
					console.log("Success!");
                },
                error: function(data) {
                    console.log("Ajax Error!");
                }
            }); // end ajax call
	}

    function delete_it(number) {
        $.ajax({
            url: '/floor/delete.php',
            type: 'post',
            data: {booth: number},
            success: function(data) {
                console.log("Success!");
            },
            error: function(data) {
                console.log("Ajax Error!");
            }
        }); // end ajax call
    }

	var handler = StripeCheckout.configure({
	    key: 'pk_live_lMm5Q9VSV1e38fqEQHta7yW6',
	    token: function(token) {
	        // Use the token to create the charge with a server-side script.
	        // You can access the token ID with `token.id`
	        $.ajax({
	            url: 'https://www.physiqueaustin.com/floor/charge.php',
	            type: 'post',
	            data: {stripeToken: token.id, email: token.email, number: $('p#number').attr('number')},
	            success: function(data) {
	                if (data == 'success') {
	                    console.log("Card successfully charged!");
	                    $('#result-form').dialog('open')
	                        .dialog('option','title','Card accepted')
	                        .find('p').text("Your payment was successful.");
						add_it($('p#number').attr('number'));
	                }
	                else {
	                    console.log(data);
	                    $('#result-form').dialog('open')
	                        .dialog('option','title','Card declined.')
	                        .find('p').text("Your card could not be charged.");

	                }
	            },
	            error: function(data) {
	                console.log("Ajax Error!");
	                $('#result-form').dialog('open')
	                    .dialog('option','title','System error.')
	                    .find('p').text("Your card could not be charged.");
	            }
	        }); // end ajax call
	    }
	});

	$('#reserve-button').on('click', function(e) {
	    // Open Checkout with further options
	    handler.open({
	        name: 'PHYSIQUE',
	        description: 'Booth Reservation (' + $('p#number').attr('number') +')',
	        amount: 50000,
			color: 'pink',
	        image: 'https://www.physiqueaustin.com/floor/physique.png' //after the final move please remove www
	    });
	    e.preventDefault();
	});

	// Close Checkout on page navigation
	$(window).on('popstate', function() {
	    handler.close();
	});

    secret.add=add_it;
    secret.map=map_it;
    secret.delete=delete_it;

})(secret);

