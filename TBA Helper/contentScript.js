
var trElements = document.querySelectorAll('tr');
var divTeamInfo = document.getElementById('team-info');
var divTeamTitle = document.getElementById('team-title');
var teamSocial = document.getElementById('team-social-media');

chrome.storage.local.get('isOn', function(result) {
    let isOnn = result.isOn
    // console.log('Retrieved variable from local storage:', isOnn);
    console.log("I've BEEN CALLED")
    console.log(document.location.href)
    console.log(String(document.location.href).includes("/event/"))
    if(isOnn){
        if( String(document.location.href).includes("/event/")){
            if( !String(document.location.href).includes("#event-insights") && !String(document.location.href).includes("#media") && !String(document.location.href).includes("#teams") && !String(document.location.href).includes("#awards")&& !String(document.location.href).includes("#rankings")){
                forEventPage()
            }
        }  else {
            forTeamPage()
        }
    }
  });

function validateEventPage(){

let score = 0
var colSm12 = document.querySelectorAll('div.col-sm-12');
colSm12.forEach(function(div) { 
    var h1Exists = div.querySelector('h1') !== null;
    var h3Exists = div.querySelector('h3') !== null;
    if(h1Exists || h3Exists){
        return
    }


    var ulElements = div.querySelectorAll('ul');
    ulElements.forEach(function(ul) { 

        var liElements = ul.querySelectorAll("li")
        liElements.forEach(function(li) { 

            var anchorElement = li.querySelector('a');

            if (anchorElement) {
                var href = anchorElement.getAttribute('href');
                if(href == "#results" || href == "#rankings" || href == "#awards" || href == "#teams" || href == "#event-insights" || href == "#media"){
                    score++
                }
                // console.log(href)
            }

        })

    })

})   

return score

}






function forEventPage(){

    if(document.location.href.includes("#rankings")){
        return
    }

    trElements.forEach(function(tr) {   
        var tdElements = tr.querySelectorAll('td');
        let blueScore = 0;
        let redScore = 0;
        let isNA = false;

        if(tr.className == "key"){
            // console.log("AHHAHAHA")
            var newTd = document.createElement('th');
            // newTd.textContent = 'AHAHAHAHAH?';
            tr.appendChild(newTd);
            return;
        }

        if(tr.parentElement.tagName == "THEAD" && tr.className != "key"){
            console.log(tr.lastElementChild.textContent)
            if(!tr.lastElementChild.textContent.includes("Ranking") && !tr.lastElementChild.textContent.includes("Image") && !tr.lastElementChild.textContent.includes("Winner") && !tr.lastElementChild.textContent.includes("Ranking")&& !tr.lastElementChild.textContent.includes("OPR")){
                var newTd = document.createElement('th');
                newTd.textContent = 'Win?';
                tr.appendChild(newTd);
                return;
            }
            
        }  
        
        
    
        if(tr.className != "visible-lg"){
            return
        }


        tdElements.forEach(function(td) { 
            var spanElements2 = td.querySelectorAll('span');

            spanElements2.forEach(function(span) { 
                if(span.hasAttribute("title")){
                    if(span.getAttribute("title").includes("Scheduled")){
                        isNA = true
                        return
                    }
                }
            })

            let isOnRedTeam = null
            if(!td.className.includes("Score")){
                return
            }

            if(td.className.includes("redScore")){
                isOnRedTeam = true
            } else{
                isOnRedTeam = false
            }

            var spanElements = td.querySelectorAll('span');

            spanElements.forEach(function(span) {
                if(isOnRedTeam){
                    redScore = span.textContent
                } else {
                    blueScore = span.textContent
                }

                
            })

        })   

        let vari = ""
        var newTd = document.createElement('td');
        newTd.style.border =  '1px solid black'

        

        if(parseInt(redScore) > parseInt(blueScore)){
            vari = "RED Won"
            newTd.style.backgroundColor = "#ee5151"

        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
            newTd.style.backgroundColor = "#f9d663"

        } else if(parseInt(blueScore) > parseInt(redScore)){
            vari = "BLUE Won"
            newTd.style.backgroundColor = "#796ffd"

        } else {
            vari = "N/A"
            newTd.style.backgroundColor = "#bfd7e8"

        }

        if(isNA){
            // console.log("IS NAAAA")
            vari = "N/A"
        }

        newTd.textContent = vari;
        tr.appendChild(newTd);
    })

}



function forTeamPage(){
trElements.forEach(function(tr) {   
    // Find the <span> element inside the <td>
    var tdElements = tr.querySelectorAll('td');
    var thElements = tr.querySelectorAll('th');

    let blueScore = 0;
    let redScore = 0;
    let isTeamBlue = null;

    if(divTeamInfo && divTeamTitle && teamSocial){

    }else{
        return
    }
    

    if(tr.parentElement.tagName == "THEAD"){
        // console.log("RAHHHHHHHHHHHHHHHHH")
        var newTd = document.createElement('th');
        newTd.textContent = 'Win?';
        tr.appendChild(newTd);
        return;
    }  
    
    if(tr.className == "key"){
        // console.log("AHHAHAHA")
        var newTd = document.createElement('th');
        // newTd.textContent = 'AHAHAHAHAH?';
        tr.appendChild(newTd);
        return;
    }

    if(tr.className != "visible-lg"){
        return
    }

    


    tdElements.forEach(function(td) {
        let isOnBlueScore = null

        if(td.className.includes("current-team")){
            if(td.className.includes("blueScore")){
                isTeamBlue = true
            } else{
                isTeamBlue = false
            }
        }

        if(td.className.includes("red")){
            isOnBlueScore = false
        } else{
            isOnBlueScore = true
        }

        if(isTeamBlue == null || isOnBlueScore == null){
            return
        }



        var spanElements = td.querySelectorAll('span');

        spanElements.forEach(function(span) {

            if(span.hasAttribute("title")){
                if(span.getAttribute("title").includes("Scheduled")){
                    blueScore = "N/a"
                    redScore = "N/a"
                    // console.log("ITS N?A")
                    return
                }
            }
            

            // console.log("Class name of the <span> element:", span.className);
            if(isOnBlueScore){
                blueScore = span.textContent
            } else{
                redScore = span.textContent
            }


        });
    });

    
    var vari = ""

    if(isTeamBlue){
        if(parseInt(blueScore) > parseInt(redScore)){
            vari = "WIN"
        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
        } else{
            vari = "LOSS"
        }
    } else{
        if(parseInt(redScore) > parseInt(blueScore)){
            vari = "WIN"
        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
        } else{
            vari = "LOSS"
        }
    }

    if(blueScore == "N/a"){
        vari = "N/A"

    }

    var newTd = document.createElement('td');
    newTd.textContent = vari;

    if(vari == "WIN"){
        newTd.style.backgroundColor = "#5fd99a"
    } else if(vari == "TIE"){
        newTd.style.backgroundColor = "#f9d663"
    }else if(vari == "LOSS"){
        newTd.style.backgroundColor = "#eb5e5e" 
    } else{
        newTd.style.backgroundColor = "#bfd7e8"

    }

    tr.appendChild(newTd);

    
});
}