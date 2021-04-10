const apiUrl="https://api.spacexdata.com/v3/launches?limit=100";


$(document).ready(function(){
    getData("all");
});

function filterSelection(year) {
    $("#year").val(year);
    $(".card__wrapper").remove();
    getData("filter",year);
}

function suceessfullunch(action) {
    var year= $("#year").val();
    $(".card__wrapper").remove();	
    getData("filter",year,action);
}

function suceessfullanding(action) {
    var year= $("#year").val();
    $(".card__wrapper").remove();	
    getData("filter",year,false,action);
}

function contents(data){
    var card ='';

    data.forEach(function(element){
        card += '<div class="card__wrapper '+element.launch_year+'"><div class="card__image"><img src="'+element.links.mission_patch_small+'" alt="'+element.mission_name+'"></div><div class="card__name">'+element.mission_name+' # '+element.flight_number+'</div><div class="card__title">Mission Ids: <ul><li>'+element.mission_id+'</li></ul></div><div class="card__title year">Launch Year: <span>'+element.launch_year+'</span></div><div class="card__title">Successful Launch: <span>'+element.launch_success+'</span></div><div class="card__title">Successful Landing: <span></span></div></div>'
    });	

    return card;
}


function getData(dataFor,year,launchSuccess=false,launchLanding=false){
    url="";
    if( dataFor == "all"){
        url=apiUrl;
    }else if(dataFor == "filter"){
        url=apiUrl+"&launch_year="+year;
        if(launchSuccess){
            url=apiUrl+"&launch_year="+year+"&launch_success="+launchSuccess;
        }

        if(launchLanding){
            url=apiUrl+"&launch_year="+year+"&launch_landing="+launchLanding;
        }
    }

    $.ajax({
        url: url,
        dataType: 'json',
        type: "GET",
        cache: false,

        success:function(data){				
            var response = contents(data);
            $('.card').append(response);   	   
		},
    });  
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("yearfilters");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var btnContainer1 = document.getElementById("launchfilter");
var btnss = btnContainer1.getElementsByClassName("btns");
for (var i = 0; i < btnss.length; i++) {
    
    btnss[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }




