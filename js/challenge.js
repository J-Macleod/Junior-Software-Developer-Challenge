let userTotal = 0;

async function getUsers() {
    'use strict';
    
    let ajaxPosts = new XMLHttpRequest();
    ajaxPosts.onreadystatechange = async function() {
        if (ajaxPosts.readyState == 4) {
            if ( (ajaxPosts.status >= 200 && ajaxPosts.status < 300) || (ajaxPosts.status == 304) ) {
                let postData = JSON.parse(ajaxPosts.responseText);
                console.log(postData[0]['body']);
                let ajaxUsers = new XMLHttpRequest();
                ajaxUsers.onreadystatechange = function() {

                    if (ajaxUsers.readyState == 4) {

                        if ( (ajaxUsers.status >= 200 && ajaxUsers.status < 300) || (ajaxUsers.status == 304) ) {
                            let userData = JSON.parse(ajaxUsers.responseText);

                            let info = "<tr><td>User Post Information Table</td></tr>";
                            for (let i = 0; i < userData.length; i++) {
                                let userID = userData[i]['id'];
                                let usersName = userData[i]['name'];
                                info += "<tr><td id='user"+userID+"' style='border: 1px solid black;'>"+usersName;
                                info += "<tr><td id='posts"+i+"'>";
                                
                                let postArray = [];
                                for (let j = 0; j < postData.length; j++) {
                                    if (postData[j]['userId'] == userID) {
                                        postArray.push("Title: "+postData[j]['title']+"<br> Body: "+postData[j]['body']+"<br><br>");
                                    }
                                }

                                for (let r = 0; r < postArray.length; r++) {
                                    info += postArray[r];
                                }

                                info += "</td></tr>";
                                info += "</td></tr>";
                                userTotal += 1;
                            }
                            document.getElementById('usersArea').innerHTML = info;
                            for (let i = 0; i < userData.length; i++) {
                                $('#posts'+i).hide();
                            }

                            for (let i = 0; i < userData.length; i++) {
                                $('#user'+(i+1)).click( function () {
                                    if ($('#posts'+i).is(":hidden")) {
                                        $('#posts'+i).show();
                                    }
                                    else {
                                        $('#posts'+i).hide();
                                    }
                                })
                            }
                        }
                    }
                };
                
                ajaxUsers.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
                ajaxUsers.send();
            }
        }
    }
    ajaxPosts.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    ajaxPosts.send();
}

$(document).ready( getUsers() );