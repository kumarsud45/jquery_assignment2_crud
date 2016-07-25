(function(){

			$('#count').hide();
			$('#create').hide();
			var title=$("#s").val();	
				$.ajax({
					type:'GET',
					url:'http://localhost:8080/emp',
					success: function(data) {

						// console.log(data);
						var trHTML = '';
						var c=1;
						for(var i=0;i<data.length;i++)
						{ 
							
							trHTML = '<tr><td>'+data[i].id+'</td><td>'+data[i].name+'</td><td>'+data[i].gender+'</td><td>'+data[i].age+'</td><td>'+data[i].eyeColor+'</td><td>'+data[i].company+'</td><td>'+data[i].email+'</td><td>'+data[i].phone+'</td><td><button href="#myModal" data-toggle="modal" class="btn btn-info" id="up'+c+'">Update</button></td><td><button class="btn btn-danger" id="dl'+c+'">Delete</button></td></tr>';

							$('#info').append(trHTML);

							$('div#count td button#up'+c).addClass("bt"+data[i].id);

							$('div#count td button.bt'+data[i].id+'').click(function(){
								var x=$(this).attr('class');
								
								x=parseInt(x.substring(15));
								// var a=parseInt(x,10);
								console.log(x);
								
								$.ajax({
								type:'GET',
								url:'http://localhost:8080/emp/'+x,
								success: function(data) {
											$('div#myModal div.modal-body input#ID').val(x);
											$('div#myModal div.modal-body input#Name').val(data.name);
											$('div#myModal div.modal-body input#Gender').val(data.gender);
											$('div#myModal div.modal-body input#Age').val(data.age);
											$('div#myModal div.modal-body input#EyeColor').val(data.eyeColor);
											$('div#myModal div.modal-body input#Company').val(data.company);
											$('div#myModal div.modal-body input#Email').val(data.email);
											$('div#myModal div.modal-body input#Phone').val(data.phone);

							}});//end of inner ajax
								// console.log("hi"+x);

							});//end of button update

							$('div#count td button#dl'+c).addClass("bt"+data[i].id);

							//button delete start
							$('div#count td button#dl'+c+'').click(function(){
								var x=$(this).attr('class');
								console.log(x);
								x=parseInt(x.substring(17));
								console.log(x);
								
								$.ajax({
										type: 'DELETE', 
									    dataType: 'json', // Set datatype - affects Accept header
									    url: "http://localhost:8080/emp/"+x, // A valid URL
									    headers: {"Content-Type": "application/json"}, // 
									 });//end of inner ajax

								console.log('deleted');

							});// end of delete button

							c++;
							
						}//for end
					}// end of success
				});//end of ajax

				$('button#update').click(function(){

				 	var id=parseInt($('div#myModal div.modal-body input#ID').val());
				 	var name=$('div#myModal div.modal-body input#Name').val();
				 	var gender=$('div#myModal div.modal-body input#Gender').val();
					var age=parseInt($('div#myModal div.modal-body input#Age').val());
					var eyeColor=$('div#myModal div.modal-body input#EyeColor').val();
					var company=$('div#myModal div.modal-body input#Company').val();
					var email=$('div#myModal div.modal-body input#Email').val();
					var phone=$('div#myModal div.modal-body input#Phone').val();

					$.ajax({
					    type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
					    dataType: 'json', // Set datatype - affects Accept header
					    url: "http://localhost:8080/emp/"+id, // A valid URL
					    headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
					    data: JSON.stringify({
					    	id: id,
					    	name: name,
					    	gender: gender,
					    	age: age,
					    	eyeColor: eyeColor,
					    	company: company,
					    	email: email,
					    	phone: phone

					    }) // Some data e.g. Valid JSON as a string
					});
					alert("Successfully updated");
				});//end of click button#update





				

			}());// end of anonymous function


			$(".tab").click(function(){
				$('#create').hide();
				$('#count').show();
				
			});

			$(".add").click(function(){
				$('#count').hide();
				$('#create').show();
				// console.log($(".add"));
				// console.log($('div#count td button#up'+1+''));	

				console.log($('div#myModal div.modal-body input#Name'));	
			});

			//creating new data
				$('button#new').click(function(){

				 	var name=$('div#create input#Name').val();
				 	var gender=$('div#create input#Gender').val();
					var age=parseInt($('div#create input#Age').val());
					var eyeColor=$('div#create input#EyeColor').val();
					var company=$('div#create input#Company').val();
					var email=$('div#create input#Email').val();
					var phone=$('div#create input#Phone').val();

					// console.log(name);

					$.ajax({
					    type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
					    dataType: 'json', // Set datatype - affects Accept header
					    url: "http://localhost:8080/emp", // A valid URL
					    headers: {"Content-Type": "application/json"}, // X-HTTP-Method-Override set to PUT.
					    data: JSON.stringify({
					    	name: name,
					    	gender: gender,
					    	age: age,
					    	eyeColor: eyeColor,
					    	company: company,
					    	email: email,
					    	phone: phone

					    }) // Some data e.g. Valid JSON as a string
					    
					});
					alert("Successfully created a data");

				});//end of click button#new