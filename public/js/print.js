

// console.log('Loading file....');


// fetch('http://puzzle.mead.io/puzzle').then(
//     (response)=>{
//         response.json().then(
//             (data) =>{
//                 console.log(data);
//             }
//         )
//     }
// )

// fetch('http://localhost:3000/weather?address=Philadelphia').then(
//     (response)=>{
//         response.json().then(
//             (data) =>{
//                 console.log(data)
//             }
//         )
//     }
// )

const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input');
const displayText1 = document.querySelector('#message-1');
const displayText2 = document.querySelector('#message-2');

displayText1.textContent='';
displayText2.textContent='';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchValue = searchLocation.value;
    if(searchValue){   
        fetch('/weather?address='+searchValue).then(
    (response)=>{
        response.json().then(
            (data) =>{
                if(data.error){
                    displayText1.textContent=searchValue;
                    displayText2.textContent= data.error;
                }
                else{
                    displayText1.textContent=data.location;
                    displayText2.textContent= data.forecast;
                }                
            }
        )
    }
    )
    }
    else{
        console.log('Invalid value');
    }
});