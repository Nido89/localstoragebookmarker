// Listen to form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

// Save bookmark function
function saveBookmark(e){
    //console.log('It works');
    //TOGET FORM VALUES
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName,siteUrl)){
        return false;
    }

// Creating an object
    var bookmark = {
        name: siteName,
        url: siteUrl

    }
    //console.log(bookmark);
    //Local storage test example
   /*  localStorage.setItem('test','Dheem Tamacha');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    localStorage.setItem('test','Dheem Tamacha');
     */
    //To test if there are no bookmarks
    if(localStorage.getItem('bookmarks') === null){
// Then initialize the array to store em
        var bookmarks = [];

        // Add objects of bookmarked to array
        bookmarks.push(bookmark);
        // set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
        // Get Book marks from local storage if there already
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Add Bookmark to array
        bookmarks.push(bookmark);
        //Reset back to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }
    // clear form
    document.getElementById('myForm').reset(); 
 // ReFetch bookmarks
 fetchBookmarks();
    //Prevent Default Behavior
    e.preventDefault();
}
// Delete bookmark
function deleteBookmark(url){
    //console.log(url);

    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Loop through bookmarks
    for(var i=0; i< bookmarks.length;i++){
        if(bookmarks[i].url == url){
            //Removing from array
            bookmarks.splice(i,1);

        }
    }
            //Reset back to localStorage
            localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
            // ReFetch bookmarks
            fetchBookmarks();  
}


// fetch Bookmarks
function fetchBookmarks(){
        // Get Book marks from local storage if there already
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //console.log(bookmarks);
        // Get output id

        var bookmarksResults = document.getElementById('bookmarksResults');

        // Build output
        bookmarksResults.innerHTML = '';

        // Looping through all the bookmarked
        for(var i=0; i< bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
// Building the ouput html
            bookmarksResults.innerHTML += '<hr><br><div class="table-success">' +
                                        '<h3>'+name+
                                        '<a class="btn btn-info" target="_blank" href="'+url+'"/>  Goto</a> ' +
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#"/> Remove</a> '
                                        '</h3>'+
                                        '</div>';

        }

        
}
// validate form
function validateForm(siteName,siteUrl){

    if(!siteName || !siteUrl){
        alert('Please fill the form fields');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;

    }
    return true;

}