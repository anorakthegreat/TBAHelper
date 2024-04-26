
var trElements = document.querySelectorAll('tr');
var divTeamInfo = document.getElementById('team-info');
var divTeamTitle = document.getElementById('team-title');
var teamSocial = document.getElementById('team-social-media');

chrome.storage.local.get('isOn', function(result) {
    let isOnn = result.isOn
    console.log('Retrieved variable from local storage:', isOnn);
    console.log("I've BEEN CALLED")
    console.log(document.location.href)
    console.log(String(document.location.href).includes("/event/"))
    if(isOnn){
        if( String(document.location.href).includes("/event/")){
            if( !String(document.location.href).includes("#event-insights") && !String(document.location.href).includes("#media") && !String(document.location.href).includes("#teams") && !String(document.location.href).includes("#awards")&& !String(document.location.href).includes("#rankings")){
                forEventPage()
                test()
                goToBracket()


            }
        }  else {
            forTeamPage()
        }
    }
  });

function goToBracket(){
  const h3Elements = document.querySelectorAll('h3');
  let playoff = document.getElementById("double-elim-bracket-table")

  h3Elements.forEach(h3 => { 
    if(h3.textContent.includes("Playoff Results")){
      h3.addEventListener('click', function() {
        // Scroll to a specific position on the page
        // window.scrollTo(0, 2750); // Adjust the vertical position as needed
        let targetTop = playoff.getBoundingClientRect().top;
        let offset = targetTop - 200; // Adjust the value as needed
        window.scrollBy({ top: offset, behavior: 'smooth' });
      });

      h3.style.cursor = 'pointer';


      h3.addEventListener('mouseenter', function() {
        // Translate the element upward by 5 pixels and underline it
        h3.style.textDecoration = 'underline';
        h3.style.color = '';
      });
      
      h3.addEventListener('mouseleave', function() {
        // Reset the styles when mouse leaves
        h3.style.textDecoration = 'none';
        h3.style.color = '';
      });

      h3.addEventListener('mousedown', function() {
        // Change the text color to red when clicked
        h3.style.color = 'blue';
      });

      document.addEventListener('mouseup', function(event) {
        // Check if the mouseup event is outside the h3 element
        if (!h3.contains(event.target)) {
          // Reset the text color
          h3.style.color = ''; // Reset to the default color
        }
      }, { once: true }); // Use 'once: true' to remove the listener after it's triggered once
    }
  })

  
}

function test(){
    const commonAncestor = document.getElementById('double-elim-bracket-table');

    // console.log(commonAncestor)
if (commonAncestor) {
  // Add event listener to the common ancestor
  commonAncestor.addEventListener('mouseover', function(event) {
//    console.log(event.target.tagName)
  console.log("IN")

   if (event.target.tagName === 'TD') {
    if(event.target.textContent.includes("-")){
    // event.target.style.backgroundColor = 'lightblue';
    // console.log("I RUN")
    let numbersString = event.target.textContent
    const numbersArray = numbersString.split("-").map(number => number.trim());

    const firstNumber = numbersArray[0];

    // console.log(firstNumber); // Output: "1678"
    // console.log(event.target.textContent.trim())
    ahh(event.target.textContent.trim(), true)
    }
    
  
  }
  // console.log(event.target.tagName)

  if (event.target.tagName === 'A') {
    var parentElement = event.target.parentNode;
    var grandParent = parentElement.parentNode;

    if(grandParent.textContent.includes("-")){
    //    grandParent.style.backgroundColor = 'lightblue';
        // console.log("I RUN")
        let numbersString = event.target.textContent
        const numbersArray = numbersString.split("-").map(number => number.trim());
    
        const firstNumber = numbersArray[0];
    
        // console.log(firstNumber); // Output: "1678"
        // console.log(event.target.textContent.trim())
        ahh(grandParent.textContent.trim(), true)
        }
        
  }

  if (event.target.tagName === 'SPAN') {
    var grandParent = event.target.parentNode;

    if(grandParent.textContent.includes("-")){
       grandParent.style.backgroundColor = 'lightblue';
        // console.log("I RUN")
        let numbersString = event.target.textContent
        const numbersArray = numbersString.split("-").map(number => number.trim());
    
        const firstNumber = numbersArray[0];
    
        // console.log(firstNumber); // Output: "1678"
        // console.log(event.target.textContent.trim())
        ahh(grandParent.textContent.trim(), true)
        }
    // console.log("SPPPPPPAN")
        
  }

  if (event.target.tagName === 'TD') {
    if(!(event.target.textContent.trim() === '')){
      let parent = event.target.parentNode;
      let tdElements = parent.querySelectorAll('td');
  
      tdElements.forEach(td => { 
        if(td.textContent.includes("-")){
          //    grandParent.style.backgroundColor = 'lightblue';
              // console.log("I RUN")
              let numbersString = event.target.textContent
              const numbersArray = numbersString.split("-").map(number => number.trim());
          
              const firstNumber = numbersArray[0];
          
              // console.log(firstNumber); // Output: "1678"
              // console.log(event.target.textContent.trim())
  
              
              ahh(td.textContent.trim(), true)
              }
      })
    } else {
      console.log("I REJECTED IT")
    }
    

      
  }
  });

  // Add event listener to reset the hover effect on mouseout
  commonAncestor.addEventListener('mouseout', function(event) {
    console.log("OUT")
    // event.target.style.backgroundColor = '';
    ahh("OVERRIDE", false)


  });
}
}

