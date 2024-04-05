// // console.log('Callbacks!');


// // JavaScript Callbacks

// function isEven(number){
//     return number % 2 === 0
// }

// function filter(anArr){
//     let output = [];
//     for (let element of anArr){
//         if (isEven(element)){ // Logic that determines if filtered or not
//             output.push(element);
//         };
//     };
//     return output;
// }


// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log(filter(numbers));


// // Rewrite the filter function with a second param for a callback

// function filterWithCallback(anArr, callbackFn){
//     let output = [];
//     for (let element of anArr){
//         if (callbackFn(element)){ // Logic that determines if filtered or not
//             output.push(element);
//         };
//     };
//     return output;
// };


// console.log(filterWithCallback(numbers, isEven))
// console.log(filterWithCallback(numbers, function(num){ return num % 2}))
// console.log(filterWithCallback(numbers, num => num < 5))



// function first(){
//     console.log('Start')
//     setTimeout(() => {
//         console.log('First');
//         console.log('End')
//     }, 3000)
// }

// function second(){
//     console.log('Second');
// }


// first();
// second();

// function downloadSong(songName){
//     console.log(`Downloading ${songName}...`)
//     setTimeout(() => {
//         console.log('Finished downloading');
//         return {song: songName, artist: 'Taylor Swift'}
//     }, 5000)
// }

// function playSong(songName){
//     let song = downloadSong(songName);
//     console.log(song);
//     // console.log(`${song.song} by ${song.artist} is now playing`)
// }

// playSong('Blank Space');


// Fix with callbacks!
// function downloadSong(songName, callbackFn){
//     console.log(`Downloading ${songName}...`)
//     setTimeout(() => {
//         console.log('Finished downloading');
//         callbackFn({song: songName, artist: 'Taylor Swift'})
//     }, 5000)
// }

// function playSong(song){
//     console.log(`${song.song} by ${song.artist} is now playing`)
// }

// downloadSong('Blank Space', playSong);

// downloadSong('Anti-Hero', s => console.log(`${s.song} is saved to your playlist`));




// Handling Errors
// function downloadSong2(songName, callbackSuccess, callbackFail){
//     console.log(`Searching for ${songName} in our database...`)
//     setTimeout(() => {
//         // Simulate a valid song choice
//         if (songName.length > 5){
//             let song = {title: songName, artist: 'Taylor Swift'};
//             callbackSuccess(song);
//         } else {
//             callbackFail(songName);
//         }
//     }, 3000)
// }

// downloadSong2(
//     '1989', 
//     song => console.log(`${song.title} by ${song.artist} is playing...`),
//     searchedSong => console.warn(`${searchedSong} is not in the database`)
// );


// Call-back Hell
// downloadSong('Single Ladies', (s) => {
//     console.log(`${s.song} by ${s.artist} is playing...`)
//     downloadSong('Lemondade', (s) => {
//         console.log(`${s.song} by ${s.artist} is playing...`);
//         downloadSong('Halo', (s) => {
//             console.log(`${s.song} by ${s.artist} is playing...`)
//         })
//     })
// })


/*
Promises
A Promise in JS is basically a promise that the function will do the requested action and then return that result back when it is finished. This will run asynchronously on the WebAPIs.

Each Promise can either be fulfilled, meaning it has got the answer for you; pending meaning it hasn't finished yet, and rejected meaning something went wrong.

The Promise object supports two properties: state and result.

While a Promise object is "pending" (working), the result is undefined.

When a Promise object is "fulfilled", the result is a value.

When a Promise object is "rejected", the result is an error object.
*/

function downloadSong(songName){
    console.log(`Searching for ${songName} in the database...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (songName.length > 5){
                resolve({title: songName, artist: 'Taylor Swift'})
            } else {
                reject(`${songName} does not exist`)
            }
        }, 3000)
    })
}

function playSong(song){
    console.log(`${song.title} by ${song.artist} is playing`)
}

function handleNoSong(reason){
    console.warn(reason)
}

// let myFavSong = downloadSong('1989');

// myFavSong.then(playSong, handleNoSong)


// let shortSong = downloadSong('1989');
// console.log(shortSong);


/*
Resolving the Promise
Using a chain of callbacks and .then/.catch/.finally we can resolve the promise and recieve its output

.then((resultOfPromise)=>{do something with result}) this will resolve the promise when it becomes fulfilled.

.catch((error)=>{do something based on the error}) this will run if the promise returns an error

.finally(()=>{do something after promise has been fulfilled or rejected})
*/

// downloadSong('abc').then(playSong).catch(handleNoSong).finally(() => console.log('Finished!'));



// Each .then results in another Promise with the return value of the callback being the resultOfPromise

// downloadSong('123')
//     .then( song => {
//         console.log(`${song.title} by ${song.artist} is now playing...`)
//         return song.artist
//     } )
//     .then( artist => console.log("Oh my gosh", artist, "I love you!") )
//     .catch( err => console.warn(err) )
//     .finally( () => console.log('Thank you for searching our database') )


function playTaylor(songName){
    downloadSong(songName)
        .then( song => {
            console.log(`${song.title} by ${song.artist} is now playing...`)
            return song.artist
        } )
        .then( artist => console.log("Oh my gosh", artist, "I love you!") )
        .catch( err => console.warn(err) )
        .finally( () => console.log('Thank you for searching our database') )
}


// res = fetch('https://pokeapi.co/api/v2/pokemon/ditto')
// res.then(r => r.json()).then( data => console.log(data) )

// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//     .then( res => res.json() )
//     .then( data => {
//         console.log(data.name);
//         console.log(data.height);
//         let h1 = document.createElement('h1');
//         h1.innerHTML = data.name
//         document.body.append(h1);
//     } )
//     .catch( err => console.warn(err) );



// Async/Await

/*
Async Await is another way to resolve your promises, that is a bit more clear than the .then.catch chain

To do this we use the key word await in front of the promise call.

Any function that is awaiting something must be labeled as async.

You can not await something at the top level of your code
*/

function playTaylor(songName){
    downloadSong(songName)
        .then( song => {
            console.log(`${song.title} by ${song.artist} is now playing...`)
            return song.artist
        } )
        .then( artist => console.log("Oh my gosh", artist, "I love you!") )
        .catch( err => console.warn(err) )
        .finally( () => console.log('Thank you for searching our database') )
}

async function playTaylor2(songName){
    let song = await downloadSong(songName);
    console.log(`${song.title} by ${song.artist} is now playing...`)
    let artist = song.artist
    console.log("Oh my gosh", artist, "I love you!")
    console.log('Thank you for searching our database')
}

// playTaylor2('Cruel Summer');
// playTaylor2('Bad Blood');


// Error Handling

// playTaylor2('123');

// try/catch

async function playTaylor3(songName){
    try{
        let song = await downloadSong(songName);
        console.log(`${song.title} by ${song.artist} is now playing...`)
        let artist = song.artist
        console.log("Oh my gosh", artist, "I love you!")
    } catch(err) {
        console.warn(err);
    }
    console.log('Thank you for searching our database')
}
playTaylor3('Cruel Summer');
playTaylor3('Bad Blood');
playTaylor3('123');


// Make an async/await function to return poke data

async function getPokeData(pokeName){
    try{
        const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        let response = await fetch(pokeURL);
        let data = await response.json();
        return data
    } catch(err) {
        console.warn(err)
    }
};
