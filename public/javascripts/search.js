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
        var a = result;
        console.log(a.item[0].name);
         let newURL = "./products/"+a.item[0].name;
         window.location = newURL;
        console.log("search successful");
      }
    })
  }
