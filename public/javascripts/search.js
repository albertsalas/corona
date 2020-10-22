$("#search").on("change", function(){
          
    let searchInput = $("#search").val();
    console.log(searchInput);
    getProduct(searchInput);

  });

  // function handle(e){
  //   let searchInput = $("#search").val();
  //   console.log(searchInput);
    
  //     if(e.keyCode === 13){

  //       alert("You are searching: " + address);
  //     }
  //   return false;
  // }

  function getProduct(searchInput){
    $.ajax({
      type: 'GET',
      url: '/search/' + searchInput,
      // url: '/' + searchInput,
      contentType: "json",
      data: "",
      success: function(result){
        // console.log(result)
        var a = result;
        if(a.item[0] == undefined)
          window.location = window.location.origin+"/error";
        else{
          let newURL = window.location.origin+"/products/"+a.item[0].name;
          window.location = newURL;
          console.log("search successful");
        }
        // console.log(window.location.origin);
      }
    })
  }
