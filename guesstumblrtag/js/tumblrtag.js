const tags = ['melbourne', 'ireland', 'hotdog', 'sundae', 'strawberry', 'art' ];

const list = document.getElementById('list-data');
const answerList = document.getElementById('selection');
let answer = "";

function randomColor(){	
	let r = Math.floor(Math.random()* 255);
	let g = Math.floor(Math.random()* 255);
	let b = Math.floor(Math.random()* 255);
	return 'rgb(' + r + "," + g + "," + b + ")";
}

function reset(){
	answerList.innerHTML = "";
	answer = tags[Math.floor(Math.random() * tags.length)];
	getTaggedPhotos(answer);

	const selection = [];
	selection.push(answer);

	while(selection.length < 4){
		const rand = tags[Math.floor(Math.random() * tags.length)];
		if(selection.indexOf(rand) == -1){
			selection.push(rand);
		}
	}

	selection.sort(function(){
		return Math.random() * 2 - 1;
	});

	for(let i = 0; i < selection.length; i++){
		const li = document.createElement('li');
		const btn = document.createElement('button');
		li.appendChild(btn);
		btn.innerHTML = selection[i];
		btn.style.backgroundColor = randomColor();
		btn.onclick = function(){
			if(btn.innerHTML == answer){
				window.alert('Bingo, thats the correct tag!')
			}
			else{
				window.alert('sorry! the answer is ' + answer)
			}
	
			reset();
		}
		answerList.appendChild(li);
	}
}

function getTaggedPhotos(tagName){

fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=7W1BBpLNZ6x0SwGmJ6UHzGMUou8AhkDGgaC766gDBP8JXYhfYW')
  .then(function(response){
     return response.json(); 
  })
	.then(function(result){
		if(!result){
			return;
		}

		// clear list
		list.innerHTML = '';

		const items = result.response;
		let masonry;

		// for each item, add image to list
		for(i=0; i<items.length; i++){
			const item = items[i];

			if (item.photos != undefined) {
			// create li and img to append
			const altSizes = item.photos[0].alt_sizes;
			const ImgSrc = altSizes[altSizes.length - 3].url;
			
			const img = document.createElement('img');	
			img.src = ImgSrc;
			img.onload = function(){
				masonry.layout();
			}
			
			const li = document.createElement('li');
			li.appendChild(img);

			// li.innerHTML = imgSrc;

			list.appendChild(li);
     		}
     	}

     	// initialize masonry after list has loaded
     	masonry = new Masonry(list, {
			itemSelector: 'li',
			columnwidth: 80,
			gutterwidth: 8,
		});

     	//run layout
     	masonry.layout();
  })

	.catch (function(err){
		window.alert('The Tumblr API is not working. Please try again later');
		console.log('message:', err)
	})	

}
reset();