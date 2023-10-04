const posts = [];

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;



const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');

const validationMessage = document.getElementById('validationMessage');

const titleLimit = document.querySelector('.js-post-title-limit');
const textLimit = document.querySelector('.js-post-text-limit');



// postTitleInputNode.addEventListener('change', function() {
//     if(postTitleInputNode.value.trim() !== '') {
//         newPostBtnNode.disabled = false;
//     }else if (postTitleInputNode.value.trim() !== '' && postTextInputNode.value.trim() !== '') {
//         newPostBtnNode.disabled = false;
//     } else {
//         newPostBtnNode.disabled = true;
//     }
// });

// postTextInputNode.addEventListener('change', function() {
//     if(postTextInputNode.value.trim() !== '') {
//         newPostBtnNode.disabled = false;
//     }else if (postTitleInputNode.value.trim() !== '' && postTextInputNode.value.trim() !== '') {
//         newPostBtnNode.disabled = false;
//     } else {
//         newPostBtnNode.disabled = true;
//     }
// });

function checkInput() {

    if (postTitleInputNode.value.trim() !== "" && postTextInputNode.value.trim() !== "" || postTitleInputNode.value.trim() !== "" || postTextInputNode.value.trim() !== "") {
        newPostBtnNode.disabled = false;
 
    } else {
        newPostBtnNode.disabled = true;
    }
  }




newPostBtnNode.addEventListener('click', function () {


    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
    
    checkInput();

    clear(); 
});



postTitleInputNode.addEventListener('input', validation);

postTextInputNode.addEventListener('input', validation);


function validation() {
    const titleLen = postTitleInputNode.value.length;
    const textLen = postTextInputNode.value.length;
    

    console.log(titleLen);
    console.log(textLen);



    if (titleLen == 0 || textLen == 0 || titleLen == 0 && textLen == 0) {
        newPostBtnNode.disabled = true;
        return
    } 
    

    if (titleLen > TITLE_VALIDATION_LIMIT && textLen > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина заголовка не должна быть больше чем ${TITLE_VALIDATION_LIMIT} символов, длина текста не должна быть больше чем ${TEXT_VALIDATION_LIMIT} символов!`
        validationMessage.classList.remove("validationMessage_hidden");
        newPostBtnNode.disabled = true;
        titleLimit.classList.add("limit__hidden");
        textLimit.classList.add("limit__hidden");
        return
        } else {
            newPostBtnNode.disabled = false;
            validationMessage.classList.add("validationMessage_hidden");
   
    }
    

    if(titleLen > TITLE_VALIDATION_LIMIT) {
        // validationMessage.innerText = `Длина заголовка привышает допустимый лимит на ${titleLen -  TITLE_VALIDATION_LIMIT} симолов`;
        titleLimit.innerText = `Длина заголовка привышает допустимый лимит на ${titleLen -  TITLE_VALIDATION_LIMIT} симолов. Допустимый лимит ${TITLE_VALIDATION_LIMIT}`;
        titleLimit.classList.remove("limit__hidden");
        validationMessage.classList.add("validationMessage_hidden");
        newPostBtnNode.disabled = true;
        return
    } else {
        newPostBtnNode.disabled = false;
        titleLimit.classList.add("limit__hidden");

    }



    if(textLen > TEXT_VALIDATION_LIMIT) {
        textLimit.innerText = `Длина текста привышает допустимый лимит на ${textLen -  TEXT_VALIDATION_LIMIT} симолов. Допустимый лимит ${TEXT_VALIDATION_LIMIT}`;
        textLimit.classList.remove("limit__hidden");
        newPostBtnNode.disabled = true;
        validationMessage.classList.add("validationMessage_hidden");
      
        return
    } else {
        newPostBtnNode.disabled = false;
        textLimit.classList.add("limit__hidden");
      
    }

    
    validationMessage.classList.add("validationMessage_hidden");
};




//получение данных из поля ввода
function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return {
        title: title,
        text: text
    };
}


// cохранение поста
function addPost({title, text}) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()}  ${currentDate.getHours()}:${currentDate.getMinutes()}`


    posts.push({
        formattedDate,
        title: title, 
        text: text
    });
}


function getPosts() {
    return posts;
}
0

//отображение поста
function renderPosts() {
    // console.log(getPost());

    const posts = getPosts();


    let postsHTML = '';

    posts.forEach(post => {
        postsHTML += `
        <div class='post'>
            <p class='post__date'>${post.formattedDate}</p>
            <p class='post__title'>${post.title}</p>
            <p class='post__text'>${post.text}</p>
        </div>`;
    });


    // const postHTML = `
    // <div class='post'>
    //     <p class='post__title'>${post.title}</p>
    //     <p class='post__text'>${post.text}</p>
    // </div>`;

    postsNode.innerHTML = postsHTML;
}

function clear() {
    document.querySelector('.js-post-title-input').value;
    document.querySelector('.js-post-text-input').value;

    document.querySelector('.js-post-title-input').value = '';
    document.querySelector('.js-post-text-input').value = '';
}

