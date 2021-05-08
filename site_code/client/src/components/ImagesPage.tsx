import React, { useCallback, useState, useEffect } from "react"
import "./ImagesPage.css"

interface MIM {
	image: string;
	date: string;
	known: Boolean;
}

function ImagesPage() {
	var [images_list,getImages]=useState<MIM[] | undefined>(undefined);
	useEffect(()=>{
 	var request = new XMLHttpRequest();
 	request.onreadystatechange = function() {
 	if (request.readyState == 4 && request.status == 200) {
 	const response=JSON.parse(request.response)
 	getImages(response)
 	}
 };
 request.open('GET', 'YOUR_Public IPv4 address', true);
 request.send();
 },[])

 useEffect(()=>{
 console.log(images_list)
},[images_list])
	return (
  <div className="Page">
    <h1 className="tabtitle">
    Images List
    </h1>
		  <div id="ImageList" className="List">
					{images_list && images_list.map(image => (
							<img src= {"S3-BUCKET-LINK" + image.image} alt="Image" onError={e => { e.currentTarget.style.visibility = "hidden"; e.currentTarget.style.display = "none";}}></img>
					))}
		   </div>
    </div>
	)
}
export default ImagesPage
