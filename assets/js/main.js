document.addEventListener('DOMContentLoaded', () => {

    const userEl = document.querySelector('.user-container')
    const userFull = document.querySelector('.user-full_info')

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(users => {
            let c = 0

            users.forEach(user => {
                if (c < 10) {
                    userEl.insertAdjacentHTML('beforeend', `
                        <div class="user">
                            <p class="user-more_info" data-user-id="${user.id}">${user.title}</p>
                        </div>
                    `)
                    c++
                }
            });


        })
        .catch(error => {
            userEl.insertAdjacentHTML('beforeend', `
                <h2 class="error"> Ошибка: ${error} <h2>
            `)
        })


    userEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('user-more_info')) {
            const userId = event.target.getAttribute('data-user-id')
            // console.log(userId);

            fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
                .then(response => response.json())
                .then(user => {
                    userEl.style.display = 'none'
                    userFull.innerHTML=`
                        <div class="user-content">
                             <p>${user.title}</p> <br><br>
                             <p>${user.body}</p>
                            
                             <button class="user-button">Назад</button>
                         </div>
                    `
                    userFull.style.display = 'flex'
                    const userBtn = document.querySelector('.user-button')
                    userBtn.addEventListener('click',()=>{
                        userEl.style.display = 'flex'
                        userFull.style.display = 'none'

                    })
                    .catch(error => {
                        userFull.insertAdjacentHTML('beforeend', `
                            <h2 class="error"> Ошибка: ${error} <h2>
                        `)
                    })
                })
        }
    })

})