function ahh(string, isHighlighting){
// console.log("BEGIN ")

  let nest
  const table = document.getElementById('double-elim-bracket-table');

  // Find all <tr> elements within the <tbody> of the table
  const trElements = table.querySelectorAll('tbody tr');

    // Iterate over each <tr> element
    trElements.forEach(tr => {
        // Find the nested <table> element within the <div> structure
        const nestedTable = tr.querySelector('td div > div > table');
        // Check if nestedTable exists
        if (nestedTable) {
        // Perform actions on the nested table
        //   console.log(nestedTable);
        nest = nestedTable

        }
    });



    // Now you have both tr elements, and you can work with them
    trElements.forEach(tr => {
        // console.log(tr)
      // Perform actions on each tr element
      const tdElement = tr.querySelectorAll('td');

      tdElement.forEach(td => {
        
        if (td && td.classList.contains('match')) {
                // console.log(td)

              let tableMatch = td.querySelector('div > div > table > tbody');
              // console.log(tableMatch)
              let tableMatchTr = tableMatch.querySelectorAll("tr")
              tableMatchTr.forEach(tr => { 
                let winner = false

                let tds = tr.querySelectorAll("td")
                

                tds.forEach(td => { 
                  if(td.classList.contains("winner"))  {
                    winner = true
                  }
                  if(td.classList.length === 0){
                    let spans = td.querySelectorAll("span")

                    spans.forEach(span => { 
                      if(span){
                        // console.log(span.textContent)
                        if(span.textContent.trim() == string  || string == "OVERRIDE"){
                          if(isHighlighting){

                            let specialContentElement = span.querySelector('.special-content');
                            if (!specialContentElement) {
                              
                            

                            td.style.backgroundColor = 'lightblue';
                            td.style.boxShadow = '0 0 5px rgba(0, 0, 0, 5)';
                            td.style.transform = 'translateY(-2px)';

                            if(winner){
                              let checkMark = document.createElement('span');
                              checkMark.textContent = '✅';
                              checkMark.style.color = 'green'; // Optional: Set the color
                              checkMark.className = 'special-content'; // Set the class name
                              checkMark.style.pointerEvents = 'none'; // Set pointer events to none

                              span.appendChild(checkMark)
                            } else {
                              let redX = document.createElement('span');
                              redX.textContent = '❌';
                              redX.style.color = 'red'; // Optional: Set the color
                              redX.className = 'special-content'; // Set the class name
                              redX.style.pointerEvents = 'none'; // Set pointer events to none

                              span.appendChild(redX);

                            }
                          }
                          } else{
                            
                            let specialContentElement = span.querySelector('.special-content');
                            if (specialContentElement) {
                              // Remove the special content element
                              specialContentElement.remove();
                            }
                            td.style.backgroundColor = '';
                            td.style.transform = '';
                            td.style.boxShadow = '';

                            // console.log("I SET IT BACK")

                          }
  
                        }
                      }
                      

                    })


                  }

                })
              })
            }
        })

    });
}


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
            // console.log(tr.lastElementChild.textContent)
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
            newTd.style.backgroundColor = 'rgb(236 110 110)' //"#ee5151"

        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
            newTd.style.backgroundColor = "#f9d663"

        } else if(parseInt(blueScore) > parseInt(redScore)){
            vari = "BLUE Won"
            newTd.style.backgroundColor = 'rgb(153 147 241)' //"#796ffd"

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

var element = document.getElementById("team-title");
if(element){
    var textContent = element.textContent;
    var image = element.querySelector("img")

    if(image){
        image = image.cloneNode(true);
    }

    if(image){
        // Clone the image element inside the <h2> element

        // Split the text content by the '-' character
        var parts = textContent.split('-');

        // Get the first part and trim whitespace
        var teamInfo = parts[0].trim();

        // Extract the team number (assuming it's always the first word)
        var teamNumber = parseInt(teamInfo.split(' ')[1]);

        // Create a new <a> element
        var link = document.createElement("a");

        // Create the href attribute value
        var href = "https://www.statbotics.io/team/" + teamNumber;

        // Set the href attribute of the <a> element
        link.setAttribute("href", href);

        // Optionally, you can set the target attribute to open the link in a new tab
        link.setAttribute("target", "_blank");

        link.style.fontSize = "30px"; // Set font size to 20 pixels
        link.style.color = "black";   // Set text color to black




// Append the cloned image to the <a> element
link.appendChild(image);

// Set the text content of the <a> element
link.appendChild(document.createTextNode(textContent));

// Replace the original element with the <a> element
element.parentNode.replaceChild(link, element);
    }
    
}
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