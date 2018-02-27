//alert('updated from background');

$(document).ready(function () {
    window.console.log('updated from contentscript');

    //Check if there is code or code lingo
    var htmlString = document.getElementsByTagName('html')[0].innerHTML;

    console.log("STRINGS INCLUDED:");
    console.log(htmlString.includes("<code>"));
    console.log(htmlString.includes("python"));
    console.log(htmlString.includes("java"));

    // Check to see if it contains code
    if (htmlString.includes("<code>") || htmlString.includes("python") || htmlString.includes("java")) {
        console.log("BlackWidow: Code detected sending request.");
        //Send Ajax request to server
        var jsonData = {
            "body": {
                "url": window.location.href
            }
        }

        console.log(jsonData)
        $.ajax({
            url: "https://0opmdh7thb.execute-api.us-east-1.amazonaws.com/working/scan"
            , type: "post"
            , processData: false
            , 'contentType': 'application/json'
            , data: JSON.stringify(jsonData)
            , success: function (data, textStatus, jqXHR) {
                //Once recieve Ajax request send msg to background to tell it about status

                var json = JSON.parse(data["body"])
                console.log(json);
                console.log(json.results.length)
                console.log(json.results[0])

                div = $("<div id='blackwidow-footer' style ='background-color:#3F3F3F;position: fixed;color:#fff; bottom: 0px; height:100px;width: 100%;z-index:100;padding:10px 10px 10px 10px;'>");
                $("body").prepend(div);

                newdiv = $("<div style='color:#fff;display: block;font-size: 1.17em;margin-top: 1em;margin-bottom: 1em;margin-left: 0;margin-right: 0;font-weight: bold;'>").html("BlackWidow");
                $("#blackwidow-footer").append(newdiv);
                for (i = 0; i < json.results.length; i++) {
                    var vuln = json.results[i].vuln_string
                    var solution = json.results[i].error
                    console.log(vuln);
                    //This doesnt work because of the way stackoverflow does things
                    //replacer = "/" + vuln + "/g"
                    //var replaced = $("body").html().replace(replacer, '<span style="background:#96281B">$1</span>');
                    //$("body").html(replaced);
                    newdiv = $("<div>").html("Vulnerability: " + vuln + "\t| Suggestion: " + solution);
                    $("#blackwidow-footer").append(newdiv);




                }



            }
            , error: function (data, textStatus, errorThrown) {
                // var json = JSON.parse(data);
                console.log("BlackWidow SERVER ERROR: No Data Available.");
                console.log(textStatus);
                console.log(data);


            }
        });


    } else { //Else do nothing
        console.log("BlackWidow: No code or coding lingo detected on page, not scanning.");
    }

});